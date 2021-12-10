// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import HttpStatus from 'http-status-codes';
import superagent from 'superagent';
import { Operation } from 'fast-json-patch';

import { DBConnection } from '../../config/config-db';
import { APIFilter } from '../../helpers/uri-filter.helper';
import { ResponseData, ResultQuery } from '../../interfaces/response-data.interface';

// ##################################################################################################
// ## CLASE BaseService
// ##################################################################################################
export abstract class BaseModelService<T> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected respository : any;
  protected entityName  : any;
  protected includes    : string[] = [];

  protected db          : DBConnection;
  protected uri         : string;
  protected endpoint    : string;

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor(entityName, endpoint) {
    this.entityName = entityName;
    this.endpoint = endpoint;

    this.createDbConnection();
  }

  // ************************************************************************************************
  // ** MÉTODOS CONEXIÓN BD
  // ************************************************************************************************
  private async createDbConnection() {
    this.db = new DBConnection();
    this.uri = `${this.db.getConnectionString()}${this.endpoint}`;

    await this.db.init();
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (CREACIÓN)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- POST
  // ------------------------------------------------------------------------------------------------
  public async create(obj: any): Promise<ResponseData> {
    let result: ResultQuery = {
      response  : null,
    };

    let uri = `${this.uri}`;
    let queryResult = null;

    try {
      queryResult = await superagent.post(uri).send(obj);
    } catch (error) {
      queryResult = error.response;
    }

    result.response = queryResult.body;

    return this.processResponse(result, 'CREATE');
  }

  public async createList(objs: any[]): Promise<ResponseData> {
    let result: ResultQuery = {
      response  : null,
      from  : 0,
      limit : 0,
    };

    let uri = `${this.uri}/Multiple`;
    let queryResult = null;

    try {
      queryResult = await superagent.post(uri).send(objs);
    } catch (error) {
      result = null;
    }

    result.response = queryResult.body;

    return this.processResponse(result, 'CREATE_LIST');
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (READ)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- GET
  // ------------------------------------------------------------------------------------------------
  public async getAll(
    filters?  : string,
    limit     : number = 0,
    offset    : number = 0
  ): Promise<ResponseData> {
    let result: ResultQuery = {
      response  : null,
      from  : offset,
      limit : limit,
    };

    let uri = `${this.uri}`;
    let queryResult = null;

    if (filters) {
      uri += `?${filters}`;
    }

    try {
      queryResult = await superagent.get(uri)// as ResponseData;
    } catch (error) {
      queryResult = error.response;
    }

    result.response = queryResult.body;

    return this.processResponse(result, 'GET_LIST');
  }

  public async get(id: string): Promise<ResponseData> {
    let result: ResultQuery = {
      id        : id,
      response  : null,
    };

    let uri = `${this.uri}/${id}`;
    let queryResult = null;

    try {
      queryResult = await superagent.get(uri);
    } catch (error) {
      queryResult = error.response;
    }

    result.response = queryResult.body;

    return this.processResponse(result, 'GET');
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (UPDATE)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- PUT
  // ------------------------------------------------------------------------------------------------
  public async update(id: string, obj: any): Promise<ResponseData> {
    let result: ResultQuery = {
      id        : id,
      response  : null,
    };

    let uri = `${this.uri}/${id}`;
    let queryResult = null;

    try {
      queryResult = await superagent.put(uri).send(obj);
    } catch (error) {
      queryResult = error.response;
    }

    result.response = queryResult.body;

    return this.processResponse(result, 'UPDATE');
  }

  // ------------------------------------------------------------------------------------------------
  // -- PATCH
  // ------------------------------------------------------------------------------------------------
  public async modify(id: string, objPatch: Operation[]): Promise<ResponseData> {
    let result: ResultQuery = {
      id        : id,
      response  : null,
    };

    let uri = `${this.uri}/${id}`;
    let queryResult = null;

    try {
      queryResult = await superagent.patch(uri).send(objPatch);
    } catch (error) {
      queryResult = error.response;
    }

    result.response = queryResult.body;

    return this.processResponse(result, 'UPDATE');
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (DELETE)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- DELETE
  // ------------------------------------------------------------------------------------------------
  public async delete(id: string): Promise<ResponseData> {
    let result: ResultQuery = {
      id        : id,
      response  : null,
    };

    let uri = `${this.uri}/${id}`;
    let queryResult = null;

    try {
      queryResult = await superagent.delete(uri);
    } catch (error) {
      queryResult = error.response;
    }

    result.response = queryResult.body;

    return this.processResponse(result, 'DELETE');
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
  /**
   * Procesa a resposta HTTP da conexión coa BD.
   *
   * @param response resposta do método HTTP
   * @param method metótodo para o cal procesar a resposta
   * @returns ResponseData
   */
  protected processResponse(response: ResultQuery, method: string): ResponseData {
    method = method.toUpperCase();

    let code = response.response.code;
    let data = (response.response.data)
      ? response.response.data
      : { id : response.id };
    let message;
    let error = `ERROR.${method}`;
    let isPlural = method.includes('LIST');

    if (response) {
      switch (code) {
        case HttpStatus.CREATED:
        case HttpStatus.OK:
          error = undefined;
          message = `SUCCESS.${method}`;
          break;
        case HttpStatus.BAD_REQUEST:
          error = 'ERROR.BAD_REQUEST';
          break;
        case HttpStatus.CONFLICT:
          error = 'ERROR.CONFLICT';

          if (method.includes('CREATE')) {
            error = (isPlural)
              ? 'ERROR.ALREADY_EXIST_LIST'
              : 'ERROR.ALREADY_EXIST';
          }
          break;
        case HttpStatus.NOT_FOUND:
          error = (isPlural)
            ? 'ERROR.NOT_FOUND_LIST'
            : 'ERROR.NOT_FOUND';
          break;
      }
    }

    const responseData: ResponseData = {
      code,
      data,
      message,
      error,
    };

    if (isPlural) {
      responseData.total = (data && data.length)
        ? data.length
        : 0;
      responseData.from = response.from;
      responseData.limit = response.limit;
    }

    return responseData;
  }
}
