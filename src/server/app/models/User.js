import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import UserFoodPreference from "./UserFoodPreference.js";
import UserRegionPreference from "./UserRegionPreference.js";
import GroupMember from "./GroupMember.js";
import Group from "./Group.js";

const User = sequelize.define('User', {
    UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    Age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'Users',
    timestamps: false,
});

export default User;