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
          res.status(500).json({ message: 'Error retrieving available courses', error: error.message });
      }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

/*
enable course
disable course
assign course
*/