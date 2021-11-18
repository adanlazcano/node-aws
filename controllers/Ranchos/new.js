const jwt = require('jsonwebtoken'); 
const { mongo } = require('mongoose');
const NewRanchModel  = require('./../../models/rancho/');

exports.newRanchControlller = async (req, res, next) => {
  const user = jwt.decode( req.body.token );
  const  {
      nombre,
      responsable,
      proposito,
      dimension,
      pais,
      estado,
      ciudad,
      id
    }=req.body;
      
  const obj = {
Nombre:      nombre,
Responsable: responsable,
Proposito:   proposito,
Dimension:   dimension,
idNo:         await NewRanchModel.find({owner: mongo.ObjectId( user._id )}).count() +1,
Pais:        pais,
Estado:      estado,
Ciudad:      ciudad,
owner:        user._id,
Cooredenadas:{
  x:0,
  y:0
}
  }
  const newRanch = await NewRanchModel.create(obj);
 
  if(newRanch){ 
    res.status(200).json({ msg: 'Working', status:true, action:"Saved New Ranch" });
  }else{
    res.status(500).json({ msg: 'Algo salió mal, por favor revise sus datos de envío', status:f, action:"saved", _id: newRanch._id });
  }
}