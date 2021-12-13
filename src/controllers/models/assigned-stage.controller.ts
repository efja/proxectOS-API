/* eslint-disable @typescript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################yy
import { AssignedStageService } from '../../services/models/assigned-stage.service';
import { AssignedStage } from '../../models/assigned-stage.model';
import { BaseModelController } from './base-model.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'ASSIGNED_STAGE';

// ##################################################################################################
// ## CLASE AssignedStageController
// ##################################################################################################
export class AssignedStageController extends BaseModelController<AssignedStage> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected minimumAttributes      : string[] = [
    'stage',
    'currentState',
    'startDate',
  ];

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(AssignedStage, AssignedStageService)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
