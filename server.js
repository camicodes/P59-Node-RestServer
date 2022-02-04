require('./config/config');

const express = require("express");
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Todos los endpoints de usuario
app.use(require('./server/routes/usuario'));

/* Conexion con BDD */
mongoose.connect(process.env.URLDB, { useNewUrlParser: true },
    (err, res) => {
        if (err) {
            throw err;
        }

        console.log("Base de datos ON LINE!");
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto:', process.env.PORT);
});