import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const API_URL = 'http://localhost:5000/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(false);

    const { user, token, isAdmin, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/');
            return;
        }

        if (!isAdmin) {
            navigate('/');
            return;
        }

        fetchUsers();
    }, [isLoggedIn, isAdmin, navigate]);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Failed to fetch users');

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserDetails = async (userId) => {
        try {
            const res = await fetch(`${API_URL}/admin/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Failed to fetch user details');

            const data = await res.json();
            setSelectedUser(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleBanUser = async (userId, shouldBan) => {
        setActionLoading(true);
        try {
            const res = await fetch(`${API_URL}/admin/users/${userId}/ban`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ban: shouldBan })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Action failed');
            }

            // Refresh users list
            fetchUsers();
            if (selectedUser && selectedUser.user.id === userId) {
                fetchUserDetails(userId);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setActionLoading(false);
        }
    };

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="admin-dashboard">
            <motion.div
                className="admin-dashboard__container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <header className="admin-dashboard__header">
                    <h1>Admin Dashboard</h1>
                    <p>Manage users and community Q&A activity</p>
                </header>

                {error && <div className="admin-error">{error}</div>}

                <div className="admin-dashboard__content">
                    {/* Users Table */}
                    <section className="admin-section">
                        <h2>👥 All Users</h2>

                        {loading ? (
                            <div className="admin-loading">Loading users...</div>
                        ) : (
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Questions</th>
                                            <th>Answers</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u.id} className={u.is_banned ? 'banned' : ''}>
                                                <td>{u.name}</td>
                                                <td>{u.email}</td>
                                                <td>
                                                    <span className={`role-badge ${u.role}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${u.is_banned ? 'banned' : 'active'}`}>
                                                        {u.is_banned ? 'Banned' : 'Active'}
                                                    </span>
                                                </td>
                                                <td>{u.question_count}</td>
                                                <td>{u.answer_count}</td>
                                                <td className="actions-cell">
                                                    <button
                                                        className="action-btn view"
                                                        onClick={() => fetchUserDetails(u.id)}
                                                    >
                                                        View
                                                    </button>
                                                    {u.role !== 'admin' && (
                                                        <button
                                                            className={`action-btn ${u.is_banned ? 'unban' : 'ban'}`}
                                                            onClick={() => handleBanUser(u.id, !u.is_banned)}
                                                            disabled={actionLoading}
                                                        >
                                                            {u.is_banned ? 'Unban' : 'Ban'}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>

                    {/* User Details Modal */}
                    {selectedUser && (
                        <motion.div
                            className="user-details-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => setSelectedUser(null)}
                        >
                            <motion.div
                                className="user-details-modal"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>

                                <div className="user-details-header">
                                    <div className="user-avatar-large">
                                        {selectedUser.user.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <h3>{selectedUser.user.name}</h3>
                                        <p>{selectedUser.user.email}</p>
                                        <div className="user-badges">
                                            <span className={`role-badge ${selectedUser.user.role}`}>
                                                {selectedUser.user.role}
                                            </span>
                                            {selectedUser.user.is_banned && (
                                                <span className="status-badge banned">Banned</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="user-activity">
                                    <div className="activity-section">
                                        <h4>Questions ({selectedUser.questions.length})</h4>
                                        {selectedUser.questions.length > 0 ? (
                                            <ul>
                                                {selectedUser.questions.map(q => (
                                                    <li key={q.id}>
                                                        <strong>{q.title}</strong>
                                                        <span className="date">{new Date(q.created_at).toLocaleDateString()}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="no-activity">No questions asked</p>
                                        )}
                                    </div>

                                    <div className="activity-section">
                                        <h4>Answers ({selectedUser.answers.length})</h4>
                                        {selectedUser.answers.length > 0 ? (
                                            <ul>
                                                {selectedUser.answers.map(a => (
                                                    <li key={a.id}>
                                                        <strong>Re: {a.question_title}</strong>
                                                        <p className="answer-preview">{a.content.substring(0, 100)}...</p>
                                                        <span className="date">{new Date(a.created_at).toLocaleDateString()}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="no-activity">No answers given</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
