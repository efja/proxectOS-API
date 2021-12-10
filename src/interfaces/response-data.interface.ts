import { User } from "../models/user.model";

export interface ResponseData {
    code        : number,
    data        : any,
    total?      : number,
    from?       : number,
    limit?      : number,
    message?    : string,
    error?      : string,
}

export interface ResponseMe {
  code          : number,
  me            : User,
  comments      : ResponseData,
  projects      : ResponseData,
  repositories  : ResponseData,
  requirements  : ResponseData,
  resources     : ResponseData,
}

export interface ResultQuery {
  code    : number,
  data    : any,
  from?   : number,
  limit?  : number,
}

export interface ResultCheckType {
  getObjectType   : any,
  isArray         : boolean,
  isBoolean       : boolean,
  isDate          : boolean,
  isNull          : boolean,
  isNumber        : boolean,
  isObject        : boolean,
  isObjectID      : boolean,
  isString        : boolean,
  isUndefined     : boolean,
}
