export interface AssignedUserCollections {
    assignedUsers       : string[],
    assignedRoles       : string[],
    assignedUserGroups  : string[],
}

export interface ProjectCollections {
    assignedUsers?  : string[],
    requirements?   : string[],
    repositories?   : string[],
    comments?       : string[],
}

export interface UserCollections {
    contacts?           : string[],
    defaultUserGroups?  : string[],
}
