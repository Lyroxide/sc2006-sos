import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
// import Group from './Group.js';
// Assuming you have another model named Group

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    gender: {
        type: DataTypes.CHAR,
    },
});

//User.hasMany(Group);

export default User;