const express = require('express');
const router = express.Router();

const {
    userAuthenticate,
    adminCheck,
} = require('../public/userAuthenticate.v0');

const {
    ordersCreate,
    ordersSearch,
    ordersSearchOne,
    ordersSearchDetail,
    ordersRemoveOne,
    ordersUpdateOne,
} = require('../controller/ordersCtrl');

router.use(userAuthenticate);
router.use(adminCheck);

//endpoint for admin to make an order for user
router.post('/addOrder', emptyFields, ordersCreate);

//validate empty fields
function emptyFields(req, res, next) {
    const values = Object.values(req.body);
    values.forEach((element) => {
        if (element.length == 0) {
            res.status(500).send(`Dont leave empty values`);
            throw new Error('user sent parameter with empty value');
        }
    });
    console.log('no emptyFields in body');
    next();
}

//endpoint for admin to update an order for user
router.patch('/updtOrder/:orderId', emptyFields, ordersUpdateOne);

//endpoint for admin to search an order for user
router.get('/searchOrder', emptyFields, ordersSearch);

//endpoint for admin to search an order for user
router.get('/searchOrder/:orderId', emptyFields, ordersSearchOne);

router.get('/searchDetail/:orderId', emptyFields, ordersSearchDetail);

//endpoint for admin to remove an order for user
router.delete('/rmvOrder/:orderId', emptyFields, ordersRemoveOne);

module.exports = router;