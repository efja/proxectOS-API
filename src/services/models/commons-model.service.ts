// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import HttpStatus from 'http-status-codes';
import superagent from 'superagent';

import { DBConnection } from '../../config/config-db';
import { getStatusCode } from '../../helpers/resquest.helper';
import { ResponseCommons, ResponseData, ResponseUserCommons, ResultQuery } from '../../interfaces/response-data.interface';

// ##################################################################################################
// ## CLASE BaseService
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
      priorities  : await this.getExternalResource('priorities'),
      stages      : await this.getExternalResource('stages'),
      states      : await this.getExternalResource('states'),
      types       : await this.getExternalResource('types'),
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
  private async getUserCommons(): Promise<ResponseUserCommons> {
    let responseUserCommons : ResponseUserCommons = {
      code              : null,
      roles             : await this.getExternalResource('roles'),
      userContactTypes  : await this.getExternalResource('userContactTypes'),
      userGroups        : await this.getExternalResource('userGroups'),
      userSchedules     : await this.getExternalResource('userSchedules'),
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

  /**
   * Helper para obter un recurso externo.
   *
   * @param partiaUri parte final da URI do recurso que se quere consumir
   * @returns ResponseData
   */
  private async getExternalResource(partiaUri): Promise<ResponseData> {
    let result: ResultQuery = {
      response  : null,
    };

    let resultData : ResponseData = {
      code: null,
      data: null,
    }

    let uri = `${this.uri}/${partiaUri}`;
    let queryResult = null;

    try {
      queryResult = (await superagent.get(uri));

      resultData.code = queryResult.body.code;
      resultData.data = queryResult.body.data;
    } catch (error) {
      resultData.code = error.status;
      resultData.data = error.message;
    }

    return resultData;
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
