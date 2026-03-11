const mysql = require('mysql2/promise');
require('dotenv').config();

const clocks = [
    { country_name: 'GLOBAL DEFAULT', target_date: '2050-01-01', is_global: true },
    { country_name: 'USA', target_date: '2050-01-01', is_global: false },
    { country_name: 'EU (Bloc)', target_date: '2050-01-01', is_global: false },
    { country_name: 'Germany', target_date: '2045-01-01', is_global: false },
    { country_name: 'France', target_date: '2050-01-01', is_global: false },
    { country_name: 'Netherlands', target_date: '2050-01-01', is_global: false },
    { country_name: 'Nordics (Avg)', target_date: '2045-01-01', is_global: false },
    { country_name: 'Canada', target_date: '2050-01-01', is_global: false },
    { country_name: 'Japan', target_date: '2050-01-01', is_global: false },
    { country_name: 'South Korea', target_date: '2050-01-01', is_global: false },
    { country_name: 'India', target_date: '2070-01-01', is_global: false }
];

async function seedClocks() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'carbonnex_resources',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log("Connected to database. Seeding clocks...");

        for (const clock of clocks) {
            // Check if clock exists by country_name
            const [existing] = await pool.query('SELECT id FROM net_zero_clocks WHERE country_name = ?', [clock.country_name]);

            if (existing.length === 0) {
                await pool.query(
                    'INSERT INTO net_zero_clocks (country_name, target_date, is_global) VALUES (?, ?, ?)',
                    [clock.country_name, clock.target_date, clock.is_global ? 1 : 0]
                );
                console.log(`Added: ${clock.country_name}`);
            } else {
                console.log(`Already exists: ${clock.country_name}`);
            }
        }

        console.log("Seeding complete.");
        await pool.end();
    } catch (err) {
        console.error("Error seeding clocks:", err);
    }
}

seedClocks();
