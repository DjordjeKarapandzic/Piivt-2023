import BaseService from "../../common/BaseService"
import ItemModel from './ItemModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import CategoryModel from "../category/CategoryModel.model";
import IAddItem from './dto/IAddItem.dto';

export interface IItemAdapterOptions extends IAdapterOptions{
    loadCategory: boolean;
}


export const DefaultItemAdapterOptions: IItemAdapterOptions = {
    loadCategory: false,
}

export default class ItemService extends BaseService<ItemModel, IItemAdapterOptions>{
    tableName(): string {
        return "item";
    }
    protected adaptToModel(data: any, options: IItemAdapterOptions): Promise<ItemModel> {
           return new Promise( async (resolve) => {
                const item = new ItemModel();

                item.itemId = +data?.item_id;
                item.name = data?.name;
                item.content =  data?.content;
                item.quantity = data?.quantity; 
                item.price =  data?.price;
                item.categoryId  = +data?.category_id;

                if(options.loadCategory){
                    item.category = await this.services.category.getById(item.categoryId, null);
                }

                resolve(item);
        }); 
    }


    async getAllByCategoryId(categoryId: number, options: IItemAdapterOptions){
        return this.getAllByFieldNameAndValue("category_id", categoryId, options);
    }


    async add(data: IAddItem): Promise<ItemModel>{
        return this.baseAdd(data, {
            loadCategory:false,
        });
    }
}