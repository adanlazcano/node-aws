const router = require('express').Router();
const { mongo } = require('mongoose');
const User = require('../models/User');
const login = require('../controllers/Auth/login');
const signup = require('../controllers/Auth/signup');
const jwt = require('jsonwebtoken');

    router.post('/login', login )

        .post('/signup', signup)

        .post('/recoverUserSession', async (req, res, next) => {

            try {
                if(jwt.verify( req.body.token , process.env.SECRET)){
                    const user = jwt.decode(req.body.token);
                    const responseUser = await User
                    .find( { email: user.email })
                    .select(
                        {
                            email:1,
                            name: 1,
                            owner:1,
                            acces:1,
                            Rol:1,
                        }
                    );

                    user.acces = responseUser[ 0 ].acces;
                    
                    return res.status(200).json({
                        msg: "usuario válido",
                        status: true,   
                        ActionResult: " obtain userToken ",
                        user: responseUser[0]
                    });

                }else{
                    return res.status(200).json({
                        status:false
                    })
                }
            } catch (error) {
                console.log(`> hay un ${error}`);
                return res.status(200).json({
                    status:false
                })
            }
        } )
        .post('/recover', (req, res, next) => {
        console.log(req.body)
    })

    module.exports = router;

