import CategoryController from './CategoryController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import CategoryService from './CategoryService.service';
import IRouter from '../../common/IRouter.interface';
import ItemController from '../Item/ItemController.controller';

class CategoryRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const categoryController: CategoryController = new CategoryController(resources.services);
        const itemController: ItemController = new ItemController(resources.services);

        application.get("/api/category", categoryController.getAll.bind(categoryController));
        application.get("/api/category/:id", categoryController.getById.bind(categoryController));
        application.put("/api/category/:cid", categoryController.edit.bind(categoryController));
        application.post("/api/category", categoryController.add.bind(categoryController));

        application.get("/api/category/:cid/item", itemController.getAllItemsByCategoryId.bind(itemController));
        application.get("/api/category/:cid/item/:iid", itemController.getItemById.bind(itemController));
        application.get("/api/category/:cid/item", itemController.add.bind(itemController));

    }

}

export default CategoryRouter;