const jwt = require("jsonwebtoken");
const { mongo } = require("mongoose");
const CabezaDeGanado = require("../../models/Ganado/CabezaDeGanado");
const User = require("../../models/User");
const PalpacionModel = require("./../../models/palpacion");

exports.allPalpacionController = async(req, res, next) => {
    const user = jwt.decode(req.body.token);

    const Usuario = await User.findById({ _id: user._id });

    const Ganado = await CabezaDeGanado.find({
            $or: [
                { owner: mongo.ObjectId(user._id), Sexo: "H" },
                { owner: Usuario.owner, Sexo: "H" },
            ],
            Status: "Vacía",
        })
        .populate({ path: "Raza" })
        .populate({ path: "Ganadero" })
        .populate({ path: "Rancho" })
        .select({
            _id: 1,
            Rancho: 1,
            Raza: 1,
            Ganadero: 1,
            Sexo: 1,
            Status: 1,
            Fecha: 1,
            Ciclo: 1,
            SiniigaM: 1,
            GanaderoM: 1,
            PedigreeM: 1,
            SiniigaH: 1,
            RanchoH: 1,
            GanaderoH: 1,
            PedigreeH: 1,
            Siniiga: 1,
            owner: 1,
            Palpada: 1,
            createdAt: 1,
            updatedAt: 1,
            Parto: 1,
            KgNacimiento: 1,
        });

    console.log(Ganado.length);

    const allPalpacion = await PalpacionModel.find();

    if (Ganado.length > 0) {
        res
            .status(200)
            .json({
                msg: "Working",
                status: true,
                action: "Saved New Proveedor",
                responseData: Ganado,
            });
    } else {
        res
            .status(500)
            .json({
                msg: "Algo salió mal, por favor revise sus datos de envío",
                status: false,
                action: "saved",
            });
    }
};