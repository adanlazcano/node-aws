const { mongo }      = require('mongoose');
const jwt            = require('jsonwebtoken');
const CabezaDeGanado = require("../../models/Ganado/CabezaDeGanado");
const Grupos         = require("../../models/Vacunas/Grupos");
const Razas = require('../../models/Configuracion/Razas');
const Vacuna = require('./../../models/Vacunas/Vaccines')



module.exports =  getInitalData = async (req, res) => {


    const user = jwt.decode( req.body.token );

    const fullData = {
        
        Grupos: await Grupos.find({owner: user._id})
        .select({ _id:1, Nombre:1, Grupo:1})
        .sort({createdAt:-1}),
        
        Razas: await Razas.find({owner: mongo.ObjectId( user._id ) }),
        
        Ganado: await CabezaDeGanado
        .find({ owner: mongo.ObjectId( user._id ) })
        .populate( { path:'Rancho' , select:'Nombre'})
        .populate({ path:'Ganadero', select:"Nombre" }),
        
        Vacunas: await Vacuna.find({owner: user._id})
        .select({_id: 1, Nombre:1,Dosis:1,x_kg_Peso:1, Via:1, Grupo:1 })
        .sort({createdAt:-1})

    }


    return res.status(200).json({
        msg:'Prueba all data vacunas',
        status: true,
        ActionResult:'pruebas vaccines',
        fullData
    })
} 