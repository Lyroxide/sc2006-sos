import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const ResetList = sequelize.define('ResetPasswordToken', {
Email: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false,
    validate: {
    isEmail: true,
    },
},
ResetToken: {
    type: DataTypes.STRING(100),
    allowNull: false,
},
});

export default ResetPasswordToken;