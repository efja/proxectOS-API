/* eslint-disable @typescript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import { AssignedResourceService } from '../../services/models/assigned-resource.service';
import { AssignedResource } from '../../models/assigned-resource.model';
import { BaseModelController } from './base-model.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'ASSIGNED_RESOURCE';

// ##################################################################################################
// ## CLASE AssignedResourceController
// ##################################################################################################
export class AssignedResourceController extends BaseModelController<AssignedResource> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected minimumAttributes      : string[] = [
    'description',
    'amount',
    'unitCost',
  ];

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(AssignedResource, AssignedResourceService)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
