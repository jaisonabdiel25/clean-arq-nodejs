import { CustomError, UserRoleEntity } from "../../domain";

export class UserRoleMapper {

    static roleEntityFromObject(object: { [key: string]: any }) {

        const { id, userId, roleId } = object;

        if (!id) throw CustomError.badRequest('Missing id');

        if (!userId) throw CustomError.badRequest('Missing userId');

        if (!roleId) throw CustomError.badRequest('Missing roleId');

        return new UserRoleEntity(
            id,
            userId,
            roleId
        )
    }
}