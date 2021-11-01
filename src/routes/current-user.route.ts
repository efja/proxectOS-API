// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { Router, IRouter } from 'express';
import { CurrentUserController } from '../controllers/current-user.controller';

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
    // POST
    this.router.post('', this.currentUserController.create);
    this.router.post('/Multiple', this.currentUserController.createList);

    // GET
    this.router.get('', this.currentUserController.getAll);
    this.router.get('/:id', this.currentUserController.get);

    // PUT
    this.router.put('/:id', this.currentUserController.update);

    // PATCH
    this.router.patch('/:id', this.currentUserController.modify);

    // DELETE
    this.router.delete('/:id', this.currentUserController.delete);
  };

  // ************************************************************************************************
  // ** MÉTODOS
  // ************************************************************************************************
  public getRoutes = (): IRouter => {
    return this.router;
  };
}
