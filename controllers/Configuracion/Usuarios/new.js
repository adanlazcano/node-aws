const { mongo } = require('mongoose');
const jwt = require('jsonwebtoken');
const UsuarioGanadero = require("../../../models/Configuracion/UsuarioGanadero");
const sendMail = require('./../../../config/nodemailer');

module.exports = async ( req, res ) => {

    console.log( req.body )

    const user = jwt.decode( req.body.token );

    const response =  await UsuarioGanadero.find({
        email: req.body.email,
        owner: mongo.ObjectId(user._id),
    });

    if( response.length === 0 ){

        try {
            let resEmail= null;
            const newUser =  await UsuarioGanadero
            .create({
                Nombre: req.body.Nombre,
                email: req.body.email,
                owner: mongo.ObjectId( user._id ),
                Rol: req.body.Rol
            });

                if( newUser ){
                    
                resEmail = await sendMail(req.body.email, newUser._id, req.body.Nombre, process.env.MAILKEY);

                console.log( "resEmail", resEmail )
                return res.status(200).json({
                    msg: " Nuevo usuario creado desde plataforma ",
                    status: true,
                    ActionResult: "Usuario creado",
                })

                }else{
                    
                    return res.status(200).json({
                        msg: "Usuario no registrado, comuniquese con el aministrador",
                        status: false,
                        ActionResult: "Usuario no creado",
                    })
                }


        } catch (error) {
            console.log(`> hay un ${error}`);
            return res.status(200).json({
                msg: "Usuario No creado desde plataforma ",
                status: false,
                ActionResult: "Usuario no creado",
            })
        }
    }else{

        return res.status(200).json({
            msg: "Usuario existente",
            status: false,
            ActionResult: "Usuario no creado",
        })
    }

}