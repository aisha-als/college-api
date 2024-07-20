const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'mydb',
  port: 3306
};

async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

module.exports = { getConnection };