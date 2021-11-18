const  NewGanaderoshModel  = require('./../../models/ganadero');
const { mongo } = require('mongoose');

exports.newGanaderoControlller =  async (req, res, next) => {
   

  const response  = await NewGanaderoshModel.find(
    { Nombre:req.body.Nombre, _id: mongo.ObjectId( req.body._id ) }
    )

    if( response.length === 0 ){

      const data ={
        Nombre:      req.body.Nombre,
        UPP:         req.body.UPP,
        SobreNombre: req.body.SobreNombre,
        RanchoID:    req.body.Rancho,
        owner:       req.body._id
      };
      

      try {

        const newGanadero = await NewGanaderoshModel.create( data );
        
        if(newGanadero){ 
          return res.status(200).json({ msg: 'Ganadero saved', status:true, action:"Saved New Ganadero" });
        }else{
         return res.status(500).json(
            { 
                msg: 'Algo salió mal, por favor revise sus datos de envío', 
                status:false, 
                action:"no saved", 
                _id:null
          });
        }
        
      } catch (error) {
        
        console.log(`hay un ${error}` );
        return res.status(200).json({ msg: 'Ganadero no saved', status:false, action:"no saved" });
      }

    }else{


      return res.status(200).json({ msg: 'Ganadero ya exitente', status:false, action:"No saved" });

    }

}