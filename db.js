const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server!');

    db.query("CREATE DATABASE IF NOT EXISTS TodoDB", (err, result) => {
        if (err) throw err;
        console.log("Database 'TodoDB' created successfully!");
    });

    db.query("USE TodoDB", (err, result) => {
        if (err) throw err;
        console.log("Switched to database 'TodoDb'");
    });

    db.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )`, (err, result) => {
        if (err) throw err;
        console.log('Users table created successfully!');
    });

  
    db.query(`CREATE TABLE IF NOT EXISTS Todo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`, (err, result) => {
        if (err) throw err;
        console.log('Todo table created successfully!');
    });
});

module.exports = db;
