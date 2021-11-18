const { mongo } = require('mongoose');
const Razas = require('../../models/Configuracion/Razas');
const ganadero = require('../../models/ganadero');
const CabezaDeGanado = require("../../models/Ganado/CabezaDeGanado");
const rancho = require("../../models/rancho");

module.exports = async (req, res) => {

    let [ Cabeza ] = await CabezaDeGanado.find(
        {
            _id: mongo.ObjectId( req.body.id )
        }
        );

        try {
            return res.status(200).json(
                {
                    msg:`data from ${Cabeza.Siniiga}`,
                    status:true,
                    ActionResult: "getting data from ID",
                    Cabeza,
                    Main:{
                        Rancho:   await rancho.findOne( { _id:Cabeza.Rancho  } ).select({Nombre:1, owner:1, Responsable:1, Proposito:1}),
                        Ganadero: await ganadero.findOne({ _id: Cabeza.Ganadero }).select({Nombre:1, UPP:1}),
                        Raza:     await Razas.findOne({ _id:Cabeza.Raza }).select({Nombre:1, Descripcion:1})
                    }
                }
            );
        } catch (error) {
            
            console.log(`> hay un  ${error}`);

            return res.status(200).json(
                {
                    msg:`no data`,
                    status:true,
                    ActionResult: "No data",
                    Cabeza:[],
                    Main:{
                        Rancho:   [],
                        Ganadero: [],
                        Raza:     []
                    }
                }
            );
        }



};