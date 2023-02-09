import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import UserController from './UserController.controller';

class UserRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        const userController: UserController = new UserController(resources.services);

        application.get("/api/user", userController.getAll.bind(userController));
        application.get("/api/user/:id", userController.getById.bind(userController));
        application.post("/api/user", userController.add.bind(userController));
        application.put("/api/user/:uid", userController.editById.bind(userController));

    }

}

export default UserRouter;