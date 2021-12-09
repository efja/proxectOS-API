// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CommentApp } from '../../models/commentapp.model';
import { BaseModelService } from './base-model.service';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const ENDPOINT : string = 'comments';

// ####################################################################################################
// ## CLASE CommentAppService
// ####################################################################################################
export class CommentAppService extends BaseModelService<CommentApp> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(CommentApp, ENDPOINT);
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}