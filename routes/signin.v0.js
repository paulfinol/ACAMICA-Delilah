const express = require('express');
const router = express.Router();

const { usernamePasswordValidar } = require('../public/userAuthenticate.v0');

const jwt = require('jsonwebtoken');
const { masterKey } = require('../public/keys');

// endpoint for user signin
router.post('/', async(req, res) => {
    const { username, passwordHash } = req.body;
    const validado = await usernamePasswordValidar(username, passwordHash);
    if (!validado) {
        res.status(501).send('Incorrect username or password');
        console.log('Incorrect username or password');
        return;
    } else {
        const token = jwt.sign({ username }, masterKey);
        res.json({ token: token });
        console.log('Sign in completed');
    }
});

module.exports = router;