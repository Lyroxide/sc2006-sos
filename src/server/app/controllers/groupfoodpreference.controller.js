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

// route to add/edit GroupFoodPreferences
router.post('/group-food-preferences', async (req, res) => {
    const { GroupID, pref } = req.body;
    try {
        await GroupFoodPreference.destroy({ where: { GroupID } });
        const preferencesToAdd = pref.map(FoodPreferenceID => ({ GroupID, FoodPreferenceID }));
        const batchPreferences = await GroupFoodPreference.bulkCreate(preferencesToAdd);
        res.send(batchPreferences);
    } catch (error) {
        res.status(500).send({ message: error.message || "An error occurred while updating preferences." });
    }
});



export default router;