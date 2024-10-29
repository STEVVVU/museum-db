var mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.DB_HOST || 'museumdb.mysql.database.azure.com',      // Environment variable or fallback
    database: process.env.DB_NAME || 'museumdb',                           // Environment variable or fallback
    user: process.env.DB_USER || 'user',                                   // Environment variable or fallback
    password: process.env.DB_PASSWORD || 'password12345',                  // Environment variable or fallback
    ssl: {
        rejectUnauthorized: true  // Enforces SSL connection (adjust based on your database setup)
    }
});

module.exports = connection;
