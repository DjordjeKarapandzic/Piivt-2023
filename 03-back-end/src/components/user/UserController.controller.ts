import { Request, Response } from "express";
import BaseController from "../../common/BaseController";
import UserModel from './UserModel.model';
import { AddUserValidator, IAddUserDto } from './dto/IAddUser.dto';
import * as bcrypt from "bcrypt";
import { EditUserValidator, IEditUserDto } from "./dto/IEditUser.dto";
import IEditUser from './dto/IEditUser.dto';

export default class UserController extends BaseController{
    getAll(req: Request, res: Response){
        this.services.user.getAll({})
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async getById(req: Request, res: Response){
        const id: number = +req.params?.id;

        const user: UserModel|null = await this.services.user.getById(id,{});

        if(user === null)
            res.status(404).send("User not found.");
        
        res.send(user);
    }

    add(req: Request, res: Response){
        const body = req.body as IAddUserDto;

        if(!AddUserValidator(body)){
            res.status(400).send(AddUserValidator.errors);
        }

        const passwordHash = bcrypt.hashSync(body.password,10);


        this.services.user.add({
            username: body.username,
            password_hash: passwordHash,
        })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    editById(req: Request, res:Response){
        const id: number = +req.params?.uid;
        const data = req.body as IEditUserDto;

        if (!EditUserValidator(data)) {
            res.status(400).send(EditUserValidator.errors);
        }

        
        const serviceData: IEditUser = {
        };

        if (data.password !== undefined) {
            const passwordHash = bcrypt.hashSync(data.password,10);
            serviceData.password_hash = passwordHash;
        }

        if(data.isActive !== undefined) {
            serviceData.is_active = data.isActive ? 1 : 0;
        }


        this.services.user.edit(id, serviceData)
        .then(result => {
            res.send(result);

        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }
}