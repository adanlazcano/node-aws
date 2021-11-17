const router = require('express').Router();
const alldata = require('../controllers/Vacunas/alldata');
const NewGroup = require('../controllers/Vacunas/NewGroup');
const newVacuna = require('../controllers/Vacunas/newVacuna');
const updateVaccine = require('../controllers/Vacunas/updateVaccine');
const { isValidToken } = require('../middleware/vefiryToken');

router
.post('/newgroup',  isValidToken, NewGroup )
.post('/newvacuna', isValidToken, newVacuna)
.post('/alldata',    isValidToken, alldata)
.post('/updateVaccine', isValidToken, updateVaccine);


module.exports = router;
