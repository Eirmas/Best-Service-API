import Recaptcha from './ReCaptcha';
import Mail from './Mail';

export default class Mailer {
    public readonly mail: Mail;
    public readonly recaptcha: Recaptcha;

    constructor(mail: Mail, recaptcha: Recaptcha) {
        this.mail = mail;
        this.recaptcha = recaptcha;
    }
}
