// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CustomBaseEntity } from "./custom-base-entity.model";

import { AssignedStage } from './assigned-stage.model';
import { AssignedUser } from './assigned-user.model';
import { CommentApp } from './commentapp.model';
import { RepositoryApp } from './repositoryapp.model';
import { Requirement } from './requirement.model';
import { User } from './user.model';

// ####################################################################################################
// ## CLASE Project
// ####################################################################################################
export class Project extends CustomBaseEntity {
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
    public assignedStages       : AssignedStage[] = [];

    public createdBy            : User;

    public adminUsers           : AssignedUser[] = [];

    public productOwner         : User;

    public requirements         : Requirement[] = [];

    public repositories         : RepositoryApp[] = [];

    public comments             : CommentApp[] = [];

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(obj?: Partial<Project>) {
        super();
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
}
