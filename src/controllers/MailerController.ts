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
        this.mailerService.send(mail);
        return { status: true };
    }
}
