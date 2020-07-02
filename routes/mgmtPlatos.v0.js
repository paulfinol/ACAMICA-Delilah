const express = require('express');
const router = express.Router();

const {
    userAuthenticate,
    adminCheck,
} = require('../public/userAuthenticate.v0');

router.use(userAuthenticate);
router.use(adminCheck);

const { platosCreate, platosSearch, platosSearchOne, platosRemoveOne, platosUpdateOne } = require('../controller/platosCtrl');

//endpoint for admin to add dish to menu
router.post(
    '/add',
    addUndefinedCheck,
    emptyFields,
    priceNumber, platosCreate
);

//endpoint for admin to search all dish in menu
router.get('/search', platosSearch);

//endpoint for admin to search one dish in menu
router.get('/search/:platoTitle', platosSearchOne);

//validate a input for price are just numbers max 10 digits
function priceNumber(req, res, next) {
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    if (typeof req.body.price !== 'undefined') {
        if (req.body.price.length >= 10) {
            res.status(500).send(`Price must be lower than 10 digits`);
        } else {
            if (!regex.test(req.body.price)) {
                res.status(500).send(`Price must have numbers and/or decimal point`);
            } else {
                next();
            }
        }
    } else {
        next();
    }
}

//function to validate undefined fields in the body
function addUndefinedCheck(req, res, next) {
    if (
        typeof req.body.platoTitle == 'undefined' ||
        typeof req.body.platoPrice == 'undefined'
    ) {
        res.status(500).send(`Specify both parameters`);
    } else {
        next();
    }
}

//function to validate empty fields for update in the body
function updateUndefinedCheck(req, res, next) {
    if (
        typeof req.body.platoPrice == 'undefined'
    ) {
        res.status(500).send(`Specify at least one parameter`);
    } else {
        next();
    }
}

//function to validate undefined fields in the body
function emptyFields(req, res, next) {
    const values = Object.values(req.body);
    values.forEach((element) => {
        if (element.length == 0) {
            res.status(500).send(`Dont leave empty values`);
            throw new Error('user sent parameter with empty value');
        }
    });
    next();
}

//endpoint for admin to update one dish in menu
router.patch(
    '/update/:platoTitle',
    updateUndefinedCheck,
    emptyFields,
    priceNumber, platosUpdateOne
);

//endpoint for admin to remove one dish in menu
router.delete('/rmv/:platoTitle', platosRemoveOne);

module.exports = router;