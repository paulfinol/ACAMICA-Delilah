const express = require('express');
const router = express.Router();

const {
    userAuthenticate,
    adminCheck,
} = require('../public/userAuthenticate.v0');

const { userCreate, userSearch, userSearchOne, userRemoveOne, userUpdateOne } = require('../controller/userCtrl');

router.use(userAuthenticate);
router.use(adminCheck);

//endpoint for admin to add users
router.post(
    '/add',
    addUndefinedCheck,
    emptyFields, userCreate
);

//endpoint for admin to search users
router.get('/search', userSearch);

//endpoint for admin to search scpecific user
router.get('/search/:username', userSearchOne);

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
        typeof req.body.username == 'undefined' ||
        typeof req.body.name == 'undefined' ||
        typeof req.body.mobile == 'undefined' ||
        typeof req.body.email == 'undefined' ||
        typeof req.body.passwordHash == 'undefined' ||
        typeof req.body.address == 'undefined'
    ) {
        res.status(500).send(`Specify all parameters`);
    } else {
        next();
    }
}

//function to validate empty fields in the body for update endpoint
function updateUndefinedCheck(req, res, next) {
    if (
        typeof req.body.username == 'undefined' &&
        typeof req.body.name == 'undefined' &&
        typeof req.body.mobile == 'undefined' &&
        typeof req.body.email == 'undefined' &&
        typeof req.body.passwordHash == 'undefined' &&
        typeof req.body.address == 'undefined'
    ) {
        res.status(500).send(`Specify at least one parameter`);
    } else {
        next();
    }
}

//function to validate empty fields in the body for other endpoint
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

// validate mail If you want to work on 4 digit domain, for example, .info then you must change w{2,3} to w{2,4}
function validateEmail(req, res, next) {
    const mail = req.body.email;
    if (mail) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mail.match(mailformat)) {
            next();
        } else {
            res.status(500).send(`Error en email`);
        }
    } else {
        next();
    }
}

//To check a password between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter
function checkPassword(req, res, next) {
    const pwd = req.body.passwordHash;
    if (pwd) {
        var passw = /^[A-Za-z]\w{7,14}$/;
        if (pwd.match(passw)) {
            next();
        } else {
            res.status(500).send(`Error en password`);
        }
    } else {
        next();
    }
}

//validate a phone number of 10 digit
function checkPhone(req, res, next) {
    const mobile = req.body.mobile;
    if (mobile) {
        var phoneno = /^\d{10}$/;
        if (mobile.match(phoneno)) {
            next();
        } else {
            res.status(500).send(`Error en mobile`);
        }
    } else {
        next();
    }
}

//endpoint to update username information
router.patch(
    '/update/:username',
    updateUndefinedCheck,
    emptyFields,
    priceNumber,
    validateEmail,
    checkPassword,
    checkPhone, userUpdateOne
);

//endpoint to remove username information
router.delete('/rmv/:username', userRemoveOne);

module.exports = router;