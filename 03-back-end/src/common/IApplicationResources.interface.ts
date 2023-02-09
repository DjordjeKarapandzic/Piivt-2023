import * as mysql2 from "mysql2/promise";
import CategoryService from '../components/category/CategoryService.service';
import UserService from '../components/user/UserService.service';

export interface IServices {
    category: CategoryService;
    //ostali servisi
    user: UserService;
}

export default interface IApplicationResources {
    databaseConnection: mysql2.Connection;
    services: IServices;
}