/* eslint-disable @typescript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import { RoleService } from '../../services/models/role.service';
import { Role } from '../../models/role.model';
import { BaseModelController } from './base-model.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'ROLE';

// ##################################################################################################
// ## CLASE RoleController
// ##################################################################################################
export class RoleController extends BaseModelController<Role> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected minimumAttributes      : string[] = [
    'name',
    'create',
    'delete',
    'read',
    'update',
  ];

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(Role, RoleService)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
