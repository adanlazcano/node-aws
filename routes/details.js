const router            = require('express').Router();
const { isValidToken }  = require('./../middleware/vefiryToken');
const alldata           = require('./../controllers/Details/alldata');
const newCabeza         = require('./../controllers/Details/new');
const detailsCabeza     = require('../controllers/Details/detailsCabeza');
const updateCabeza      = require('../controllers/Details/update');


router  .post('/alldata' , isValidToken, alldata)
        .post('/new'     , isValidToken, newCabeza )
        .post('/cabeza'  , isValidToken, detailsCabeza)
        .post('/update'  , isValidToken, updateCabeza )

module.exports = router;