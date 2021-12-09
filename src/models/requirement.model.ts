// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CustomBaseEntity } from "./custom-base-entity.model";

import { AssignedUser } from './assigned-user.model';
import { CommentApp } from './commentapp.model';
import { Priority } from "./priority.model";
import { RepositoryApp } from "./repositoryapp.model";
import { TypeApp } from "./typeapp.model";
import { User } from "./user.model";
import { UserGroup } from './user-group.model';
import { AssignedResource } from './assigned-resource.model';
import { AssignedStage } from './assigned-stage.model';

// ####################################################################################################
// ## CLASE Requirement
// ####################################################################################################
export class Requirement extends CustomBaseEntity {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    public startDate?           : Date;
    public finishDate?          : Date;
    public targetStartDate?     : Date;
    public targetFinishDate?    : Date;

    public name                 : string;
    public description          : string;

    // Relacións reflexivas
    public dependencies         : Requirement[] = [];

    // Relacións usuarios
    public adminUsers           : AssignedUser[] = [];

    public assignedUsers        : AssignedUser[] = [];

    public createdBy            : User;

    public visibleToUserGroups  : UserGroup[] = [];

    // Relacións recursos
    public estimatedResources   : AssignedResource[] = [];

    public resourcesConsumed    : AssignedResource[] = [];

    public repositories         : RepositoryApp[] = [];

    // Relacións
    public assignedStages       : AssignedStage[] = [];

    public comments             : CommentApp[] = [];

    public priority             : Priority;

    public type                 : TypeApp;

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(obj?: Partial<Requirement>) {
        super();
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
}
