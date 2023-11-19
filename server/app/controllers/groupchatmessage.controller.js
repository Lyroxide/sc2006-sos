import express from 'express';
import GroupChatMessage from '../models/GroupChatMessage.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/messages', async (req, res) => {
    try {
        const chatMessages = await GroupChatMessage.findAll();
        res.send(chatMessages);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error retrieving messages." });
    }
});

router.get('/messages/:GroupID', async (req, res) => {
    try {
        const chatMessages = await GroupChatMessage.findAll({ where: { GroupID: req.params.GroupID } });
        for (let chatMessage of chatMessages) {
            const user = await User.findByPk(chatMessage.dataValues.UserID)
            chatMessage.setDataValue('Username', user.dataValues.Username);
            chatMessage.setDataValue('Name', user.dataValues.Name);
        }
        res.send(chatMessages);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error retrieving messages." });
    }
});

router.post('/messages', async (req, res) => {
    const newChatMessage = {
        GroupID: req.body.GroupID,
        UserID: req.body.UserID,
        MessageDate: req.body.Message.MessageDate,
        Message: req.body.Message.Message._value
    }
    console.log(req.body.Message.Message._value);
    console.log(newChatMessage);
    try {
        const chatMessage = await GroupChatMessage.create(newChatMessage);
        res.send(chatMessage);
    } catch (error) {
        res.status(500).send({ message: error.message || "Error creating messages." });
    }
});

export default router;