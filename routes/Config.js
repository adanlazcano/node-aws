const router            = require('express').Router();
const {NewRol}          = require('../controllers/Configuracion/Roles/new');
const newUser           = require('../controllers/Configuracion/Usuarios/new');
const getInitialData    = require('../controllers/Configuracion/alldata');
const newRaza           = require('./../controllers/Configuracion/Razas/new');
const newTipo           = require('./../controllers/Configuracion/Tipos/new');
const { isValidToken }  = require('./../middleware/vefiryToken');
const setPasswordToNewUser = require('./../controllers/Configuracion/Usuarios/setPassNewUser')

router  .post('/newRol'     , isValidToken, NewRol          )
        .post('/newUsuario' , isValidToken, newUser         )
        .post('/newRaza'    , isValidToken, newRaza         )
        .post('/newTipo'    , isValidToken, newTipo         )
        .post('/alldata'    , isValidToken, getInitialData  )
        .post('/setPasswordNewUser',        setPasswordToNewUser );

module.exports = router;