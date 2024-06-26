import { Request, Response } from "express"
import { CustomError, SendMailDto, } from "../../domain";
import { MailService } from "../../infrastructure";



export class MailController {

    constructor(
        private readonly _mailService: MailService
    ) { }

    private handleErrors(error: unknown, res: Response) {
        if (error instanceof CustomError) return res.status(error.statusCode).send({ error: error.message });

        if (error instanceof Error) return res.status(500).send({ error: error.message });
    }



    sendMail = async (req: Request, res: Response) => {
        try {
            const [error, registerUserDto] = await SendMailDto.sendMail(req.body);

            if (error.length > 0) return res.status(412).send({ error });
            const result = await this._mailService.sendMail(registerUserDto!);

            res.json({ accepted: result.accepted, rejected: result.rejected })
        } catch (error) {
            this.handleErrors(error, res)
        }
    }

}