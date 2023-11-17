import { Sequelize } from 'sequelize';

 const sequelize = new Sequelize('LetsMakanTogether', 'root', '123456789', {
    host: '172.17.0.2',
    port: 3306,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
    }
});
 
export default sequelize;
