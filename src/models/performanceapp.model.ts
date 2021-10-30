// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CustomBaseEntity } from "./custom-base-entity.model";

import { AssignedResource } from './assigned-resource.model';
import { AssignedUser } from './assigned-user.model';
import { AssignedStage } from './assigned-stage.model';
import { CommentApp } from './commentapp.model';
import { Priority } from './priority.model';
import { Type } from './type.model';
import { User } from './user.model';
import { UserGroup } from './user-group.model';

// ####################################################################################################
// ## CLASE PerformanceApp
// ####################################################################################################
export class PerformanceApp extends CustomBaseEntity {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    public startDate?               : Date;
    public finishDate?              : Date;
    public targetStartDate?         : Date;
    public targetFinishDate?        : Date;

    public name                     : string;
    public description              : string;

    // Relacións
    public performances             : PerformanceApp[] = [];

    public assignedStages           : AssignedStage[] = [];

    public priority                 : Priority;
    public type                     : Type;

    public createdBy                : User;

    public assignedUsers            : AssignedUser[] = [];

    public visibleToUserGroups      : UserGroup[] = [];

    public estimatedResources       : AssignedResource[] = [];
    public resourcesConsumed        : AssignedResource[] = [];

    public comments                 : CommentApp[] = [];

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(obj?: Partial<PerformanceApp>) {
        super();
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
}
