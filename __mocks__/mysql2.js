// __mocks__/mysql2.js

const mysql = jest.createMockFromModule('mysql2');

let _connection;
let _queryCallback;

mysql.createConnection = jest.fn(() => {
    _connection = {
        connect: jest.fn(),
        query: jest.fn((sql, params, callback) => {
            _queryCallback = callback;
        }),
        end: jest.fn(),
        on: jest.fn()
    };
    return _connection;
});

mysql.getConnection = () => _connection;

mysql.__setQueryResult = (result) => {
    _queryCallback(null, result);
};

module.exports = mysql;
