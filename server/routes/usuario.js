//importar el modulo de express
const express = require("express");
// Importar la libreria para encriptar
const bcrypt = require('bcrypt');
//Importar el modulo de usuario
const Usuario = require('../models/usuario');
//Importar underscore 
const _ = require('underscore');
//Crear el objeto app
const app = express();

app.get('/usuario', (req, res) => {
    //Consultar registros
    //res.json('get Usuario');

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    usuarios
                });
            });
        });
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
    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });
});

/*if (body.nombre === undefined) {
        res.status(400).json({
            mensaje: "El nombre es necesario"
        });
    } else {
        res.json({
            persona: body
        });
    }
});*/

//Eliminar registros (cambiar a inactivo)
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (usuarioDB === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//exportar para que se pueda utilizar en otros modulos
module.exports = app;

/*
Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        })
    }

    if (usuarioBorrado === null) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "Usuario no encontrado"
            }
        });
    }

    res.json({
        ok: true,
        usuario: usuarioBorrado
    });
});*/

//res.json('delete Usuario');