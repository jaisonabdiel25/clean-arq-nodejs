import { ZodError } from "zod";

import { authSchema } from "../../validations/auth/auth.schema";
import { CustomError } from "../../errors/custom.errors";


export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
        public status: boolean,
        public phone?: string,
        public img?: string,
    ) { }

    static RegisterUser(object: { [key: string]: any }): [string[], RegisterUserDto?] {
        const { name, email, password, role, img, phone } = object
        try {
            authSchema.parse({ name, email, password, img, phone });
            return [
                [],
                new RegisterUserDto(name, email, password, img, phone)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw CustomError.internal();
        }
    }
}