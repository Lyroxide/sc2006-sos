import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const RegionPreference = sequelize.define('RegionPreference', {
    RegionPreferenceID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    RegionType: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    tableName: 'RegionPreference',
    timestamps: false,
});

export default RegionPreference;