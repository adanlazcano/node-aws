const  NewProveedoresSchema  = require('./../../models/proveedores')

exports.updateProveedor = async (req, res, next) => {

  let proveedoresUpdate = false;

  const {
    Nombre,
    UPP,
    _id
  } = req.body.data;

  proveedoresUpdate = await NewProveedoresSchema.findOneAndUpdate(
    { _id },
    {    
      Nombre,
      UPP,
    },
    { new: true }, 
    (err, doc) => err ?  console.log(err) : docRes = doc
       )

  if(proveedoresUpdate){ 
    
    res.status(200).json({msg:"Nuevo ganadero registrado", status:true, Action:"Update"});

  }else{

    res.status(500).json({ msg: 'Algo salió mal'});

  }
}