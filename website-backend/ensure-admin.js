const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function ensureAdmin() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'carbonnex_resources',
        waitForConnections: true,
        connectionLimit: 1
    });

    const email = 'admin@carbonnex.com';
    const password = 'admin'; // Simple password for testing
    const name = 'Admin User';

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length > 0) {
            console.log('Admin user exists. Updating role to be sure...');
            await pool.query('UPDATE users SET role = "admin" WHERE id = ?', [users[0].id]);
        } else {
            console.log('Creating admin user...');
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)',
                [email, name, hashedPassword, 'admin']);
        }

        console.log(`✅ Admin ready: ${email} / ${password}`);
        process.exit(0);

    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

ensureAdmin();
