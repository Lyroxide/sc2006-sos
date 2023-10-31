import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Group from "./Group.js";


const Meeting = sequelize.define('Meeting', {
    MeetingID: {
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
    MeetingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    MeetingDescription: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Meeting',
    timestamps: false,
});

export default Meeting;