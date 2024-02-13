import { AccountEntity, CustomError } from "../../domain";

export class AccountMapper {

    static accountFromObject(object: { [key: string]: any }) {

        const { id, name, balance, amount, description, createAt, createdAt, active, userId, updatedAt } = object;

        if (!id) throw CustomError.badRequest('Missing id');

        if (!balance) throw CustomError.badRequest('Missing balance');

        if (!amount) throw CustomError.badRequest('Missing amount');

        if (!createAt) throw CustomError.badRequest('Missing createAt');

        if (!userId) throw CustomError.badRequest('Missing userId');


        return new AccountEntity(
            id,
            amount,
            balance,
            userId,
            active,
            createdAt,
            updatedAt,
            description,
            name,
        )
    }
}