// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
const {
  PERSISTENCE_API_HOST,
  PERSISTENCE_API_PORT,
  PERSISTENCE_API_ROUTE,

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
  protected host        : string;
  protected port        : number;
  protected route       : string;

  protected user        : string;
  protected password    : string;

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
   * Devolve a cadea de conexión co SXBD.
   *
   * @returns string
   */
  public getConnectionString() {
    return `http://${this.host}:${this.port}/${this.route}`; // TODO: implementar login na api de persistencia
    // return `http://${this.user}:*******@${this.host}:${this.port}/${this.route}`;
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
    this.host     = host;
    this.port     = Number(port);
    this.route    = route;
    this.user     = user;
    this.password = password;

    this.configure();
  }

  /**
   * Incia os parámteros do SXBD segundo os parámetros pasados no construtor.
   */
  public configure(): void {
  }

  // ************************************************************************************************
  // ** MÉTODOS DE INICIO E PARADA
  // ************************************************************************************************
  /**
   * Inicia os parámetros da conexión co SXBD.
   *
   * @returns Promise<boolean>
   */
  public async init(): Promise<DBConnection> {
    return this;
  }

  /**
   * Inicia a conexión co SXBD e devolve un string cá cadea de conexión.
   *
   * @returns Promise<string>
   */
  public async startInfo(): Promise<string> {
    try {
      await this.init();

      if (true) {
        return `Conexión á BD correcta. Cadea de conexión <${this.getConnectionString()}>`;
      } else {
        throw new Error(`Erro ó conectar coa BD. Cadea de conexión <${this.getConnectionString()}>`);
      }
    } catch (error) {
      let result = new Error(`Erro ó iniciar a BD. Cadea de conexión <${this.getConnectionString()}>`);
      result.stack = error;

      throw result;
    }
  }

  /**
   * Remata a conexión co SXBD.
   */
  public async close() {
    return this;
  }

  // ************************************************************************************************
  // ** MÉTODOS CONEXIÓN Á BD
  // ************************************************************************************************
  /**
   * Remata a conexión co SXBD.
   */
  public async checkConnection() {
    let result = false;

    return result;
  }
}
