const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234', // ← 여기 정확히
  database: 'network_blog',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
