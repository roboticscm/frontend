const { Pool } = require("pg");

export const pool = new Pool({
    "host": 'localhost',
    "port": 5433,
    "user": "frontend",
    "password": "frontend",
    "database": "frontend",
    "max": 1
});