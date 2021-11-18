const jwt = require('jsonwebtoken');
const { mongo } = require('mongoose');
const Razas = require("../../../models/Configuracion/Razas");
const RolSchema = require("../../../models/Configuracion/Rol");
const TipodeMuerte = require("../../../models/Configuracion/TipodeMuerte");
const UsuarioGanadero = require("../../../models/Configuracion/UsuarioGanadero");


module.exports = getInitialData =  async (req, res, next) => {

    const user  = jwt.decode( req.body.token );

    console.log( "req.body", req.body );

    console.log( "user", user );



    const fullData = {
        Roles:    await RolSchema      .find({owner:mongo.ObjectId( user._id )}).select({Nombre:1, Descripcion:1}).sort({createdAt:-1}),
        Usuarios: await UsuarioGanadero.find({owner:mongo.ObjectId( user._id )}).select({Nombre:1, email:1,Rol:1}).sort({createdAt:-1}),
        Razas:    await Razas          .find({owner:mongo.ObjectId( user._id )}).select({Nombre:1, Descripcion:1}).sort({createdAt:-1}),
        Tipos:    await TipodeMuerte   .find({owner:mongo.ObjectId( user._id )}).select({Nombre:1, Descripcion:1}).sort({createdAt:-1})
    }



    return res.status(200).json({
        msg: " prueba ",
        status:true,
        ActionResult: "pruebas",
        data: fullData
    })
}   