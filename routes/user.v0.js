const express = require('express');
const router = express.Router();

const { userCreate, userSearchOne } = require('../controller/userCtrl');
const { platosSearch } = require('../controller/platosCtrl');
const { userAuthenticate } = require('../public/userAuthenticate.v0');
const { ordersCreate } = require('../controller/ordersCtrl');

//endpoint for user signup
router.post(
    '/signup',
    addUndefinedCheck,
    emptyFields,
    checkPhone,
    validateEmail,
    checkPassword,
    userCreate
);

//function to validate undefined fields in the body
function addUndefinedCheck(req, res, next) {
    if (
        typeof req.body.username == 'undefined' ||
        typeof req.body.name == 'undefined' ||
        typeof req.body.mobile == 'undefined' ||
        typeof req.body.email == 'undefined' ||
        typeof req.body.passwordHash == 'undefined' ||
        typeof req.body.address == 'undefined'
    ) {
        res.status(501).send(`Specify all parameters`);
    } else {
        console.log('addUndefinedCheck OK');
        next();
    }
}

//function to validate empty fields in the body
function emptyFields(req, res, next) {
    const values = Object.values(req.body);
    values.forEach((element) => {
        if (element.length == 0) {
            res.status(502).send(`Dont leave empty values`);
            throw new Error('user sent parameter with empty value');
        }
    });
    console.log('emptyFields OK');
    next();
}

// Function to validate mail, If you want to work on 4 digit domain, for example, .info then you must change w{2,3} to w{2,4}
function validateEmail(req, res, next) {
    const { email } = req.body;
    if (email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
            console.log('validateEmail OK');
            next();
        } else {
            res.status(504).send(`Error en email`);
        }
    } else {
        console.log('validateEmail OK');
        next();
    }
}

//To check a password between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter
function checkPassword(req, res, next) {
    const { passwordHash } = req.body;
    if (passwordHash) {
        var passw = /^[A-Za-z]\w{7,14}$/;
        if (passwordHash.match(passw)) {
            console.log('checkPassword OK');
            next();
        } else {
            res.status(505).send(`Error en password`);
        }
    } else {
        console.log('checkPassword OK');
        next();
    }
}

//function to validate a phone number of 10 digit
function checkPhone(req, res, next) {
    const { mobile } = req.body;

    if (mobile) {
        var phoneno = /^\d{10}$/;
        if (mobile.match(phoneno)) {
            console.log('checkPhone OK');
            next();
        } else {
            res.status(503).send(`Error en mobile`);
        }
    } else {
        console.log('checkPhone OK');
        next();
    }
}

//Function to limit user to search his own data
function usernameCheck(req, res, next) {
    const { username } = req.params;
    const usernameVerified = Object.values(req.usuario)[0];
    if (username == usernameVerified) {
        console.log('usernameCheck OK');
        return next();
    } else {
        res.status(501).send(`You are not allowed to do this operation`);
    }
}

//endpoint for user to get his own data
router.get('/search/:username', userAuthenticate, usernameCheck, userSearchOne);

//endpoint for user to get all dishes available in the menu
router.get('/search', userAuthenticate, platosSearch);

//endpoint for user to make an order
router.post('/addOrder', userAuthenticate, emptyFields, ordersCreate);

module.exports = router;