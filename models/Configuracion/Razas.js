const { Schema, model, mongo } = require('mongoose')

const Razas = new Schema({
    Nombre       :String,
    Descripcion  :String,
    owner        :{type:mongo.ObjectId, ref: 'users'},
    Tabla        :{
    type         :String,
    default      :'Razas'
    },
},{
  timestamps:true,
  versionKey:false
})

module.exports = model("RazasConfig", Razas);