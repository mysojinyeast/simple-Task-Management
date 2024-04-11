// db.test.js

const db = require('../db');

// Mocking the db.query function
jest.mock('../db', () => ({
    query: jest.fn()
}));

describe('Database', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    it('should create database successfully', async () => {
        // Test database creation
        await expect(db).toBeDefined();
    });

    it('should create users table successfully', async () => {
        // Call the function responsible for creating the users table
        await db.createUsersTable();

        // Check if db.query was called with the correct SQL command
        expect(db.query).toHaveBeenCalledWith('CREATE TABLE IF NOT EXISTS users');
    });

    it('should create Todo table successfully', async () => {
        // Call the function responsible for creating the Todo table
        await db.createTodoTable();

        // Check if db.query was called with the correct SQL command
        expect(db.query).toHaveBeenCalledWith('CREATE TABLE IF NOT EXISTS Todo');
    });
});
