// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import cleanDeep from 'clean-deep';
import HttpStatus from 'http-status-codes';
import superagent from 'superagent';

import { DBConnection } from '../../config/config-db';
import { getUserGroups } from '../../helpers/entity.helper';
import { getStatusCode, queryGetAll } from '../../helpers/resquest.helper';
import { APIFilter } from '../../helpers/uri-filter.helper';
import { AssignedUserCollections, ProjectCollections } from '../../interfaces/entity-collections.interface';
import { ResponseCommons, ResponseData, ResponseMe, ResponseUserCommons, ResultQuery } from '../../interfaces/response-data.interface';
import { AssignedUserService } from '../models/assigned-user.service';
import { CommentAppService } from '../models/commentapp.service';
import { CommonsModelService } from '../models/commons-model.service';
import { ProjectService } from '../models/project.service';
import { RepositoryAppService } from '../models/repositoryapp.service';
import { RequirementService } from '../models/requirement.service';
import { UserContactService } from '../models/user-contact.service';
import { UserService } from '../models/user.service';

// ##################################################################################################
// ## CLASE CurrentUserService
// ##################################################################################################
export class CurrentUserService {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected respository: any;

  protected db: DBConnection;
  protected uri: string;

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor(
    private assignedUserService = new AssignedUserService,
    private commentAppService = new CommentAppService,
    private commonsModelService = new CommonsModelService,
    private projectService = new ProjectService,
    private repositoryAppService = new RepositoryAppService,
    private requirementService = new RequirementService,
    private userContactService = new UserContactService,
    private userService = new UserService,
  ) {

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
  public async getMe(id): Promise<ResponseMe> {
    const queryParams = new APIFilter();
    queryParams.includes = true;

    const queryAsisgnedUsers = new APIFilter();
    queryAsisgnedUsers.objectIdFilters = [
      { assignedUser: id },
    ];

    let limit = 0;
    let offset = 0;

    const responseMe: ResponseMe = {
      code: HttpStatus.OK,
      _me: await this.userService.get(id, queryParams.getQueryString()),
      asisgnedUsers: await this.assignedUserService.getAll(queryAsisgnedUsers.getQueryString()),
      commons: await this.commonsModelService.getCommons(),
    }

    // Contactos
    const arrayFiltersUserIncludes = [
      { id: responseMe._me.data.contacts },
    ];

    responseMe.contacts = await queryGetAll(this.userContactService, arrayFiltersUserIncludes, queryParams, [], limit, offset);

    // Grupos por defecto do usuario
    responseMe.defaultGroups = {
      code: HttpStatus.OK,
      data: getUserGroups(responseMe._me.data.defaultUserGroups, responseMe.commons.userCommons.userGroups.data),
    }

    // Procesando información das asignacións de usuario
    let assignedUserCollections: AssignedUserCollections = this.getItemsAsisgnedUsers(responseMe.asisgnedUsers.data);

    // Comentarios
    const arrayFiltersComments = [
      { visibleToUserGroups: assignedUserCollections.assignedUserGroups },
      { special: [{ createdBy: id }] },
    ];

    responseMe.comments = await queryGetAll(this.commentAppService, arrayFiltersComments, queryParams, [], limit, offset);

    // Proxectos
    const arrayFiltersProjects = [
      { assignedUsers: assignedUserCollections.assignedUsers },
      { special: [{ productOwner: id }] },
    ];

    responseMe.projects = await queryGetAll(this.projectService, arrayFiltersProjects, queryParams, [], limit, offset);

    // Procesando información dos proxectos
    let projectCollections: ProjectCollections = this.getItemsProjects(responseMe.projects.data);

    // Repositorios
    const arrayFiltersRepositories = [
      { special: [{ id: projectCollections.repositories }] },
    ];

    responseMe.repositories = await queryGetAll(this.repositoryAppService, arrayFiltersRepositories, queryParams, [], limit, offset);

    // Requerimentos
    const arrayFiltersRequirements = [
      { special: [{ id: projectCollections.requirements }] },
    ];

    responseMe.requirements = await queryGetAll(this.requirementService, arrayFiltersRequirements, queryParams, [], limit, offset);

    responseMe.code = getStatusCode(
      [
        responseMe._me,
        responseMe.asisgnedUsers,
        responseMe.comments,
        responseMe.contacts,
        responseMe.defaultGroups,
        responseMe.projects,
        responseMe.repositories,
        responseMe.requirements,
        responseMe.commons,
      ]
    );

    return responseMe;
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
      assignedUsers : [],
      requirements  : [],
      repositories  : [],
      comments      : [],
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
}
