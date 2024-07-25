const enrolmentsModel = require('../models/enrolments');
const authorisationCheck = require("../controllers/authorisationController");

exports.enrol = async (req, res) => {
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
    // Role ID = 3 (student role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 3);
    // Functional requirement: 4) Students can enrol in a course. Students should not be able to enrol in a course more
    // than once at each time.
    if (authCheck.authorised) {
        try {
            const newEnrolment = await enrolmentsModel.enrolment({CourseID, UserID});
            res.status(201).json({
                message: 'Successfully enroled student or student is already enroled. Details: ',
                newEnrolment
            });
        } catch (error) {
            res.status(500).json({message: 'Error enroling student', error: error.message});
        }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

exports.pass = async (req, res) => {
    const { CourseID, StudentID } = req.body;
    const UserID = req.header('UserID');
    if (!UserID) {
      return res.status(400).json({ message: 'UserID is required to be sent in the header.' });
    }
    if (!CourseID || !StudentID) {
      return res.status(400).json({ message: 'CourseID and StudentID are required to be sent in the body.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 2 (teacher role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 2);
    // Functional requirement: 5) Teachers can fail or pass a student.
    if (authCheck.authorised) {
        try {
            const passStudent = await enrolmentsModel.pass({CourseID, StudentID});
            res.status(201).json({message: 'Successfully updated the students Mark to Pass. Details: ', passStudent});
        } catch (error) {
            res.status(500).json({message: 'Error updating the students Mark to Pass.', error: error.message});
        }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};

exports.fail = async (req, res) => {
    const { CourseID, StudentID } = req.body;
    const UserID = req.header('UserID');
    if (!UserID) {
      return res.status(400).json({ message: 'UserID is required to be sent in the header.' });
    }
    if (!CourseID || !StudentID) {
      return res.status(400).json({ message: 'CourseID and StudentID are required to be sent in the body.' });
    }
    // Functional requirement: 6) Access control for Admins, Teachers and Students: Ensure only the authorised access
    // can perform an action.
    // Role ID = 2 (teacher role) is passed to the checkAuthorisation function along with the User ID
    authCheck = await authorisationCheck.checkAuthorisation(req, res, UserID, 2);
    // Functional requirement: 5) Teachers can fail or pass a student.
    if (authCheck.authorised) {
        try {
            const failStudent = await enrolmentsModel.fail({CourseID, StudentID});
            res.status(201).json({message: 'Successfully updated the students Mark to Fail. Details: ', failStudent});
        } catch (error) {
            res.status(500).json({message: 'Error updating the students Mark to Fail.', error: error.message});
        }
    } else {
        res.status(500).json({ message: 'User not authorised.' });
    }
};