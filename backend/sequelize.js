import SequelizePkg from 'sequelize';
const { Sequelize } = SequelizePkg; // même méthode pour Sequelize
import config from './db.config.js';

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
  }
);

export default sequelize;
