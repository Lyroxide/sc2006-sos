// In a new file, e.g. resetPasswordRoutes.js
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import express from 'express';
import ResetPasswordToken from '../models/ResetPasswordToken.js';
import User from '../models/User.js';
import { sendResetPasswordEmail } from '../services/mailservices.js';

const router = express.Router();

router.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    //console.log(email);

    // Check if the email exists in the database
    
    const user = await User.findOne({ where: { email: email } });
    
    if (!user) {
        return res.status(400).json({ message: 'Invalid User Email.' });
    }

    const resetToken = generateResetToken(); // You need to implement this function

    //console.log("Reset token: " + resetToken);

    // Check if a reset token already exists for this email
    const resetPasswordToken = await ResetPasswordToken.findOne({ where: { Email: email } });

    if (resetPasswordToken) {
        // If a reset token already exists, update it
        await ResetPasswordToken.update({ ResetToken: resetToken }, { where: { Email: email } });
    } else {
        // If a reset token does not exist, create a new one
        await ResetPasswordToken.create({ Email: email, ResetToken: resetToken });
    }

    sendResetPasswordEmail(email, resetToken);

    res.json({ message: 'Reset password email sent.' });
});

router.get('/validateResetToken', async (req, res) => {
    const resetToken = req.query.token;

    //console.log('Reset token:', resetToken); // Log the reset token

    try {
    const resetPasswordToken = await ResetPasswordToken.findOne({ where: { ResetToken: resetToken } });

    //console.log('ResetPasswordToken:', resetPasswordToken); // Log the result of the database query

    if (resetPasswordToken==null) {
        return res.status(404).json({ message: 'Invalid Reset Token'});
    }

    return res.json({ email: resetPasswordToken.Email });
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/update-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        const saltRounds = 10;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
        return res.status(400).json({ message: 'Email does not exist.' });
        }

        // Hash the new password before storing it in the database
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        await User.update({ Password: hashedPassword }, { where: { email: email } });

        // Delete the reset password token for this email
        await ResetPasswordToken.destroy({ where: { Email: email } });


        res.json({ message: 'Password updated successfully.'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

function generateResetToken() {
    return crypto.randomBytes(16).toString('hex');
}


export default router;