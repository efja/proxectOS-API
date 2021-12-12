import { User } from "../models/user.model";

// ****************************************************************************************************
// ** XENÉRICAS
// ****************************************************************************************************
export interface ResponseData {
    code        : number,
    data        : any,
    total?      : number,
    from?       : number,
    limit?      : number,
    message?    : string,
    error?      : string,
}

export interface ResultQuery {
  id?       : string,
  response  : any,
  from?     : number,
  limit?    : number,
}

// ****************************************************************************************************
// ** USUARIOS
// ****************************************************************************************************
export interface ResponseMe {
  code            : number,
  _me             : ResponseData,
  asisgnedUsers?  : ResponseData,
  comments?       : ResponseData,
  projects?       : ResponseData,
  repositories?   : ResponseData,
  requirements?   : ResponseData,
  resources?      : ResponseData,
  commons?        : ResponseCommons,
}

// COMÚN
export interface ResponseUserCommons {
  code              : number,
  role              : ResponseData,
  userContactType?  : ResponseData,
  userGroup?        : ResponseData,
  userSchedule?     : ResponseData,
}

// ****************************************************************************************************
// ** COMÚNS
// ****************************************************************************************************
export interface ResponseCommons {
  code          : number,
  priority      : ResponseData,
  stage         : ResponseData,
  state         : ResponseData,
  typeapp       : ResponseData,
  userCommons?  : ResponseUserCommons,
}
