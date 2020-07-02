const { sequelize } = require('../database/database')
const orders = require('../app/ordersModel')
const orderplatos = require('../app/orderplatosModel');

const ordersCreate = async function create(req, res) {
    if (!req.body.orderData.username) { req.body.orderData.username = req.usuario.username };
    const { platosData, orderData } = req.body;
    try {
        const { dataValues } = await orders.create(orderData);
        orderId = dataValues.orderId
        for (const key in platosData) {
            if (platosData.hasOwnProperty(key)) {
                const element = platosData[key];
                await orderplatos.create({ orderId: orderId, platoTitle: element });
            }
        }
        res.json(dataValues);
        console.log('orders created');
    } catch (err) {
        console.log(err)
        res.status(501).send('review input data is not duplicated and complies with rules');
    }
}

const ordersUpdateOne = async function(req, res) {
    const orderId = req.params;
    try {
        const [result] = await orders.update(req.body, { where: orderId });
        switch (result) {
            case 1:
                res.json({ orderStatus: req.body.status });
                console.log('order update OK');
                break;
            default:
                res.status(501).send('order is not found or data didnt change');
                console.log('order is not found or status didnt change');
                break;
        }
    } catch (err) {
        console.log(err)
        res.status(502).send('review input data is not duplicated and complies with rules');
    }
}

const ordersSearch = async function(req, res) {
    try {
        console.log('hola')
            //const result = await orders.findAll({ include: [user, platos] });
        let sql = `SELECT orders.orderId, orders.status, orders.createdAt, orders.paytype, orders.totalPrice, user.username, user.address , GROUP_CONCAT(orderplatos.platoTitle) as platos FROM orders LEFT join user on user.username = orders.username left join orderplatos on orders.orderId = orderplatos.orderId left JOIN platos on orderplatos.platoTitle = platos.platoTitle GROUP by orders.orderId`;
        const result = await sequelize.query(sql);
        res.json(result);
        console.log('search orders OK');
    } catch (err) {
        console.log(err)
        res.status(501).send('review input data is not duplicated and complies with rules');
    }
}

const ordersSearchOne = async function(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    try {
        let sql =
            `SELECT orders.orderId, orders.status, orders.createdAt, orders.paytype, orders.totalPrice, user.username, user.address , GROUP_CONCAT(orderplatos.platoTitle) as platos FROM orders LEFT join user on user.username = orders.username left join orderplatos on orders.orderId = orderplatos.orderId left JOIN platos on orderplatos.platoTitle = platos.platoTitle WHERE orders.orderId = ?`;
        const [result] = await sequelize.query(sql, {
            replacements: [orderId],
        }, { type: sequelize.QueryTypes.SELECT });
        res.json(result);
        console.log('search one order OK');
    } catch (err) {
        console.log(err)
        res.status(500).send('review input data is not duplicated and complies with rules');
    }
}

const ordersSearchDetail = async function(req, res) {
    const orderId = parseInt(req.params.orderId, 10);
    try {
        let sql =
            `SELECT orders.orderId, orders.status, orders.paytype, orders.totalPrice, user.*, GROUP_CONCAT(orderplatos.platoTitle) as platos FROM orders LEFT join user on user.username = orders.username left join orderplatos on orders.orderId = orderplatos.orderId left JOIN platos on orderplatos.platoTitle = platos.platoTitle WHERE orders.orderId = ?`;
        const [result] = await sequelize.query(sql, {
            replacements: [orderId],
        }, { type: sequelize.QueryTypes.SELECT });
        res.json(result);
        console.log('search detail order OK');
    } catch (err) {
        console.log(err)
        res.status(500).send('review input data is not duplicated and complies with rules');
    }
}

const ordersRemoveOne = async function(req, res) {
    const orderId = req.params;
    try {
        const result = await orderplatos.destroy({
            where: orderId
        });
        const result2 = await orders.destroy({
            where: orderId
        });

        res.send("order removed");
        console.log('order removed OK');
    } catch (err) {
        console.log(err)
        res.status(500).send('review input data is not duplicated and complies with rules');
    }
}

module.exports = { ordersCreate, ordersSearch, ordersSearchOne, ordersSearchDetail, ordersRemoveOne, ordersUpdateOne };