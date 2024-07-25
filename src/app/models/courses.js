const { getConnection } = require('../services/db');

class Courses {
  // Functional requirement: 3) Students can browse and list all the available courses and see the course title and
  // course teacher’s name.
  static findAvailableCourses = async () => {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query('SELECT * from courses WHERE isAvailable = 1');
      return rows;
    } finally {
      connection.end();
    }
  };

  // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
  static enableCourse = async (courseData) => {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query('UPDATE courses SET isAvailable = 1 WHERE courseID = ?', [courseData.CourseID]);
      return rows;
    } finally {
      connection.end();
    }
  };

  // Functional requirement: 1) Admins should be able to enable or disable the availability of a course
  static disableCourse = async (courseData) => {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query('UPDATE courses SET isAvailable = 0 WHERE courseID = ?', courseData.CourseID);
      return rows;
    } finally {
      connection.end();
    }
  };

  // Functional requirement: 2) Admins should be able to assign one or more courses to a teacher
  static assignCourse = async (courseData) => {
    const connection = await getConnection();
    try {
      const [rows] = await connection.query('UPDATE courses SET TeacherID = ? WHERE courseID = ?', [courseData.TeacherID, courseData.CourseID]);
      return rows;
    } finally {
      connection.end();
    }
  };

}

module.exports = Courses;
