import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";

const ajv = new Ajv();

export interface IAddItemDto {
    name: string;
    content: string;
    quantity: number;
    price: number;    
}

export default interface IAddItem extends IServiceData {
    name: string;
    category_id: number;
    content: string;
    price: number;  
}

const AddItemValidator = ajv.compile({
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 8,
            maxLength: 128,
        },
        content: {
            type: "string",
            minLength: 8,
            maxLength: 128,
            },
        price: {
            type: "number",
        },
        },
    required: [
        "name",
        "content",
        "price",
    ],
    additionalProperties: false,
});

export { AddItemValidator };
