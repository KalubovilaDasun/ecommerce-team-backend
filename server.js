const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// 1. සියලුම Products ලබා ගැනීම (GET)
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM product', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. User Register (POST)
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'User registered successfully!', userId: result.insertId });
    });
});

// 3. User Login (POST)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT id, name, email FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        res.json({ success: true, user: results[0] });
    });
});

// 4. Order එකක් Place කිරීම / Checkout (POST)
app.post('/api/orders', (req, res) => {
    const { user_id, total_amount } = req.body;
    const sql = 'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
    db.query(sql, [user_id, total_amount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Order placed successfully!', orderId: result.insertId });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});