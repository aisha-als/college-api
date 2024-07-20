// Functional requirement: 2) Admins should be able to assign one or more courses.js to a teacher
// Functional requirement: 1) Admins should be able to enable or disable the availability of a course

const { getConnection } = require('../services/db');

class Courses {
  // Functional requirement: 3) Students can browse and list all the available courses.js and see the course title and
  // course teacher’s name.
  static findAvailableCourses = async () => {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query('SELECT * from courses');
      return rows;
    } finally {
      connection.end();
    }
  };
}

module.exports = Courses;