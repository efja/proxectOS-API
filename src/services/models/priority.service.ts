// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { Priority } from '../../models/priority.model';
import { BaseModelService } from './base-model.service';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const ENDPOINT : string = 'priorities';

// ####################################################################################################
// ## CLASE PriorityService
// ####################################################################################################
export class PriorityService extends BaseModelService<Priority> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(Priority, ENDPOINT);
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}