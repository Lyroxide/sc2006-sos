import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Group = sequelize.define('Group', {
    GroupID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    GroupName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GroupDesc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    GroupDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    },{
    tableName: 'Groups',
    timestamps: false,
});

export default Group;