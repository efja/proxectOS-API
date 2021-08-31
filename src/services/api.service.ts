// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import express, { Application } from 'express';
import cors from 'cors';
import routes from '../routes';
import colors from 'colors';
import i18n from "i18n";

// ####################################################################################################
// ## CLASE APP
// ####################################################################################################
class App {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    public app: Application;
    public host: string | number;
    public port: string | number;
    public api_version: string | number;
    public env: boolean;

    // ************************************************************************************************
    // ** CONTRUCTOR
    // ************************************************************************************************
    constructor() {
        this.app = express();
        this.host = process.env.APP_HOST;
        this.port = process.env.APP_PORT;
        this.api_version = this.getAPIVersion();

        this.initializeLangs();
        this.initializeMiddleWares();
        this.initializeRoutes();
        this.startApp();
    }

    // ************************************************************************************************
    // ** MÉTODOS
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
        this.app.use(`/api/${this.api_version}`, routes());
    }

    /**
     * Arranca a aplicación
     */
    public startApp(): void {
        this.app.listen(this.port, () => {
            console.log(colors.bgBlue(`Aplicación levantada en: ${this.host}:${this.port}/api/${this.api_version}/`));
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

// ####################################################################################################
// ## EXPORTACIÓNS
// ####################################################################################################
export default App;
