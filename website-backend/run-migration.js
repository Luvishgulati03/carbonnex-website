// Run RBAC Database Migration
const mysql = require('mysql2/promise');
require('dotenv').config();

async function runMigration() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'carbonnex_resources',
        waitForConnections: true,
        connectionLimit: 10
    });

    console.log('Running RBAC migration...');

    try {
        // Add password_hash column
        console.log('1. Adding password_hash column...');
        await pool.query(`ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) AFTER name`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Add role column
        console.log('2. Adding role column...');
        await pool.query(`ALTER TABLE users ADD COLUMN role ENUM('user', 'admin') DEFAULT 'user' AFTER password_hash`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Add is_banned column
        console.log('3. Adding is_banned column...');
        await pool.query(`ALTER TABLE users ADD COLUMN is_banned BOOLEAN DEFAULT FALSE AFTER role`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Add reset_token column
        console.log('4. Adding reset_token column...');
        await pool.query(`ALTER TABLE users ADD COLUMN reset_token VARCHAR(255) AFTER is_banned`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Add reset_token_expires column
        console.log('5. Adding reset_token_expires column...');
        await pool.query(`ALTER TABLE users ADD COLUMN reset_token_expires DATETIME AFTER reset_token`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Update null names
        console.log('6. Updating null names...');
        await pool.query(`UPDATE users SET name = 'Guest' WHERE name IS NULL OR name = ''`);

        // Show final schema
        console.log('\n7. Verifying schema:');
        const [columns] = await pool.query('DESCRIBE users');
        columns.forEach(col => console.log(`   ${col.Field}: ${col.Type}`));

        console.log('\n✅ Migration completed successfully!');
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        await pool.end();
        process.exit(1);
    }
}

runMigration();
