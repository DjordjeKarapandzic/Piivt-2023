import CategoryModel from "./CategoryModel.model";
import IAddCategory from "./dto/IAddCategory.dto";
import BaseService from "../../common/BaseService";
import IEditCategory from "./dto/IEditCategory.dto";

class CategoryService extends BaseService<CategoryModel,null>{
    tableName(): string {
        return "category";
    }

    protected async adaptToModel(data: any): Promise<CategoryModel>{
        const category: CategoryModel = new CategoryModel();

        category.categoryId = +data?.category_id;
        category.name = data?.name;

        return category;
    }

    public async add(data: IAddCategory): Promise<CategoryModel>{
        return this.baseAdd(data,null);
    }

    public async editById(categoryId: number, data: IEditCategory): Promise<CategoryModel>{
        return this.baseEdit(categoryId,data, null);
    } 
}




export default CategoryService;