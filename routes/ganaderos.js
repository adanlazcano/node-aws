const router = require('express').Router();
const {newGanaderoControlller}   = require('./../controllers/Ganaderos/new');
const { allGanaderos } = require('./../controllers/Ganaderos/allGanaderos');
const { updateGanadero } = require('../controllers/Ganaderos/updateGanadero');
const { isValidToken } = require('../middleware/vefiryToken');


router.post ('/new',    isValidToken, newGanaderoControlller )
      .post  ('/all',    isValidToken, allGanaderos           )
      .post ('/update', isValidToken, updateGanadero         )


module.exports = router;