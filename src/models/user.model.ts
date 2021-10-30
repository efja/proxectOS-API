// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { CustomBaseEntity } from "./custom-base-entity.model";

import { UserContact } from "./user-contact.model";
import { UserGroup } from './user-group.model';
import { UserSchedule } from './user-schedule.model';

// ####################################################################################################
// ## CLASE User
// ####################################################################################################
export class User extends CustomBaseEntity {
    // ************************************************************************************************
    // ** ATRIBUTOS
    // ************************************************************************************************
    public name                 : string;
    public firstSurname         : string;
    public secondSurname        : string;

    public login                : string;
    public password             : string;

    public isCustomer           : boolean;

    public salary               : number;
    public flexibleSchedule     : boolean;
    public vacantions           : Date[];

    // Relacións
    public userSchedule         : UserSchedule;
    public contacts             : UserContact[] = [];

    public defaultUserGroups    : UserGroup[] = [];

    // ************************************************************************************************
    // ** CONSTRUTOR
    // ************************************************************************************************
    constructor(obj?: Partial<User>) {
        super();
        Object.assign(this, obj);
    }

    // ************************************************************************************************
    // ** MÉTODOS
    // ************************************************************************************************
}
