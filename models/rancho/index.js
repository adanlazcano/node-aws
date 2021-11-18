
const { Schema, model, mongo } = require('mongoose')

const RanchSchema = new Schema({
  Nombre       :String,
  Responsable  :String,
  Proposito    :String,
  Dimension    :String,
  Pais         :String,
  partners     :[
                  {_id:{
                    type:mongo.ObjectId, 
                    ref:('user'), 
                    default:null}
                  }
                ],
  owner        :String,
  Estado       :String,
  Ciudad       :String,
  idNo         :Number,
  isActive     :{ type:Boolean, default: true },
  Cooredenadas:{
    x:Number,
    y:Number
  }
},{
  timestamps:true,
  versionKey:false
})

module.exports = model("ranchos", RanchSchema)