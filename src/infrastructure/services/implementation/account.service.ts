import { IncomingHttpHeaders } from "http";
import { IAccountRepository, IAccountService, IAuthRepositories } from "../..";
import { AccountEntity, CustomError, RegisterAccountDto } from "../../../domain";

export class AccountService implements IAccountService {
    constructor(
        private _accountRepository: IAccountRepository,
        private _authRepository: IAuthRepositories
    ) { }

    async registerAccount(account: RegisterAccountDto, headers: IncomingHttpHeaders): Promise<AccountEntity> {

        try {

            const user = await this._authRepository.getUserById(account.userId);

            if (!user) throw CustomError.notFound('User not found');

            return await this._accountRepository.registerAccount(account, headers);
        } catch (error) {
            if(error instanceof CustomError) throw error;
            throw CustomError.internal();
        }

    }
}