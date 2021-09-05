// ####################################################################################################
// ## IMPORTS
// ####################################################################################################
import colors from 'colors';
import cors from 'cors';
import express, { Application } from 'express';
import i18n from "i18n";

import { routes } from '../routes';

// ####################################################################################################
// ## CLASS APP
// ####################################################################################################
export class App {
    // ************************************************************************************************
    // ** ATTRIBUTES
    // ************************************************************************************************
    private app         : Application;
    private host        : string | number;
    private port        : string | number;
    private apiVersion  : string | number;
    private env         : boolean;

    // ************************************************************************************************
    // ** CONSTRUCTOR
    // ************************************************************************************************
    constructor() {
        this.app        = express();
        this.host       = process.env.APP_HOST;
        this.port       = process.env.APP_PORT;
        this.apiVersion = this.getAPIVersion();

        this.initializeLangs();
        this.initializeMiddleWares();
        this.initializeRoutes();
        this.startApp();
    }

    // ************************************************************************************************
    // ** METHODS
    // ************************************************************************************************
    /**
     * Toma o número de versión a partir da versión definida no ficheiro json
     */
    public getAPIVersion():string {
        let apiFullVersion = process.env.npm_package_version.split(".");
        let apiPrefix = process.env.API_PREFIX;

        let result = `${apiPrefix}${apiFullVersion[0]}`;

        return result;
    }

    /**
     * Inicializa os idiomas
     */
    public initializeLangs(): void {
        i18n.configure(
            {
                locales:['en','es', 'gl'],
                defaultLocale: 'gl',
                register: global,
                directory: __dirname + '/../../locales'
            }
        );
    }

    /**
     * Inicializa os middlewares
     */
    public initializeMiddleWares(): void {
        this.app.use(cors());
        this.app.use(i18n.init);
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    /**
     * Inicializa as rutas
     */
    public initializeRoutes(): void {
        this.app.use(`/api/${this.apiVersion}`, routes());
    }

    /**
     * Arranca a aplicación
     */
    public startApp(): void {
        this.app.listen(this.port, () => {
            console.log(colors.bgBlue(`Aplicación levantada en: ${this.host}:${this.port}/api/${this.apiVersion}/`));
        });
    }

    /**
     * Devolve a instancia desta clase
     *
     * @returns unha instancia desta clase
     */
    public getApp(): Application {
        return this.app;
    }
}
