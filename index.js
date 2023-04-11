// const mysql = require('mysql');
// const serverless = require('serverless-http');
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // configure body-parser for JSON input
// app.use(bodyParser.json());
// app.use(cors());

// // create MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'users_db'
// });

// // connect to MySQL
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL database.');
// });

// // GET all users
// app.get('/users', (req, res) => {
//   connection.query('SELECT * FROM users', (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// // GET a user by ID
// app.get('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   connection.query('SELECT * FROM users WHERE id = ?', userId, (err, results) => {
//     if (err) throw err;
//     res.send(results[0]);
//   });
// });

// // CREATE a user
// app.post('/users', (req, res) => {
//   const { name, email } = req.body;
//   connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
//     if (err) throw err;
//     res.send({ message: 'User created successfully!', id: results.insertId });
//   });
// });

// // UPDATE a user
// app.put('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   const { name, email } = req.body;
//   connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, results) => {
//     if (err) throw err;
//     res.send({ message: 'User updated successfully!', id: userId });
//   });
// });

// // DELETE a user
// app.delete('/users/:id', (req, res) => {
//   const userId = req.params.id;
//   connection.query('DELETE FROM users WHERE id = ?', userId, (err, results) => {
//     if (err) throw err;
//     res.send({ message: 'User deleted successfully!', id: userId });
//   });
// });

// // wrap the app with serverless-http
// module.exports.handler = serverless(app);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Create a list of users
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Define the routes for the API
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  Object.assign(user, req.body);
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.sendStatus(204);
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports.handler = app;