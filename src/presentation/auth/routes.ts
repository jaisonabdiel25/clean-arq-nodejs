import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoriesImpl, AuthServiceImpl, TokenMiddelware, schemaValidations } from "../../infrastructure";
import { roleSchema } from "../../domain";


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
        router.post('/token', controller.generateToken);
        //router.post('/role/:id', [TokenMiddelware.verifyToken, schemaValidations(roleSchema)], controller.addRole);

        return router;
    }
}