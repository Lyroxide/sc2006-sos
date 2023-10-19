import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mssql'
});

export default sequelize;