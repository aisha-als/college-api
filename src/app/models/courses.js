const { getConnection } = require('../services/db');

class Courses {
  // Functional requirement: 3) Students can browse and list all the available courses and see the course title and
  // course teacher’s name.
  static findAvailableCourses = async () => {
    const connection = await getConnection();
    try {
      // SQL query to be updated
      const [rows] = await connection.query('SELECT * from courses');
      return rows;
    } finally {
      connection.end();
    }
  };

  // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
  static enableCourse = async (courseData) => {
    const connection = await getConnection();
    try {
      // SQL query to be added
      const [rows] = await connection.query('', [courseData.CourseID]);
      return rows;
    } finally {
      connection.end();
    }
  };

  // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
  static disableCourse = async (courseData) => {
    const connection = await getConnection();
    try {
      // SQL query to be added
      const [rows] = await connection.query('', [courseData.CourseID]);
      return rows;
    } finally {
      connection.end();
    }
  };

  // Functional requirement: 2) Admins should be able to assign one or more courses to a teacher
  static assignCourse = async (courseData) => {
    const connection = await getConnection();
    try {
      // SQL query to be added
      const [rows] = await connection.query('', [courseData.CourseID, courseData.UserID]);
      return rows;
    } finally {
      connection.end();
    }
  };

}

module.exports = Courses;
