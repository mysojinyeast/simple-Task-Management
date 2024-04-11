const express = require('express');
const verifyToken = require('../middlewares/verifyToken')
const db = require('../db')

const router = express.Router();


router.post('/', verifyToken, async (req, res) => {
    const { title, content } = req.body;
    console.log(title);
    
    const userId = req.user.id; 
    
    console.log(userId);
  
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
  
    try {
      const [results] = await db.promise().query('INSERT INTO Todo (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);
      res.json({ id: results.insertId });
  
    } catch (error) {
      console.error("Error creating posts post:", error);
      res.status(500).json({ error: "Error creating posts post" });
    }
});


router.get('/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;

  try {
    const [results] = await db.promise().query('SELECT * FROM Todo WHERE id = ?', [postId]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(results[0]);

  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Error fetching post" });
  }
});



router.put('/:id', verifyToken, async (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user.userId; 
  
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
  
    try {
      const [results] = await db.promise().query('UPDATE Todo SET title = ?, content = ? WHERE id = ? AND user_id = ?', [title, content, postId, userId]);
  
      if (results.affectedRows === 0) {
        return res.status(403).json({ error: "You are not authorized to update this Todo " });
      }
  
      res.send("Todo updated successfully");
  
    } catch (error) {
      console.error("Error updating Todo:", error);
      res.status(500).json({ error: "Error updating Todo" });
    }
  });

  router.delete('/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  try {
  
    const [results] = await db.promise().query('DELETE FROM Todo WHERE id = ? AND user_id = ?', [postId, userId]);

    if (results.affectedRows === 0) {
      return res.status(403).json({ error: "You are not authorized to delete this Todo or the Todo does not exist" });
    }

    res.json({ message: "Todo deleted successfully" });

  } catch (error) {
    console.error("Error deleting Todo:", error);
    res.status(500).json({ error: "Error deleting Todo" });
  }
});


  module.exports = router;





  