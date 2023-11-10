import bcrypt from 'bcryptjs';
import express from 'express';
import { check, validationResult } from 'express-validator';
import FoodPreference from "../models/FoodPreference.js";
import RegionPreference from "../models/RegionPreference.js";
import User from '../models/User.js';
import UserFoodPreference from "../models/UserFoodPreference.js";
import UserRegionPreference from "../models/UserRegionPreference.js";

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
    check('email').isEmail(),
    check('password').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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

        // Assuming FoodPreference model has an association with UserFoodPreference
        // through a foreign key that is named as in the original provided code.
        const foodPreferences = await FoodPreference.findAll({
            include: [{
                model: UserFoodPreference,
                where: { UserID },
                attributes: [],
            }]
        });

        // Assuming RegionPreference model has an association with UserRegionPreference
        // through a foreign key that is named as in the original provided code.
        const regionPreferences = await RegionPreference.findAll({
            include: [{
                model: UserRegionPreference,
                where: { UserID },
                attributes: [],
            }]
        });

        // Map the results to get the desired preference types.
        user.setDataValue('foodPreferences', foodPreferences.map(fp => fp.FoodType));
        user.setDataValue('regionPreferences', regionPreferences.map(rp => rp.RegionType));

        return res.send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Update a user by id
router.put('/users/:id', [
    check('email').isEmail(),
    check('password').isLength({ min: 8 }).optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByPk(req.params.id);
    if (user) {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
        }

        const updatedUser = await user.update(req.body);

        return res.send(updatedUser);
    } else {
        return res.status(404).send({ message: 'User not found' });
    }
});

// Delete a user by id
router.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        return res.send({ message: 'User deleted' });
    } else {
        return res.status(404).send({ message: 'User not found' });
    }
});

export default router;