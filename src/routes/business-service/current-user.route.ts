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
    this.router.get('/comments', this.currentUserController.getAllComments);
    this.router.get('/comments/:id', this.currentUserController.getComment);
    this.router.get('/projects', this.currentUserController.getAllProjects);
    this.router.get('/projects/:id', this.currentUserController.getProject);
    this.router.get('/projects/:id/repositories', this.currentUserController.getAllRepositories);
    this.router.get('/projects/repositories/:id', this.currentUserController.getRepository);
    this.router.get('/projects/:id/requirements', this.currentUserController.getAllRequirements);
    this.router.get('/projects/requirements/:id', this.currentUserController.getRequirement);

    // Usuario
    this.router.get('/contacts', this.currentUserController.getAllContacts);
    this.router.get('/schedule', this.currentUserController.getSchedule);
  };

  // ************************************************************************************************
  // ** MÉTODOS
  // ************************************************************************************************
  public getRoutes = (): IRouter => {
    return this.router;
  };
}
