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
  asisgnedUsers   : ResponseData,
  comments?       : ResponseData,
  commons?        : ResponseCommons,
  contacts?       : ResponseData,
  defaultGroups?  : ResponseData,
  projects?       : ResponseData,
  repositories?   : ResponseData,
  requirements?   : ResponseData,
}

// COMÚN
export interface ResponseUserCommons {
  code              : number,
  roles             : ResponseData,
  userContactTypes? : ResponseData,
  userGroups?       : ResponseData,
  userSchedules?    : ResponseData,
}

// ****************************************************************************************************
// ** ADMINISTRACIÓN
// ****************************************************************************************************

// ****************************************************************************************************
// ** COMÚNS
// ****************************************************************************************************
export interface ResponseCommons {
  code          : number,
  priorities    : ResponseData,
  stages        : ResponseData,
  states        : ResponseData,
  types         : ResponseData,
  userCommons?  : ResponseUserCommons,
}
