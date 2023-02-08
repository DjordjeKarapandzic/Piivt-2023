import IRouter from './IRouter.interface';
export default interface IConfig{
    server: {
        port: number;
        static: {
            index: string|false;
            dotfiles: "allow"|"deny";
            cacheControl: boolean;
            etag: boolean;
            maxAge: number;
            route: string;
            path: string;
        }
    },
    logging: {
        path:string;
        filename: string;
        format: string;
    },
    database:{
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
        charset: 'utf8mb4' | 'utf8' | 'ascii',
        timezone: string,
    },
    routers: IRouter[],
}