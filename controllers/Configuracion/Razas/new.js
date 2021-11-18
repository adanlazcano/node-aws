const Razas = require("../../../models/Configuracion/Razas");
const { mongo } = require('mongoose');

module.exports = async ( req, res ) => {


    const response =  await Razas.find({
        Nombre: req.body.Nombre,
        owner: mongo.ObjectId( req.body.owner )
    })

    console.log( response )

    if( response.length === 0 ){

        try {

            const newRaza = await Razas.create({
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                owner: mongo.ObjectId(req.body.owner)
            })


            return res.status(200).json({
                msg:"Nueva Raza creada",
                status:true,
                ActionResult: "nueva raza"
            })

        } catch (error) {   
            console.log(`> hay un ${error}`);
            return res.status(200).json({
                msg:"Nueva raza no creada",
                status:false,
                ActionResult:"raza no creada"
            })
        }

    }else{

        return res.status(200).json({
            msg:"Raza existente",
            status:false,
            ActionResult:" sin efectos"
        })
    }

}