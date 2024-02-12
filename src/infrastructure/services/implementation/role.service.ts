import { AuthRepositoriesImpl, IRoleRepositories, IRoleService } from "../..";
import { AddRoleDto, CustomError, UserRoleEntity } from "../../../domain";


export class RoleService implements IRoleService{

    constructor(
        private readonly _roleRepositorie: IRoleRepositories,
        private readonly _authRepositorie: AuthRepositoriesImpl
    ){}

    async addRole(id: string, request: AddRoleDto): Promise<UserRoleEntity> {

        try {
            
            // buscar si el usuario existe
            const user = await this._authRepositorie.getUserById(request.userId);
            if(!user) throw CustomError.notFound('User not found')


            // buscar si el rol existe
            const role = await this._roleRepositorie.getRoleById(id);
            if(!role) throw CustomError.notFound('Rol not found')

            
            return await this._roleRepositorie.saveRole(request.userId, id);
           
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal('Internal server error');
        }

    }
    
}