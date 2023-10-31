import express from 'express';
import Group from '../models/Group.js';

const router = express.Router();

// route to get all groups
router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.findAll();
        res.send(groups);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving groups."
        });
    }
});

// route to get one group
router.get('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findOne({ where: { GroupID: req.params.id } });
        if(group) {
            res.send(group);
        } else {
            res.status(404).send({ message: 'Group not found!' });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving the group."
        });
    }
});

// route to add a group
router.post('/groups', async (req, res) => {
    const newGroup = {
        GroupName: req.body.GroupName,
        GroupDesc: req.body.GroupDesc,
        Capacity: req.body.Capacity,
        GroupDate: req.body.GroupDate
    };

    try {
        const group = await Group.create(newGroup);
        res.send(group);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while creating the group."
        });
    }
});

// route to delete a group
router.delete('/groups/:id', async (req, res) => {
    try {
        const group = await Group.destroy({ where: { GroupID: req.params.id } });
        if(group) {
            res.send({ message: 'Group deleted successfully!' });
        } else {
            res.status(404).send({ message: 'Group not found!' });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while deleting the group."
        });
    }
});

// route to update a group
router.put('/groups/:id', async (req, res) => {
    const updateGroup = {
        GroupName: req.body.GroupName,
        GroupDesc: req.body.GroupDesc,
        Capacity: req.body.Capacity,
        GroupDate: req.body.GroupDate
    };

    try {
        const group = await Group.update(updateGroup, { where: { GroupID: req.params.id } });
        if(group[0] === 1) {
            res.send({ message: 'Group updated successfully!' });
        } else {
            res.status(404).send({ message: 'Group not found!' });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while updating the group."
        });
    }
});

export default router;