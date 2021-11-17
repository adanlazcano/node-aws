const { allPalpacionController } = require('../controllers/Palpacion/all');
const { newPalpacionController } = require('../controllers/Palpacion/new');
const { updatePalpacionController } = require('../controllers/Palpacion/update');

const router = require('express').Router();

router.post('/new', newPalpacionController )
      .post('/all',  allPalpacionController )
      .post('/update', updatePalpacionController);

module.exports = router;
