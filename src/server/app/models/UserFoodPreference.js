import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './User.js';
import FoodPreference from './FoodPreference.js';

const UserFoodPreference = sequelize.define('UserFoodPreference', {
    UserFoodPreferenceID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FoodPreferenceID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'UserFoodPreference',
    timestamps: false,
});


export default UserFoodPreference;