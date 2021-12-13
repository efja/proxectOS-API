/* eslint-disable @typescript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import { RepositoryAppService } from '../../services/models/repositoryapp.service';
import { RepositoryApp } from '../../models/repositoryapp.model';
import { BaseModelController } from './base-model.controller';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'REPOSITORY';

// ##################################################################################################
// ## CLASE RepositoryAppController
// ##################################################################################################
export class RepositoryAppController extends BaseModelController<RepositoryApp> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected minimumAttributes      : string[] = [
    'name',
    'uri',
  ];

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(RepositoryApp, RepositoryAppService)
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}