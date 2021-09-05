// ####################################################################################################
// ## IMPORTS
// ####################################################################################################
import { Repository } from './repository.model';
import { Requirement } from './requirement.model';
import { Role } from './role.model';
import { Stage } from './stage.model';
import { State } from './state.model';
import { User } from './user.model';

// ####################################################################################################
// ## CLASS Project
// ####################################################################################################
export class Project {
    // ************************************************************************************************
    // ** ATTRIBUTES
    // ************************************************************************************************
    public creationDate     : Date;
    public startDate        : Date;
    public finishDate       : Date;
    public targetStartDate  : Date;
    public targetFinishDate : Date;

    public name             : string;
    public description      : string;

    // Relations
    public stage            : Stage;
    public state            : State;
    public requirements     : Requirement[];

    public assignedRoles    : Role[];

    public assignedUsers    : User[];
    public validatingUsers  : User[];

    public repositories     : Repository[];

    public comments         : Comment[];

    // ************************************************************************************************
    // ** CONSTRUCTOR
    // ************************************************************************************************
    constructor(obj?: Partial<Project>) {
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** METHODS
    // ************************************************************************************************
}
