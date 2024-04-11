const mysql = require('mysql2');
const db = require('./db'); // Importing the database connection

describe('Database Connection', () => {
    test('Should connect to MySQL server', (done) => {
        db.connect((err) => {
            expect(err).toBeNull();
            done();
        });
    });

    test('Should create TodoDB database if it does not exist', (done) => {
        db.query("CREATE DATABASE IF NOT EXISTS TodoDB", (err, result) => {
            expect(err).toBeNull();
            expect(result).toBeDefined();
            done();
        });
    });

    test('Should use TodoDB database', (done) => {
        db.query("USE TodoDB", (err, result) => {
            expect(err).toBeNull();
            expect(result).toBeDefined();
            done();
        });
    });

    test('Should create users table if it does not exist', (done) => {
        db.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )`, (err, result) => {
            expect(err).toBeNull();
            expect(result).toBeDefined();
            done();
        });
    });

    test('Should create Todo table if it does not exist', (done) => {
        db.query(`CREATE TABLE IF NOT EXISTS Todo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            user_id INT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`, (err, result) => {
            expect(err).toBeNull();
            expect(result).toBeDefined();
            done();
        });
    });
});
