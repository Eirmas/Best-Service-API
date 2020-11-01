export default class MailerException extends Error {
    public readonly status: boolean;
    public readonly message: string;

    constructor(status: boolean, message: string) {
        super();
        this.status = status;
        this.message = message;
    }
}
