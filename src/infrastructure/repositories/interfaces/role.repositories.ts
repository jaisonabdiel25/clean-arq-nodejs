
import { RoleEntity, UserRoleEntity } from '../../../domain';

export abstract class IRoleRepositories {
    abstract getRoleById(id: string): Promise<RoleEntity>;
    abstract saveRole(userId: string, roleId: string): Promise<UserRoleEntity>;
}