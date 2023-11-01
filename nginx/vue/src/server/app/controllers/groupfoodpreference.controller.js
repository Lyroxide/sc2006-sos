import express from 'express';
import GroupFoodPreference from '../models/GroupFoodPreference.js';

const router = express.Router();

// route to get all GroupFoodPreferences
router.get('/group-food-preferences', async (req, res) => {
    try {
        const groupFoodPreferences = await GroupFoodPreference.findAll();
        res.send(groupFoodPreferences);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving GroupFoodPreferences."
        });
    }
});

// route to add a GroupFoodPreference
router.post('/group-food-preferences', async (req, res) => {
    const newGroupFoodPreference = {
        GroupID: req.body.GroupID,
        FoodPreferenceID: req.body.FoodPreferenceID
    };

    try {
        const groupFoodPreference = await GroupFoodPreference.create(newGroupFoodPreference);
        res.send(groupFoodPreference);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while creating the GroupFoodPreference."
        });
    }
});

// route to delete a GroupFoodPreference
router.delete('/group-food-preferences/:id', async (req, res) => {
    try {
        await GroupFoodPreference.destroy({
            where: { GroupFoodPreferenceID: req.params.id }
        });
        res.send({ message: "GroupFoodPreference was deleted successfully!" });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Could not delete GroupFoodPreference."
        });
    }
});

export default router;