require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function applySchema() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true
    });

    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Applying schema...');
        await connection.query(schema);
        console.log('Schema applied successfully!');

        // Verify articles were inserted
        const [rows] = await connection.query('SELECT COUNT(*) as count FROM carbonnex_resources.articles');
        console.log(`Articles in database: ${rows[0].count}`);

    } catch (err) {
        console.error('Error applying schema:', err.message);
    } finally {
        await connection.end();
    }
}

applySchema();
