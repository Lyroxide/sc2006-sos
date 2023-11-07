require('dotenv').config();

const { createTransport } = require('nodemailer');
const apikey = letsmakantogether.env.mailAPI;

const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "ktan227@e.ntu.edu.sg",
        pass: apikey
    },
});

const mailOptions = {
    from: 'ktan227@e.ntu.edu.sg',
    to: '<your-receiver>',
    subject: `Your Account Reset Token`,
    text: `Your text content`
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});