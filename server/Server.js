const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'todo',
});




db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// CRUD Routes
// Get all todos
app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get a single todo
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM todos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

// Create a new todo
app.post('/todos', (req, res) => {
    const { title, description, status } = req.body;
    db.query('INSERT INTO todos (title, description, status) VALUES (?, ?, ?)',
        [title, description, status || 'pending'],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId, title, description, status });
        });
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    db.query('UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?',
        [title, description, status, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Todo updated successfully' });
        });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Todo deleted successfully' });
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
