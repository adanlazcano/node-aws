const jwt = require( 'jsonwebtoken' );
const { mongo } = require('mongoose');
const Grupos = require("../../models/Vacunas/Grupos");


module.exports = async (req,res) => {

    const user = jwt .decode( req.body.token);

    const response = await Grupos.find({
        Nombre: req.body.data,
        owner: mongo.ObjectId( user._id )
    });

    if( response.length === 0){

        try {
            
            const newGroupres = await Grupos.create({
                Nombre:req.body.data,
                owner: mongo.ObjectId( user._id )
            });


            console.log( "newGroupres", newGroupres )

            return res.status(200).json({
                msg:"Nuevo grupo añadido",
                status: true,
                ActionResult:"Grupo añadido"
            })  

        } catch (error) {
            console.log(` > hay un ${error} `)

            return res.status(200).json({
                msg:"Nuevo  no grupo añadido",
                status: false,
                ActionResult:"Grupo no añadido"
            })
        }
    }else{

        console.log('ya existe ')
        return res.status(200).json({
            msg:"Grupo ya existente",
            status: false,
            ActionResult:"Grupo no añadido"
        })
    }
} 