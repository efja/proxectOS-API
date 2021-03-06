// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { RepositoryApp } from '../../models/repositoryapp.model';
import { BaseModelService } from './base-model.service';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const ENDPOINT : string = 'repositories';

// ####################################################################################################
// ## CLASE RepositoryAppService
// ####################################################################################################
export class RepositoryAppService extends BaseModelService<RepositoryApp> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(RepositoryApp, ENDPOINT);
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
