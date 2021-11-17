const User = require("../../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async ( req, res, next ) =>
{

    let name, password, email, confirmPassword ;

    if( req.body.Name, req.body.email, req.body.password, req.body.confirmPassword ){
        name =  req.body.Name;
        email =  req.body.email;
        password =  req.body.password;
        confirmPassword =  req.body.confirmPassword;
    }else{
        res.status(500).json({
            msg: " Error data!",
            status:false
        })
    }

    if( password === confirmPassword ){
        
        const response = await User.find({email});

        if(  response.length === 0 ){

            const isCreated = await User.create({
                email,
                name,
                password: bcrypt.hashSync(
                    password,
                    bcrypt.genSaltSync(Number(process.env.SALT))
                    )
            });

        if(  isCreated.email == email  ){

        return res.status(200).json({
                msg:"Usuario creado",
                status:true,
                ActionResult: " created User "
            })}

        }else{

            res.status(200).json({
                msg:"Cuenta Existente",
                status:false,
                ActionResult:"Usuario Existente"
            })
        }
    }else{
       return  res.status(200).json({
            msg: "Error data!",
            status:false
        })
    }




}