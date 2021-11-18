const { Schema, model, mongo } = require('mongoose')



const RolSchema = new Schema({
  Nombre       :String,
  Descripcion  :String,
  Permisos     :[{ type:String }],
  owner        :{type:mongo.ObjectId, ref:'users'},
  Tabla        :{
  type         :String,
  default      :'Roles',
  },

},{
  timestamps:true,
  versionKey:false
})

module.exports = model("RolesConfig", RolSchema);