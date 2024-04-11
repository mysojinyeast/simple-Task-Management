const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = '12345';

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const [existingUsers] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(409).json({ error: "Email already in use" });
        }

        const [results] = await db.promise().query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
        const userId = results.insertId;

        const token = jwt.sign({ id: userId }, JWT_SECRET);

        res.json({ token });

    } catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ error: "Error while signing up" });
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        res.json({ token });

    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ error: "Error while signing in" });
    }
});


module.exports = router;
