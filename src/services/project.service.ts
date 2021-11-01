// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import HttpStatus from 'http-status-codes';
import got from 'got';
import { Operation } from 'fast-json-patch';
import * as jsonpatch from 'fast-json-patch';

import { DBConnection } from '../config/config-db';
import { Project } from '../models/project.model';

// ####################################################################################################
// ## CLASE ProjectService
// ####################################################################################################
export class ProjectService {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  private db        : DBConnection;
  private uri       : string;
  private endpoint  : string = 'projects';

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
    this.uri = `${this.db.getConnectionString()}/${this.endpoint}`;

    await this.db.init();
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (CREACIÓN)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- POST
  // ------------------------------------------------------------------------------------------------
  public async create(project: Project): Promise<any> {
    let result : any = HttpStatus.CONFLICT;

    try {
    } catch (error) {
      result = null;
    }
    return result;
  }

  public async createList(projects: Project[]): Promise<any> {
    let result : any = HttpStatus.CONFLICT;

    try {
    } catch (error) {
      result = null;
    }

    return result;
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (READ)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- GET
  // ------------------------------------------------------------------------------------------------
  public async getAll(filters?: any): Promise<any> {
    let result : any = HttpStatus.NOT_FOUND;

    let uri = `${this.uri}`;

    if (filters) {
      uri += `?${filters}`;
    }

    try {
      console.log('uri :>> ', uri);
      result = await got(uri);
      console.log('result :>> ', result);
    } catch (error) {
      result = error.response.body;
    }

    return result;
  }

  public async get(id: string, filters?: any): Promise<any> {
    let result : any = HttpStatus.NOT_FOUND;

    try {
    } catch (error) {
      result = null;
    }

    return result;
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (UPDATE)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- PUT
  // ------------------------------------------------------------------------------------------------
  public async update(id: string, project: Project): Promise<any> {
    let result : any = HttpStatus.NOT_FOUND;

    try {
    } catch (error) {
      result = null;
    }

    return result;
  }

  // ------------------------------------------------------------------------------------------------
  // -- PATCH
  // ------------------------------------------------------------------------------------------------
  public async modify(id: string, objPatch: Operation[]): Promise<any> {
    let result : any = HttpStatus.NOT_FOUND;

    try {
    } catch (error) {
      result = null;
    }

    return result;
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (DELETE)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- DELETE
  // ------------------------------------------------------------------------------------------------
  public async delete(id: string): Promise<any> {
    let result : any = HttpStatus.NOT_FOUND;

    try {
    } catch (error) {
      result = null;
    }

    return result;
  }
}
