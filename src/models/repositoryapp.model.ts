// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CustomBaseEntity } from "./custom-base-entity.model";

import { AssignedUser } from './assigned-user.model';
import { CommentApp } from './commentapp.model';
import { User } from "./user.model";
import { UserGroup } from './user-group.model';

// ####################################################################################################
// ## CLASE RepositoryApp
// ####################################################################################################@Entity()
export class RepositoryApp extends CustomBaseEntity {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    public expirationDate?      : Date;

    public name                 : string;
    public description          : string;
    public uri                  : string;

    // Relacións
    public createdBy            : User;

    public assignedUsers        : AssignedUser[] = [];

    public visibleToUserGroups  : UserGroup[] = [];

    public comments             : CommentApp[] = [];

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(obj?: Partial<RepositoryApp>) {
        super();
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
}
