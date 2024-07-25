const { getConnection } = require('../services/db');

class Enrolments {
  // Functional requirement: 4) Students can enrol in a course. Students should not be able to enrol in a course more
  // than once at each time.
  static async enrolment(enrolmentData){
    const connection = await getConnection();
    try {
      const [result] = await connection.query(
          'INSERT INTO enrolments (CourseID, UserID) ' +
          'SELECT ?, ? ' +
          'WHERE NOT EXISTS ' +
          '    (SELECT EnrolmentID FROM enrolments WHERE CourseID = ? AND UserID = ?);',
          [enrolmentData.CourseID, enrolmentData.UserID, enrolmentData.CourseID, enrolmentData.UserID]
      );
      return { id: result.insertId, ...enrolmentData };
    } finally {
      connection.end();
    }
  };

  // Functional requirement: 5) Teachers can fail or pass a student.
  static async pass(enrolmentData){
    const connection = await getConnection();
    try {
      const [result] = await connection.query(
          'UPDATE enrolments SET Mark = 1 WHERE courseID = ? AND UserID = ?',
          [enrolmentData.CourseID, enrolmentData.StudentID]
      );
      return { id: result.insertId, ...enrolmentData };
    } finally {
      connection.end();
    }
  };

  // Functional requirement: 5) Teachers can fail or pass a student.
  static async fail(enrolmentData){
    const connection = await getConnection();
    try {
      const [result] = await connection.query(
          'UPDATE enrolments SET Mark = 0 WHERE courseID = ? AND UserID = ?',
          [enrolmentData.CourseID, enrolmentData.StudentID]
      );
      return { id: result.insertId, ...enrolmentData };
    } finally {
      connection.end();
    }
  };
}

module.exports = Enrolments;