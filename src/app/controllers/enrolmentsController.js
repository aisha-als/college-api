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

exports.pass = async (req, res) => {
  try {
    const { CourseID, UserID } = req.body;
    if (!CourseID || !UserID) {
      return res.status(400).json({ message: 'CourseID and UserID are required.' });
    }
    const passStudent = await enrolmentsModel.pass({ CourseID, UserID });
    res.status(201).json({ message: 'Successfully updated the students Mark to Pass. Details: ', passStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating the students Mark to Pass.', error: error.message });
  }
};

exports.fail = async (req, res) => {
  try {
    const { CourseID, UserID } = req.body;
    if (!CourseID || !UserID) {
      return res.status(400).json({ message: 'CourseID and UserID are required.' });
    }
    const failStudent = await enrolmentsModel.fail({ Mark, CourseID, UserID });
    res.status(201).json({ message: 'Successfully updated the students Mark to Fail. Details: ', failStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating the students Mark to Fail.', error: error.message });
  }
};