const  NewProveedoresSchema  = require('./../../models/proveedores')

exports.newProveedoresController = async (req, res, next) => {
   
  const newProvedor = await NewProveedoresSchema.create(req.body)
 
  if( newProvedor ){ 
    res.status(200).json({ msg: 'Working', status:true, action:"Saved New Proveedor" });
  }else{
    res.status(500).json({ msg: 'Algo salió mal, por favor revise sus datos de envío', status:false, action:"saved"});
  }
}