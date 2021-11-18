const  NewRanchModel  = require('./../../models/rancho/')

exports.updateRanch = async (req, res, next) => {

const { data, id } =  req.body;

let docRes = false;

  const dataToUpdate = {};

  Object.keys( data ).forEach(key => {

      if( data[`${key}`].length > 0 ){

        dataToUpdate[`${key}`.charAt(0).toUpperCase() + `${key}`.slice(1) ] = data[`${key}`];

      }

  });

  const ranchToUptade = await NewRanchModel.findOneAndUpdate(
    { _id : id }, 
    dataToUpdate,  
    { new: true }, 
    (err, doc) => err ?  console.log(err) : docRes = doc
   );
  
  if(docRes){ 
    res.status(200).json({msg: "Documento actualizado", status:true, Action:"Update"});
  }else{
    res.status(200).json({ msg: 'Algo salió mal'});
  }
  return;
}