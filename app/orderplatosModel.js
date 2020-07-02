const Sequelize = require('sequelize');
const { sequelize } = require('../database/database')

const orderplatos = sequelize.define("orderplatos", {
    orderId: {
        type: Sequelize.BIGINT(20),
        primaryKey: false,
        allowNull: false,
        references: {
            model: 'orders',
            key: 'orderId'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
    platoTitle: {
        type: Sequelize.STRING(75),
        primaryKey: false,
        allowNull: false,
        references: {
            model: 'platos',
            key: 'platoTitle'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'orderplatos',
});

orderplatos.removeAttribute('id');



module.exports = orderplatos;