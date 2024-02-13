import { AccountEntity, RegisterAccountDto } from "../../../domain";



export abstract class IAccountService {
    abstract registerAccount(account: RegisterAccountDto): Promise<AccountEntity>;
}