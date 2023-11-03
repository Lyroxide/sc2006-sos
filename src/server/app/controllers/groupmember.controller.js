import express from 'express';
import GroupMember from '../models/GroupMember.js';
import Group from '../models/Group.js';

const router = express.Router();

// GET all group members
router.get('/group-members', async (req, res) => {
    try {
        const groupMembers = await GroupMember.findAll();
        res.status(200).json(groupMembers);
    } catch(error) {
        res.status(500).json({ message: error.message || "An error occurred while retrieving all group members." });
    }
});

router.get('/group-members/user/:UserID', async (req, res) => {
    try {
        const UserID = req.params.UserID;
        const userGroups = await GroupMember.findAll({ where: { UserID } });
        for (let u of userGroups) {
            const gs = await Group.findAll({ where: { GroupID: u.GroupID }});
            for (let g of gs) {
                u.setDataValue('GroupName', g.GroupName);
            }

        }
        res.send(userGroups);
    } catch(error) {
        res.status(500).json({ message: error.message || `An error occurred while retrieving group members for user ${UserID}` });
    }
});

// POST new group member
router.post('/group-members', async (req, res) => {
    try {
        const { UserID, GroupID } = req.body;
        const newGroupMember = await GroupMember.create({
            UserID,
            GroupID
        });
        res.send(newGroupMember);
    } catch(error) {
        res.status(500).json({ message: error.message || "An error occurred while creating a new group member." });
    }
});

// DELETE a group member
router.delete('/group-members/:id', async (req, res) => {
    try {
        const GroupMemberID = req.params.id
        await GroupMember.destroy({ where: { GroupMemberID } });
        res.status(204).json({ message: `Deleted GroupMember with id ${GroupMemberID}` });
    } catch(error) {
        res.status(500).json({ message: error.message || `An error occurred while deleting the group member with id ${GroupMemberID}` });
    }
});

export default router;