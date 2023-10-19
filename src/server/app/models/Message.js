class Message{
    constructor(user, timestamp, text, images){
        this.user = user;
        this.timestamp = timestamp;
        this.text = text;
        this.images = images;
    }

    // getter setter methods
    getUser(){
        return this.user;
    }

    getTimestamp(){
        return this.timestamp;
    }

    getText(){
        return this.text;
    }

    getImages(){
        return this.images;
    }

    setUser(user){
        this.user = user;
    }

    setTimestamp(timestamp){
        this.timestamp = timestamp;
    }

    setText(text){
        this.text = text;
    }

    setImages(images){
        this.images = images;
    }


    // methods in the class
    deleteMessage(){
        // to be implemented
        return;
    }

    sendMessage(){
        // to be implemented
        return;
    }

    editMessage(){
        // to be implemented
        return;
    }

}