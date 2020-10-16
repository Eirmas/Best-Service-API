export default class Mail {
    public readonly subject: string
    public readonly contents: string;

    constructor(subject: string, contents: string) {
        this.subject = subject;
        this.contents = contents;
    }
}
