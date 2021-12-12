import HttpStatus from 'http-status-codes';
import { ResponseCommons, ResponseData, ResponseMe, ResponseUserCommons, ResultQuery } from "../interfaces/response-data.interface";

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
