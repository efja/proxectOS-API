// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import HttpStatus from 'http-status-codes';
import superagent from 'superagent';

import { DBConnection } from '../../config/config-db';
import { getExternalResource, getStatusCode } from '../../helpers/resquest.helper';
import { ResponseCommons, ResponseData, ResponseUserCommons, ResultQuery } from '../../interfaces/response-data.interface';

// ##################################################################################################
// ## CLASE CommonsModelService
// ##################################################################################################
export class CommonsModelService {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected respository : any;

  protected db          : DBConnection;
  protected uri         : string;

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {

    this.createDbConnection();
  }

  // ************************************************************************************************
  // ** MÉTODOS CONEXIÓN BD
  // ************************************************************************************************
  private async createDbConnection() {
    this.db = new DBConnection();
    this.uri = `${this.db.getConnectionString()}`;

    await this.db.init();
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (READ)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- GET
  // ------------------------------------------------------------------------------------------------
  public async getCommons(): Promise<ResponseCommons> {
    const responseCommons: ResponseCommons = {
      code        : null,
      priorities  : await getExternalResource(`${this.uri}/priorities`),
      stages      : await getExternalResource(`${this.uri}/stages`),
      states      : await getExternalResource(`${this.uri}/states`),
      types       : await getExternalResource(`${this.uri}/types`),
      userCommons : await this.getUserCommons(),
    };

    responseCommons.code = getStatusCode(
      [
        responseCommons.priorities,
        responseCommons.stages,
        responseCommons.states,
        responseCommons.types,
        responseCommons.userCommons,
      ]
    );

    return responseCommons;
  }

  /**
   * Obtén os recursos comúns para unha entidade User.
   *
   * @returns ResponseUserCommons
   */
  public async getUserCommons(): Promise<ResponseUserCommons> {
    let responseUserCommons : ResponseUserCommons = {
      code              : null,
      roles             : await getExternalResource(`${this.uri}/roles`),
      userContactTypes  : await getExternalResource(`${this.uri}/userContactTypes`),
      userGroups        : await getExternalResource(`${this.uri}/userGroups`),
      userSchedules     : await getExternalResource(`${this.uri}/userSchedules`),
    }

    responseUserCommons.code = getStatusCode(
      [
        responseUserCommons.roles,
        responseUserCommons.userContactTypes,
        responseUserCommons.userGroups,
        responseUserCommons.userSchedules,
      ]
    );

    return responseUserCommons;
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
