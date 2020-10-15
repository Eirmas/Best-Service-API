export default class Mail {
    public readonly sender: string;
    public readonly subject: string
    public readonly contents: string;
    public readonly validation: string;

    constructor(sender: string, subject: string, contents: string, validation: string) {
        this.sender = sender;
        this.subject = subject;
        this.contents = contents;
        this.validation = validation;
    }
}
