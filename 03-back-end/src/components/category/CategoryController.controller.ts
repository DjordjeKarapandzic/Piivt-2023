import { Request, Response, response } from 'express';
import { AddCategoryValidator } from './dto/IAddCategory.dto';
import IAddCategory from './dto/IAddCategory.dto';
import BaseController from '../../common/BaseController';
import { EditCategoryValidator, IEditCategoryDto } from './dto/IEditCategory.dto';

class  CategoryController extends BaseController{
    
    
    async getAll(req: Request, res: Response){
        this.services.category.getAll(null)
            .then(result => {
                res.send(result);
            })
            .catch(error =>{
                res.status(500).send(error?.message);
            });
    }

    async getById(req: Request, res: Response){
        const id: number = +req.params?.id;

        this.services.category.getById(id,null)
            .then(result => {
                if(result === null){
                    return res.sendStatus(404);
                }

                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
            
    }

    async add(req: Request, res: Response){
        const data = req.body as IAddCategory;

        //TODO: Validacija
        if (!AddCategoryValidator(data)){
            return res.status(400).send(AddCategoryValidator.errors);
        }

        this.services.category.add(data)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(400).send(error?.message);
        });
    }

    async edit(req: Request, res: Response){
        const id: number = +req.params?.cid;
        const data = req.body as IEditCategoryDto;

        if (!EditCategoryValidator(data)){
            return res.status(400).send(AddCategoryValidator.errors);
        }

        this.services.category.getById(id,null)
            .then(result => {
                if(result === null){
                    return res.sendStatus(404);
                }

                this.services.category.editById(id,{
                    name: data.name
                })
                .then(result => {
                    res.send(result);
                })
                .catch(error => {
                    res.status(400).send(error?.message);
                })
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
    }

    async getAllItemsByCategoryId(req: Request, res: Response){
        const categoryId: number = +req.params?.cid;

        this.services.category.getById(categoryId,null)
        .then(result => {
            if(result === null){
                return res.status(404).send("Category not found.");
            }

            this.services.item.getAllByCategoryId(categoryId,{
                loadCategory: false,
            })
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async getItemById(req:Request, res:Response){
        const categoryId: number = +req.params?.cid;
        const itemId: number = +req.params?.iid;

        this.services.category.getById(categoryId,null)
        .then(result => {
            if(result === null){
                return res.status(404).send("Category not found.");
            }

            this.services.item.getById(itemId,{
                loadCategory: true,
            })
            .then(result => {
                if(result === null){
                    return res.status(404).send("Item not found.");
                }

                if (result.categoryId !== categoryId) {
                    return res.status(404).send("Item does not belong to this category.");
                }
                
                res.send(result);
            })
            .catch(error => {
                res.status(500).send(error?.message);
            });
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });

    }
}

export default CategoryController;