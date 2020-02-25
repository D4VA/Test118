'user strict'

//IMPORTS
var bcrypt = require("bcrypt-nodejs")
var User = require('../models/user')
var Hotel = require('../models/hotel')
var jwt = require("../services/jwt")


function registrar(req, res){
    var user = new User(); 
    var params = req.body; 

    if(params.nombre && params.usuario && params.password){
        user.nombre = params.nombre;
        user.usuario = params.usuario;
        user.email = params.email;


        User.find({ $or: [
            { usuario: user.usuario },
            { email: user.email }
        ] }).exec((err, usuarios)=>{
                if(err) return res.status(500).send({ message: 'Error en la peticion de usuarios' })

                if(usuarios && usuarios.length >= 1){
                    return res.status(500).send({ message: 'El usuario ya existe'})
                }else{
                    bcrypt.hash(params.password, null, null, (err, hash)=>{
                        user.password = hash;
                        
                        user.save((err, usuarioGuardado)=>{
                            if(err) return res.status(500).send({ message: 'Error al guardar el Usuario'})

                            if(usuarioGuardado){
                                res.status(200).send({ user: usuarioGuardado})
                            }else{
                                res.status(404).send({ message: 'No se ha podido registrar el usuario'})
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

function login(req, res){
    var params = req.body;

    User.findOne({email: params.email}, (err, user)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion'})

        if(user){
            bcrypt.compare(params.password, user.password, (err, check)=>{
                if(check){
                    if(params.gettoken){
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    }else{
                        user.password = undefined;
                        return res.status(200).send({ user })
                    }
                }else{
                    return res.status(404).send({ message: 'El usuario no se a podido identificar'})
                }
            })
        }else{
            if (user) {
                return res.status(404).send({ message: 'El usuario no se a podido logear'})
            } else {
                Hotel.findOne({email: params.email}, (err, user)=>{
                    if(err) return res.status(500).send({ message: 'Error en la peticion'})
            
                    if(user){
                        bcrypt.compare(params.password, user.password, (err, check)=>{
                            if(check){
                                if(params.gettoken){
                                    return res.status(200).send({
                                        token: jwt.createToken(user)
                                    })
                                }else{
                                    user.password = undefined;
                                    return res.status(200).send({ user })
                                }
                            }else{
                                return res.status(404).send({ message: 'El hotel no se a podido identificar'})
                            }
                        })
                    }else{
                         return res.status(404).send({ message: 'El hotel no se a podido logear'})
                    }
                })
            }
        }
    })
}

function editarUsuario(req, res){
    var userId = req.params.idUsuario;
    var params = req.body

    delete params.password

    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tiene los permisos para actulizar este usuario'})
    }

    User.findByIdAndUpdate(userId, params, { new: true }, (err, usuarioActualizado)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion' })
        if(!usuarioActualizado) return res.status(404).send({ message: 'No se a podido actualizar los datos del Usuario'})

        return res.status(200).send({ usuario: usuarioActualizado })

    })
}

function eliminarUsuario(req, res){
    var userId = req.params.idUsuario;

    if(userId != req.user.sub){
        return res.status(500).send({message: 'No tiene los permisos para ver este usuario'})
    }

    User.findByIdAndDelete(userId,(err, eliminarUsuarios)=>{
        if(err) return res.status(500).send({ message: 'Error en la peticion'})
        if(!eliminarUsuarios) return res.status(404).send({ message: 'No se a podido eliminar el Usuario'})

        return res.status(200).send( { usuario: eliminarUsuarios})
    })

}



module.exports = {
    registrar, 
    login,
    editarUsuario,
    eliminarUsuario
}
