/* eslint-disable @typescript-eslint/no-explicit-any */
// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import HttpStatus from 'http-status-codes';
import { Operation } from 'fast-json-patch';
import { req, res, next } from 'express';
import cleanDeep from 'clean-deep';

import { ResponseData, ResponseMe } from '../../interfaces/response-data.interface';
import { APIFilter } from '../../helpers/uri-filter.helper';

import { CommentAppService } from '../../services/models/commentapp.service';
import { ProjectService } from '../../services/models/project.service';
import { RepositoryAppService } from '../../services/models/repositoryapp.service';
import { RequirementService } from '../../services/models/requirement.service';
import { ResourceService } from '../../services/models/resource.service';
import { UserService } from '../../services/models/user.service';
import { BaseController } from '../base.controller';
import { AssignedUserService } from '../../services/models/assigned-user.service';
import { AssignedUserCollections } from '../../interfaces/assigned-user-collections.interface';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL: string = 'CURRENT_USER';

// ####################################################################################################
// ## CLASE CurrentUserController
// ####################################################################################################
export class CurrentUserController extends BaseController {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL: string = TRANSLATION_NAME_MODEL;
  protected serviceName: any;
  protected service: any;

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor(
    private assignedUserService = new AssignedUserService,
    private commentAppService = new CommentAppService,
    private projectService = new ProjectService,
    private repositoryAppService = new RepositoryAppService,
    private requirementService = new RequirementService,
    private resourceService = new ResourceService,
    private userService = new UserService,
  ) {
    super();
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (CREACIÓN)
  // ************************************************************************************************
  /**
   * Crea un novo proxecto. (POST)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public create = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let response;

      const responseData: ResponseData = this.processResponse(req, response, 'CREATE');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Crea os proxectos dunha dunha lista pasada. (POST)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public createList = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let response;

      const responseData: ResponseData = this.processResponse(req, response, 'CREATE_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (READ)
  // ************************************************************************************************
  /**
   * Recupera toda a información relacionada co usuario actual. (GET)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public getMe = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const {
        orderBy,
        limit,
        offset,
        ...query
      } = req.query

      const fakeUserId = "616b4dbb9f7ee9e407c28a1b"; // TODO: quitar cando se implemente o login
      let id = fakeUserId; // TODO: quitar cando se implemente o login

      const queryParams = new APIFilter(query);

      const queryAsisgnedUsers = new APIFilter();
      queryAsisgnedUsers.copy(queryParams, ["includes"]);
      queryAsisgnedUsers.objectIdFilters = [
        { assignedUser: id },
      ];

      if (id && id != "") {
        const responseMe: ResponseMe = {
          code: HttpStatus.OK,
          _me: await this.userService.get(id, queryParams.getQueryString()),
          asisgnedUsers: await this.assignedUserService.getAll(queryAsisgnedUsers.getQueryString()),
          comments: null,
          projects: null,
          commons: null,
        }

        let assignedUserCollections: AssignedUserCollections = this.getItemsAsisgnedUsers(responseMe.asisgnedUsers.data);

        const queryComments = new APIFilter();
        queryComments.copy(queryParams, ["includes"]);
        queryComments.arrayFilters = [
          { visibleToUserGroups: assignedUserCollections.assignedUserGroups },
          { special: [{ createdBy: id }] },
        ];

        const queryProjects = new APIFilter();
        queryProjects.copy(queryParams, ["includes"]);
        queryProjects.arrayFilters = [
          { assignedUsers: assignedUserCollections.assignedUsers },
          { special: [{ productOwner: id }] },
        ];

        responseMe.comments = await this.commentAppService.getAll(queryComments.getQueryString(), limit, offset);
        responseMe.projects = await this.projectService.getAll(queryProjects.getQueryString(), limit, offset);

        // const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

        res.status(responseMe.code).json(responseMe);
      } else {
        const response: ResponseData = {
          code: HttpStatus.BAD_REQUEST,
          data: null,
        }

        const responseData: ResponseData = this.processResponse(req, response, 'BAD_REQUEST');
        res.status(responseData.code).json(responseData);
      }

    } catch (error) {
      next(error);
    }
  }

  /**
   * Recupera tódolos proxectos. (GET)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public getAll = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const {
        orderBy,
        limit,
        offset,
        ...query
      } = req.query

      const queryParams = new APIFilter(query);

      let response = await this.service.getAll(queryParams.getQueryString(), orderBy, limit, offset);

      const responseData: ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Recupera un proxecto en concreto. (GET)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public get = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const queryParams = new APIFilter(req.query);

      let response = await this.service.get(id, queryParams.getQueryString());

      const responseData: ResponseData = this.processResponse(req, response, 'GET');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  // ************************************************************************************************
  // ** MÉTODOS CRUD (UPDATE)
  // ************************************************************************************************
  /**
   * Actualiza un proxecto. (PUT)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public update = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;

      let response;

      const responseData: ResponseData = this.processResponse(req, response, 'UPDATE');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Actualiza un proxecto. (PATCH)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public modify = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      const tempPatch: Operation[] = req.body;
      let objPatch: Operation[] = [];

      let response;

      if (tempPatch.length > 0) {
        // Quitanse as modficacións de ids.
        objPatch = tempPatch.filter(op => !op.path.includes("id"));
      }

      if (objPatch.length > 0) {
        response = await this.service.modify(id, objPatch);
      }

      const responseData: ResponseData = this.processResponse(req, response, 'UPDATE');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  // ************************************************************************************************
  // ** MÉTODOS CRUD (DELETE)
  // ************************************************************************************************
  /**
   * Elimina un proxecto concreto. (DELETE)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public delete = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;

      let response = await this.service.delete(id);

      const responseData: ResponseData = this.processResponse(req, response, 'DELETE');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  };

  //
  private getItemsAsisgnedUsers(data): AssignedUserCollections {
    let result: AssignedUserCollections = {
      assignedRoles: [],
      assignedUsers: data.map((obj) => obj.id),
      assignedUserGroups: [],
    };

    // Buscanse os valores
    let assignedRoles = data.map((obj) => obj.assignedRoles)
    let assignedUserGroups = data.map((obj) => obj.assignedUserGroups);

    // Limplianse os valores nulos, en caso de habelos
    assignedRoles = cleanDeep(assignedRoles);
    assignedUserGroups = cleanDeep(assignedUserGroups);

    // Agrupanse tódolos arrays nun só (o que se vai a devolver)
    assignedRoles.forEach(element => {
      result.assignedRoles.push(...element)
    });
    assignedUserGroups.forEach(element => {
      result.assignedUserGroups.push(...element)
    });

    return result;
  }
}
