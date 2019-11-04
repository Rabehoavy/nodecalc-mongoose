var express = require('express');
var router = express.Router();

const calculatriceController = require('../controllers/calculatriceController');

/* GET calculatrice page. */
router.get('/', calculatriceController.technologie);

module.exports = router;
