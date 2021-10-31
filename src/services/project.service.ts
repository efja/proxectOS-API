// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import HttpStatus from 'http-status-codes';
import { Operation } from 'fast-json-patch';
import * as jsonpatch from 'fast-json-patch';

import { DBConnection } from '../config/config-db';
import { Project } from '../models/project.model';
import { getEntityForUpdate } from '../helpers/entity-construct.helper';

// ####################################################################################################
// ## CLASE ProjectService
// ####################################################################################################
export class ProjectService {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  private db          : DBConnection;
  private respository : any;

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
  public async getAll(
    filters?: any,
    order?: any,
    limit: number = 0,
    offset: number = 0
  ): Promise<any> {
    let result : any = HttpStatus.NOT_FOUND;

    try {
    } catch (error) {
      result = null;
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
