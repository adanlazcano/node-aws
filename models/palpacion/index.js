const { Schema, model } = require('mongoose')

const PalpacionSchema = new Schema({
  Confirmacion:         String,
  Fecha:                String,
  Lote:                 String,
  MetodoDeReproduccion: String,
  Observaciones:        String,
  Palpada:              String,
  Siniiga:              String
},{
  timestamps:true,
  versionKey:false
})

module.exports = model("Palpada", PalpacionSchema)

