import express from 'express';
import Meeting from '../models/Meeting.js';

const router = express.Router();

router.get('/meetings/:id', async (req, res) => {
    try {
        const meeting = await Meeting.findOne({ where: { MeetingID: req.params.id } });
        res.send(meeting);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error retrieving meeting." });
    }
});

router.post('/meetings', async (req, res) => {
    const newMeeting = {
        GroupID: req.body.GroupID,
        MeetingDate: req.body.MeetingDate,
        MeetingDescription: req.body.MeetingDescription,
    };

    try {
        const meeting = await Meeting.create(newMeeting);
        res.send(meeting);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error creating meeting." });
    }
});

router.put('/meetings/:id', async (req, res) => {
    const updatedMeeting = {
        GroupID: req.body.GroupID,
        MeetingDate: req.body.MeetingDate,
        MeetingDescription: req.body.MeetingDescription,
    };

    try {
        const meeting = await Meeting.update(updatedMeeting, { where: { MeetingID: req.params.id } });
        res.send(meeting);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error updating meeting." });
    }
});

export default router;