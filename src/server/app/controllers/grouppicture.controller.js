import express from 'express';
import GroupPicture from '../models/GroupPicture.js';


const router = express.Router();

router.get('/group-picture/:id', async (req, res) => {
    try {
        const groupPicture = await GroupPicture.findOne({ where: { GroupID: req.params.id } });
        if (groupPicture) {
            res.send(groupPicture);
        } else {
            res.status(404).send('Picture not found for this group');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// router.post('/group-picture', async (req, res) => {
//     try {
//         const { groupID, filePath } = req.body;
//         const groupPicture = await GroupPicture.create({ groupID, filePath });
//         res.send(groupPicture);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });


router.put('/group-picture/:id', async (req, res) => {
    try {
        const groupID = req.params.id;
        const { filePath } = req.body;

        await GroupPicture.update({ filePath }, { where: { groupID } });
        const updatedGroupPic = await GroupPicture.findOne({ where: { groupID } })

        res.send(updatedGroupPic);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/group-picture/:groupID', async (req, res) => {
    try {
        const groupID = req.params.groupID;
        await GroupPicture.destroy({ where: { groupID } });
        res.send(`Picture for group ${groupID} deleted successfully`);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/group-picture/:groupId/picture', async (req, res) => {
    try {
        //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        //console.log(req.params.groupId);
        const groupPicture = await GroupPicture.findOne({ where: { GroupID: req.params.groupId } });
        if (groupPicture) {
            res.send(groupPicture);
        } else {
            res.status(200).send('Picture not found for this group');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;