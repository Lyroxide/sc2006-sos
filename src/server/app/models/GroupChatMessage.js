import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const GroupChatMessage = sequelize.define('GroupChat', {
    GroupChatMessageID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    GroupID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MessageDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Message: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'GroupChatMessage',
    timestamps: false
});

export default GroupChatMessage;