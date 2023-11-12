import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('letsmakantogether', 'root', 'KUPp55pp3EEh^8CK%P7A', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

export default sequelize;
