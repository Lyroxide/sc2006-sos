import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Group from './Group.js';
import FoodPreference from './FoodPreference.js';

const GroupFoodPreference = sequelize.define('GroupFoodPreference', {
    GroupFoodPreferenceID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    GroupID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: 'id'
        }
    },
    FoodPreferenceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: FoodPreference,
            key: 'id'
        }
    }
}, {
    tableName: 'GroupFoodPreference',
    timestamps: false,
});

export default GroupFoodPreference;