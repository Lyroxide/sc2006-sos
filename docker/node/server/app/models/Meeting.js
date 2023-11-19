import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Meeting = sequelize.define('Meeting', {
    MeetingID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    GroupID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PlaceID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MeetingDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    MeetingAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MeetingDesc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MeetingPlace: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Meeting',
    timestamps: false,
});


export default Meeting;