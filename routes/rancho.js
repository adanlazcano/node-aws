const router = require('express').Router();
const {newRanchControlller}   = require('./../controllers/Ranchos/new');
const { allRanch } = require('./../controllers/Ranchos/allRanch');
const { updateRanch } = require('../controllers/Ranchos/updateRanch');
const dissableFunction  = require('./../controllers/Ranchos/Disable');
const { isValidToken } = require('../middleware/vefiryToken');

router.post('/new',     isValidToken ,   newRanchControlller)
      .post('/all',     isValidToken ,   allRanch           )
      .post('/update',  isValidToken ,   updateRanch        )
      .post('/disable', isValidToken ,   dissableFunction   );

module.exports = router;