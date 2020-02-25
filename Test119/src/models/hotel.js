'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    nombre: String,
    email: String,
    telefono: String,
    password: String,
    calificacion: String,
    fechaReservacion: Date,
    precio: String
})

module.exports = mongoose.model('hotel', HotelSchema)