/* eslint-disable @typescript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import { PriorityService } from '../../services/models/priority.service';
import { Priority } from '../../models/priority.model';
import { BaseModelController } from './base-model.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'PRIORITY';

// ##################################################################################################
// ## CLASE PriorityController
// ##################################################################################################
export class PriorityController extends BaseModelController<Priority> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected minimumAttributes      : string[] = [
    'name',
  ];

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(Priority, PriorityService)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}