import express from 'express';
import FoodPreference from '../models/FoodPreference.js';

const router = express.Router();

router.get('/food-preferences', async (req, res) => {
    try {
        const foodPreferences = await FoodPreference.findAll();
        res.send(foodPreferences);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving food preferences."
        });
    }
});


export default router;