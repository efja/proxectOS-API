import { Role } from "../models/role.model";
import { UserGroup } from "../models/user-group.model";
import { User } from "../models/user.model";
import { AssignedUser } from '../models/assigned-user.model';
import { Requirement } from '../models/requirement.model';
import { RepositoryApp } from '../models/repositoryapp.model';
import { CommentApp } from '../models/commentapp.model';
import { UserContact } from '../models/user-contact.model';

export interface AssignedUserCollections {
    assignedUsers       : User[],
    assignedRoles       : Role[],
    assignedUserGroups  : UserGroup[],
}

export interface ProjectCollections {
    assignedUsers?  : AssignedUser[],
    requirements?   : Requirement[],
    repositories?   : RepositoryApp[],
    comments?       : CommentApp[],
}

export interface UserCollections {
    contacts?           : UserContact[],
    defaultUserGroups?  : UserGroup[],
}
