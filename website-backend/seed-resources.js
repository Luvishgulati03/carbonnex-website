const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedResources() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'carbonnex_resources',
        waitForConnections: true,
        connectionLimit: 1
    });

    const resources = [
        {
            title: 'The Future of Carbon Offsetting',
            summary: 'An depth look at how voluntary carbon markets are evolving in 2026.',
            type: 'article',
            access_level: 'public',
            category: 'general'
        },
        {
            title: 'ESG Reporting Standards Guide',
            summary: 'Comprehensive guide to understanding CSRD, SASB, and GRI frameworks.',
            type: 'guide',
            access_level: 'registered',
            category: 'compliance'
        }
    ];

    try {
        for (const res of resources) {
            await pool.query(
                'INSERT INTO articles (title, summary, type, access_level, category_slug, source_url) VALUES (?, ?, ?, ?, ?, ?)',
                [res.title, res.summary, res.type, res.access_level, res.category, '']
            );
            console.log(`Added: ${res.title}`);
        }
        console.log('✅ Seeding complete.');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

seedResources();
