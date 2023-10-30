import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sql12657799', 'sql12657799', '6w1G1YbKdj', {
    host: 'sql12.freesqldatabase.com',
    port: 3306,
    dialect: 'mysql',
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

export default sequelize;