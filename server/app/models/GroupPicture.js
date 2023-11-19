import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const GroupPicture = sequelize.define('GroupPicture', {
    PictureID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    GroupID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PictureFile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'GroupPicture',
    timestamps: false
});

export default GroupPicture;