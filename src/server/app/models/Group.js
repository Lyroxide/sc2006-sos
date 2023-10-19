// using node express framework
import Joi from 'joi' // input validation


const express = require('express');
const app = express();
app.use(express.json());

// handling request for all groups
app.get('/api/groups', (req,res) =>{
    // database to get all the groups info from database
    res.send(groups);
});

// handling request for a particular group
app.get('/api/groups/:id', (req,res) =>{
    const group = groups.find(c => c.id === parseInt(req.params.id));
    if(!group) return res.status(404).send('The group with the given ID was not found.');
    res.send(group);
});

// handling request to add a new group
app.post('/api/groups', (req,res) =>{
    const { error } = validateGroup(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);
    const group = {
        id: groups.length + 1,
        name: req.body.name
    };
    groups.push(group);
    res.send(group);
});


// handling request to update a group
app.put('/api/groups/:id', (req,res) =>{
    // look up the group
    // if not existing, return 404
    const group = groups.find(c => c.id === parseInt(req.params.id));
    if(!group) return res.status(404).send('The group with the given ID was not found.');

    // validate
    // if invalid, return 400 - Bad request
    const { error } = validateGroup(req.body); // result.error
    if(error) return res.status(400).send(error.details[0].message);

    // update group
    group.name = req.body.name;
    // return the updated group
    res.send(group);
});

// handling request to delete a group
app.delete('/api/groups/:id', (req,res) =>{
    // look up the group
    // if not existing, return 404
    const group = groups.find(c => c.id === parseInt(req.params.id));
    if(!group) return res.status(404).send('The group with the given ID was not found.');

    // delete
    const index = groups.indexOf(group);
    groups.splice(index, 1);

    // return the same group
    res.send(group);
});

// validating the input
function validateGroup(group){
    const schema = {
        name: Joi.string().min(2).required()
    };
    return Joi.validate(group, schema);
}



class Group {
    // groupID: number;
    // groupName: string;
    // groupPhoto: ImageType ????;
    // capacity: number;
    // description: string;
    // foodPreferences: string;
    // groupMembers: Array<User>;
    // meetingDetails: Meeting;
    // messages: Array<Message>;

    constructor(groupID, groupName, groupPhoto, capacity, description, foodPreferences, groupMembers, meetingDetails, messages) {
        this.groupID = groupID;
        this.groupName = groupName;
        this.groupPhoto = groupPhoto;
        this.capacity = capacity;
        this.description = description;
        this.foodPreferences = foodPreferences;
        this.groupMembers = groupMembers;
        this.meetingDetails = meetingDetails;
        this.messages = messages;
    }

    // getter setter methods
    getGroupID() {
        return this.groupID;
    }

    getGroupName() {
        return this.groupName;
    }

    getGroupPhoto() {
        return this.groupPhoto;
    }

    getCapacity() {
        return this.capacity;
    }

    getDescription() {
        return this.description;
    }

    getFoodPreferences() {
        return this.foodPreferences;
    }

    getGroupMembers() {
        return this.groupMembers;
    }

    getMeetingDetails() {
        return this.meetingDetails;
    }

    getMessages() {
        return this.messages;
    }

    setGroupID(groupID) {
        this.groupID = groupID;
    }

    setGroupName(groupName) {
        this.groupName = groupName;
    }

    setGroupPhoto(groupPhoto) {
        this.groupPhoto = groupPhoto;
    }

    setCapacity(capacity) {
        this.capacity = capacity;
    }

    setDescription(description) {
        this.description = description;
    }

    setFoodPreferences(foodPreferences) {
        this.foodPreferences = foodPreferences;
    }

    setGroupMembers(groupMembers) {
        this.groupMembers = groupMembers;
    }

    setMeetingDetails(meetingDetails) {
        this.meetingDetails = meetingDetails;
    }

    setMessages(messages) {
        this.messages = messages;
    }


    // methods in the class
    editMeeting(){
        // yet to be implemented
        return;
    }

    viewMeeting(){
        // yet to be implemented
        return;
    }

    viewMessages(){
        // yet to be implemented
        return;
    }

    viewMembers(){
        // view members of a group
        // yet to be implemented
        return;
    }
}