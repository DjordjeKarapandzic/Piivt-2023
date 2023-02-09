import IConfig from "./common/IConfig.interface";
import CategoryRouter from './components/category/CategoryRouter.router';
import UserRouter from './components/user/UserRouter.router';

const DevConfig: IConfig = {
    server: {
        port: 10000,
        static: {
            index: false,
            dotfiles: "deny",
            cacheControl: true,
            etag: true,
            maxAge: 1000 * 60 * 60 * 24, //one day
            path: "./static",
            route: "/assets"
        }
    },
    logging: {
        path: "./logs",
        format: ":date[iso]\t:remote-addr\t:method\t:url\t:status\t:res[content-lenght]\t:response-time ms",
        filename: "access.log"
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "aplikacija",
        password: "aplikacija",
        database: "piivt_app",
        charset: "utf8mb4",
        timezone: "+01:00",
    },
    routers:[
        new CategoryRouter(),
        new UserRouter(),
    ]

};

export { DevConfig };