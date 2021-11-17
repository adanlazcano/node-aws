const { mongo } = require('mongoose');
const rancho = require("../../models/rancho")


module.exports =  async ( req, res ) => {

    try {

    const { isActive } = await rancho.findById({_id: mongo.ObjectId( req.body.id )});
        

        const response = await rancho.findOneAndUpdate(
            { _id: mongo.ObjectId( req.body.id ) },
            {$set:{isActive: !isActive}},
            {new: true},
            );


        return res.status(200).json({
            msg:`Se ha desactivado el rancho ${response.Nombre}`,
            status: true,
            ActionResult:`Rancho deshabilitado`
        })
        
    } catch (error) {

    console.log(` hay un ${error}`);
    return res.status(200).json({
        msg: "No se ha desactivado el rancho, quizá no existe el rancho", 
        status: false,
        ActionResult: " Rancho activo aún "
    })


    }


};