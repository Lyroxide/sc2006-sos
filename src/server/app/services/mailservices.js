import { createTransport } from "nodemailer";


const transporter = createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "ktan227@e.ntu.edu.sg",
        pass: "xsmtpsib-68897084d15b425307a826186318c96d2dbc5c68537ae6bb6b358258bc5fc96e-cSmRMyw9xgHJzNIX"
    },
});

const sendResetPasswordEmail = (to, resetToken) => {
    const mailOptions = {
        from: 'no-reply@letsmakantogether.com',
        to: to,
        subject: `Your Account Password Reset Request`,
        text: `Click here to reset your password ${resetToken}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export { sendResetPasswordEmail };

