import axios from 'axios';
import * as dotenv from "dotenv";
import ReCaptchaVerifyException from '../exceptions/ReCaptchaVerifyException';

dotenv.config();

export default class RecaptchaService {
    private readonly token;

    constructor(token: string) {
        this.token = token;
    }

    public async verify() {
    
        await axios.post(process.env.RECAPTCHA_VERIFY_URL, null, {
            params: {
                secret: process.env.SECRET_KEY,
                response: this.token
            }
        })
            .then((response) => {
                if (!(response.data && response.data.success)) {
                    throw new ReCaptchaVerifyException(false, 'no-recaptcha-verification')
                }
            })
            .catch((err) => {
                throw new ReCaptchaVerifyException(false, err.message || err)
            })
    }
}
