/* eslint-disable @typescript-eslint/no-explicit-any */
// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import HttpStatus from 'http-status-codes';
import { Operation } from 'fast-json-patch';
import { req, res, next } from 'express';

import { ResponseData } from '../interfaces/response-data.interface';
import { APIFilter } from '../helpers/uri-filter.helper';

// ##################################################################################################
// ## CLASE BaseController
// ##################################################################################################
export abstract class BaseController {
  // ************************************************************************************************
  // ** ATRIBUTOS
  // ************************************************************************************************
  protected TRANSLATION_NAME_MODEL  : string;

  // ************************************************************************************************
  // ** CONSTRUTOR
  // ************************************************************************************************
  constructor() { }

  // ************************************************************************************************
  // ** UTILIDADES
  // ************************************************************************************************
  /**
   * Procesa a resposta HTTP da conexión coa BD.
   *
   * @param req request do método HTTP
   * @param response resposta do método HTTP
   * @param method metótodo para o cal procesar a resposta
   * @returns ResponseData
   */
  protected processResponse(req, response: ResponseData, method: string): ResponseData {
    method = method.toUpperCase();

    let isPlural = method.includes('LIST');
    let isError  = false;
    let plural = (isPlural)
      ? '_PLURAL'
      : '';
    let id = (response && response.data && response.data.id)
      ? response.data.id
      : undefined;

    if (
      !response ||
      (
        response.code != HttpStatus.OK &&
        response.code != HttpStatus.CREATED
      )
    ) {
      isError = true;
    }

    let code = (response && response.code)
      ? response.code
      : HttpStatus.CONFLICT;
    let data = (response)
      ? response.data
      : undefined;
    let message = (!isError && response && response.message)
      ? response.message
      : undefined;
    let error = (isError && response && response.error)
      ? response.error
      : `ERROR.${method}`;

    if (message) {
      message = req.t(message, { entity: req.t(`${this.TRANSLATION_NAME_MODEL}.NAME${plural}`), id: id });
    }

    if (error) {
      error = req.t(error, { entity: req.t(`${this.TRANSLATION_NAME_MODEL}.NAME${plural}`), id: id });
    }

    const responseData: ResponseData = {
      code,
      data    : (!isError)
        ? data
        : undefined,
      message : (!isError)
        ? message
        : undefined,
      error   : (isError)
        ? error
        : undefined,
    };

    if (isPlural) {
      responseData.total = (response)
        ? response.total
        : 0;
      responseData.from = (response)
        ? response.from
        : 0;
      responseData.limit = (response)
        ? response.limit
        : 0;
    }

    return responseData;
  }}
