const coursesModel = require('../models/courses');
const authorisationCheck = require('../controllers/authorisationController');

exports.getAvailableCourses = async (req, res) => {
    const UserID = req.header('UserID');
    if (!UserID) {
      return res.status(400).json({ message: 'UserID is required to be sent in the header.' });
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
        res.json({ message: 'This is a list of the available courses this semester.', availableCourses });
      } catch (error) {
          res.status(500).json({ message: 'Error retrieving available courses.', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

exports.enableCourse = async (req, res) => {
    const UserID = req.header('UserID');
    const CourseID = req.body.CourseID;
    if (!UserID) {
      return res.status(400).json({ message: 'UserID is required to be sent in the header.' });
    }
    if (!CourseID) {
      return res.status(400).json({ message: 'CourseID is required to be sent in the body.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 1 (admin role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 1);
    // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
    if (authCheck.authorised) {
      try {
        const enable = await coursesModel.enableCourse({CourseID});
        res.json({ message: 'Course has been enabled.', CourseID, enable });
      } catch (error) {
          res.status(500).json({ message: 'Error enabling the course.', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

exports.disableCourse = async (req, res) => {
    const CourseID = req.body.CourseID;
    const UserID = req.header('UserID');
    if (!UserID) {
      return res.status(400).json({ message: 'UserID is required to be sent in the header.' });
    }
    if (!CourseID) {
      return res.status(400).json({ message: 'CourseID is required to be sent in the body.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 1 (admin role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 1);
    // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
    if (authCheck.authorised) {
      try {
        const disable = await coursesModel.disableCourse({CourseID});
        res.json({ message: 'Course has been disabled.', CourseID, disable });
      } catch (error) {
          res.status(500).json({ message: 'Error disabling the course.', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

exports.assignCourse = async (req, res) => {
    const { CourseID, TeacherID } = req.body;
    const UserID = req.header('UserID');
    if (!UserID) {
      return res.status(400).json({ message: 'UserID is required to be sent in the header.' });
    }
    if (!CourseID || !TeacherID) {
      return res.status(400).json({ message: 'CourseID and TeacherID are required to be sent in the body.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 1 (admin role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 1);
    // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
    if (authCheck.authorised) {
      try {
        const assign = await coursesModel.assignCourse({CourseID, TeacherID});
        res.json({ message: 'Course has been assigned to teacher.', assign });
      } catch (error) {
          res.status(500).json({ message: 'Error assigning the course.', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};