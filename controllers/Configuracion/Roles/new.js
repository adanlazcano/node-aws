const RolSchema = require("../../../models/Configuracion/Rol");
const { mongo }  = require('mongoose')

exports.NewRol = async ( req, res, next) => {

const response =  await RolSchema.find(
    {
        Nombre: req.body.nombre,
        owner:  mongo.ObjectId(req.body.owner)
    }
);

    

if( response.length === 0 ){

    try {

    const resNewRol = await  RolSchema.create({
        Nombre: req.body.nombre,
        Descripcion: req.body.Descripcion,
        Permisos:  req.body.Permisos,
        owner: req.body.owner
    });

    return res.status(200).json({
        msg:" Nuevo Rol creado",
        status:true,
        ActionResult: "Rol inserted",

    })
    } catch (error) {

    console.log(`> hay un ${error}`);

    return res.status(200).json({
        msg:"Rol no creado",
        status:false,
        ActionResult: "Rol not inserted",
    })
    }
}else{

    return res.status(200).json({
        msg:"Rol ya existente",
        status:false,
        ActionResult: "Rol not inserted",
    })
}


}


