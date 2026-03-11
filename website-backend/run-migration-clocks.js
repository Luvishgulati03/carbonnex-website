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

    console.log('Running Net Zero Clocks migration...');

    try {
        console.log('1. Creating net_zero_clocks table...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS net_zero_clocks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                country_name VARCHAR(255) NOT NULL UNIQUE,
                target_date DATETIME NOT NULL,
                is_global BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('2. Seeding Global default data...');
        const [existing] = await pool.query(`SELECT id FROM net_zero_clocks WHERE country_name = 'Global'`);
        if (existing.length === 0) {
            await pool.query(`INSERT INTO net_zero_clocks (country_name, target_date, is_global) VALUES ('Global', '2050-01-01 00:00:00', TRUE)`);
            console.log('   Seeded "Global" default data.');
        } else {
            console.log('   Seed data already exists.');
        }

        console.log('\n✅ Net Zero Clocks Migration completed successfully!');
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        await pool.end();
        process.exit(1);
    }
}

runMigration();
