import { IncomingHttpHeaders } from "http";
import { AccountMapper, IAccountRepository } from "../..";
import { jwtAdapter } from "../../../config";
import { prisma } from "../../../data/postgress";
import { AccountEntity, CustomError, RegisterAccountDto } from "../../../domain";


export class AccountRepository implements IAccountRepository {

    async registerAccount(account: RegisterAccountDto, headers: IncomingHttpHeaders): Promise<AccountEntity> {
        try {

            const payload = await jwtAdapter.decodeToken<{id: string}>(headers);

            const newAccount = await prisma.account.create(({
                data: {
                    name: account.name,
                    balance: account.amount,
                    userId: account.userId,
                    amount: account.amount,
                    description: account.description,
                    createBy: payload?.id
                }
            }))

            return AccountMapper.accountFromObject(newAccount);

        } catch (error) {
            throw  CustomError.internal('Internal server error');
        }
    }
}