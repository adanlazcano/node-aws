const jwt = require('jsonwebtoken');

exports.isValidToken = (req, res, next) => {
    console.log(req.body)
    if (jwt.verify(req.body.token, process.env.SECRET)) {
        return next();
    } else {
        return res.status(200).json({
            msg: "Sin credenciales",
            status: false,
            sugest: "Por favir inicie sesión"
        })
    }
}