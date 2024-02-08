import { ZodError } from "zod";

import { authSchema } from "../../validations/auth/auth.schema";
import { CustomError } from "../../errors/custom.errors";


export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
        public role?: string[],
        public img?: string,
    ) { }

    static RegisterUser(object: { [key: string]: any }): [string[], RegisterUserDto?] {
        const { name, email, password, role, img } = object
        try {
            authSchema.parse({ name, email, password, role, img });
            return [
                [],
                new RegisterUserDto(name, email, password, role, img)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw CustomError.internal();
        }
    }
}