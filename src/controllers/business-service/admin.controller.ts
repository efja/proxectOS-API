/* eslint-disable @typescript-eslint/no-explicit-any */
// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import HttpStatus from 'http-status-codes';
import { req, res, next } from 'express';

import { BaseController } from '../base.controller';
import { AdminService } from '../../services/business-service/admin.service';
import { ResponseData, ResponseUserCommons } from '../../interfaces/response-data.interface';

// ##################################################################################################
// ## CONSTANTES
// ##################################################################################################
const TRANSLATION_NAME_MODEL : string = 'ADMIN';

// ####################################################################################################
// ## CLASE AdminController
// ####################################################################################################
export class AdminController extends BaseController {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL : string = TRANSLATION_NAME_MODEL;
  protected service: AdminService = new AdminService();

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() {
    super()
  }

  // ************************************************************************************************
  // ** MÉTODOS CRUD (READ)
  // ************************************************************************************************
  // ------------------------------------------------------------------------------------------------
  // -- GET - ADMIN
  // ------------------------------------------------------------------------------------------------
  /**
   * Recupera toda a información relacionada co usuario actual. (GET)
   *
   * @param req - obxecto da petición
   * @param res - obxecto da resposta
   * @param next
   */
  public getAdmin = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const responseUserCommons: ResponseUserCommons = await this.service.getAdmin();

      // const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST'); // TODO: tratar resposta

      res.status(responseUserCommons.code).json(responseUserCommons); // Exit point

    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - ROLES
  // ------------------------------------------------------------------------------------------------
  public getAllRoles = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let response = await this.service.getAllRoles();

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public getRole = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;

      let response = await this.service.getRole(id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USERS
  // ------------------------------------------------------------------------------------------------
  public getAllUsers = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let response = await this.service.getAllUsers();

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public getUser = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;

      let response = await this.service.getUser(id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USER GROUPS
  // ------------------------------------------------------------------------------------------------
  public getAllUserGroups = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let response = await this.service.getAllUserGroups();

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public getUserGroup = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;

      let response = await this.service.getUserGroup(id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ------------------------------------------------------------------------------------------------
  // -- GET - USER SCHEDULES
  // ------------------------------------------------------------------------------------------------
  public getAllSchedules = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      let response = await this.service.getAllSchedules();

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  public getSchedule = async (
    req: req,
    res: res,
    next: next
  ): Promise<any> => {
    try {
      const { id } = req.params;

      let response = await this.service.getSchedule(id);

      const responseData : ResponseData = this.processResponse(req, response, 'GET_LIST');

      res.status(responseData.code).json(responseData);
    } catch (error) {
      next(error);
    }
  }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
}
