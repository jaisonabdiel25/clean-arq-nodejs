import { CustomError, RoleEntity } from "../../domain";

export class RoleMapper {

    static roleEntityFromObject(object: { [key: string]: any }) {

        const { id, name, } = object;

        if (!id) throw CustomError.badRequest('Missing id');

        if (!name) throw CustomError.badRequest('Missing name');

        return new RoleEntity(
            id,
            name,
        )
    }
}