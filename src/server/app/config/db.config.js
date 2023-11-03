import { Sequelize } from 'sequelize';

<<<<<<< HEAD
const sequelize = new Sequelize('letsmakantogether', 'root', '123456789', {
=======
const sequelize = new Sequelize('letsmakantogether', 'root', 'QWEasd!23', {
>>>>>>> origin/daryl-branch
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

export default sequelize;
