const { Schema, model } = require('mongoose')

const UPPSchema = new Schema({
  Nombre       :String,
  UPP          :String,
  Tabla        :{
  type         :String,
  default      :'UPP'
  }

},{
  timestamps:true,
  versionKey:false
})

module.exports = model("UPP", UPPSchema);