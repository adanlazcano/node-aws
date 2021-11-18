const  PalpacionModel  = require('./../../models/palpacion')

exports.newPalpacionController = async (req, res, next) => {

  const {
      Confirmacion,
      Fecha,
      Lote,
      MetodoDeReproduccion,
      Observaciones,
      Palpada,
      Siniiga,
  } = req.body;

   
  const newPalpacion = await PalpacionModel.create({
    Confirmacion,
    Fecha: new Date(Fecha),
    MetodoDeReproduccion,
    Observaciones,
    Palpada,
    Siniiga,
  });

  console.log("newPalpacion", newPalpacion);
 
  if( true ){ 
    res.status(200).json({ msg: 'Working', status:true, action:"Saved New Proveedor" });
  }
  else{
    res.status(500).json({ msg: 'Algo salió mal, por favor revise sus datos de envío', status:false, action:"saved"});
  }
}