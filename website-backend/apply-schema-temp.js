const mysql = require('mysql2/promise');
const fs = require('fs');

async function apply() {
    try {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'carbonnex',
            password: 'password',
            database: 'carbonnex_resources',
            multipleStatements: true
        });

        const schema = fs.readFileSync('schema.sql', 'utf8');
        await pool.query(schema);
        console.log('Schema applied successfully.');
        
        await pool.end();
    } catch (err) {
        console.error('Error applying schema:', err.message);
    }
}

apply();
