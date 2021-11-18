
const { mongo } = require('mongoose');
const rancho = require('../../models/rancho');
const  NewGanaderoshModel  = require('./../../models/ganadero')

exports.updateGanadero = async (req, res, next) => {

  let ganaderoUpdate = false;

  const {
    Nombre,
    UPP,
    SobreNombre,
    Rancho,
    _id
  } = req.body.data;


  try {

    ganaderoUpdate = await NewGanaderoshModel.findOneAndUpdate(
      { _id },
      {    
        Nombre,
        UPP,
        SobreNombre,
        RanchoID:Rancho,
      },
      { new: true }, 
      (err, doc) => err ?  console.log(err) : docRes = doc
    );
  
        let responseRanch = await rancho.findOne( 
          {
            _id:mongo.ObjectId( Rancho ) 
          });

        responseRanch.partners.push( {_id} );

        const updatedRanch = await rancho.findOneAndUpdate(
          {_id: mongo.ObjectId( Rancho )},
          { $set: responseRanch}, 
          {new: false}, 
          (err, doc) => err ?  console.log(err) : docRes = doc
          );

        console.log( "updateRanch", updatedRanch )

  } catch (error) {
    

    console.log( `hay un ${ error }` );

    return res.status(500).json({ msg: 'Algo salió mal'});

  }

  if(ganaderoUpdate){ 
    
    res.status(200).json({msg:"Nuevo ganadero registrado", status:true, Action:"Update"});

  }else{

    res.status(500).json({ msg: 'Algo salió mal'});

  }
}