// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { Router, IRouter } from 'express';
import { CurrentUserController } from '../../controllers/business-service/current-user.controller';

// ####################################################################################################
// ## CLASE CurrentUserRoutes
// ####################################################################################################
export class CurrentUserRoutes {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  private currentUserController : CurrentUserController = new CurrentUserController();
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
    this.router.get('', this.currentUserController.getMe);
    this.router.get('/comments', this.currentUserController.getMe);
    this.router.get('/comments/:id', this.currentUserController.getMe);
    this.router.get('/projects', this.currentUserController.getMe);
    this.router.get('/projects/:id', this.currentUserController.getMe);
    this.router.get('/repositories', this.currentUserController.getMe);
    this.router.get('/repositories/:id', this.currentUserController.getMe);
    this.router.get('/requirements', this.currentUserController.getMe);
    this.router.get('/requirements/:id', this.currentUserController.getMe);
    this.router.get('/resources', this.currentUserController.getMe);
    this.router.get('/resources/:id', this.currentUserController.getMe);

    // Usuario
    this.router.get('/contacts', this.currentUserController.getMe);
    this.router.get('/contacts/:id', this.currentUserController.getMe);
    this.router.get('/schedules', this.currentUserController.getMe);
    this.router.get('/schedules/:id', this.currentUserController.getMe);
  };

  // ************************************************************************************************
  // ** MÉTODOS
  // ************************************************************************************************
  public getRoutes = (): IRouter => {
    return this.router;
  };
}
