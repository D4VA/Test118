'use strict'

var express = require("express")
var HotelController = require("../controllers/hotelController")
var md_auth = require("../middlewares/authenticated")

//SUBIR IMAGEN
var multiparty = require('connect-multiparty')

//RUTAS
var api = express.Router()
api.post('/registrar-hotel', HotelController.registrar);
api.put('/editar-hotel/:idHotel', md_auth.ensureAuth, HotelController.editarHotel)
api.delete('/eliminar-hotel/:idHotel', md_auth.ensureAuth, HotelController.eliminarHotel)
api.get('/mostrar-reservacion',md_auth.ensureAuth, HotelController.mostrarRangoFechas)
api.get('/mostrar-calificacion/:calificacionHotel', md_auth.ensureAuth, HotelController.mostrarCalificacion)
api.get('/orden-alfabetico', md_auth.ensureAuth, HotelController.ordenAlfabetico)
api.get('/orden-mayorMenor', md_auth.ensureAuth, HotelController.mayorMenor)
api.get('/orden-menorMayor', md_auth.ensureAuth, HotelController.menorMayor)


module.exports = api;
