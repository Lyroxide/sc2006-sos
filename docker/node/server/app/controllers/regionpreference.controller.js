import express from 'express';
import RegionPreference from '../models/RegionPreference.js';

const router = express.Router();

// route to get all RegionPreferences
router.get('/region-preferences', async (req, res) => {
    try {
        const regionPreferences = await RegionPreference.findAll();
        res.send(regionPreferences);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving region preferences."
        });
    }
});


export default router;