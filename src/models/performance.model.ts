// ####################################################################################################
// ## IMPORTS
// ####################################################################################################
import { Comment } from './comment.model';
import { Priority } from './priority.model';
import { ResourcesEstimation } from './resoruces-estimation.model';
import { Role } from './role.model';
import { Stage } from './stage.model';
import { State } from './state.model';
import { Type } from './type.model';
import { User } from './user.model';

// ####################################################################################################
// ## CLASS Performance
// ####################################################################################################
export class Performance {
    // ************************************************************************************************
    // ** ATTRIBUTES
    // ************************************************************************************************
    public creationDate             : Date;
    public startDate                : Date;
    public finishDate               : Date;
    public targetStartDate          : Date;
    public targetFinishDate         : Date;

    public name                     : string;
    public description              : string;

    public totalEstimatedHours      : number;
    public totalHoursConsumed       : number;

    public totalEstimatedResources  : number;
    public totalResourcesConsumed   : number;

    // Relations
    public stage                    : Stage;
    public state                    : State;
    public priority                 : Priority;
    public type                     : Type;

    public assignedRoles            : Role[];

    public createdBy                : User;
    public assignedUsers            : User[];
    public validatingUsers          : User[];

    public estimatedHours           : ResourcesEstimation;
    public hoursConsumed            : ResourcesEstimation;

    public estimatedResources       : ResourcesEstimation;
    public resourcesConsumed        : ResourcesEstimation;

    public comments                 : Comment[];

    // ************************************************************************************************
    // ** CONSTRUCTOR
    // ************************************************************************************************
    constructor(obj?: Partial<Performance>) {
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** METHODS
    // ************************************************************************************************
}
