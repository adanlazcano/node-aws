const { mongo } = require('mongoose');
const CabezaDeGanado = require("../../models/Ganado/CabezaDeGanado")

module.exports = async(req, res) => {

    console.log("req.body ========>", req.body);

    const response = await CabezaDeGanado.findOne({ _id: mongo.ObjectId(req.body.id) });


    try {
        const response = await CabezaDeGanado.findOneAndUpdate({ _id: mongo.ObjectId(req.body.id) },

            { $set: {
                    [req.body.name]: req.body.name === 'Fecha' || req.body.name === 'Monta' ? new Date(req.body.value) : req.body.value } },

            { new: true, upsert: true, setDefaultsOnInsert: true },

        )

        return res.status(200).json({
            msg: "Cambio Realizado",
            status: true,
            ActionResult: "Cambio en ganado"
        })

    } catch (error) {

        console.log(`> hay un ${error}`)

        return res.status(200).json({
            msg: "Cambio no Realizado",
            status: false,
            ActionResult: "sin cambios"
        })

    }

}