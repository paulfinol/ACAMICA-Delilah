const express = require('express');
const router = express.Router();

router.use('/mgmtplatos', require('./mgmtPlatos.v0'));
router.use('/user', require('./user.v0'));
router.use('/signin', require('./signin.v0'));
router.use('/mgmtUser', require('./mgmtUser.v0'));
router.use('/mgmtOrder', require('./mgmtOrder.v0'));

module.exports = router;