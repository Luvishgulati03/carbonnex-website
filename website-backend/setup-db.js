const mysql = require('mysql2/promise');

async function setup() {
    try {
        const pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'password',
            multipleStatements: true
        });

        console.log('Connected as root!');
        
        await pool.query('CREATE DATABASE IF NOT EXISTS carbonnex_resources;');
        console.log('Database created/verified.');
        
        await pool.query("CREATE USER IF NOT EXISTS 'carbonnex'@'localhost' IDENTIFIED BY 'password';");
        console.log('User created.');
        
        await pool.query("GRANT ALL PRIVILEGES ON carbonnex_resources.* TO 'carbonnex'@'localhost';");
        
        await pool.query('FLUSH PRIVILEGES;');
        console.log('Privileges granted!');
        
        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
    }
}

setup();
