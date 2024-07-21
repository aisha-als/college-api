const express = require('express');
const router = express.Router();
const enrolmentsController = require('../controllers/enrolmentsController');

router.post('/enrol', enrolmentsController.enrol);
// router.put('/pass', enrolmentsController.passStudent);
// router.put('/fail', enrolmentsController.failStudent);

module.exports = router;