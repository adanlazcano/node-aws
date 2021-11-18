const jwt = require('jsonwebtoken');
const GanadoSchema = require('./../../models/Ganado/CabezaDeGanado');
const { mongo } = require('mongoose');


module.exports = async(req, res) => {

    const user = jwt.decode(req.body.token);

    console.log(req.body.Fecha)

    const response = await GanadoSchema.find({
        Siniiga: req.body.Siniiga,

        owner: mongo.ObjectId(user._id)
    });

    if (response.length === 0) {

        try {
            const resNewCabeza = await GanadoSchema.create({
                Rancho: mongo.ObjectId(req.body.Rancho),
                Raza: mongo.ObjectId(req.body.Raza),
                Ganadero: mongo.ObjectId(req.body.Ganadero),
                Sexo: req.body.Sexo,
                Status: req.body.Status,
                Fecha: req.body.Fecha,
                Ciclo: req.body.Ciclo,
                SiniigaM: req.body.SiniigaM,
                GanaderoM: req.body.GanaderoM,
                PedigreeM: req.body.PedigreeM,
                SiniigaH: req.body.SiniigaH,
                RanchoH: req.body.RanchoH,
                GanaderoH: req.body.GanaderoH,
                PedigreeH: req.body.PedigreeH,
                Siniiga: req.body.Siniiga,
                owner: mongo.ObjectId(user._id),
            });

            console.log("resNewCabeza", resNewCabeza);

            return res.status(200).json({
                msg: "Nueva cabeza de ganado añadida",
                status: true,
                ActionResult: "data inserted",
            })

        } catch (error) {

            console.log(`hay un ${error}`)

            return res.status(200).json({
                msg: "Cabeza no añadida 2",
                status: false,
                ActionResult: "data no inserted",
            })
        }

    } else {

        return res.status(200).json({
            msg: "Cabeza no añadida 3",
            status: false,
            ActionResult: "data no inserted",
        })
    }

}