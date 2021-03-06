import { JsonController, Body, Post } from 'routing-controllers';
import MailerService from '../services/MailerService';
import RecpathaService from '../services/ReCaptchaService';
import Mailer from '../domain/Mailer';

@JsonController()
export class MailerController {
    private mailerService: MailerService;
    constructor() {
        this.mailerService = new MailerService();
    }

    @Post('/mail')
    async post(@Body() body: Mailer) {
        try {
            await new RecpathaService(body.recaptcha.token).verify();
            this.mailerService.send(body.mail);
        } catch (e) {
            return { status: false, msg: e.message };
        }

        return {
            status: true,
            msg: 'OK'
        };
    }
}
