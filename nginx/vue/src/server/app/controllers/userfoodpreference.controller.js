import express from 'express';
import UserFoodPreference from '../models/UserFoodPreference.js';

const router = express.Router();

// Get all Preferences by UserID
router.get('/user-food-preferences/:userid', async (req, res) => {
    try {
        const preferences = await UserFoodPreference.findAll({ where: { UserID: req.body.UserID } });
        res.send(preferences);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving preferences."
        });
    }
});

// Add a Preference
router.post('/user-food-preferences', async (req, res) => {
    const newPreference = {
        UserID: req.body.UserID,
        FoodPreferenceID: req.body.FoodPreferenceID
    };
    try {
        const preference = await UserFoodPreference.create(newPreference);
        res.send(preference);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while creating the preference."
        });
    }
});

// Delete a Preference
router.delete('/user-food-preferences/:id', async (req, res) => {
    try {
        const num = await UserFoodPreference.destroy({ where: { UserFoodPreferenceID: req.params.id } });
        if (num === 1) {
            res.send({ message: "Preference was deleted successfully." });
        } else {
            res.send({ message: "Unable to delete preference." });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while deleting the preference."
        });
    }
});

export default router;