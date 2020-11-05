var express = require('express');
var router = express.Router();
const { shaharController } = require('../controllers');

/* GET shahars listing. */
router.get('/', shaharController.getShaharsList);
router.get('/:name', shaharController.getShaharsListByName);

module.exports = router;
