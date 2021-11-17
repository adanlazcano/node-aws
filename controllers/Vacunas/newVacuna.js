const jwt = require( 'jsonwebtoken' );
const { mongo } = require('mongoose')
const Vacunas = require('./../../models/Vacunas/Vaccines');

module.exports = async ( req, res ) => {

const user = jwt.decode( req.body.token )
    console.log(req.body )
const obj = {
    Nombre:req.body.data.Nombre,
    Via: req.body.data.Via,
    Dosis: req.body.data.Dosis,
    x_kg_Peso: req.body.data.x_kg_Peso,
    Grupo: mongo.ObjectId(req.body.data.idGrupo),
    owner: mongo.ObjectId(user._id)
    }
    try {

        const response = await Vacunas.find({Nombre: req.body.data.Nombre});
        if( response.length === 0){
            const request =  await Vacunas.create( obj );
            
            return res.status(200).json({
                msg: "Vacuna añadida", 
                ActionResult:"done",
                status:true
            });
        } 

    } catch (error) {
        console.log(`hay un ${error}`)
        return res.status(200).json({

                msg: "Vacuna no añadida", 
                ActionResult:"sorry!",
                status:true
        })
    }

    return res.status(200).json({
        msg:"Ya existe",
        ActionResult:"No añadida", 
        status:false
    })

}