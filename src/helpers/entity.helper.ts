import { MODELS_PATHS } from './models-paths.helper';

export async function getEntityForUpdate<T>(entity: T, className: string) {
    let result = await createClassFromName(className);

    for (let i in entity) {
        result[i] = entity[i];
    }

    return result;
}

export async function createClassFromName(name: string) {
    var ns = await import(`../models/${MODELS_PATHS[name]}`);

    return new ns[name]();
}

export function getClassProperty(item, prop) {
    return item.__meta.props.find(x => x.name == prop)
}

export function getClassName(item) {
    return item.__meta.name
}
