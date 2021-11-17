const { Schema, model, mongo } = require('mongoose')

const GanaderoSchema = new Schema({
  Nombre       : String,
  UPP          :{ type: String, default:'default'   },
  SobreNombre  :{ type: String, default:'default'   },
  RanchoID     :{ type: mongo.ObjectId, default:null},
  owner        :{ type:mongo.ObjectId, ref: 'users' },
},{
  timestamps:true,
  versionKey:false
})

module.exports = model("ganaderos", GanaderoSchema);