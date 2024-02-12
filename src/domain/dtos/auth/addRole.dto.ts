
export class AddRoleDto {
    constructor(
        public userId: string,
    ) { }

    static addRole(object: { [key: string]: any }): [string[], AddRoleDto?] {
        const { userId } = object
        try {
            return [
                [],
                new AddRoleDto(userId)
            ];
        } catch (error) {
            throw error;
        }
    }
}