import { IncomingHttpHeaders } from "http";
import { AccountEntity, RegisterAccountDto } from "../../../domain";



export abstract class IAccountService {
    abstract registerAccount(account: RegisterAccountDto, headers: IncomingHttpHeaders): Promise<AccountEntity>;
}