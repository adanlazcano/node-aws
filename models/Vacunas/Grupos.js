const { Schema, model, mongo } = require('mongoose')

const Grupos = new Schema({
  Nombre       : String,
  owner        : {type: mongo.ObjectId, ref:'user'}
},{
  timestamps:true,
  versionKey:false
})

module.exports = model('Grupos', Grupos);