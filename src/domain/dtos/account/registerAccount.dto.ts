import { CustomError } from "../../errors/custom.errors";

export class RegisterAccountDto {
    constructor(
        public userId: string,
        public amount: number,
        public balance: number,
        public name?: string,
        public description?: string,
        public active?: boolean
    ) { }

    static registerAccount(object: { [key: string]: any }): [string[], RegisterAccountDto?] {
        const { userId, amount, balance, name, description, active } = object
        try {
            return [
                [],
                new RegisterAccountDto(userId, amount, balance, name, description, active)
            ];
        } catch (error) {
            throw CustomError.internal();
        }
    }
}