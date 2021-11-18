const User = require("../../models/User");

// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = async(req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;

    if (email === '' || password === '' || !email || !password) {
        return res.status(400).json({
            msg: 'Error data!',
            status: false,
        })
    }

    const response = await User.find({ email });

    if (response.length < 1) return res.status(200).json({
        msg: "Por favor revisa tus credenciales",
        status: false,
        ActionResult: "No data"
    });

    // if( bcrypt.compareSync(password, response[0].password) ) {
    //     let { email, name, _id , acces, Rol} = response[0];
    //     return await res.status(200).json({
    //         msg:'Credenciales obtenidas',
    //         status:true,
    //         ActionResult:'Logged',
    //         Token: jwt
    //         .sign({ email, name, _id } , 
    //             process.env.SECRET,
    //              { expiresIn: 60 * 60 * 12}),
    //         User:{  email, Name:name, _id, acces, Rol   }
    //         })
    //     }else{
    //         return res.status(200).json({
    //             msg:'Sin credenciales',
    //             status:false,
    //             ActionResult:null,
    //             Token: null
    //         })
    //     }
}