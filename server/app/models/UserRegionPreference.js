import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const UserRegionPreference = sequelize.define('UserRegionPreference', {
    UserRegionPreferenceID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    RegionPreferenceID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'UserRegionPreference',
    timestamps: false,
});

export default UserRegionPreference;