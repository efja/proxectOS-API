// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import cleanDeep from 'clean-deep';
import HttpStatus from 'http-status-codes';

import { APIFilter } from '../../helpers/uri-filter.helper';
import { AssignedUserService } from '../models/assigned-user.service';
import { CommonsModelService } from '../models/commons-model.service';
import { DBConnection } from '../../config/config-db';
import { ResponseData, ResponseUserCommons } from '../../interfaces/response-data.interface';
import { RoleService } from '../models/role.service';
import { UserContactService } from '../models/user-contact.service';
import { UserGroupService } from '../models/user-group.service';
import { UserScheduleService } from '../models/user-schedule.service';
import { UserService } from '../models/user.service';

// ##################################################################################################
// ## CLASE AdminService
// ##################################################################################################
export class AdminService {
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
    private commonsModelService = new CommonsModelService,
    private roleService = new RoleService,
    private userContactService = new UserContactService,
    private userGroupService = new UserGroupService,
    private userScheduleService = new UserScheduleService,
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
  // -- GET - ADMIN
  // ------------------------------------------------------------------------------------------------
  public async getAdmin(): Promise<ResponseUserCommons> {
    return await this.commonsModelService.getUserCommons();
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - ROLES
  // ------------------------------------------------------------------------------------------------
  public async getAllRoles(): Promise<ResponseData> {
    return await this.roleService.getAll();
  }

  public async getRole(id: string): Promise<ResponseData> {
    return await this.roleService.get(id);
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USERS
  // ------------------------------------------------------------------------------------------------
  public async getAllUsers(): Promise<ResponseData> {
    return await this.userService.getAll();
  }

  public async getUser(id: string): Promise<ResponseData> {
    return await this.userService.get(id);
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USER GROUPS
  // ------------------------------------------------------------------------------------------------
  public async getAllUserGroups(): Promise<ResponseData> {
    return await this.userGroupService.getAll();
  }

  public async getUserGroup(id: string): Promise<ResponseData> {
    return await this.userGroupService.get(id);
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USER SCHEDULES
  // ------------------------------------------------------------------------------------------------
  public async getAllSchedules(): Promise<ResponseData> {
    return await this.userScheduleService.getAll();
  }

  public async getSchedule(id: string): Promise<ResponseData> {
    return await this.userScheduleService.get(id);
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
