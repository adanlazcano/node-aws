const  NewProveedoresSchema  = require('./../../models/proveedores')

exports.allProveedoresController = async (req, res, next) => {
   
  const allProveedores = await NewProveedoresSchema.find()

  if( allProveedores ){ 
    res.status(200).json(allProveedores);
  }else{
    res.status(500).json({ msg: 'Algo salió mal, por favor revise sus datos de envío', status:false, action:"saved"});
  }
}