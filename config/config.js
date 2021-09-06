require('dotenv').config();

module.exports = {
  host: process.env.HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  seedersStorage: 'sequelize',
  seedersStorageTableName: 'seeds',
  migrationStorage: 'sequelize',
  migrationStorageTableName: 'migrations',
};
