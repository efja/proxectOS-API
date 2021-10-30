// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CustomBaseEntity } from "./custom-base-entity.model";

import { Role } from './role.model';
import { User } from './user.model';
import { UserGroup } from './user-group.model';

// ####################################################################################################
// ## CLASE AssignedPermissions
// ####################################################################################################
export class AssignedUser extends CustomBaseEntity {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    // Relacións
    public createdBy            : User;

    public assignedUser         : User;
    public assignedRoles        : Role[] = [];
    public assignedUserGroups   : UserGroup[] = [];

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(obj?: Partial<AssignedUser>) {
        super();
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
}
