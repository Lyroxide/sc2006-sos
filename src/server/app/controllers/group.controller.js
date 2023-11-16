import express from 'express';
import multer from 'multer';
import { Op } from 'sequelize';
import FoodPreference from '../models/FoodPreference.js';
import Group from '../models/Group.js';
import GroupFoodPreference from '../models/GroupFoodPreference.js';
import GroupMember from '../models/GroupMember.js';
import GroupPicture from '../models/GroupPicture.js';
import GroupRegionPreference from '../models/GroupRegionPreference.js';
import RegionPreference from '../models/RegionPreference.js';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png') //Appending .png
    }
})

const upload = multer({ storage: storage });


// route to get all groups
router.get('/groups', async (req, res) => {

    try {
        const groups = await Group.findAll();

        for (let group of groups) {
            group.setDataValue('memberCount', await GroupMember.findAndCountAll({ where: { GroupID: group.GroupID} }));
            const groupFoodPreferences = await GroupFoodPreference.findAll({ where: { GroupID: group.GroupID } })
            let foodPreferences = [];
            for (let fp of groupFoodPreferences) {
                const f = await FoodPreference.findAll({where : { FoodPreferenceID: fp.FoodPreferenceID}});
                for (let x of f) {
                    foodPreferences.push(x.FoodType);
                }
            }
            group.setDataValue('foodPreferences', foodPreferences);

            const groupRegionPreference = await GroupRegionPreference.findOne({ where: { GroupID: group.GroupID } });
            const r = await RegionPreference.findAll({where: {RegionPreferenceID: groupRegionPreference.RegionPreferenceID}});
            for (let x of r) {
                group.setDataValue('regionPreference', x.RegionType);
            }

        }
        res.send(groups);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while retrieving groups."
        });
    }
});

// route to get one group
router.get('/groups/:GroupID', async (req, res) => {
    try {
        const group = await Group.findOne({ where: { GroupID: req.params.GroupID } });
        if (group) {
            group.setDataValue('memberCount', await GroupMember.findAndCountAll({ where: { GroupID: group.GroupID} }));
            const groupFoodPreferences = await GroupFoodPreference.findAll({ where: { GroupID: group.GroupID } })
            let foodPreferences = [];
            for (let fp of groupFoodPreferences) {
                const f = await FoodPreference.findAll({where : { FoodPreferenceID: fp.FoodPreferenceID}});
                for (let x of f) {
                    foodPreferences.push(x.FoodType);
                }
            }
            group.setDataValue('foodPreferences', foodPreferences);

            const groupRegionPreference = await GroupRegionPreference.findOne({ where: { GroupID: group.GroupID } });
            const r = await RegionPreference.findAll({where: {RegionPreferenceID: groupRegionPreference.RegionPreferenceID}});
            for (let x of r) {
                group.setDataValue('regionPreference', x.RegionType);
            }
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

router.post('/groups', upload.single('groupPicture'), async (req, res) => {
    // console.log(req.body);
    // console.log("file");
    // console.log(req.file);
    // console.log("end file");
    const newGroup = {
        OwnerID: req.body.UserID,
        GroupName: req.body.GroupName,
        GroupDesc: req.body.GroupDesc
    };
    try {
        const group = await Group.create(newGroup);
        //console.log(group.dataValues.GroupID);
        //console.log(req.file);
        if (req.file) {
            //console.log("Adding Picutes");
            const group_picture = await GroupPicture.create({ GroupID: group.dataValues.GroupID, PictureFile: req.file.filename });
            //console.log("Added Picutes");
        }
        res.send(group);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while creating the group."
        });
    }
});

// route to delete a group
router.delete('/groups/:GroupID', async (req, res) => {
    try {
        const group = await Group.destroy({ where: { GroupID: req.params.GroupID } });
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
        GroupDesc: req.body.GroupDesc
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

router.post('/groups/search', async (req, res) => {
    const { searchValue, foodPreferences } = req.body;

    let whereClause = {};
    let includeClause = [];

    if (searchValue) {
        whereClause.GroupName = { [Op.like]: `%${searchValue}%` };
    }

    if (foodPreferences && foodPreferences.length) {
        includeClause.push({
            model: GroupFoodPreference,
            where: { FoodPreferenceID: { [Op.in]: foodPreferences } }
        });
    }

    try {
        const groups = await Group.findAll({
            where: whereClause,
            include: includeClause.length ? includeClause : undefined
        });


        // Populate additional details for each group, similar to your existing code
        for (let group of groups) {
            group.setDataValue('memberCount', await GroupMember.findAndCountAll({ where: { GroupID: group.GroupID} }));
            const groupFoodPreferences = await GroupFoodPreference.findAll({ where: { GroupID: group.GroupID } })
            let foodPreferences = [];
            for (let fp of groupFoodPreferences) {
                const f = await FoodPreference.findAll({where : { FoodPreferenceID: fp.FoodPreferenceID}});
                for (let x of f) {
                    foodPreferences.push(x.FoodType);
                }
            }
            group.setDataValue('foodPreferences', foodPreferences);

            const groupRegionPreference = await GroupRegionPreference.findOne({ where: { GroupID: group.GroupID } });
            const r = await RegionPreference.findAll({where: {RegionPreferenceID: groupRegionPreference.RegionPreferenceID}});
            for (let x of r) {
                group.setDataValue('regionPreference', x.RegionType);
            }
        }
        res.send(groups);
    } catch (error) {
        res.status(500).send({
            message: error.message || "An error occurred while searching for groups."
        });
    }
});

export default router;