// In a new file, e.g. resetPasswordRoutes.js
import express from 'express';
import { sendResetPasswordEmail } from '../services/mailservices.js';

const router = express.Router();

router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    console.log(email);

    // Check if the email exists in the database
    
    //const user = await User.findOne({ where: { email: email } });
    /*
    if (!user) {
        return res.status(400).json({ message: 'Email does not exist.' });
    }
    */

    const resetToken = generateResetToken(); // You need to implement this function

    console.log("Reset token: " + resetToken);
    
    sendResetPasswordEmail(email, resetToken);

    res.json({ message: 'Reset password email sent.' });
});

import crypto from 'crypto';

function generateResetToken() {
    return crypto.randomBytes(16).toString('hex');
}


export default router;