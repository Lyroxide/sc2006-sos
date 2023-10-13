class User {
    // username: String;
    // name: String;
    // email: String;
    // password: String;
    // age: Number;
    // gender: char;
    // groups: Array<Group>;

    constructor(username, name, email, password, age, gender, groups) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.groups = groups;
    }

    // getter setter methods
    getUserName() {
        return this.username;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getAge() {
        return this.age;
    }

    getGender() {
        return this.gender;
    }

    getGroups() {
        return this.groups;
    }

    setUserName(username) {
        this.username = username;
    }

    setName(name) {
        this.name = name;
    }

    setEmail(email) {
        this.email = email;
    }
    
    setPassword(password) {
        this.password = password;
    }


    setAge(age) {
        this.age = age;
    }

    setGender(gender) {
        this.gender = gender;
    }

    setGroups(groups) {
        this.groups = groups;
    }

    viewProfile() {
        return this; // to be implemented
    }

    editProfile() {
        return this; // to be implemented
    }

}
