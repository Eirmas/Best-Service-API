import Mail from '../domain/Mail';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import MailerException from '../exceptions/MailerException';

dotenv.config();

export default class MailerService {
    private readonly mailer: import('nodemailer/lib/mailer');

    constructor() {
        this.mailer = nodemailer.createTransport({
            host: process.env.MAIL_URL,
            port: parseInt(process.env.MAIL_PORT),
            secure: process.env.MAIL_SECURE === 'true',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
    }

    public send(mail: Mail): void {
        if (this.validate(mail)) {
            const mailOptions = {
                from: process.env.MAIL_FROM,
                to: process.env.MAIL_TO,
                subject: mail.subject,
                html: mail.contents
            };
            // eslint-disable-next-line
            this.mailer.sendMail(mailOptions, (error: any, info: any) => {
                if (error || !info) {
                    throw new MailerException(false, 'error-sending-mail');
                } else if (info.envelope.from === "") {
                    throw new MailerException(false, 'error-receiving-mail');
                }
            });
        } else {
            throw new MailerException(false, 'invalid-mail-data');
        }
    }

    public validate(mail: Mail): boolean {
        const isValidString = (v: string) => !!v && v.length > 0 && typeof v === 'string'; 

        return isValidString(mail.contents) && isValidString(mail.subject);

    }
}
