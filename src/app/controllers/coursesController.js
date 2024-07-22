const coursesModel = require('../models/courses');
const authorisationCheck = require('../controllers/authorisationController');

exports.getAvailableCourses = async (req, res) => {
    const { UserID } = req.body;
    if (!UserID) {
      return res.status(400).json({ message: 'UserID is required.' });
    }
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 3);
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