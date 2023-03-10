import * as mysql2 from 'mysql2/promise';
import IModel from './IModel.interface';
import IAdapterOptions from './IAdapterOptions.interface';
import IServiceData from './IServiceData.interface';
import { resolve } from 'path';
import { IServices } from './IApplicationResources.interface';
import IApplicationResources from './IApplicationResources.interface';

export default abstract class BaseService<ReturnModel extends IModel, AdapterOptions extends IAdapterOptions> {
    private database: mysql2.Connection;
    private serviceInstances: IServices; 

    constructor(resources: IApplicationResources){
        this.database = resources.databaseConnection;
        this.serviceInstances = resources.services;
    }

    protected get db(): mysql2.Connection{
        return this.database;
    }

    protected get services(): IServices{
        return this.serviceInstances;
    }
    abstract tableName(): string;

    protected abstract adaptToModel(data: any, options: AdapterOptions): Promise<ReturnModel>;

    public getAll(options: AdapterOptions): Promise<ReturnModel[]>{
        const tableName = this.tableName();
        return new Promise<ReturnModel[]>(
            (resolve, reject) =>{
                const sql: string = `SELECT * FROM \`${ tableName }\`;`;
                this.db.execute(sql)
                .then(async ([rows]) => {
                    if (rows === undefined){
                        return resolve([]);
                    }
                    
                    const items: ReturnModel[] = [];

                    for (const row of rows as mysql2.RowDataPacket[]) {
                        items.push(await this.adaptToModel(row, options));
                    }
                
                    resolve(items);
                })
                .catch(error => {
                    reject(error);
                });
            }
        )
    }

    public getById(id: number,options: AdapterOptions): Promise<ReturnModel | null>{
        const tableName = this.tableName();


        return new Promise<ReturnModel>(
            (resolve,reject) => {
                const sql: string = `SELECT * FROM \`${tableName}\` WHERE ${tableName}_id=?;`;

                this.db.execute(sql, [ id ])
                .then(async ([rows]) => {
                    if (rows === undefined){
                        return resolve(null);
                    }
                    
                    if(Array.isArray(rows) && rows.length ===0){
                        return resolve(null);
                    }

                   resolve(await this.adaptToModel(rows[0], options));
                })
                .catch(error => {
                    reject(error);
                });
            }
        );
    }

    protected async getAllByFieldNameAndValue(fieldName: string, value: any, options: AdapterOptions): Promise<ReturnModel[]> {
        const tableName = this.tableName();

        return new Promise<ReturnModel[]>(
            (resolve, reject) => {
                const sql: string = `SELECT * FROM \`${ tableName }\` WHERE \`${ fieldName }\` = ?;`;

                this.db.execute(sql, [ value ])
                    .then( async ( [ rows ] ) => {
                        if (rows === undefined) {
                            return resolve([]);
                        }

                        const items: ReturnModel[] = [];

                        for (const row of rows as mysql2.RowDataPacket[]) {
                            items.push(await this.adaptToModel(row, options));
                        }

                        resolve(items);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );
    }

protected async getAllFromTableByFieldNameAndValue<OwnReturnType>(tableName: string, fieldName: string, value: any): Promise<OwnReturnType[]> {
        return new Promise(
            (resolve, reject) => {
                const sql =  `SELECT * FROM \`${ tableName }\` WHERE \`${ fieldName }\` = ?;`;

                this.db.execute(sql, [ value ])
                .then( async ( [ rows ] ) => {
                    if (rows === undefined) {
                        return resolve([]);
                    }

                    const items: OwnReturnType[] = [];

                    for (const row of rows as mysql2.RowDataPacket[]) {
                        items.push(row as OwnReturnType);
                    }

                    resolve(items);
                })
                .catch(error => {
                    reject(error);
                });
            }
        );
    }

    protected async baseAdd(data: IServiceData, options: AdapterOptions): Promise<ReturnModel>{
        const tableName = this.tableName();

        return new Promise<ReturnModel>((resolve, reject) =>{
            const properties = Object.getOwnPropertyNames(data);
            const sqlPairs = properties.map(property => "`" + property + "` = ?").join(", ");
            const values = properties.map(property => data[property]);

            const sql: string = "INSERT `" + tableName + "` SET" + sqlPairs + ";";

            this.db.execute(sql, values)
                .then(async result =>{
                    const info:any = result;

                    const newItemId = +(info[0]?.insertId);

                    const newCategory: ReturnModel|null = await this.getById(newItemId, options);
                    if(newCategory === null){
                       return reject({
                            message: 'Could not add new item into table '+ tableName
                        });
                    }
                    resolve(newCategory);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    protected async baseEdit(id: number, data: IServiceData, options: AdapterOptions): Promise<ReturnModel>{
        const tableName = this.tableName();

        return new Promise((resolve, reject) => {
            const properties = Object.getOwnPropertyNames(data);

            if(properties.length === 0){
                return reject({ message: "There are no updates",});
            }

            const sqlPairs = properties.map(property => "`" + property + "` = ?").join(", ");
            const values = properties.map(property => data[property]);
            values.push(id);

            const sql: string = "UPDATE `" + tableName + "` SET" + sqlPairs + " WHERE `" + tableName + "_id` = ?;";

            this.db.execute(sql, values)
                .then(async result =>{
                    const info:any = result;
                    
                    if(info[0]?.affectedRows === 0){
                        return reject({message: "Couldn't change items in table " + tableName});
                    }

                    const item: ReturnModel|null = await this.getById(id, options);

                    if(item === null){
                       return reject({
                            message: 'Could not add new item into table '+ tableName
                        });
                    }
                    resolve(item);
                })
                .catch(error => {
                    reject(error);
                });
        });    
    }
}