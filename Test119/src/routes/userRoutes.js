'use strict'

var express = require("express")
var UserController = require("../controllers/userController")
var md_auth = require("../middlewares/authenticated")

//SUBIR IMAGEN
var multiparty = require('connect-multiparty')

//RUTAS
var api = express.Router()
api.post('/registrar-usuario', UserController.registrar);
api.post('/login', UserController.login)
api.put('/editar-usuario/:idUsuario', md_auth.ensureAuth, UserController.editarUsuario)
api.delete('/eliminar-usuario/:idUsuario', md_auth.ensureAuth, UserController.eliminarUsuario)


module.exports = api;
