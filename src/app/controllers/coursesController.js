const coursesModel = require('../models/courses');

exports.getAvailableCourses = async (req, res) => {
  try {
    const availableCourses = await coursesModel.findAvailableCourses();
    res.json(availableCourses);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving available courses', error: error.message });
  }
};

/*
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};
*/