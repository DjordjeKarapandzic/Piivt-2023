import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export default interface IAddUser extends IServiceData {
    username: string;
    password_hash: string;
}

export interface IAddUserDto {
    username: string;
    password: string;
}

const AddUserSchema = {
    type: "object",
    properties: {
        username: {
            type: "string",
            pattern: "^[a-z\-]{5,64}$",
        },
        password:{
            type: "string",
            pattern: "^([A-Z]*?[a-z]*?[0-9]*?.*?){6,}$",
        }
    },
    required: [
        "username",
        "password"
    ],
    additionalProperties: false,
};

const AddUserValidator = ajv.compile(AddUserSchema);

export { AddUserValidator };