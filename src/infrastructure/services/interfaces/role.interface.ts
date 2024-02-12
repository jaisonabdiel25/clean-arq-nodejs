import { AddRoleDto,  UserRoleEntity, } from '../../../domain';


export abstract class IRoleService {
    abstract addRole(id: string, request: AddRoleDto): Promise<UserRoleEntity>;
}