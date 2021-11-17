
const { Schema, model, mongo } = require('mongoose')

const Vacunas = new Schema({
  Nombre       : String,
  Via          : String,
  Dosis        : String,
  x_kg_Peso    : String,
  Grupo        : { type:mongo.ObjectId, ref:'Grupo'},
  owner        : { type:mongo.ObjectId, ref:'user'}
},{
  timestamps:true,
  versionKey:false
})

module.exports = model('Vacuna', Vacunas);