// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { Router, IRouter } from 'express';
import { AdminController } from '../../controllers/business-service/admin.controller';

// ####################################################################################################
// ## CLASE AdminRoutes
// ####################################################################################################
export class AdminRoutes {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  private adminController : AdminController = new AdminController();
  private router = Router();

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    this.routes();
  }

  // ************************************************************************************************
  // ** RUTAS
  // ************************************************************************************************
  private routes = () => {
    // ----------------------------------------------------------------------------------------------
    // -- GET
    // ----------------------------------------------------------------------------------------------
    this.router.get('', this.adminController.getAdmin);
    this.router.get('/roles', this.adminController.getAllRoles);
    this.router.get('/roles/:id', this.adminController.getRole);
    this.router.get('/users', this.adminController.getAllUsers);
    this.router.get('/users/:id', this.adminController.getUser);
    this.router.get('/userGroups/', this.adminController.getAllUserGroups);
    this.router.get('/userGroups/:id', this.adminController.getUserGroup);
    this.router.get('/schedules', this.adminController.getAllSchedules);
    this.router.get('/schedules/:id', this.adminController.getSchedule);
  };

  // ************************************************************************************************
  // ** MÉTODOS
  // ************************************************************************************************
  public getRoutes = (): IRouter => {
    return this.router;
  };
}
