// backend/config/db.js
import mysql from 'mysql2/promise'; // TAMBAHKAN /promise DI SINI

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'manpro',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;