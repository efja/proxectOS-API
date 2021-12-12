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
    // // POST
    // this.router.post('', this.adminController.create);
    // this.router.post('/Multiple', this.adminController.createList);

    // // GET
    // this.router.get('', this.adminController.getAll);
    // this.router.get('/:id', this.adminController.get);

    // // PUT
    // this.router.put('/:id', this.adminController.update);

    // // PATCH
    // this.router.patch('/:id', this.adminController.modify);

    // // DELETE
    // this.router.delete('/:id', this.adminController.delete);
  };

  // ************************************************************************************************
  // ** MÉTODOS
  // ************************************************************************************************
  public getRoutes = (): IRouter => {
    return this.router;
  };
}
