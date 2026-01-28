const mysql = require('mysql2/promise');
require('dotenv').config();

const email = process.argv[2];

if (!email) {
    console.error('Please provide an email address.');
    console.error('Usage: node promote-admin.js <email>');
    process.exit(1);
}

async function promoteAdmin() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'carbonnex_resources',
        waitForConnections: true,
        connectionLimit: 1
    });

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            console.error(`User with email ${email} not found.`);
            process.exit(1);
        }

        await pool.query('UPDATE users SET role = "admin" WHERE id = ?', [users[0].id]);
        console.log(`✅ Success! User ${email} is now an ADMIN.`);
        process.exit(0);

    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

promoteAdmin();
