const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/availablecourses', coursesController.getAvailableCourses);
//router.get('/enable', coursesController.enableCourse);
//router.get('/disable', coursesController.disableCourse);
//router.get('/assign', coursesController.assignCourse);

module.exports = router;