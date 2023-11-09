import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

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