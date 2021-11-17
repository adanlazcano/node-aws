const  PalpacionModel  = require('./../../models/palpacion')

exports.updatePalpacionController = async (req, res, next) => {

  const {
    Siniiga,
    MetodoDeReproduccion,         
    Fecha,          
    Palpada,        
    Confirmacion,         
    Observaciones,         
  } = await req.body.data;
  const _id = await req.body.id ;

  let objUptdae = {};
  Object.keys(req.body.data).forEach(el=> {

    req.body.data[el].length === 0 ? null : objUptdae[el]=req.body.data[el];
  })

  const UpdatePalpacion = await PalpacionModel.findOneAndUpdate(
    { _id },
    objUptdae ,
    { new: true }, 
    (err, doc) => err ?  console.log(err) : docRes = doc
    );

  console.log("UpdatePalpacion", UpdatePalpacion);
 
  if( UpdatePalpacion ){ 
    res.status(200).json({ msg: 'Working', status:true, action:"Saved New Proveedor" });
  }
  else{
    res.status(500).json({ msg: 'Algo salió mal, por favor revise sus datos de envío', status:false, action:"saved"});
  }
}