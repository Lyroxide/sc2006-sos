import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('letsmakantogether', 'root', '1234', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

export default sequelize;