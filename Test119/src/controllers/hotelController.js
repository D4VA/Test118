'user strict'

//IMPORTS
var bcrypt = require("bcrypt-nodejs")
var Hotel = require('../models/hotel')
var jwt = require("../services/jwt")


function registrar(req, res){
    var hotel = new Hotel(); 
    var params = req.body; 

    if(params.nombre && params.password){
        hotel.nombre = params.nombre;
        hotel.email = params.email;
        hotel.telefono = params.telefono;
        hotel.calificacion = params.calificacion;
        hotel.fechaReservacion = params.fechaReservacion;
        hotel.precio = params.precio;


        Hotel.find({ $or: [
            { nombre: hotel.nombre },
            { email: hotel.email }
        ] }).exec((err, hoteles)=>{
                if(err) return res.status(500).send({ message: 'Error en la peticion de hoteles' })

                if(hoteles && hoteles.length >= 1){
                    return res.status(500).send({ message: 'El hotel ya existe'})
                }else{
                    bcrypt.hash(params.password, null, null, (err, hash)=>{
                        hotel.password = hash;
                        
                        hotel.save((err, hotelGuardado)=>{
                            if(err) return res.status(500).send({ message: 'Error al guardar el Hotel'})

                            if(hotelGuardado){
                                res.status(200).send({ hotel: hotelGuardado})
                            }else{
                                res.status(404).send({ message: 'No se ha podido registrar el Hotel'})
                            }
                        })
                    })
                }
        }) 
    }else{
        res.status(200).send({

            message: 'Rellene todos los datos necesarios'
        })
    }
}

function editarHotel(req, res){
    var hotelId = req.params.idHotel;
    var params = req.body

    delete params.password

    if(hotelId != req.user.sub){
        return res.status(500).send({message: 'No tiene los permisos para actualizar este hotel'})
    }

    Hotel.findByIdAndUpdate(hotelId, params, { new: true }, (err, hotelActualizado)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion' })
        if(!hotelActualizado) return res.status(404).send({ message: 'No se a podido actualizar los datos del Hotel'})

        return res.status(200).send({ hotel: hotelActualizado })

    })
}

function eliminarHotel(req, res){
    var hotelId = req.params.idHotel;

    if(hotelId != req.user.sub){
        return res.status(500).send({message: 'No tiene los permisos para ver este hotel'})
    }

    Hotel.findByIdAndDelete(hotelId,(err, eliminarHotel)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!eliminarHotel) return res.status(404).send({ message: 'No se a podido eliminar el Hotel'})

        return res.status(200).send( { hotel: eliminarHotel})
    })

}

function mostrarRangoFechas(req, res){
    var params = req.body;

        Hotel.find({fechaReservacion: {$gte: new Date(params.fechaEntrada),$lt: new Date(params.fechaSalida)}},(err, verFecha)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!verFecha) return res.status(404).send({ message: 'No se a podido mostrar la fecha de Reservacion'})

        return res.status(200).send({ hotel: verFecha})
    })
}

function mostrarCalificacion(req, res){
    var calificacionH = req.params.calificacionHotel;

        Hotel.find({calificacion:{$regex: calificacionH}},(err, verCalif)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticion'})
            if(!verCalif) return res.status(404).send({ message: 'No se a podido mostrar la calficacion del Hotel'})

            return res.status(200).send({ hotel: verCalif})
        })
}

function ordenAlfabetico(req, res){
        Hotel.find((err, verOrden)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticion'})
           if(!verOrden) return res.status(404).send({ message: 'No se a podido mostrar el orden de Nombres'})

             return res.status(200).send({ hotel: verOrden})
         }).sort({nombre: 1})
 }

 function mayorMenor(req, res){
    Hotel.find((err, verOrden)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!verOrden) return res.status(404).send({ message: 'No se a podido mostrar el orden de Precios'})

         return res.status(200).send({ hotel: verOrden})
     }).sort({precio: -1})
}

function menorMayor(req, res){
    Hotel.find((err, verOrden)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!verOrden) return res.status(404).send({ message: 'No se a podido mostrar el orden de Precios'})

         return res.status(200).send({ hotel: verOrden})
     }).sort({precio: 1})
}

 module.exports = {
    registrar,
    editarHotel,
    eliminarHotel,
    mostrarRangoFechas,
    mostrarCalificacion,
    ordenAlfabetico,
    mayorMenor,
    menorMayor
}