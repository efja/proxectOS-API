// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { Router, IRouter } from 'express';
import { SummaryController } from '../../controllers/business-service/summary.controller';

// ####################################################################################################
// ## CLASE SummaryRoutes
// ####################################################################################################
export class SummaryRoutes {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  private summaryController : SummaryController = new SummaryController();
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
    // this.router.post('', this.summaryController.create);
    // this.router.post('/Multiple', this.summaryController.createList);

    // // GET
    // this.router.get('', this.summaryController.getAll);
    // this.router.get('/:id', this.summaryController.get);

    // // PUT
    // this.router.put('/:id', this.summaryController.update);

    // // PATCH
    // this.router.patch('/:id', this.summaryController.modify);

    // // DELETE
    // this.router.delete('/:id', this.summaryController.delete);
  };

  // ************************************************************************************************
  // ** MÉTODOS
  // ************************************************************************************************
  public getRoutes = (): IRouter => {
    return this.router;
  };
}
