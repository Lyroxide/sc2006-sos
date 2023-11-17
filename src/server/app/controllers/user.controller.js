import bcrypt from 'bcryptjs';
import express from 'express';
import { check, validationResult } from 'express-validator';
import { Op } from "sequelize";
import User from '../models/User.js';

const router = express.Router();
const saltRounds = 10;

// Get all users
router.get('/users', async (req, res) => {
    const users = await User.findAll();
    return res.send(users);
});

// Create a new user
router.post('/users', [
    check('username').notEmpty(),
    check('email').isEmail().withMessage("Email is invalid!"),
    check('password').isLength({ min: 12 }),
    check('age').isInt({ min: 18 }).withMessage("You must be 18 and above to register!")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        }
    });

    if (existingUser) {
        return res.status(400).json({
            errors: [{
                msg: "A user with the given username or email already exists."
            }]
        });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const user = {
        Username: req.body.username,
        Email: req.body.email,
        Password: hashedPassword,
        Age: req.body.age,
        Gender: req.body.gender,
        Name: req.body.name,
    }
    let newUser = await User.create(user);
    return res.send(newUser);
});

// Get a user by id
router.get('/users/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const user = await User.findByPk(UserID);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Update a user by id
router.put('/users/:UserID', [
    check('Username').notEmpty(),
    check('Email').isEmail().withMessage("Email is invalid!"),
    check('Age').isInt({ min: 18 }).withMessage("You must be 18 and above to register!")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findByPk(req.params.UserID);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const existingUser = await User.findOne({
            where: {
                [Op.and]: [
                    {UserID: {[Op.ne]: req.params.UserID}},
                    {
                        [Op.or]: [
                            {Username: req.body.Username},
                            {Email: req.body.Email}
                        ]
                    }
                ]
            }
        });
        if (existingUser) {
            return res.status(400).json({
                errors: [{
                    msg: "A user with the given username or email already exists."
                }]
            });
        }
        const updatedUser = await user.update(req.body);
        return res.json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while updating the user.' });
    }
});

// Update a user's password by id
router.put('/users/:id/password', [
    check('password').isLength({ min: 12 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByPk(req.params.id);
    if (user) {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const updatedUser = await user.update({ Password: hashedPassword });

        return res.send(updatedUser);
    } else {
        return res.status(404).send({ message: 'User not found' });
    }
});

router.post('/users/:id/check-password', async (req, res) => {

    const user = await User.findByPk(req.params.id);
    if (user) {
        console.log("Current User Password: "+user.Password);
        console.log("Incoming User Password: "+req.body.password);
        const isMatch = bcrypt.compareSync(req.body.password, user.Password);
        //const isMatch = req.body.password == user.Password;
        return res.send({ isMatch });
    } else {
        return res.status(404).send({ message: 'User not found' });
    }
});

export default router;