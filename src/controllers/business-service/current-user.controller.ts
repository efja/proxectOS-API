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
import { AssignedUserCollections, ProjectCollections } from '../../interfaces/entity-collections.interface';
import { CommonsModelService } from '../../services/models/commons-model.service';

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
    // private commonsModelService = new CommonsModelService,
    private projectService = new ProjectService,
    private repositoryAppService = new RepositoryAppService,
    private requirementService = new RequirementService,
    private userService = new UserService,
  ) {
    super();
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
        limit,
        offset
      } = req.query

      const fakeUserId = "616b4dbb9f7ee9e407c28a1b"; // TODO: quitar cando se implemente o login
      let id = fakeUserId; // TODO: quitar cando se implemente o login

      const queryParams = new APIFilter();
      queryParams.includes = false;

      const queryAsisgnedUsers = new APIFilter();
      queryAsisgnedUsers.copy(queryParams, ["includes"]);
      queryAsisgnedUsers.objectIdFilters = [
        { assignedUser: id },
      ];

      if (id && id != "") {
        // Obtendo datos básicos
        const responseMe: ResponseMe = {
          code          : HttpStatus.OK,
          _me           : await this.userService.get(id, queryParams.getQueryString()),
          asisgnedUsers : await this.assignedUserService.getAll(queryAsisgnedUsers.getQueryString()),
          // commons       : await this.commonsModelService.getCommons(),
        }

        // Procesando información das asignacións de usuario
        let assignedUserCollections: AssignedUserCollections = this.getItemsAsisgnedUsers(responseMe.asisgnedUsers.data);

        // Comentarios
        const arrayFiltersComments = [
          { visibleToUserGroups: assignedUserCollections.assignedUserGroups },
          { special: [{ createdBy: id }] },
        ];

        responseMe.comments = await this.queryGetAll(this.commentAppService, arrayFiltersComments, queryParams, ["includes"], limit, offset);

        // Proxectos
        const arrayFiltersProjects = [
          { assignedUsers: assignedUserCollections.assignedUsers },
          { special: [{ productOwner: id }] },
        ];

        responseMe.projects = await this.queryGetAll(this.projectService, arrayFiltersProjects, queryParams, ["includes"], limit, offset);

        // Procesando información dos proxectos
        let projectCollections: ProjectCollections = this.getItemsProjects(responseMe.projects.data);

        // Repositorios
        const arrayFiltersRepositories = [
          { special: [{ id: projectCollections.repositories }] },
        ];

        responseMe.repositories = await this.queryGetAll(this.repositoryAppService, arrayFiltersRepositories, queryParams, ["includes"], limit, offset);

        // Requerimentos
        const arrayFiltersRequirements = [
          { special: [{ id: projectCollections.requirements }] },
        ];

        responseMe.requirements = await this.queryGetAll(this.requirementService, arrayFiltersRequirements, queryParams, ["includes"], limit, offset);

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

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
  /**
   * Saca a un conxunto de coleccións tódolos roles, usuarios e grupos dunha resposta de
   * "AssignedUserService", o obxectivo é poder empregar estas coleccións como filtros para consultas
   * a outros servicios.
   *
   * @param data atributo "data" coa resposta do servizo "AssignedUserService"
   * @returns AssignedUserCollections
   */
  private getItemsAsisgnedUsers(data): AssignedUserCollections {
    let result: AssignedUserCollections = {
      assignedRoles       : [],
      assignedUsers       : data.map((obj) => obj.id),
      assignedUserGroups  : [],
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

  /**
   * Saca a un conxunto de coleccións tódolos usuarios asignados, requerimentos, repositorios e comentarios
   * dunha resposta de "ProjectService", o obxectivo é poder empregar estas coleccións como filtros para consultas
   * a outros servicios.
   *
   * @param data atributo "data" coa resposta do servizo "ProjectService"
   * @returns ProjectCollections
   */
  private getItemsProjects(data): ProjectCollections {
    let result: ProjectCollections = {
      assignedUsers  : [],
      requirements   : [],
      repositories   : [],
      comments       : [],
  };

    // Buscanse os valores
    let assignedUsers = data.map((obj) => obj.assignedUsers)
    let requirements = data.map((obj) => obj.requirements);
    let repositories = data.map((obj) => obj.repositories)
    let comments = data.map((obj) => obj.comments);

    // Limplianse os valores nulos, en caso de habelos
    assignedUsers = cleanDeep(assignedUsers);
    requirements = cleanDeep(requirements);
    repositories = cleanDeep(repositories);
    comments = cleanDeep(comments);

    // Agrupanse tódolos arrays nun só (o que se vai a devolver)
    assignedUsers.forEach(element => {
      result.assignedUsers.push(...element)
    });
    requirements.forEach(element => {
      result.requirements.push(...element)
    });
    repositories.forEach(element => {
      result.repositories.push(...element)
    });
    comments.forEach(element => {
      result.comments.push(...element)
    });

    return result;
  }

  /**
   * Helper para xerar peticións estándar para un getAll a un servicio dos modelos de datos.
   *
   * @param service servicio para facer a consulta
   * @param arrayFilters filtros especiais a incluir
   * @param queryParams parámetros pasados na URI
   * @param copyQuery parámetros que se queren copiar da URI
   * @param limit limite de resultados
   * @param offset páxina de resultados
   * @returns ResponseData
   */
  public async queryGetAll(service: any, arrayFilters: any, queryParams: APIFilter, copyQuery: string[], limit: Number, offset: Number): Promise<ResponseData> {
    const queryFilters = new APIFilter();

    queryFilters.copy(queryParams, copyQuery);
    queryFilters.arrayFilters = arrayFilters;

    return await service.getAll(queryFilters.getQueryString(), limit, offset);
  }
}
