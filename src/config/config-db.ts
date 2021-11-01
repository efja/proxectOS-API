import { ApiPersistenceService } from '../services/api-persistence.service';
import HttpStatus from 'http-status-codes';
// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################

// ####################################################################################################
// ## CONSTANTES
// ####################################################################################################
const {
  PERSISTENCE_API_HOST,
  PERSISTENCE_API_PORT,
  PERSISTENCE_API_ROUTE,
  PERSISTENCE_API_LOGIN_ROUTE,

  PERSISTENCE_API_LOGIN,
  PERSISTENCE_API_PASS,
} = process.env;

// ####################################################################################################
// ## CLASE Priority
// ####################################################################################################
export class DBConnection {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected host          : string;
  protected port          : number;
  protected route         : string;

  protected user          : string;
  protected password      : string;
  protected clientUri     : string;

  protected token         : string = null;

  protected apiDbService  : ApiPersistenceService = new ApiPersistenceService();

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    this.setOptionsFromEnv();
  }

  // ************************************************************************************************
  // ** GETTERS
  // ************************************************************************************************

  /**
   * Devolve a cadea de conexión coa API de persistencia.
   *
   * @returns string
   */
  public getConnectionString(
  ) {
    return this.clientUri;
  }

  /**
   * Devolve a cadea de conexión para facer login coa API de persistencia.
   *
   * @returns string
   */
  public getLoginString() {
    // return `${this.clientUri}/${PERSISTENCE_API_LOGIN_ROUTE}`;
    return `${this.clientUri}`;
  }

  // ************************************************************************************************
  // ** MÉTODOS CONFIGURACIÓN
  // ************************************************************************************************
  /**
   * Establece a configuración da BD cos parámetros do entorno de execución.
   */
  public setOptionsFromEnv() {
    this.setOptions(PERSISTENCE_API_HOST, PERSISTENCE_API_PORT, PERSISTENCE_API_ROUTE, PERSISTENCE_API_LOGIN, PERSISTENCE_API_PASS);
  }

  /**
   * Establece a configuración da BD con parámetros personalizados.
   *
   * @param dbms Sistema Xestor de Base de Datos (siglas en inglés)
   * @param host Máquina do DBMS
   * @param port Porto do servicio do DBMS
   * @param dbName Nome da BD
   * @param user Usuario de conexión
   * @param password Contrasinal
   */
  public setOptions(
    host      : string,
    port      : string,
    route     : string,

    user      : string,
    password  : string
  ) {
    this.host       = host;
    this.port       = Number(port);
    this.route      = route;
    this.user       = user;
    this.password   = password;
    this.clientUri  = `${this.host}:${this.port}/${this.route}`;
  }

  // ************************************************************************************************
  // ** MÉTODOS DE INICIO E PARADA
  // ************************************************************************************************
  /**
   * Inicia os parámetros da conexión coa API de persistencia.
   *
   * @returns Promise<boolean>
   */
  public async init() {
    let result = await this.apiDbService.login(this.getLoginString());

    // this.token = result.body.token; // TODO: xestionar login na api de persistencia
    this.token = result.body;

    return (result.statusCode != undefined && result.statusCode != null)
      ? result.statusCode
      : result;
  }

  /**
   * Inicia a conexión coa API de persistencia e devolve un string cá cadea de conexión.
   *
   * @returns Promise<string>
   */
  public async startInfo(): Promise<string> {
    let result = null;

    try {
      result = await this.init();

      if (result == HttpStatus.OK && this.token != null) {
        return `Conexión á BD correcta. Cadea de conexión <${this.getConnectionString()}>`;
      } else {
        throw new Error(`Erro ó conectar coa BD. Cadea de conexión <${this.getConnectionString()}>`);
      }
    } catch (error) {
      result = new Error(`Erro ó iniciar a BD. Cadea de conexión <${this.getConnectionString()}>`);
      result.stack = error;

      throw result;
    }
  }

  /**
   * Remata a conexión coa API de persistencia.
   */
  public async close() {
    let result = await this.apiDbService.logout(this.getConnectionString());

    return (result.statusCode != undefined && result.statusCode != null)
      ? result.statusCode
      : result;
  }

  // ************************************************************************************************
  // ** MÉTODOS CONEXIÓN Á BD
  // ************************************************************************************************
  /**
   * Remata a conexión coa API de persistencia.
   */
  public async checkConnection() {
    let result = false;

    return result;
  }
}
