const { allProveedoresController } = require('../controllers/Proveedores/allProveedores');
const { newProveedoresController } = require('../controllers/Proveedores/new');
const { updateProveedor } = require('../controllers/Proveedores/updateProveedor');

const router = require('express').Router();

router.post('/new', newProveedoresController )
      .get('/all',  allProveedoresController )
      .post('/update', updateProveedor);

module.exports = router;
