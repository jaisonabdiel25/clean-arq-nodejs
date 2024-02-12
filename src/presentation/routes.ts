import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MailRoutes } from "./mail/routes";
import { RolesRoutes } from "./role/routes";





export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        // definir las rutas
        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/mail', MailRoutes.routes)
        router.use('/api/role', RolesRoutes.routes)

        return router;
    }
}