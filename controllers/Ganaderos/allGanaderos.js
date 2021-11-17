const jwt = require('jsonwebtoken');
const  GanaderoshModel  = require('./../../models/ganadero');
const RanchosModel =require('./../../models/rancho');
const { mongo } = require('mongoose');

exports.allGanaderos = async (req, res, next) => {

  const user = jwt.decode( req.body.token );

    const all = {

      Ganaderos: await GanaderoshModel.find({ owner: mongo.ObjectId( user._id )  }),

      Ranchos: await RanchosModel.find({ owner :mongo.ObjectId( user._id ) }).select({_id:1, Nombre:1, Responsable:1, owner:1}).sort({ Nombre:1 }),

    }

    
  if(all){

    return res.status(200).json(all);

  }else{

    return res.status(500).json({ msg: 'Algo salió mal'});

  }
}