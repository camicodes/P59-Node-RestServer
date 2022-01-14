require('./config/config');

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    //Consultar registros
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    //Crear nuevos registros
    res.json('post Usuario');
});

/*app.put('/usuario/:id', (req, res) => {
    //Actualizar registros
    let id = req.params.id;

    res.json({
        id
    });
});*/

app.put('/usuario/:id', (req, res) => {
    //Actualizar registros

    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            mensaje: "El nombre es necesario"
        });
    } else {
        res.json({
            persona: body
        });
    }
});

app.delete('/usuario', (req, res) => {
    //Eliminar registros (cambiar a inactivo)
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto:', process.env.PORT);
});