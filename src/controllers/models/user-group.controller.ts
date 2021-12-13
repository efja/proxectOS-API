/* eslint-disable @userGroupscript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import { UserGroupService } from '../../services/models/user-group.service';
import { UserGroup } from '../../models/user-group.model';
import { BaseModelController } from './base-model.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'USER_GROUP';

// ##################################################################################################
// ## CLASE UserGroupController
// ##################################################################################################
export class UserGroupController extends BaseModelController<UserGroup> {
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
    super(UserGroup, UserGroupService)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
