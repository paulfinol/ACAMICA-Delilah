const platos = require('../app/platosModel')

const platosCreate = async function create(req, res) {
    try {
        const { dataValues } = await platos.create(req.body);
        res.json(dataValues);
        console.log('platos created by admin');
    } catch (err) {
        console.log(err);
        res.status(500).send('review input data is not duplicated and complies with rules');
    }
}

const platosUpdateOne = async function(req, res) {
    const platoTitle = req.params;
    try {
        const [result] = await platos.update(req.body, { where: platoTitle });
        switch (result) {
            case 1:
                res.json({ platoTitle: platoTitle, platoPrice: req.body });
                console.log('plato udpated Successfully');
                break;
            default:
                res.status(500).send('data was not found or vlaue didint change');
                console.log('data was not found or vlaue didint change');
                break;
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('review input data is not duplicated and complies with rules');
    }
}

const platosSearch = async function(req, res) {
    try {
        const result = await platos.findAll();
        res.json(result);
        console.log(result);
    } catch (err) {
        console.log(err)
        res.status(500).send('review input data is not duplicated and complies with rules');
    }
}

const platosSearchOne = async function(req, res) {
    const { platoTitle } = req.params;
    try {
        const result = await platos.findByPk(platoTitle);
        if (result === null) {
            res.status(500).send('the dish is not in the menu');
        } else {
            res.json(result);
            console.log(result);
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('review input data is not duplicated and complies with rules');
    }
}

const platosRemoveOne = async function(req, res) {
    const platoTitle = req.params;
    try {
        const result = await platos.destroy({
            where: platoTitle
        });
        res.send("plato removed");
        console.log('plato removed');
    } catch (err) {
        console.log(err)
        res.status(500).send('review plato info to remove and complies with rules');
    }
}

module.exports = { platosCreate, platosSearch, platosSearchOne, platosRemoveOne, platosUpdateOne };