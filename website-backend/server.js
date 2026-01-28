require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_change_in_production';

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
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

// Email Transporter (for Password Reset)
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ================= AUTH MIDDLEWARE =================

// Verify JWT Token (Optional - returns null user if no token)
const optionalAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        return next();
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const [users] = await pool.query('SELECT id, email, name, role, is_banned FROM users WHERE id = ?', [decoded.userId]);
        req.user = users.length > 0 ? users[0] : null;
        next();
    } catch (err) {
        req.user = null;
        next();
    }
};

// Require Authentication
const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const [users] = await pool.query('SELECT id, email, name, role, is_banned FROM users WHERE id = ?', [decoded.userId]);

        if (users.length === 0) return res.status(401).json({ error: 'User not found' });
        if (users[0].is_banned) return res.status(403).json({ error: 'Account is banned' });

        req.user = users[0];
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Require Admin Role
const requireAdmin = async (req, res, next) => {
    await requireAuth(req, res, () => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    });
};

// ================= AUTH ENDPOINTS =================

// Register
app.post('/api/auth/register', async (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ error: 'Email, name, and password are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        // Check if email exists
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await pool.query(
            'INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)',
            [email, name, passwordHash, 'user']
        );

        // Generate token
        const token = jwt.sign({ userId: result.insertId, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: { id: result.insertId, email, name, role: 'user' }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = users[0];

        if (user.is_banned) {
            return res.status(403).json({ error: 'Account is banned' });
        }

        if (!user.password_hash) {
            return res.status(401).json({ error: 'No password set. Please register or use forgot password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, name: user.name, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Forgot Password
app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const [users] = await pool.query('SELECT id, name FROM users WHERE email = ?', [email]);

        // Always return success to prevent email enumeration
        if (users.length === 0) {
            return res.json({ message: 'If the email exists, a reset link has been sent.' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hour

        await pool.query(
            'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
            [resetToken, expires, users[0].id]
        );

        // Send email (placeholder - configure with real email)
        const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'CarbonNex Password Reset',
                html: `
                    <h2>Password Reset Request</h2>
                    <p>Hello ${users[0].name},</p>
                    <p>Click the link below to reset your password. This link expires in 1 hour.</p>
                    <a href="${resetUrl}">Reset Password</a>
                    <p>If you didn't request this, please ignore this email.</p>
                `
            });
        } catch (emailErr) {
            console.error('Email send failed:', emailErr);
            // Still return success - token is saved, user can use it manually
        }

        res.json({ message: 'If the email exists, a reset link has been sent.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        const [users] = await pool.query(
            'SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
            [token]
        );

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        await pool.query(
            'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
            [passwordHash, users[0].id]
        );

        res.json({ message: 'Password reset successful. Please login.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Current User
app.get('/api/auth/me', requireAuth, (req, res) => {
    res.json({ user: req.user });
});

// ================= CATEGORIES =================

app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categories');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/categories', async (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Category Name is required" });

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

// ================= ARTICLES =================

app.get('/api/articles', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= QUESTIONS =================

// Get Questions (with User, Answer Count, and Role Info)
app.get('/api/questions', async (req, res) => {
    try {
        const query = `
            SELECT q.*, u.name as author_name, u.role as author_role, c.name as category_name, 
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

// Search Questions
app.get('/api/questions/search', async (req, res) => {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
        return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }

    try {
        const searchTerm = `%${q}%`;
        const query = `
            SELECT q.*, u.name as author_name, u.role as author_role, c.name as category_name,
            (SELECT COUNT(*) FROM answers a WHERE a.question_id = q.id) as answer_count
            FROM questions q
            JOIN users u ON q.user_id = u.id
            LEFT JOIN categories c ON q.category_id = c.id
            WHERE q.title LIKE ? OR q.details LIKE ?
            ORDER BY q.created_at DESC
        `;
        const [rows] = await pool.query(query, [searchTerm, searchTerm]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post Question (Guest or Logged-in)
app.post('/api/questions', optionalAuth, async (req, res) => {
    const { email, name, category, title, details } = req.body;

    // If logged in, use logged-in user; otherwise require email/name
    let userId;
    let userRole = 'user';

    if (req.user) {
        userId = req.user.id;
        userRole = req.user.role;
    } else {
        if (!email || !name || !title) {
            return res.status(400).json({ error: "Name, Email, and Title are required" });
        }
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        if (!req.user) {
            // Guest: Find or Create User
            let [users] = await connection.query('SELECT id, role, is_banned FROM users WHERE email = ?', [email]);

            if (users.length > 0) {
                if (users[0].is_banned) {
                    await connection.rollback();
                    return res.status(403).json({ error: 'This email is banned from posting' });
                }
                userId = users[0].id;
                userRole = users[0].role;
            } else {
                const [result] = await connection.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name]);
                userId = result.insertId;
            }
        }

        // Find Category ID
        let categoryId = null;
        if (category) {
            const [cats] = await connection.query('SELECT id FROM categories WHERE name = ? OR slug = ?', [category, category]);
            if (cats.length > 0) categoryId = cats[0].id;
        }

        // Insert Question
        const [qResult] = await connection.query(
            'INSERT INTO questions (user_id, category_id, title, details) VALUES (?, ?, ?, ?)',
            [userId, categoryId, title, details]
        );

        await connection.commit();
        res.status(201).json({
            message: "Question Posted!",
            id: qResult.insertId,
            isAdmin: userRole === 'admin'
        });

    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// Edit Question (Owner or Admin)
app.put('/api/questions/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { title, details } = req.body;

    try {
        const [questions] = await pool.query('SELECT user_id FROM questions WHERE id = ?', [id]);

        if (questions.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }

        if (questions[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to edit this question' });
        }

        await pool.query('UPDATE questions SET title = ?, details = ? WHERE id = ?', [title, details, id]);
        res.json({ message: 'Question updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Question (Owner or Admin)
app.delete('/api/questions/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    try {
        const [questions] = await pool.query('SELECT user_id FROM questions WHERE id = ?', [id]);

        if (questions.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }

        if (questions[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to delete this question' });
        }

        await pool.query('DELETE FROM questions WHERE id = ?', [id]);
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User's Questions
app.get('/api/users/me/questions', requireAuth, async (req, res) => {
    try {
        const query = `
            SELECT q.*, c.name as category_name,
            (SELECT COUNT(*) FROM answers a WHERE a.question_id = q.id) as answer_count
            FROM questions q
            LEFT JOIN categories c ON q.category_id = c.id
            WHERE q.user_id = ?
            ORDER BY q.created_at DESC
        `;
        const [rows] = await pool.query(query, [req.user.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= ANSWERS =================

// Get Answers for a Question
app.get('/api/questions/:id/answers', async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
            SELECT a.*, u.name as author_name, u.role as author_role
            FROM answers a
            JOIN users u ON a.user_id = u.id
            WHERE a.question_id = ?
            ORDER BY a.created_at ASC
        `;
        const [rows] = await pool.query(query, [id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post Answer
app.post('/api/answers', optionalAuth, async (req, res) => {
    const { question_id, email, name, content } = req.body;

    let userId;
    let userRole = 'user';

    if (req.user) {
        userId = req.user.id;
        userRole = req.user.role;
    } else {
        if (!question_id || !email || !name || !content) {
            return res.status(400).json({ error: "Question ID, Name, Email, and Content are required" });
        }
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        if (!req.user) {
            let [users] = await connection.query('SELECT id, role, is_banned FROM users WHERE email = ?', [email]);

            if (users.length > 0) {
                if (users[0].is_banned) {
                    await connection.rollback();
                    return res.status(403).json({ error: 'This email is banned from posting' });
                }
                userId = users[0].id;
                userRole = users[0].role;
            } else {
                const [result] = await connection.query('INSERT INTO users (email, name) VALUES (?, ?)', [email, name]);
                userId = result.insertId;
            }
        }

        const isOfficial = userRole === 'admin';

        const [aResult] = await connection.query(
            'INSERT INTO answers (question_id, user_id, content, is_official) VALUES (?, ?, ?, ?)',
            [question_id, userId, content, isOfficial]
        );

        await connection.commit();
        res.status(201).json({
            message: "Answer Posted!",
            id: aResult.insertId,
            isAdmin: userRole === 'admin'
        });

    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
});

// Edit Answer (Owner or Admin)
app.put('/api/answers/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const [answers] = await pool.query('SELECT user_id FROM answers WHERE id = ?', [id]);

        if (answers.length === 0) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        if (answers[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to edit this answer' });
        }

        await pool.query('UPDATE answers SET content = ? WHERE id = ?', [content, id]);
        res.json({ message: 'Answer updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Answer (Owner or Admin)
app.delete('/api/answers/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    try {
        const [answers] = await pool.query('SELECT user_id FROM answers WHERE id = ?', [id]);

        if (answers.length === 0) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        if (answers[0].user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to delete this answer' });
        }

        await pool.query('DELETE FROM answers WHERE id = ?', [id]);
        res.json({ message: 'Answer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User's Questions
app.get('/api/users/me/questions', requireAuth, async (req, res) => {
    try {
        const query = `
            SELECT q.*, c.name as category_name,
            (SELECT COUNT(*) FROM answers a WHERE a.question_id = q.id) as answer_count
            FROM questions q
            LEFT JOIN categories c ON q.category_id = c.id
            WHERE q.user_id = ?
            ORDER BY q.created_at DESC
        `;
        const [rows] = await pool.query(query, [req.user.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User's Answers
app.get('/api/users/me/answers', requireAuth, async (req, res) => {
    try {
        const query = `
            SELECT a.*, q.title as question_title
            FROM answers a
            JOIN questions q ON a.question_id = q.id
            WHERE a.user_id = ?
            ORDER BY a.created_at DESC
        `;
        const [rows] = await pool.query(query, [req.user.id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ================= ADMIN ENDPOINTS =================

// Get All Users with Activity
app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
        const query = `
            SELECT u.id, u.email, u.name, u.role, u.is_banned, u.created_at,
            (SELECT COUNT(*) FROM questions q WHERE q.user_id = u.id) as question_count,
            (SELECT COUNT(*) FROM answers a WHERE a.user_id = u.id) as answer_count
            FROM users u
            ORDER BY u.created_at DESC
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get User Details with Q&A
app.get('/api/admin/users/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const [users] = await pool.query('SELECT id, email, name, role, is_banned, created_at FROM users WHERE id = ?', [id]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const [questions] = await pool.query('SELECT * FROM questions WHERE user_id = ? ORDER BY created_at DESC', [id]);
        const [answers] = await pool.query(`
            SELECT a.*, q.title as question_title 
            FROM answers a 
            JOIN questions q ON a.question_id = q.id 
            WHERE a.user_id = ? 
            ORDER BY a.created_at DESC
        `, [id]);

        res.json({
            user: users[0],
            questions,
            answers
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ban/Unban User
app.post('/api/admin/users/:id/ban', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const { ban } = req.body; // true to ban, false to unban

    try {
        const [users] = await pool.query('SELECT role FROM users WHERE id = ?', [id]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (users[0].role === 'admin') {
            return res.status(400).json({ error: 'Cannot ban an admin' });
        }

        await pool.query('UPDATE users SET is_banned = ? WHERE id = ?', [ban ? 1 : 0, id]);
        res.json({ message: ban ? 'User banned' : 'User unbanned' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
