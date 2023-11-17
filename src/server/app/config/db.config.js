import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('letsmakantogether', 'root', '123456789', {
//const sequelize = new Sequelize('letsmakantogether', 'root', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

export default sequelize;
