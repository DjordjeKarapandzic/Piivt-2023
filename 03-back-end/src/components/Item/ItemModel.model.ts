import IModel from '../../common/IModel.interface';
import CategoryModel from '../category/CategoryModel.model';


export default class ItemModel implements IModel{
    itemId: number;
    name: string;
    content: string;
    quantity: number; 
    price: number; 
    categoryId: number;

    category?: CategoryModel = null;
}