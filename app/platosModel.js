const Sequelize = require('sequelize');
const { sequelize } = require('../database/database')

const platos = sequelize.define("platos", {
    platoTitle: {
        type: Sequelize.STRING(75),
        primaryKey: true,
        allowNull: false,
        unique: 'uq_platoTitle'
    },
    platoPrice: {
        type: Sequelize.FLOAT
    },
}, {
    timestamps: false,
    freezeTableName: true,
    allowNull: false,
    tableName: 'platos',
});

module.exports = platos;