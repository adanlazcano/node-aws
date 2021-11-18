const { Schema, model, mongo } = require('mongoose')

const UsuarioGanadero = new Schema({
  Nombre       :String,
  email        :String,
  Rol          :String,

  owner        :{type:mongo.ObjectId, ref:'users'},
  Tabla        :{
  type         :String,
  default      :'Usuarios',
  },
  isActive     :{
    type:Boolean,
    default: false
  }

},{
  timestamps:true,
  versionKey:false
})

module.exports = model("UsuarioConfig", UsuarioGanadero);
