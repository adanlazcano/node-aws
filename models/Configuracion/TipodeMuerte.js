const { Schema, model, mongo } = require('mongoose')

const TipoDeMuerteSchema = new Schema({
  Nombre       :String,
  Descripcion  :String,
  owner        :{type:mongo.ObjectId, ref:'users'},
  Tabla        :{
  type         :String,
  default      :'Tipo_de_Muerte',
  }
},{
  timestamps:true,
  versionKey:false
})

module.exports = model("TiposConfig", TipoDeMuerteSchema);