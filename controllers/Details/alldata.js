const jwt = require('jsonwebtoken');
const rancho = require("../../models/rancho");
const Ganaderos = require("../../models/ganadero");
const Razas     = require('./../../models/Configuracion/Razas');
const Ganado    = require('./../../models/Ganado/CabezaDeGanado');

module.exports = async (req, res) =>{

    const user = jwt.decode( req.body.token );

    console.log("req.body", req.body);

    if( !user ){
        return await res.status(200).json({
            status:false,
            ActionResult:"GetInitial fata fail",
            info:[]
        })
    }
    try {

        if(!req.body.id){

     

        return await res.status(200).json({
            status: true,
            ActionResult:"Done",
            info:[
                await rancho.find( {owner:user._id} )   .select({Nombre:1, owner:1, _id:1}).sort({Nombre:1}),
                await Razas.find({ owner:user._id })    .select({Nombre:1, _id:1 }).sort({Nombre:1}),
                await Ganaderos.find({ owner:user._id }).select({Nombre:1, _id:1, owner:1}).sort({Nombre:1}),
                [
                {_id:"H",Nombre:"Hembra"},
                {_id:"M", Nombre:"Macho"}
                ],
                [
                    { _id:"Cargada"    , Nombre:"Cargada"   },
                    { _id:"Vacía"      , Nombre:"Vacía"     },
                    { _id:"Desecho"    , Nombre:"Desecho"   },
                    { _id:"Cría"       , Nombre:"Cría"      },
                    { _id:"Desarrollo" , Nombre:"Desarrollo"},
                    { _id:"Semental"   , Nombre:"Semental"  },
                    { _id:"Vendido"    , Nombre:"Vendido"   },
                    { _id:"Muerto"     , Nombre:"Muerto"    },
                ]
            ],
            Ganado: await Ganado
            .find({$and:[ {owner:user._id}, {Status:'Cría'}]})
            .select({
                Rancho:1,
                Ganadero:1,
                Status:1,
                KgNacimiento:1,
                KgNacimientoDestete:1,
                KgAnual:1,
                Fecha:1,
                Monta:1,
                SiniigaM:1,
                GanaderoM:1,
                PedigreeM:1,
                SiniigaH:1,
                RanchoH:1,
                GanaderoH:1,
                PedigreeH:1,
                Siniiga:1,
                Raza:1
            })
            .sort({createdAt:-1})
        });
    }else{
        return await res.status(200).json({
            status: true,
            ActionResult:"Done",
            info:[
                await rancho.find( {owner:user._id} )   .select({Nombre:1, owner:1, _id:1}).sort({Nombre:1}),
                await Razas.find({ owner:user._id })    .select({Nombre:1, _id:1 }).sort({Nombre:1}),
                await Ganaderos.find({ owner:user._id }).select({Nombre:1, _id:1, owner:1}).sort({Nombre:1}),
                [
                {_id:"H",Nombre:"Hembra"},
                {_id:"M", Nombre:"Macho"}
                ],
                [
                    { _id:"Cargada"    , Nombre:"Cargada"   },
                    { _id:"Vacía"      , Nombre:"Vacía"     },
                    { _id:"Desecho"    , Nombre:"Desecho"   },
                    { _id:"Cría"       , Nombre:"Cría"      },
                    { _id:"Desarrollo" , Nombre:"Desarrollo"},
                    { _id:"Semental"   , Nombre:"Semental"  },
                    { _id:"Vendido"    , Nombre:"Vendido"   },
                    { _id:"Muerto"     , Nombre:"Muerto"    },
                ]
            ],
            Ganado: await Ganado
            .find({$and:[ {owner:user._id}, { Rancho:req.body.id }]})
            .select({
                Rancho:1,
                Ganadero:1,
                Status:1,
                KgNacimiento:1,
                KgNacimientoDestete:1,
                KgAnual:1,
                Fecha:1,
                Monta:1,
                SiniigaM:1,
                GanaderoM:1,
                PedigreeM:1,
                SiniigaH:1,
                RanchoH:1,
                GanaderoH:1,
                PedigreeH:1,
                Siniiga:1,
                Raza:1
            })
            .sort({createdAt:-1})
        });
    }

    } catch (error) {
        

        console.log(`hay un ${error}`);

        return await res.status(200).json({
            status:false,
            ActionResult:"GetInitial fata fail",
            info:[]
        })
    }



}