const UsuarioGanadero = require("../../../models/Configuracion/UsuarioGanadero");
const User = require("../../../models/User");
const { mongo } = require('mongoose');
const Rol = require("../../../models/Configuracion/Rol");
// const bcrypt = require('bcrypt');
const ganadero = require("../../../models/ganadero");
module.exports = async(req, res) => {

    const [responseUSG] = await UsuarioGanadero.find({ _id: mongo.ObjectId(req.body._id) });

    console.log("responseUSG", responseUSG, String(responseUSG._id).length > 4)

    if (String(responseUSG._id).length > 4) {

        const resp = await User.find({ email: responseUSG.email })

        if (resp.length > 0) {
            return await res.status(200).json({
                msg: "Usuario ya existente",
                status: false,
                ActionResult: "usuario ya listo en usuarioas principales "
            })
        };
        const [responseRol] = await Rol.find().and(
            [
                { Nombre: await responseUSG.Rol },
                { owner: mongo.ObjectId(await responseUSG.owner) }
            ]
        );


        // let newUser =  {

        //     email:responseUSG.email,
        //     name: responseUSG.Nombre,
        //     owner:mongo.ObjectId( responseUSG.owner ),
        //     password:bcrypt.hashSync(
        //         req.body.setPasswordUser,
        //         bcrypt.genSaltSync(Number(process.env.SALT))
        //         ),
        //     acces:responseRol.Permisos,
        //     Rol: responseRol.Nombre
        // }

        try {
            const result = await User.create(newUser)


            if (result._id) {

                await UsuarioGanadero.findOneAndUpdate({ _id: mongo.ObjectId(responseUSG._id) }, { $set: { isActive: true } });
                const respGanadero = await ganadero.create({
                    Nombre: responseUSG.Nombre,
                    owner: mongo.ObjectId(responseUSG.owner)
                })
            }

            return await res.status(200).json({
                msg: " Usuario asignado ",
                ActionResult: "Nuevo Ususario asignado",
                status: true
            })

        } catch (error) {
            console.log(`hay un ${error}`)
            return
        }

    } else {

        return await res.status(200).json({
            msg: "Ususario no existente, revisa tus credenciales",
            ActionResult: "Usuario no encontrado",
            status: false
        })
    }

}