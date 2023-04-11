const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'toku',
  password: 'toku',
  database: 'toku',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

module.exports = connection;
