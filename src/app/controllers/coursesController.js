const coursesModel = require('../models/courses');
const authorisationCheck = require('../controllers/authorisationController');

exports.getAvailableCourses = async (req, res) => {
    const { UserID } = req.body;
    if (!UserID) {
      return res.status(400).json({ message: 'UserID is required.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 3 (student role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 3);
    // Functional requirement: 3) Students can browse and list all the available courses and see the course title and
    // course teacher’s name.
    if (authCheck.authorised) {
      try {
        const availableCourses = await coursesModel.findAvailableCourses();
        res.json(availableCourses);
      } catch (error) {
          res.status(500).json({ message: 'Error retrieving available courses.', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

exports.enableCourse = async (req, res) => {
    const { CourseID, UserID } = req.body;
    if (!CourseID || !UserID) {
      return res.status(400).json({ message: 'CourseID and UserID are required.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 1 (admin role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 1);
    // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
    if (authCheck.authorised) {
      try {
        const enable = await coursesModel.enableCourse({CourseID});
        res.json(enable);
      } catch (error) {
          res.status(500).json({ message: 'Error enabling the course.', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

exports.disableCourse = async (req, res) => {
    const { CourseID, UserID } = req.body;
    if (!CourseID || !UserID) {
      return res.status(400).json({ message: 'CourseID and UserID are required.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 1 (admin role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 1);
    // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
    if (authCheck.authorised) {
      try {
        const disable = await coursesModel.disableCourse({CourseID});
        res.json(disable);
      } catch (error) {
          res.status(500).json({ message: 'Error disabling the course.', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

exports.assignCourse = async (req, res) => {
    const { CourseID, UserID } = req.body;
    if (!CourseID || !UserID) {
      return res.status(400).json({ message: 'CourseID and UserID are required.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 1 (admin role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 1);
    // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
    if (authCheck.authorised) {
      try {
        const assign = await coursesModel.assignCourse({CousreID, UserID});
        res.json(assign);
      } catch (error) {
          res.status(500).json({ message: 'Error assigning the course.', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};