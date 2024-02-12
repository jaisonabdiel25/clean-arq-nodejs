import { IRoleRepositories } from "../..";
import { prisma } from "../../../data/postgress";
import {  CustomError, RoleEntity, UserRoleEntity } from "../../../domain";
import { RoleMapper } from "../../mappers/Role.Mapper";
import { UserRoleMapper } from "../../mappers/UserRole.mapper";

export class RoleRepositeries implements IRoleRepositories {

    async getRoleById(id: string): Promise<RoleEntity> {

        try {
            const role = await prisma.role.findUnique({ where: { id } })

            if (!role) throw CustomError.notFound('Role not found')

            return RoleMapper.roleEntityFromObject(role)
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw  CustomError.internal('Internal server error');
        }
    }

    async saveRole(userId: string, roleId: string): Promise<UserRoleEntity> {

        try {
            const role = await prisma.userRole.create({
                data: {
                    userId,
                    roleId
                }  
            })

            return UserRoleMapper.roleEntityFromObject(role)
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw  CustomError.internal('Internal server error');
        }
    }
}