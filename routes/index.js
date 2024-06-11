var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController')

/* GET home page. */
router.get('/', homeController.show);
router.get('/agregar', homeController.agregar)
router.get('/detalle/:id', homeController.detalle)
router.get('/agregarnota', homeController.agregarNota)

//POST
router.post('/subir', homeController.subir)
router.post('/subirnota', homeController.subirNota)

module.exports = router;
