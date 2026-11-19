const express = require('express');
const cors = require('cors');
const db = require('./db'); // db.js සම්බන්ධ කිරීම

const app = express();
app.use(cors());
app.use(express.json());

// 1. සියලුම Products ලබා ගැනීම (GET)
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Add to Cart සහ Stock අඩු කිරීම (POST)
app.post('/api/add-to-cart', (req, res) => {
    const { productId, quantity } = req.body;
    const sql = 'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?';
    db.query(sql, [quantity, productId, quantity], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Out of stock or invalid product' });
        }
        res.json({ success: true, message: 'Added to cart & stock updated!' });
    });
});

// 3. User Login (POST)
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT id, name, email FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        res.json({ success: true, user: results[0] });
    });
});

// 4. Newsletter Subscription (POST)
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    db.query('INSERT INTO subscriptions (email) VALUES (?)', [email], (err) => {
        if (err) return res.status(500).json({ error: 'Already subscribed or error' });
        res.json({ success: true, message: 'Subscribed successfully!' });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});