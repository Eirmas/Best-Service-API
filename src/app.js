require('dotenv').config()
const express = require('express');
const axios = require('axios');
const referrerPolicy = require('referrer-policy');
const app = express();

app.use(express.json({extented:true}));

app.use(referrerPolicy({
    policy: 'same-origin'
}));

app.post('/mail', async (req, res) => {

    const sendError = (code, message) => {
        res.send({
            status: code,
            message: message
        })
    }

    if (req.body.response && req.body.data) {
        const response = await axios.get('https://www.google.com/recaptcha/api/siteverify', {
            params: {
                secret: process.env.SECRET_KEY,
                response: req.body.response
            }
        })
        if (!response || !response.data) {
            sendError(500, 'Backend failed to communicate with Google ReCAPTCHA Site Verify')
        }
        if (response.data.success) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'eirikmaaseidvaag@gmail.com',
                    pass: process.env.MAIL_PASSWORD
                }
            });
            
            const mailOptions = {
                from: 'no-reply@best-service.no',
                to: 'eirmas@hotmail.no',
                subject: 'Tilbudsforespørsel',
                text: JSON.stringify(req.body.data)
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
        } else {
            sendError(403, 'Sender not valid')
        }
    } else {
        sendError(400, 'Missing data')
    }
});

app.listen((1337), () => {
    console.log("Listening on port 1337")
});
