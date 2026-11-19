const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gizmohub_db' // කණ්ඩායමේ Database නම
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to gizmohub_db successfully!');
    }
});

module.exports = db;