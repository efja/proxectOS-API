import { MODELS_PATHS } from './models-paths.helper';
import { UserGroup } from '../models/user-group.model';

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

export function getUserGroup(groupId, allGrupos: UserGroup[]): UserGroup {
    let result = allGrupos.find(g => g.id == groupId);

    return result;
}

export function getUserGroups(groupsIds, allGrupos: UserGroup[]): UserGroup[] {
    let result = [];

    groupsIds.forEach(groupId => {
        let temp = getUserGroup(groupId, allGrupos);

        if (temp != null) {
            result.push(temp);
        }
    });

    return result;
}
