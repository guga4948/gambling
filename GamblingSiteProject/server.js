const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Set up SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static('public'));

// API routes
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    db.run('INSERT INTO users (username, password, balance) VALUES (?, ?, ?)', [username, password, 1000], (err) => {
        if (err) {
            res.status(500).send('Error registering user');
        } else {
            res.send('User registered successfully');
        }
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err || !row) {
            res.status(401).send('Invalid credentials');
        } else {
            res.send(row);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
