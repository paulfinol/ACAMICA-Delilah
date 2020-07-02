const user = require('../app/userModel')

const userCreate = async function create(req, res) {
    try {
        const { dataValues } = await user.create(req.body);
        res.json(dataValues);
        console.log('user created by admin');
    } catch (err) {
        console.log(err)
        res.status(506).send('review input data is not duplicated and complies with rules');
    }
}

const userUpdateOne = async function(req, res) {
    const username = req.params;
    try {
        const [result] = await user.update(req.body, { where: username });
        switch (result) {
            case 1:
                res.json({ change: req.body });
                console.log('update user OK');
                break;
            default:
                res.status(501)('user is not found or value didnt change');
                console.log('user is not found or value didnt change');
                break;
        }
    } catch (err) {
        console.log(err)
        res.status(502).send('review input data is not duplicated and complies with rules');
    }
}

const userSearch = async function(req, res) {
    try {
        const result = await user.findAll();
        res.json(result);
        console.log('search user OK');
    } catch (err) {
        console.log(err)
        res.status(501).send('review input data is not duplicated and complies with rules');
    }
}

const userSearchOne = async function(req, res) {
    const { username } = req.params;
    try {
        const result = await user.findByPk(username);
        res.json(result);
        console.log('search userdata data OK');
    } catch (err) {
        console.log(err)
        res.status(501).send('review input data is not duplicated and complies with rules');
    }
}

const userRemoveOne = async function(req, res) {
    const username = req.params;
    try {
        const result = await user.destroy({
            where: username
        });
        res.send('user removed');
        console.log('remove user OK');
    } catch (err) {
        console.log(err)
        res.status(501).send('review input data is not duplicated and complies with rules');
    }
}

module.exports = { userCreate, userSearch, userSearchOne, userRemoveOne, userUpdateOne };