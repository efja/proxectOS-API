/* eslint-disable @userContactTypescript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import { UserContactTypeService } from '../../services/models/user-contact-type.service';
import { UserContactType } from '../../models/user-contact-type.model';
import { BaseModelController } from './base-model.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'USER_CONTACT_TYPE';

// ##################################################################################################
// ## CLASE UserContactTypeController
// ##################################################################################################
export class UserContactTypeController extends BaseModelController<UserContactType> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected minimumAttributes      : string[] = [
    'description',
  ];

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(UserContactType, UserContactTypeService)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
