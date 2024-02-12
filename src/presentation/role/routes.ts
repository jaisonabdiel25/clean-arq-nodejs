import { Router } from "express";
import { RoleController } from "./controller";
import { AuthRepositoriesImpl, RoleRepositeries, RoleService, TokenMiddelware, schemaValidations } from "../../infrastructure";
import { roleSchema } from "../../domain";


export class RolesRoutes {

    static get routes(): Router {
        const router = Router();


        const roleRepository = new RoleRepositeries();
        const authRepositorie =  new AuthRepositoriesImpl()
        const roleService = new RoleService(roleRepository, authRepositorie)

        const controller = new RoleController(roleService);

        // definir las rutas
        router.post('/:id', [TokenMiddelware.verifyToken, schemaValidations(roleSchema)], controller.addRole);

        return router;
    }
}