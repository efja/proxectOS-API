import moment from 'moment';
import { Types } from 'mongoose';
import {
    isJSONValue,
    isJSONObject,
    isJSONArray,
    isString,
    isNumber,
    isBoolean,
    isNull,
    isUndefined,
    JSONObject,
    JSONValue,
    JSONArray,
} from "types-json";

import { ResultCheckType } from '../interfaces/response-data.interface';
import { getClassName } from './entity.helper';

export function checkType(obj) : ResultCheckType {
    let result : ResultCheckType = {
        getObjectType   : (obj) ? getClassName(obj) : false,
        isArray         : (obj) ? isJSONArray(obj) : false,
        isBoolean       : (obj) ? isBoolean(obj) : false,
        isDate          : (obj) ? moment(new Date(obj.toString())).isValid() : false,
        isNull          : isNull(obj),
        isNumber        : (obj) ? isNumber(obj) : false,
        isObject        : false,
        isObjectID      : false,
        isString        : (obj) ? isString(obj) : false,
        isUndefined     : (obj != null) ? isUndefined(obj) : false,
    };

    if (obj) {
        try {
            if (!result.isArray && result.isString) {
                result.isArray = isJSONArray(JSON.parse(obj));
            }
        } catch { }

        try {
            if (!result.isObjectID && (result.isString)) {
                result.isObjectID = (String)(new Types.ObjectId(obj)) === obj;
            }
        } catch { }
    }

    return result;
}