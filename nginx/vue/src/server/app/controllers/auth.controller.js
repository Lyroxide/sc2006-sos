import bcrypt from 'bcryptjs';
import express from 'express';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Validate and authenticate user login
router.post('/users', [
    check('username').notEmpty(),
    check('password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
        // User not found with provided username
        return res.status(401).send("User not found");
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.dataValues.Password);
    if (!passwordIsValid) {
        // Password is not valid
        return res.status(401).send("Provided password is incorrect");
    }

    const token = jwt.sign({ id: user.id }, 'secretKey', {
        expiresIn: 86400 // 24 hours
    });

    return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
    });
});

export default router;