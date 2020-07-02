const jwt = require('jsonwebtoken');
const { masterKey } = require('../public/keys');
const user = require('../app/userModel');

//function to authenticate user with json web token
const userAuthenticate = function userAuthenticate(req, res, next) {
    try {
        if (!req.headers.authorization) {
            throw 'Please Login again';
        }
        const token = req.headers.authorization.split(' ')[1];
        const verificarToken = jwt.verify(token, masterKey);

        if (verificarToken) {
            req.usuario = verificarToken;
            console.log('userAuthenticate OK');
            return next();
        } else {
            res.status(501).send('Please Login again');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

//function to check if user admin bvalue is 1 or 0
const adminCheck = async function adminCheck(req, res, next) {
    const { username } = req.usuario;
    const result = await user.findByPk(username);
    if (!result || result.admin != 1) {
        console.log('User is not Admin');
        res
            .status(501)
            .send('You must be admin and login to perform this operation');
    } else {
        console.log('User is verified as admin');
        return next();
    }
};

//function to check user password against database value
const usernamePasswordValidar = async function usernamePasswordValidar(
    username,
    password
) {
    try {
        const result = await user.findByPk(username);
        console.log(result);
        if (result === null) {
            return false;
        } else {
            if (result.passwordHash === password) {
                console.log('Password validated successfully');
                return true;
            } else {
                console.log('Incorrect Password');
                return false;
            }
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

module.exports = { userAuthenticate, adminCheck, usernamePasswordValidar };