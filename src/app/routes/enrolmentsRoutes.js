const express = require('express');
const router = express.Router();
const enrolmentsController = require('../controllers/enrolmentsController');

router.post('/enrol', enrolmentsController.enrol);
//router.put('/pass', enrolmentsController.pass);
//router.put('/fail', enrolmentsController.fail);

module.exports = router;