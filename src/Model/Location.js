class Location{
    constructor(name, address, longitude, latitude, description, website, phoneNum){
        this.name = name;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
        this.website = website;
        this.phoneNum = phoneNum;
    }

    // getter setter methods
    getName(){
        return this.name;
    }

    getAddress(){
        return this.address;
    }

    getLongitude(){
        return this.longitude;
    }

    getLatitude(){
        return this.latitude;
    }

    getDescription(){
        return this.description;
    }

    getWebsite(){
        return this.website;
    }

    getPhoneNum(){
        return this.phoneNum;
    }

    setName(name){
        this.name = name;
    }

    setAddress(address){
        this.address = address;
    }

    setLongtitude(longitude){
        this.longitude = longitude;
    }

    setLattitude(latitude){
        this.lattitude = latitude;
    }

    setDescription(description){
        this.description = description;
    }

    setWebsite(website){
        this.website = website;
    }

    setPhoneNum(phoneNum){
        this.phoneNum = phoneNum;
    }


    // methods in the class
    getAddress(name){
        // to be implemented
        return;
    }

    getShopName(name){
        // to be implemented
        return;
    }

    getLocationName(){
        // to be implemented
        return;
    }

}