import express from 'express';
import Location from '../models/Location.js';

const router = express.Router();

// GET one Location by ID
router.get('/location/:id', async (req, res) => {
    try {
        const location = await Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).send({
                message: `No location found with the id ${req.params.id}`
            });
        }
        res.send(location);
    } catch (error) {
        res.status(500).send({message: error.message || "An error occurred while retrieving the location."});
    }
});

// POST new Location
router.post('/location', async (req, res) => {
    try {
        const newLocation = req.body;
        const location = await Location.create(newLocation);
        res.status(201).send(location);
    } catch (error) {
        res.status(500).send({message: error.message || "An error occurred while creating the location."});
    }
});

// PUT (update) an existing Location
router.put('/location/:id', async (req, res) => {
    try {
        const updatedLocation = req.body;
        const updateResult = await Location.update(updatedLocation, {
            where: {
                LocationID: req.params.id
            }
        });

        if(updateResult[0] === 0) {
            return res.status(404).send({ message: `No location found with the id ${req.params.id}`});
        }

        res.send({ message: `Location ID: ${req.params.id} was updated successfully` });

    } catch (error) {
        res.status(500).send({message: error.message || "An error occurred while updating the location."});
    }
});

// DELETE a Location
router.delete('/location/:id', async (req, res) => {
    try {
        const deleteResult = await Location.destroy({
            where: {
                LocationID: req.params.id
            }
        });

        if(deleteResult === 0) {
            return res.status(404).send({ message: `No location found with the id ${req.params.id}`});
        }

        res.send({ message: `Location ID: ${req.params.id} was deleted successfully` });
    } catch (error) {
        res.status(500).send({message: error.message || "An error occurred while deleting the location."});
    }
});

export default router;