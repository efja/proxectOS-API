// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { Project } from '../../models/project.model';
import { BaseModelService } from './base-model.service';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const ENDPOINT : string = 'projects';

// ####################################################################################################
// ## CLASE ProjectService
// ####################################################################################################
export class ProjectService extends BaseModelService<Project> {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super(Project, ENDPOINT);
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
