/* eslint-disable @typescript-eslint/no-explicit-any */
// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import HttpStatus from 'http-status-codes';
import { req, res, next } from 'express';

import { ResponseData, ResponseMe } from '../../interfaces/response-data.interface';
import { APIFilter } from '../../helpers/uri-filter.helper';

import { BaseController } from '../base.controller';
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
  // ------------------------------------------------------------------------------------------------
  // -- GET - ME
  // ------------------------------------------------------------------------------------------------
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
      let userId = this.getUserId();

      if (userId && userId != "") {
        const responseMe: ResponseMe = await this.service.getMe(userId);

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

  // ------------------------------------------------------------------------------------------------
  // -- GET - COMMENTS
  // ------------------------------------------------------------------------------------------------
  public getAllComments = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let userId = this.getUserId();

      let response = await this.service.getAllComments(userId);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }
  public getComment = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      let userId = this.getUserId();

      let response = await this.service.getComment(userId, id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - PROJECTS
  // ------------------------------------------------------------------------------------------------
  public getAllProjects = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let userId = this.getUserId();

      let response = await this.service.getAllProjects(userId);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public getProject = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      let userId = this.getUserId();

      let response = await this.service.getProject(userId, id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - PROJECTS -> REPOSITORIES
  // ------------------------------------------------------------------------------------------------
  public getAllRepositories = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      let userId = this.getUserId();

      let response = await this.service.getAllRepositories(userId, id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }
  public getRepository = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      let userId = this.getUserId();

      let response = await this.service.getRepository(userId, id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - PROJECTS -> REQUIREMENTS
  // ------------------------------------------------------------------------------------------------
  public getAllRequirements = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      let userId = this.getUserId();

      let response = await this.service.getAllRequirements(userId, id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public getRequirement = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;
      let userId = this.getUserId();

      let response = await this.service.getRequirement(userId, id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USER -> CONTACTS
  // ------------------------------------------------------------------------------------------------
  public getAllContacts = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let userId = this.getUserId();

      let response = await this.service.getAllContacts(userId);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USER -> SCHEDULES
  // ------------------------------------------------------------------------------------------------
  public getSchedule = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let userId = this.getUserId();

      let response = await this.service.getSchedule(userId);

      const responseData : ResponseData = this.processResponse(req, response, 'GET');

      res.status(responseData.code).json(responseData);
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
