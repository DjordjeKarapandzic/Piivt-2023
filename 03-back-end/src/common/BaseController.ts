import { IServices } from "./IApplicationResources.interface";

export default abstract class BaseController {
    private serviceInstances: IServices;

    constructor(service: IServices){
        this.serviceInstances = service;
    }

    protected get services(): IServices{
        return this.serviceInstances;
    }
}