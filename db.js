const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 's3cretPassword',
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL server!');

    db.query("CREATE DATABASE IF NOT EXISTS blogDb", (err, result) => {
        if (err) throw err;
        console.log("Database 'blogDb' created successfully!");
    });

    db.query("USE blogDb", (err, result) => {
        if (err) throw err;
        console.log("Switched to database 'blogDb'");
    });

    db.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    )`, (err, result) => {
        if (err) throw err;
        console.log('Users table created successfully!');
    });

  
    db.query(`CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`, (err, result) => {
        if (err) throw err;
        console.log('Blogs table created successfully!');
    });
});

module.exports = db;
