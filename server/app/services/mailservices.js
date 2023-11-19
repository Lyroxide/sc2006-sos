import { createTransport } from "nodemailer";

const transporter = createTransport({
host: "smtp-relay.brevo.com",
port: 587,
auth: {
    user: "ktan227@e.ntu.edu.sg",
    pass:
    "xsmtpsib-68897084d15b425307a826186318c96d2dbc5c68537ae6bb6b358258bc5fc96e-cSmRMyw9xgHJzNIX",
},
});

const sendResetPasswordEmail = (to, resetToken) => {
const resetPasswordUrl = `http://localhost:8081/resetpassword?token=${resetToken}`;
const mailOptions = {
    from: "no-reply@letsmakantogether.com",
    to: to,
    subject: "Your Account Password Reset Request",
    html: `
<!DOCTYPE html>
<html>
<head>
<title>Your Account Password Reset Request</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
    body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    background-color: #fff;
    }

    .container {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    }

    .header {
    text-align: center;
    margin-bottom: 20px;
    }

    .header h1 {
    font-size: 24px;
    font-weight: bold;
    }

    .content {
    line-height: 1.5;
    }

    .content p {
    margin-bottom: 10px;
    }

    a {
    color: #007bff;
    text-decoration: none;
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
    <h1>Your Account Password Reset Request</h1>
    </div>

    <div class="content">
    <p>Hello,</p>

    <p>We received a request to reset your password for your Let's Makan Together account.</p>

    <p>To reset your password, please click on the following link:</p>

    <a href="${resetPasswordUrl}">Reset Password</a>

    <p>If you did not request a password reset, please ignore this email.</p>

    <p>Thank you,</p>
    <p>The Let's Makan Together Team</p>
    </div>
</div>
</body>
</html>
`,

};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    console.log(error);
    } else {
    console.log("Email sent: " + info.response);
    }
});
};

export { sendResetPasswordEmail };

