import Mail from '../domain/Mail';
import nodemailer from 'nodemailer';

export default class MailerService {
    private readonly mailer;

    constructor() {
        this.mailer = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
        });
    }

    public send(mail: Mail): void {
        //TODO: Error handling.
        this.mailer.sendMail({
            from: process.env.MAIL_FROM,
            to: process.env.MAIL_TO,
            subject: mail.subject,
            text: JSON.stringify(mail.contents)
        });
    }
}
