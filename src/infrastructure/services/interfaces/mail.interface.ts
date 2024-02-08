import { SentMessageInfo } from 'nodemailer';
import { SendMailDto } from '../../../domain';


export abstract class IMailservice {
    abstract sendMail(sendMailDto: SendMailDto): Promise<SentMessageInfo>;
}