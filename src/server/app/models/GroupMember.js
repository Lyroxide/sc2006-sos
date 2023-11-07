import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './User.js';
import Group from './Group.js';

const GroupMember = sequelize.define('GroupMember', {
    GroupMemberID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    GroupID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'GroupMember',
    timestamps: false,
});

export default GroupMember;