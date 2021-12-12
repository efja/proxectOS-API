// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import cleanDeep from 'clean-deep';
import HttpStatus from 'http-status-codes';

import { APIFilter } from '../../helpers/uri-filter.helper';
import { AssignedUserCollections, ProjectCollections } from '../../interfaces/entity-collections.interface';
import { AssignedUserService } from '../models/assigned-user.service';
import { CommentAppService } from '../models/commentapp.service';
import { CommonsModelService } from '../models/commons-model.service';
import { DBConnection } from '../../config/config-db';
import { getStatusCode, queryGetAll } from '../../helpers/resquest.helper';
import { getUserGroups } from '../../helpers/entity.helper';
import { ProjectService } from '../models/project.service';
import { RepositoryAppService } from '../models/repositoryapp.service';
import { RequirementService } from '../models/requirement.service';
import { ResponseData, ResponseMe } from '../../interfaces/response-data.interface';
import { User } from '../../models/user.model';
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
  // -- GET - ME
  // ------------------------------------------------------------------------------------------------
  public async getMe(id: string): Promise<ResponseMe> {
    const queryParams = new APIFilter();
    queryParams.includes = true;

    // Básico
    const responseMe = await this.getMeBasic(id, queryParams);

    // Comúns
    responseMe.commons = await this.commonsModelService.getCommons();

    // Contactos
    responseMe.contacts = await this.getMeContacts(responseMe._me.data, queryParams);

    // Grupos por defecto do usuario
    responseMe.defaultGroups = {
      code: HttpStatus.OK,
      data: getUserGroups(responseMe._me.data.defaultUserGroups, responseMe.commons.userCommons.userGroups.data),
    }

    // Procesando información das asignacións de usuario
    let assignedUserCollections: AssignedUserCollections = this.getItemsAsisgnedUsers(responseMe.asisgnedUsers.data);

    // Comentarios
    responseMe.comments = await this.getMeComments(id, assignedUserCollections.assignedUserGroups, queryParams);

    // Proxectos
    responseMe.projects = await this.getMeProjects(id, assignedUserCollections.assignedUsers, queryParams);

    // Procesando información dos proxectos
    let projectCollections: ProjectCollections = this.getItemsProjects(responseMe.projects.data);

    // Repositorios
    responseMe.repositories = await this.getMeRepositories(projectCollections.repositories, queryParams);

    // Requerimentos
    responseMe.requirements = await this.getMeRequirements(projectCollections.requirements, queryParams);

    responseMe.code = getStatusCode(
      [
        responseMe._me,
        responseMe.asisgnedUsers,
        responseMe.comments,
        responseMe.commons,
        responseMe.contacts,
        responseMe.defaultGroups,
        responseMe.projects,
        responseMe.repositories,
        responseMe.requirements,
      ]
    );

    return responseMe;
  }

  public async getMeBasic(id: string, queryParams: APIFilter): Promise<ResponseMe> {
    const queryAsisgnedUsers = new APIFilter();
    queryAsisgnedUsers.objectIdFilters = [
      { assignedUser: id },
    ];

    const responseMe: ResponseMe = {
      code          : HttpStatus.OK,
      _me           : await this.userService.get(id, queryParams.getQueryString()),
      asisgnedUsers : await this.assignedUserService.getAll(queryAsisgnedUsers.getQueryString()),
    }

    responseMe.code = getStatusCode(
      [
        responseMe._me,
        responseMe.asisgnedUsers,
      ]
    );

    return responseMe;
  }

  public async getMeContacts(user: User, queryParams: APIFilter): Promise<ResponseData> {
    const arrayFiltersUserIncludes = [
      { id: user.contacts },
    ];

    return await queryGetAll(this.userContactService, arrayFiltersUserIncludes, queryParams, []);
  }

  public async getMeComments(userId: string, userGroups: string[], queryParams: APIFilter): Promise<ResponseData> {
    const arrayFiltersComments = [
      { visibleToUserGroups: userGroups },
      { special: [{ createdBy: userId }] },
    ];

    return await queryGetAll(this.commentAppService, arrayFiltersComments, queryParams, []);
  }

  public async getMeProjects(userId: string, assignedUsers: string[], queryParams: APIFilter): Promise<ResponseData> {
    const arrayFiltersProjects = [
      { assignedUsers: assignedUsers },
      { special: [{ productOwner: userId }] },
    ];

    return await queryGetAll(this.projectService, arrayFiltersProjects, queryParams, []);
  }

  public async getMeRepositories(repositories: string[], queryParams: APIFilter): Promise<ResponseData> {
    const arrayFiltersRepositories = [
      { special: [{ id: repositories }] },
    ];

    return await queryGetAll(this.repositoryAppService, arrayFiltersRepositories, queryParams, []);
  }

  public async getMeRequirements(requirements: string[], queryParams: APIFilter): Promise<ResponseData> {
    const arrayFiltersRequirements = [
      { special: [{ id: requirements }] },
    ];

    return await queryGetAll(this.requirementService, arrayFiltersRequirements, queryParams, []);
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - COMMENTS
  // ------------------------------------------------------------------------------------------------
  public async getAllComments(userId: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };

    const queryParams = new APIFilter();

    const responseMe = await this.getMeBasic(userId, queryParams);

    // Procesando información das asignacións de usuario
    let assignedUserCollections: AssignedUserCollections = this.getItemsAsisgnedUsers(responseMe.asisgnedUsers.data);

    // Comentarios
    result = await this.getMeComments(userId, assignedUserCollections.assignedUserGroups, queryParams);

    return result;
  }

  public async getComment(userId: string, id: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };

    const allUserComments = await this.getAllComments(userId);

    result.data = allUserComments.data.find(c => c.id == id);

    if (result.data != null) {
      result.code = HttpStatus.OK;
    }

    return result;
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - PROJECTS
  // ------------------------------------------------------------------------------------------------
  public async getAllProjects(userId: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };

    const queryParams = new APIFilter();

    const responseMe = await this.getMeBasic(userId, queryParams);

    // Procesando información das asignacións de usuario
    let assignedUserCollections: AssignedUserCollections = this.getItemsAsisgnedUsers(responseMe.asisgnedUsers.data);

    // Proxectos
    result = await this.getMeProjects(userId, assignedUserCollections.assignedUsers, queryParams);

    return result;
  }

  public async getProject(userId: string, id: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };

    const allUserProjects = await this.getAllProjects(userId);

    result.data = allUserProjects.data.find(c => c.id == id);

    if (result.data != null) {
      result.code = HttpStatus.OK;
    }

    return result;
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - PROJECTS -> REPOSITORIES
  // ------------------------------------------------------------------------------------------------
  public async getAllRepositories(userId: string, projectId: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };

    const queryParams = new APIFilter();

    const project = await this.getProject(userId, projectId);

    // Repositorios
    result = await this.getMeRepositories(project.data.repositories, queryParams);

    return result;
  }

  public async getRepository(userId: string, id: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };

    const queryParams = new APIFilter();

    const allUserProjects = await this.getAllProjects(userId);

    // Procesando información dos proxectos
    const projectCollections: ProjectCollections = this.getItemsProjects(allUserProjects.data);

    // Repositorios
    const repositories = await this.getMeRepositories(projectCollections.repositories, queryParams);

    result.data = repositories.data.find(c => c.id == id);

    if (result.data != null) {
      result.code = HttpStatus.OK;
    }

    return result;
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - PROJECTS -> REQUIREMENTS
  // ------------------------------------------------------------------------------------------------
  public async getAllRequirements(userId: string, projectId: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };

    const queryParams = new APIFilter();

    const project = await this.getProject(userId, projectId);

    // Requerimentos
    const arrayFiltersRequirements = [
      { special: [{ id: project.data.requirements }] },
    ];

    result = await queryGetAll(this.requirementService, arrayFiltersRequirements, queryParams, []);

    return result;
  }

  public async getRequirement(userId: string, id: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };

    const queryParams = new APIFilter();

    const allUserProjects = await this.getAllProjects(userId);

    // Procesando información dos proxectos
    const projectCollections: ProjectCollections = this.getItemsProjects(allUserProjects.data);

    // Requerimentos
    const arrayFiltersRequirements = [
      { special: [{ id: id }] },
    ];

    const requirements = await queryGetAll(this.requirementService, arrayFiltersRequirements, queryParams, []);

    result.data = requirements.data.find(c => c.id == id);

    if (result.data != null) {
      result.code = HttpStatus.OK;
    }

    return result;
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USER -> CONTACTS
  // ------------------------------------------------------------------------------------------------
  public async getAllContacts(userId: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };
    const queryParams = new APIFilter();

    const user = await this.userService.get(userId, queryParams.getQueryString());

    // Contactos
    result = await this.getMeContacts(user.data, queryParams);

    return result;
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USER -> SCHEDULE
  // ------------------------------------------------------------------------------------------------
  public async getSchedule(userId: string): Promise<ResponseData> {
    let result: ResponseData = {
      code  : HttpStatus.NOT_FOUND,
      data  : null,
    };
    const queryParams = new APIFilter();
    queryParams.includes = true;

    const user = await this.userService.get(userId, queryParams.getQueryString());
    result.code = user.code;
    result.data = user.data.userSchedule;

    return result;
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
