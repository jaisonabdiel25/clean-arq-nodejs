import { Router } from "express";
import { MailController } from "./controller";
import { MailService, TokenMiddelware } from "../../infrastructure";



export class MailRoutes {

    static get routes(): Router {
        const router = Router();

        const mailService = new MailService();
        const controller = new MailController(mailService);


        // definir las rutas
        router.post('/send', [TokenMiddelware.verifyToken], controller.sendMail);

        return router;
    }
}