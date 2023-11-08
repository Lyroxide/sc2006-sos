import express from 'express';
import Meeting from '../models/Meeting.js';

const router = express.Router();


router.get('/meetings/', async (req, res) => {
    try {
        const meeting = await Meeting.findAll();
        res.send(meeting);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error retrieving meeting." });
    }
});

router.get('/meetings/groups/:GroupID', async (req, res) => {
    try {
        let GroupID = req.params.GroupID;
        const meeting = await Meeting.findAll({ where: { GroupID } });
        res.send(meeting);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error retrieving meeting." });
    }
});

router.post('/meetings', async (req, res) => {
    const newMeeting = {
        GroupID: req.body.GroupID,
        MeetingDate: req.body.MeetingDate,
        MeetingAddress: req.body.MeetingAddress,
        MeetingDesc: req.body.MeetingDesc,
        MeetingPlace: req.body.MeetingPlace,
    };

    try {
        const meeting = await Meeting.create(newMeeting);
        res.send(meeting);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error creating meeting." });
    }
});

/*router.put('/meetings/:id', async (req, res) => {
    const updatedMeeting = {
        GroupID: req.params.GroupID,
        MeetingDate: req.body.MeetingDate,
        MeetingAddress: req.body.MeetingAddress,
        MeetingDesc: req.body.MeetingDesc,
        MeetingPlace: req.body.MeetingPlace,
    };*/
router.put('/meetings/:MeetingID', async (req, res) => {
    const updatedMeeting = {
        //GroupID: req.params.GroupID, // GPT4: GroupID` seems to be unnecessarily pulled from `req.params.GroupID`. Clarify if this is required as you already possess `GroupID` from your VueX state. Remove this line if it is not needed.an
        PlaceID: req.body.PlaceID,
        MeetingDate: req.body.MeetingDate,
        MeetingAddress: req.body.MeetingAddress,
        MeetingDesc: req.body.MeetingDesc,
        MeetingPlace: req.body.MeetingPlace,
    };

    try {
        const meeting = await Meeting.update(updatedMeeting, { where: { MeetingID: req.params.MeetingID } });
        res.send(meeting);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error updating meeting." });
    }
});

export default router;