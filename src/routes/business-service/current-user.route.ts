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
    // -- POST
    // ----------------------------------------------------------------------------------------------
    this.router.post('/comments', this.currentUserController.create);
    this.router.post('/projects', this.currentUserController.create);
    this.router.post('/repositories', this.currentUserController.create);
    this.router.post('/requirements', this.currentUserController.create);
    this.router.post('/resources', this.currentUserController.create);

    // Usuario
    this.router.post('/contacts', this.currentUserController.create);
    this.router.post('/schedules', this.currentUserController.create);

    // ----------------------------------------------------------------------------------------------
    // -- GET
    // ----------------------------------------------------------------------------------------------
    this.router.get('/comments', this.currentUserController.getAll);
    this.router.get('/comments/:id', this.currentUserController.get);
    this.router.get('/projects', this.currentUserController.getAll);
    this.router.get('/projects/:id', this.currentUserController.get);
    this.router.get('/repositories', this.currentUserController.getAll);
    this.router.get('/repositories/:id', this.currentUserController.get);
    this.router.get('/requirements', this.currentUserController.getAll);
    this.router.get('/requirements/:id', this.currentUserController.get);
    this.router.get('/resources', this.currentUserController.getAll);
    this.router.get('/resources/:id', this.currentUserController.get);

    // Usuario
    this.router.get('/contacts', this.currentUserController.getAll);
    this.router.get('/contacts/:id', this.currentUserController.get);
    this.router.get('/schedules', this.currentUserController.getAll);
    this.router.get('/schedules/:id', this.currentUserController.get);

    // ----------------------------------------------------------------------------------------------
    // -- PUT
    // ----------------------------------------------------------------------------------------------
    // this.router.put('/:id', this.currentUserController.update);
    // this.router.put('/comments/:id', this.currentUserController.update);
    // this.router.put('/projects/:id', this.currentUserController.update);
    // this.router.put('/repositories/:id', this.currentUserController.update);
    // this.router.put('/requirements/:id', this.currentUserController.update);
    // this.router.put('/resources/:id', this.currentUserController.update);

    // Usuario
    // this.router.put('/contacts/:id', this.currentUserController.update);
    // this.router.put('/schedules/:id', this.currentUserController.update);

    // ----------------------------------------------------------------------------------------------
    // -- PATCH
    // ----------------------------------------------------------------------------------------------
    this.router.patch('/:id', this.currentUserController.modify);
    this.router.patch('/comments/:id', this.currentUserController.modify);
    this.router.patch('/projects/:id', this.currentUserController.modify);
    this.router.patch('/repositories/:id', this.currentUserController.modify);
    this.router.patch('/requirements/:id', this.currentUserController.modify);
    this.router.patch('/resources/:id', this.currentUserController.modify);

    // Usuario
    this.router.patch('/contacts/:id', this.currentUserController.modify);
    this.router.patch('/schedules/:id', this.currentUserController.modify);

    // ----------------------------------------------------------------------------------------------
    // -- DELETE
    // ----------------------------------------------------------------------------------------------
    this.router.delete('/:id', this.currentUserController.delete);
    this.router.delete('/comments/:id', this.currentUserController.delete);
    this.router.delete('/projects/:id', this.currentUserController.delete);
    this.router.delete('/repositories/:id', this.currentUserController.delete);
    this.router.delete('/requirements/:id', this.currentUserController.delete);
    this.router.delete('/resources/:id', this.currentUserController.delete);

    // Usuario
    this.router.delete('/contacts/:id', this.currentUserController.delete);
    this.router.delete('/schedules/:id', this.currentUserController.delete);
  };

  // ************************************************************************************************
  // ** MÉTODOS
  // ************************************************************************************************
  public getRoutes = (): IRouter => {
    return this.router;
  };
}
