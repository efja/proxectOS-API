// ##################################################################################################
// ## IMPORTACIÓNS
// ##################################################################################################
import qs from 'qs';
import clone from 'rfdc/default';
import { checkType } from './check-types.helper';


// ##################################################################################################
// ## CLASE AssignedResource
// ##################################################################################################
export class APIFilter {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    public arrayFilters: any[] = [];
    public booleanFilters: any[] = [];
    public dateFilters: any[] = [];
    public numberFilters: any[] = [];
    public objectIdFilters: any[] = [];
    public orderByFilters: any[] = [];
    public stringFilters: any[] = [];

    public includes: boolean = false;
    public logicalOperator: string = "";

    // Relacións

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(filters?: any) {
        this.parseFilters(qs.parse(filters));
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
    /**
     * Extrae os filtros das propiedades dun obxecto e clasificaos polo tipo de datos.
     *
     * @param filters obxecto cunha colección de filtros como parámetros
     */
    private parseFilters(filters: any): void {
        for (let paramKey in filters as Object) {
            let paramValue = filters[paramKey];

            if (paramKey.toLowerCase() === 'sort' || paramKey.toLowerCase() === 'orderby') {
                this.orderByFilters = paramValue.split(',');
            } else if (paramKey.toLowerCase() === 'includes') {
                this.includes = Boolean(paramValue);
            } else if (
                paramKey.toLowerCase() === 'logical' ||
                paramKey.toLowerCase() === 'operator' ||
                paramKey.toLowerCase() === 'op'
            ) {
                // só pode mandarse un operador lóxico.
                // Se se manda máis de un sobreescribese co valor do último
                this.logicalOperator = paramValue;
            } else {
                let checksTypes = checkType(paramValue);

                if (checksTypes.isBoolean) {
                    this.booleanFilters.push(
                        { [paramKey]: Boolean(paramValue) }
                    );
                } else if (checksTypes.isNumber) {
                    this.numberFilters.push(
                        { [paramKey]: Number(paramValue) }
                    );
                } else if (checksTypes.isDate) {
                    this.dateFilters.push(
                        { [paramKey]: paramValue }
                    );
                } else if (checksTypes.isObjectID) {
                    this.objectIdFilters.push(
                        { [paramKey]: paramValue }
                    );
                } else if (checksTypes.isArray) {
                    this.arrayFilters.push(
                        { [paramKey]: paramValue }
                    );
                } else {
                    this.stringFilters.push(
                        { [paramKey]: paramValue }
                    );
                }
            }
        }
    }

    /**
     * Devolve un obxecto coas distintas coleccións de parámetros de búsqueda.
     *
     * @returns Object
     */
    public getQueryObj(): Object {
        let result: Object = {};

        result['includes'] = this.includes;

        if (this.orderByFilters.length > 0) {
            result['orderBy'] = this.orderByFilters;
        }

        this.getObjectKeyValue(this.arrayFilters, result);
        this.getObjectKeyValue(this.booleanFilters, result);
        this.getObjectKeyValue(this.dateFilters, result);
        this.getObjectKeyValue(this.numberFilters, result);
        this.getObjectKeyValue(this.objectIdFilters, result);
        this.getObjectKeyValue(this.stringFilters, result);

        return result;
    }

    /**
     * Prepara un string cos parámetros dunha query por url a partir dos distintos tipo sde coleccións.
     *
     * @returns string
     */
    public getQueryString(): string {
        let result: Object = this.getQueryObj();

        const queryParameters = qs.stringify(
            result,
            { arrayFormat: 'brackets' }
        );

        return queryParameters;
    }

    // **********************************************************************************************
    // ** UTILIDADES
    // **********************************************************************************************
    /**
     * Incorpora os atributos dun obxecto como elementos individuais dun array nominativo.
     *
     * @param obj obxecto a tratar
     * @param result array nominativo no que introducir os cambios
     */
    private getObjectKeyValue(obj: any[], result: Object) {
        for (let i = 0; i < obj.length; i++) {
            let property = obj[i];

            // Como indice do array empregase a key da propiedade e como valor todo o seu contido
            // o indice 0 é necesario porque Object.keys e Object.values devolve un array e neste caso de só un elemento
            result[Object.keys(property)[0]] = Object.values(property)[0];
        }
    }

    /**
     * Copia as propiedades do obxecto pasado como parámetro no obxecto actual.
     *
     * @param original un obxecto APIFilter
     * @param properties lista de propiedades a copiar
     */
    public copy(original: APIFilter, properties: string[] = Object.keys(this)) {
        for (let property of properties) {
            this[property] = clone(original[property]);
        }
    }
}
