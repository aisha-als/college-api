const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

router.get('/availablecourses', coursesController.getAvailableCourses);
router.put('/enable', coursesController.enableCourse);
router.put('/disable', coursesController.disableCourse);
router.put('/assign', coursesController.assignCourse);

module.exports = router;
