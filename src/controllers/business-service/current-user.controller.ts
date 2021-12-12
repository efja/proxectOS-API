/* eslint-disable @typescript-eslint/no-explicit-any */
// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import HttpStatus from 'http-status-codes';
import { Operation } from 'fast-json-patch';
import { req, res, next } from 'express';
import cleanDeep from 'clean-deep';

import { ResponseData, ResponseMe } from '../../interfaces/response-data.interface';
import { APIFilter } from '../../helpers/uri-filter.helper';

import { CommentAppService } from '../../services/models/commentapp.service';
import { ProjectService } from '../../services/models/project.service';
import { RepositoryAppService } from '../../services/models/repositoryapp.service';
import { RequirementService } from '../../services/models/requirement.service';
import { ResourceService } from '../../services/models/resource.service';
import { UserService } from '../../services/models/user.service';
import { BaseController } from '../base.controller';
import { AssignedUserService } from '../../services/models/assigned-user.service';
import { AssignedUserCollections, ProjectCollections, UserCollections } from '../../interfaces/entity-collections.interface';
import { CommonsModelService } from '../../services/models/commons-model.service';
import { getStatusCode } from '../../helpers/resquest.helper';
import { UserContactService } from '../../services/models/user-contact.service';
import { getUserGroups } from '../../helpers/entity.helper';
import { CurrentUserService } from '../../services/business-service/current-user.service';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL: string = 'CURRENT_USER';
const FAKE_USER_ID = "616b4dbb9f7ee9e407c28a1b"; // TODO: quitar cando se implemente o login

// ####################################################################################################
// ## CLASE CurrentUserController
// ####################################################################################################
export class CurrentUserController extends BaseController {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL: string = TRANSLATION_NAME_MODEL;
  protected service: CurrentUserService = new CurrentUserService();

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super();
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (READ)
  // ************************************************************************************************
  /**
   * Recupera toda a información relacionada co usuario actual. (GET)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public getMe = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let id = this.getUserId();

      if (id && id != "") {
        const responseMe: ResponseMe = await this.service.getMe(id);

        // const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST'); // TODO: tratar resposta

        res.status(responseMe.code).json(responseMe); // Exit point
      } else {
        const response: ResponseData = {
          code: HttpStatus.BAD_REQUEST,
          data: null,
        }

        const responseData: ResponseData = this.processResponse(req, response, 'BAD_REQUEST');
        res.status(responseData.code).json(responseData); // Exit point
      }

    } catch (error) {
      next(error);
    }
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
  getUserId() {
    return FAKE_USER_ID; // TODO: quitar cando se implemente o login
  }
}
