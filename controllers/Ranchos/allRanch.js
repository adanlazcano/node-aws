const { mongo } =  require( 'mongoose' );
// const { decodeToken } = require('../../LIB/JWT');
const  RanchModel  = require('./../../models/rancho/');
const jwt = require('jsonwebtoken');
const ganadero = require('../../models/ganadero');
const User = require('../../models/User');

exports.allRanch = async ( req, res ) => {

 
  
  const user = jwt.decode(req.body.token);
  const Usuario =  await User.findOne({ email: user.email }).select({_id:1, Rol:1, name:1, owner:1});

  const ganRn = await ganadero.findOne( {Nombre:Usuario.name, owner: mongo.ObjectId( Usuario.owner )});

  let allRanchs = await RanchModel.find(
    {
      $or:[
        { owner: mongo.ObjectId( Usuario._id )},
         { "partners._id": mongo.ObjectId( ganRn && ganRn._id ) }
      ]
    }
    );

  if( !allRanchs ){
    return  res.status(200).json({
      msg:"Aún no ha agregado ranchos",
      ActionResult:"CArga inicial de Ranchos",
      status:false, 
      warning:true, 
      userFeedBack:" Por favor, haga click sobre el botón de agregar"
    })
  }else{
    return res.status(200).json({
      allRanchs,
      status:true,
      ActionResult:"Carga inicial de Ranchos",
      status:true,
      warning:false,
      userFeedBack:""
    })
  }

  if(allRanchs){ 
    res.status(200).json(allRanchs);
  }else{
    res.status(500).json({ msg: 'Algo salió mal'});
  }
}

