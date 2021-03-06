// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { UserContactType } from '../../models/user-contact-type.model';
import { BaseModelService } from './base-model.service';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const ENDPOINT : string = 'userContactTypes';

// ####################################################################################################
// ## CLASE UserContactTypeService
// ####################################################################################################
export class UserContactTypeService extends BaseModelService<UserContactType> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(UserContactType, ENDPOINT);
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
