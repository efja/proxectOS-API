import { Role } from "../models/role.model";
import { UserGroup } from "../models/user-group.model";
import { User } from "../models/user.model";

export interface AssignedUserCollections {
    assignedUsers       : User [],
    assignedRoles       : Role [],
    assignedUserGroups  : UserGroup [],
}
