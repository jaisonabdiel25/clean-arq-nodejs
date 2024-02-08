import { Router } from "express";
import { AuthRoutes } from "./auth/routes";
import { MailRoutes } from "./mail/routes";





export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        // definir las rutas
        router.use('/api/auth', AuthRoutes.routes)
        router.use('/api/mail', MailRoutes.routes)

        return router;
    }
}