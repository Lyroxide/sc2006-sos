import express from 'express';
import UserRegionPreference from '../models/UserRegionPreference.js';

const router = express.Router();

// Get all Preferences by UserID
router.get('/user-region-prefernces/:userid', async (req, res) => {
    try {
        const preferences = await UserRegionPreference.findAll({ where: { UserID: req.body.UserID } });
        res.send(preferences);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving preferences."
        });
    }
});

// Add a Preference
router.post('/user-region-preferences', async (req, res) => {
    const newPreference = {
        UserID: req.body.UserID,
        RegionPreferenceID: req.body.RegionPreferenceID
    };
    try {
        const preference = await UserRegionPreference.create(newPreference);
        res.send(preference);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while creating the preference."
        });
    }
});

// Delete a Preference
router.delete('/user-region-preferences/:id', async (req, res) => {
    try {
        const num = await UserRegionPreference.destroy({ where: { UserRegionPreferenceID: req.params.id } });
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