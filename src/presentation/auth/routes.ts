import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoriesImpl, AuthServiceImpl, TokenMiddelware } from "../../infrastructure";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const repositories = new AuthRepositoriesImpl();
        const authRepository = new AuthServiceImpl(repositories);

        const controller = new AuthController(authRepository);


        // definir las rutas
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
        router.get('/', [TokenMiddelware.verifyToken], controller.getUsers);

        return router;
    }
}