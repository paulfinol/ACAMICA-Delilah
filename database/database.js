const mysql = require('mysql2');
const Sequelize = require('sequelize');
const { parameter } = require('../public/keys');

// sequelize initialization
const sequelize = new Sequelize(
    parameter.database,
    parameter.username,
    parameter.password, {
        host: parameter.host,
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
            max: parameter.pool.max,
            min: parameter.pool.min,
            acquire: parameter.pool.acquire,
            idle: parameter.pool.idle
        }
    }
);

module.exports = { sequelize };