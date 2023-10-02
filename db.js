const { Pool } = require('pg'); // Pool constructor

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "students",
    password: "admin",
    port: 5433
});

module.exports = pool;
