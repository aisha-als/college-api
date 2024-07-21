const enrolmentsModel = require('../models/enrolments');

exports.enrol = async (req, res) => {
  try {
    const { CourseID, UserID } = req.body;
    if (!CourseID || !UserID) {
      return res.status(400).json({ message: 'CourseID and UserID are required.' });
    }
    const newEnrolment = await enrolmentsModel.enrolment({ CourseID, UserID });
    res.status(201).json({ message: 'Successfully enroled student or student is already enroled. Details: ', newEnrolment });
  } catch (error) {
    res.status(500).json({ message: 'Error enroling student', error: error.message });
  }
};