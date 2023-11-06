import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './User.js';

const Group = sequelize.define('Group', {
    GroupID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    OwnerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    GroupName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GroupDesc: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'Groups',
    timestamps: false
});

export default Group;