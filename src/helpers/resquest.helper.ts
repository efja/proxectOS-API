import HttpStatus from 'http-status-codes';
import superagent from 'superagent';
import { ResponseCommons, ResponseData, ResponseMe, ResponseUserCommons, ResultQuery } from "../interfaces/response-data.interface";
import { APIFilter } from './uri-filter.helper';

/**
 * Analiza os códigos de estado que se devolven nas respostas da lista pasada. Asúmese que o resultado
 * será atopado ou non atopado, para esta versión do helper non se analizan errors na reuqest.
 *
 * @param list lista de resultados a analizar
 * @returns código de estado real
 */
export function getStatusCode(list: any[]): number {
    let result = HttpStatus.NOT_FOUND;

    let totalOK = 0;

    list.forEach(item => {
        if (item) {
            if (item.code == HttpStatus.OK) {
                totalOK++;
            }
        }
    });

    switch (totalOK) {
        case list.length:
            result = HttpStatus.OK;
            break;
        case 0:
            result = HttpStatus.NOT_FOUND;
            break;
        default:
            result = HttpStatus.PARTIAL_CONTENT;
            break;
    }

    return result;
}

/**
 * Helper para xerar peticións estándar para un getAll a un servicio dos modelos de datos.
 *
 * @param service servicio para facer a consulta
 * @param arrayFilters filtros especiais a incluir
 * @param queryParams parámetros pasados na URI
 * @param copyQuery parámetros que se queren copiar da URI
 * @param limit limite de resultados
 * @param offset páxina de resultados
 * @returns ResponseData
 */
export async function queryGetAll(service: any, arrayFilters: any, queryParams: APIFilter, copyQuery: string[], limit: Number = 0, offset: Number = 0): Promise<ResponseData> {
  const queryFilters = new APIFilter();

  queryFilters.copy(queryParams, copyQuery);
  queryFilters.arrayFilters = arrayFilters;

  return await service.getAll(queryFilters.getQueryString(), limit, offset);
}

/**
 * Helper para xerar peticións estándar para un getAll a un servicio dos modelos de datos.
 *
 * @param service servicio para facer a consulta
 * @param arrayFilters filtros especiais a incluir
 * @param queryParams parámetros pasados na URI
 * @param copyQuery parámetros que se queren copiar da URI
 * @param limit limite de resultados
 * @param offset páxina de resultados
 * @returns ResponseData
 */
export async function queryGetAll2(service: any, arrayFilters: any, limit: Number = 0, offset: Number = 0): Promise<ResponseData> {
  const queryFilters = new APIFilter();
  queryFilters.arrayFilters = arrayFilters;

  return await service.getAll(queryFilters.getQueryString(), limit, offset);
}

/**
 * Helper para obter un recurso externo.
 *
 * @param partialUri parte final da URI do recurso que se quere consumir
 * @returns ResponseData
 */
export async function getExternalResource(uri): Promise<ResponseData> {
  let result: ResultQuery = {
    response: null,
  };

  let resultData: ResponseData = {
    code: null,
    data: null,
  }

  let queryResult = null;

  try {
    queryResult = (await superagent.get(uri));

    resultData.code = queryResult.body.code;
    resultData.data = queryResult.body.data;
  } catch (error) {
    resultData.code = error.status;
    resultData.data = error.message;
  }

  return resultData;
}
