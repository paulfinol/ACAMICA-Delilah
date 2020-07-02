const express = require('express');
const bodyParser = require('body-parser');

//initialization

const app = express();
// sequelize.sync();

//Middlewares

app.use(bodyParser.json());

//Routes

app.use(require('./routes/index'));

//Starting the server

app.listen(3000, () => {
    console.log(`Server iniciado en http://127.0.0.1:3000`);
});