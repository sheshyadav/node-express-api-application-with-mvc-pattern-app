import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

try {
    await sequelize.authenticate();
    console.log('Database Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
export default sequelize;