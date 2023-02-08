import CategoryController from './CategoryController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import CategoryService from './CategoryService.service';
import IRouter from '../../common/IRouter.interface';

class CategoryRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const categoryService: CategoryService = new CategoryService(resources.databaseConnection);
        const categoryController: CategoryController = new CategoryController(categoryService);

        application.get("/api/category", categoryController.getAll.bind(categoryController));
        application.get("/api/category/:id", categoryController.getById.bind(categoryController));
        application.put("/api/category/:cid", categoryController.edit.bind(categoryController));
        application.post("/api/category", categoryController.add.bind(categoryController));
    }

}

export default CategoryRouter;