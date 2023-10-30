import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Group from "./Group.js";

const GroupPicture = sequelize.define('GroupPicture', {
    PictureID: {
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
    FilePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'GroupPicture',
    timestamps: false
});

export default GroupPicture;