import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Validate and authenticate user login
router.post('/login', [
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
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!user || !passwordIsValid) {
        return res.status(401);
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

// implement other endpoints similarly

export default router;