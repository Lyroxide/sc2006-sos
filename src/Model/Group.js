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