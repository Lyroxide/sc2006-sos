class Meeting{
    constructor(date, time, location){
        this.date = date;
        this.time = time;
        this.location = location;
    }
    
    // getter setter methods
    getDate(){
        return this.date;
    }

    getTime(){
        return this.time;
    }

    getLocation(){
        return this.location;
    }

    setDate(date){
        this.date = date;
    }

    setTime(time){
        this.time = time;
    }

    setLocation(location){
        this.location = location;
    }
}