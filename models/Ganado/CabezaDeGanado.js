const { Schema, model, mongo } = require('mongoose')


const GanadoSchema = new Schema({
    Rancho: { type: mongo.ObjectId, ref: 'ranchos' },
    Raza: { type: mongo.ObjectId, ref: 'RazasConfig' },
    Ganadero: { type: mongo.ObjectId, ref: 'ganaderos' },
    Sexo: String,
    Status: String,
    KgNacimiento: String,
    KgNacimientoDestete: String,
    KgAnual: String,
    Fecha: Date,
    Monta: Date,
    Parto: Date,
    Ciclo: String,
    SiniigaM: String,
    GanaderoM: String,
    PedigreeM: String,
    SiniigaH: String,
    RanchoH: String,
    GanaderoH: String,
    PedigreeH: String,
    Siniiga: String,
    Observaciones: String,
    Vacunada: {
        type: String,
        default: 'false'
    },
    Vaccines: {
        type: Array,

    },
    owner: { type: mongo.ObjectId, ref: 'users' },
    Palpada: [{ Observaciones: String, Palpacion: String, Fecha: { type: Date, default: new Date() } }]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model("Ganado", GanadoSchema)