const { Schema, model } = require('mongoose')

const NewProveedoresSchema = new Schema({
  Nombre       :String,
  UPP          :String,
},{
  timestamps:true,
  versionKey:false
})

module.exports = model("Proveedores", NewProveedoresSchema)