import { SentMessageInfo } from "nodemailer";
import { MailService as MailServiceConfig } from "../../../config/mail";
import { SendMailDto } from "../../../domain";
import { IMailservice } from "../interfaces/mail.interface";


export class MailService implements IMailservice {

    constructor(
    ) { }

    async sendMail(sendMailDto: SendMailDto): Promise<SentMessageInfo> {

        try {

            // Here we will implement the logic to send the mail
            const mailConfig = new MailServiceConfig()
            return await mailConfig.sendEmail(sendMailDto);

        } catch (error) {
            throw new Error("Method not implemented.");
        }

    }

}