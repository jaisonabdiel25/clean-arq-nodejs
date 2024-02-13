import { Request, Response } from 'express';
import { CustomError, RegisterAccountDto } from '../../domain';
import { IAccountService } from '../../infrastructure';


export class AccountController {
    constructor(
        private _serviceAccount: IAccountService
    ) { }

    registerAccount = async (req: Request<unknown, unknown, RegisterAccountDto>, res: Response) => {

        try {
            const result = await this._serviceAccount.registerAccount(req.body);
            res.status(200).json(result);
        } catch (error) {
            CustomError.handleErrors(error, res);
        }
    }
}