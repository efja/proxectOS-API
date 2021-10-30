// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CustomBaseEntity } from "./custom-base-entity.model";

import { AssignedUser } from './assigned-user.model';
import { CommentApp } from './commentapp.model';
import { PerformanceApp } from './performanceapp.model';
import { Priority } from "./priority.model";
import { RepositoryApp } from "./repositoryapp.model";
import { Type } from "./type.model";
import { User } from "./user.model";

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

    // Relacións
    public priority             : Priority;
    public type                 : Type;

    public createdBy            : User;

    public adminUsers           : AssignedUser[] = [];

    public performances         : PerformanceApp[] = [];

    public repositories         : RepositoryApp[] = [];

    public comments             : CommentApp[] = [];

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
