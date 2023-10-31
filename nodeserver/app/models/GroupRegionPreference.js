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
        allowNull: false,
        references: {
            model: Group,
            key: 'id'
        }
    },
    RegionPreferenceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RegionPreference,
            key: 'id'
        }
    }
}, {
    tableName: 'GroupRegionPreference',
    timestamps: false,
});

export default GroupRegionPreference;