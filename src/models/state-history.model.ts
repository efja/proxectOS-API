// ####################################################################################################
// ## IMPORTS
// ####################################################################################################
import { Performance } from './performance.model';
import { Project } from './project.model';
import { Requirement } from './requirement.model';
import { Role } from './role.model';
import { Stage } from './stage.model';
import { State } from './state.model';
import { User } from './user.model';

// ####################################################################################################
// ## CLASS StateHistory
// ####################################################################################################
export class StateHistory {
    // ************************************************************************************************
    // ** ATTRIBUTES
    // ************************************************************************************************
    public creationDate : string;
    public log          : string;

    // Relations
    public oldState     : State;
    public newState     : State;

    public targetRoles  : Role[];

    public createdBy    : User;

    public project?     : Project;
    public performance? : Performance;
    public requirement? : Requirement;
    public stage?       : Stage;

    // ************************************************************************************************
    // ** CONSTRUCTOR
    // ************************************************************************************************
    constructor(obj?: Partial<StateHistory>) {
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** METHODS
    // ************************************************************************************************
}
