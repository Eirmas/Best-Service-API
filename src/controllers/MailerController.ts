import { JsonController, Body, Post } from 'routing-controllers';
import MailerService from '../services/MailerService';
import Mail from '../domain/Mail';

@JsonController()
export class MailerController {
    private mailerService: MailerService;
    constructor() {
        this.mailerService = new MailerService();
    }

    @Post('/mail')
    post(@Body() mail: Mail) {
        try {
            // TODO: Verify Recpatha somehow...
            // new (RecpathaService()).verify();
        } catch (e /*: ReCapthaVerifyException */) {
            return { status: false, msg: 'invalid_validation' };
        }

        this.mailerService.send(mail); // TODO: <- Needs error handling.
        return { status: true };
    }
}
