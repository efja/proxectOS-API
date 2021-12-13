/* eslint-disable @typescript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import { CommentAppService } from '../../services/models/commentapp.service';
import { CommentApp } from '../../models/commentapp.model';
import { BaseModelController } from './base-model.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'COMMENT';

// ##################################################################################################
// ## CLASE CommentAppController
// ##################################################################################################
export class CommentAppController extends BaseModelController<CommentApp> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected minimumAttributes      : string[] = [
    'title',
    'message',
  ];

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(CommentApp, CommentAppService)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}