require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // Default Winget install might use empty password or prompt during setup
    database: process.env.DB_NAME || 'carbonnex_resources',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test DB Connection
pool.getConnection()
    .then(conn => {
        console.log("Connected to MySQL Database!");
        conn.release();
    })
    .catch(err => {
        console.error("Database Connection Failed:", err);
    });

// API Routes

// 1. Get Categories
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 1.5 Create Category
app.post('/api/categories', async (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Category Name is required" });

    // Simple slug generator
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
        const [result] = await pool.query(
            'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
            [name, slug, description || '']
        );
        res.status(201).json({ message: "Category Created!", id: result.insertId, slug });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Category already exists" });
        }
        res.status(500).json({ error: err.message });
    }
});

// 1.5 Create Category
app.post('/api/categories', async (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Category Name is required" });

    // Simple slug generator
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
        const [result] = await pool.query(
            'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
            [name, slug, description || '']
        );
        res.status(201).json({ message: "Category Created!", id: result.insertId, slug });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Category already exists" });
        }
        res.status(500).json({ error: err.message });
    }
});

// 2. Get Questions (with User & Answer Count)
app.get('/api/questions', async (req, res) => {
    try {
        const query = `
            SELECT q.*, u.name as author_name, c.name as category_name, 
            (SELECT COUNT(*) FROM answers a WHERE a.question_id = q.id) as answer_count
            FROM questions q
            JOIN users u ON q.user_id = u.id
            LEFT JOIN categories c ON q.category_id = c.id
            ORDER BY q.created_at DESC
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Post Question
app.post('/api/questions', async (req, res) => {
    const { email, name, category, title, details } = req.body;

    // Validate Input
    if (!email || !title) return res.status(400).json({ error: "Email and Title are required" });

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Find or Create User
        let [users] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
        let userId;

        if (users.length > 0) {
            userId = users[0].id;
        } else {
            const [result] = await connection.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name || 'Guest']);
            userId = result.insertId;
        }

        // 2. Find Category ID (Optional, based on name or slug)
        // Ensure category ID is valid
        let categoryId = null;
        if (category) {
            const [cats] = await connection.query('SELECT id FROM categories WHERE name = ? OR slug = ?', [category, category]);
            if (cats.length > 0) categoryId = cats[0].id;
        }

        // 3. Insert Question
        const [qResult] = await connection.query(
            'INSERT INTO questions (user_id, category_id, title, details) VALUES (?, ?, ?, ?)',
            [userId, categoryId, title, details]
        );

        await connection.commit();
        res.status(201).json({ message: "Question Posted!", id: qResult.insertId });

    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// 4. Post Answer
app.post('/api/answers', async (req, res) => {
    const { question_id, email, name, content } = req.body;

    if (!question_id || !email || !content) return res.status(400).json({ error: "Mission fields" });

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Find or Create User
        let [users] = await connection.query('SELECT id FROM users WHERE email = ?', [email]);
        let userId;

        if (users.length > 0) {
            userId = users[0].id;
        } else {
            const [result] = await connection.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name || 'Guest']);
            userId = result.insertId;
        }

        // 2. Insert Answer
        await connection.query(
            'INSERT INTO answers (question_id, user_id, content) VALUES (?, ?, ?)',
            [question_id, userId, content]
        );

        await connection.commit();
        res.status(201).json({ message: "Answer Posted!" });

    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
