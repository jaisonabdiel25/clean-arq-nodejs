import { Router } from "express";
import { AccountController } from "./controller";
import { AccountRepository, AccountService, AuthRepositoriesImpl, TokenMiddelware, schemaValidations } from "../../infrastructure";
import { registerAccountSchema } from "../../domain";


export class AccountRoutes {

    static get routes(): Router {
        const router = Router();

        //instanciar repositorios y servicios requeridos
        const authRepository = new AuthRepositoriesImpl();
        const accountRepository = new AccountRepository();
        const accountService = new AccountService(accountRepository, authRepository);

        // instanciar el controlador
        const controller = new AccountController(accountService);

        // definir las rutas
        router.post('/', [TokenMiddelware.verifyToken, schemaValidations(registerAccountSchema)], controller.registerAccount);

        return router;
    }
}