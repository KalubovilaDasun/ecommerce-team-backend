const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load .env variables
dotenv.config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Check the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: ", err.message);
  } else {
    console.log("Connected to the MySQL database successfully!");
    connection.release();
  }
});

module.exports = pool.promise();