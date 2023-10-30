import express from 'express';
import GroupRegionPreference from '../models/GroupRegionPreference.js';

const router = express.Router();

// route to get all GroupRegionPreferences
router.get('/group-region-preferences', async (req, res) => {
    try {
        const groupRegionPreferences = await GroupRegionPreference.findAll();
        res.send(groupRegionPreferences);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving GroupRegionPreferences."
        });
    }
});

// route to add a GroupRegionPreference
router.post('/group-region-preferences', async (req, res) => {
    const newGroupRegionPreference = {
        GroupID: req.body.GroupID,
        RegionPreferenceID: req.body.RegionPreferenceID
    };

    try {
        const groupRegionPreference = await GroupRegionPreference.create(newGroupRegionPreference);
        res.send(groupRegionPreference);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while creating the GroupRegionPreference."
        });
    }
});

// route to delete a GroupRegionPreference
router.delete('/group-region-preferences/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await GroupRegionPreference.destroy({
            where: { GroupRegionPreferenceID: id }
        });

        res.send({ message: "GroupRegionPreference was deleted successfully!" });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Could not delete GroupRegionPreference."
        });
    }
});

export default router;