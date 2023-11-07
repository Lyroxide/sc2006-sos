import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Group from './Group.js';
import RegionPreference from './RegionPreference.js';

const GroupRegionPreference = sequelize.define('GroupRegionPreference', {
    GroupRegionPreferenceID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    GroupID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    RegionPreferenceID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'GroupRegionPreference',
    timestamps: false,
});

export default GroupRegionPreference;