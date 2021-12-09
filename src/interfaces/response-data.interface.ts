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
  response  : ResponseData,
  id?       : string,
  from?     : number,
  limit?    : number,
}
