const { Sequelize } = require('sequelize');
require('dotenv').config(); // Adicionando a configuração do dotenv
;

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
});

module.exports = {
    sequelize
};
