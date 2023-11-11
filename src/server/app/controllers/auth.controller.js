import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Op } from "sequelize";

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await User.findAll();
    return res.send(users);
});

router.post('/users', [
    check('loginInput').notEmpty(),
    check('password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const user = await User.findOne({
        where: {
            [Op.or]: [
                { Username: req.body.loginInput },
                { Email: req.body.loginInput }
            ]
        }
    });

    if (!user) {
        return res.status(401).send("User not found");
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.dataValues.Password);
    if (!passwordIsValid) {
        return res.status(401).send("Provided password is incorrect");
    }

    const token = jwt.sign({ id: user.id }, 'secretKey', {
        expiresIn: 86400 // 24 hours
    });

    return res.status(200).send({
        id: user.dataValues.UserID,
        username: user.dataValues.Username,
        email: user.dataValues.Email,
        accessToken: token
    });
});

export default router;