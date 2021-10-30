// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CustomBaseEntity } from "./custom-base-entity.model";

import { CommentApp } from './commentapp.model';
import { User } from './user.model';
import { Stage } from './stage.model';
import { State } from "./state.model";

// ####################################################################################################
// ## CLASE AssignedPermissions
// ####################################################################################################
export class AssignedStage extends CustomBaseEntity {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    public startDate?           : Date;
    public finishDate?          : Date;
    public targetStartDate?     : Date;
    public targetFinishDate?    : Date;

    // Relacións
    public createdBy            : User;

    public stage                : Stage;

    public currentState         : State;

    public validationUsers      : User[] = [];

    public comments             : CommentApp[] = [];

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(obj?: Partial<AssignedStage>) {
        super();
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
}
