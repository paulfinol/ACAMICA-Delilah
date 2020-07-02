const Sequelize = require('sequelize');
const { sequelize } = require('../database/database')
const orders = require('./ordersModel')
const orderplatos = require('./orderplatosModel');
const platos = require('./platosModel');

const user = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'uq_name',
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: 'uq_email'
    },
    mobile: {
        type: Sequelize.STRING(10),
        allowNull: false,
        unique: 'uq_mobile'
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passwordHash: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    admin: {
        type: Sequelize.TINYINT
    },
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'user',
});

user.hasMany(orders, { foreignKey: 'username', sourceKey: 'username' })
orders.belongsTo(user, { foreignKey: 'username', sourceKey: 'username' })
orderplatos.belongsTo(platos, { foreignKey: 'platoTitle', targetKey: 'platoTitle' });
orders.belongsToMany(platos, { through: 'orderplatos', foreignKey: "orderId" });
orders.hasMany(orderplatos, { foreignKey: 'orderId', sourceKey: 'orderId' });
orderplatos.belongsTo(orders, { foreignKey: 'orderId', targetKey: 'orderId' });
platos.hasMany(orderplatos, { foreignKey: 'platoTitle', sourceKey: 'platoTitle' });

module.exports = user;