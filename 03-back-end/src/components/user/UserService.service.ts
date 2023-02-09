import BaseService from "../../common/BaseService";
import UserModel from './UserModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddUser from './dto/IAddUser.dto';
import IeditUser from './dto/IEditUser.dto';
import IEditUser from './dto/IEditUser.dto';

class UserAdapterOptions implements IAdapterOptions{

}


export default class UserService extends BaseService<UserModel,UserAdapterOptions> {

    tableName(): string {
        return "user";
    }

    protected async adaptToModel(data: any, options: UserAdapterOptions = {}): Promise<UserModel>{
        const user: UserModel = new UserModel();

        user.userId = +data?.user_id;
        user.username = data?.username;
        user.passwordHash = data?.password_hash;
        user.role = data?.role;
        user.isActive = +data?.is_active === 1;
        
        return user;
    }

    public async add(data: IAddUser): Promise<UserModel>{
        return this.baseAdd(data, {});
    }

    public async edit(id: number, data: IEditUser): Promise<UserModel> {
        return this.baseEdit(id,data, {
            
            removePassword: true,
        });
    }
}