const jwt = require('jsonwebtoken');
const { mongo } = require('mongoose');
const TipodeMuerte = require("../../../models/Configuracion/TipodeMuerte");

module.exports = async (req, res) => {

    const user = jwt.decode( req.body.token );
    console.log( user  );
    const response = await TipodeMuerte.find({
        Nombre: req.body.Nombre,
        owner: mongo.ObjectId( user._id )
    })


    if( response.length === 0){

        try {
            const newTipo =  await TipodeMuerte.create({
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                owner: mongo.ObjectId( user._id )
            })

            return res.status(200).json({
                msg:"Nuevo tipo añadido",
                status:true,
                ActionResult:"nuevo tipo"
            })
        } catch (error) {
            console.log(`> hay un  ${error}`)

            return res.status(200).json({
                msg:"Nuevo tipo no agregado",
                status:false,
                ActionResult:"Sin effectco"
            })
        }
    }else{

        return res.status(200).json({
            msg:"Tipo ya existente",
            status:false,
            ActionResult:"Sin efecto"
        })

    }

}   