import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import Meeting from "./Meeting.js";

const Location = sequelize.define('Location', {
    LocationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    MeetingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Meeting,
            key: 'id'
        }
    },
    LocationName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LocationAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Longitude: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
    },
    Latitude: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false,
    },
}, {
    tableName: 'Location',
    timestamps: false,
});

export default Location;