//importar el modulo de express
const express = require("express");
// Importar la libreria para encriptar
const bcrypt = require('bcrypt');
//Importar el modulo de usuario
const Usuario = require('../models/usuario');
//Crear el objeto app
const app = express();

app.get('/usuario', (req, res) => {
    //Consultar registros
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    //Crear nuevos registros
    //res.json('post Usuario');

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuarioDB: usuarioDB
        });
    });
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

//Eliminar registros (cambiar a inactivo)
app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

//exportar para que se pueda utilizar en otros modulos
module.exports = app;