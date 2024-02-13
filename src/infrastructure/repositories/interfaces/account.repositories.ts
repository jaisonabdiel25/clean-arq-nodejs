import { AccountEntity, RegisterAccountDto } from "../../../domain";

export abstract class IAccountRepository {
    abstract registerAccount(account: RegisterAccountDto): Promise<AccountEntity>;
}