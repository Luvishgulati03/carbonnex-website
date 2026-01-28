// Run Resources Database Migration
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

    console.log('Running Resources migration...');

    try {
        // Add type column
        console.log('1. Adding type column...');
        await pool.query(`ALTER TABLE articles ADD COLUMN type ENUM('article', 'whitepaper', 'guide', 'tool', 'report') DEFAULT 'article' AFTER id`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Add file_path column
        console.log('2. Adding file_path column...');
        await pool.query(`ALTER TABLE articles ADD COLUMN file_path VARCHAR(512) AFTER source_url`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Add access_level column
        console.log('3. Adding access_level column...');
        await pool.query(`ALTER TABLE articles ADD COLUMN access_level ENUM('public', 'registered') DEFAULT 'public' AFTER file_path`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Add download_count column
        console.log('4. Adding download_count column...');
        await pool.query(`ALTER TABLE articles ADD COLUMN download_count INT DEFAULT 0 AFTER access_level`).catch(e => {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('   Column already exists, skipping.');
            else throw e;
        });

        // Seed Data
        console.log('5. Seeding sample whitepapers...');
        const [existing] = await pool.query(`SELECT id FROM articles WHERE title = 'Carbon Accounting Best Practices 2025'`);
        if (existing.length === 0) {
            await pool.query(`INSERT INTO articles (type, title, summary, source_url, file_path, access_level, category_slug) VALUES
            ('whitepaper', 'Carbon Accounting Best Practices 2025', 'A definitive technical guide for implementing rigorous carbon accounting standards across Scope 1, 2, and 3 emissions.', 'https://ghgprotocol.org', '/uploads/carbon-accounting-2025.pdf', 'registered', 'technical'),
            ('report', 'Global ESG Trends Report', 'Annual analysis of global environmental, social, and governance trends affecting major industries.', 'https://example.com/report', '/uploads/esg-trends-2025.pdf', 'public', 'general')`);
            console.log('   Seeded 2 items.');
        } else {
            console.log('   Seed data already exists.');
        }

        console.log('\n✅ Resources Migration completed successfully!');
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        await pool.end();
        process.exit(1);
    }
}

runMigration();
