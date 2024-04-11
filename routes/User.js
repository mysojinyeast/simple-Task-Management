
const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const db = require('../db')


const router = express.Router();


router.put('/:id', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { email, password } = req.body;

    if (userId != id) {
        return res.status(403).json({ error: "Access not granted" });
    }

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        await db.promise().query('UPDATE users SET email = ?, password = ? WHERE id = ?', [email, password, userId]);

        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Error updating user" });
    }
});


router.delete('/:id', verifyToken, async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params.id;

    if (userId != id) {
        return res.status(403).json({ error: "Access not granted" });
    }

    try {
        await db.promise().beginTransaction();

        await db.promise().query('DELETE FROM blogs WHERE user_id = ?', [userId]);

        await db.promise().query('DELETE FROM users WHERE id = ?', [userId]);

        await db.promise().commit();

        res.json({ message: "User and associated blog posts deleted successfully" });
    } catch (error) {

        await db.promise().rollback();

        console.error("Error deleting user and associated blog posts:", error);
        res.status(500).json({ error: "Error deleting user and associated blog posts" });
    }
});

module.exports=router;