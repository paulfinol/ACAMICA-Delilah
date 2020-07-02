const Sequelize = require('sequelize');
const { sequelize } = require('../database/database')
const platos = require('./platosModel');


const orders = sequelize.define("orders", {
    orderId: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    status: {
        type: Sequelize.STRING(15),
    },
    createdAt: {
        type: Sequelize.DATE,
    },
    payType: {
        type: Sequelize.STRING(15),
    },
    totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        references: {
            model: 'user',
            key: 'username'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
    },
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'orders',
});


platos.belongsToMany(orders, { through: 'orderplatos', foreignKey: "platoTitle" });


module.exports = orders;