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

    // Resource Management State
    const [activeTab, setActiveTab] = useState('users'); // 'users' or 'resources'
    const [resources, setResources] = useState([]);
    const [resourceForm, setResourceForm] = useState({
        title: '', summary: '', type: 'article', category: 'general', access_level: 'public', source_url: ''
    });
    const [resourceFile, setResourceFile] = useState(null);
    const [editingId, setEditingId] = useState(null);

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
        fetchResources();
    }, [isLoggedIn, isAdmin, navigate]);

    const fetchResources = async () => {
        try {
            const res = await fetch(`${API_URL}/resources`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setResources(data);
        } catch (err) {
            console.error(err);
        }
    };

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

    const handleResourceSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);

        const formData = new FormData();
        formData.append('title', resourceForm.title);
        formData.append('summary', resourceForm.summary);
        formData.append('type', resourceForm.type);
        formData.append('category_slug', resourceForm.category);
        formData.append('access_level', resourceForm.access_level);
        formData.append('source_url', resourceForm.source_url);
        if (resourceFile) {
            formData.append('file', resourceFile);
        }

        const url = editingId ? `${API_URL}/resources/${editingId}` : `${API_URL}/resources`;
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) throw new Error(editingId ? 'Failed to update resource' : 'Failed to upload resource');

            setResourceForm({ title: '', summary: '', type: 'article', category: 'general', access_level: 'public', source_url: '' });
            setResourceFile(null);
            setEditingId(null);
            fetchResources();
            alert(editingId ? 'Resource updated successfully!' : 'Resource added successfully!');
        } catch (err) {
            setError(err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleEditResource = (resource) => {
        setEditingId(resource.id);
        setResourceForm({
            title: resource.title,
            summary: resource.summary || '',
            type: resource.type,
            category: resource.category_slug || 'general',
            access_level: resource.access_level,
            source_url: resource.source_url || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setResourceForm({ title: '', summary: '', type: 'article', category: 'general', access_level: 'public', source_url: '' });
        setResourceFile(null);
    };

    const handleDeleteResource = async (id) => {
        if (!window.confirm('Delete this resource?')) return;
        setActionLoading(true);
        try {
            const res = await fetch(`${API_URL}/resources/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete');
            fetchResources();
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
                    <h1>Admin Dashboard</h1>
                    <div className="admin-tabs">
                        <button
                            className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            👥 Users
                        </button>
                        <button
                            className={`admin-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
                            onClick={() => setActiveTab('resources')}
                        >
                            📚 Resources
                        </button>
                    </div>
                </header>

                {error && <div className="admin-error">{error}</div>}

                <div className="admin-dashboard__content">
                    {/* Users Table */}
                    {activeTab === 'users' && (
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
                    )}

                    {/* Resources Section */}
                    {activeTab === 'resources' && (
                        <section className="admin-section">
                            <h2>📚 Manage Resources</h2>

                            {/* Add/Edit Resource Form */}
                            <form className="resource-form" onSubmit={handleResourceSubmit}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3>{editingId ? 'Edit Resource' : 'Add New Resource'}</h3>
                                    {editingId && (
                                        <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem' }}>
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>
                                <div className="form-grid">
                                    <input
                                        type="text" placeholder="Title" required
                                        value={resourceForm.title}
                                        onChange={e => setResourceForm({ ...resourceForm, title: e.target.value })}
                                    />
                                    <select
                                        value={resourceForm.type}
                                        onChange={e => setResourceForm({ ...resourceForm, type: e.target.value })}
                                    >
                                        <option value="article">Article</option>
                                        <option value="news">News</option>
                                        <option value="whitepaper">Whitepaper</option>
                                        <option value="guide">Guide</option>
                                        <option value="tool">Tool</option>
                                        <option value="report">Report</option>
                                    </select>
                                    <select
                                        value={resourceForm.access_level}
                                        onChange={e => setResourceForm({ ...resourceForm, access_level: e.target.value })}
                                    >
                                        <option value="public">Public</option>
                                        <option value="registered">Registered Only</option>
                                    </select>
                                    <input
                                        type="text" placeholder="Source URL (Optional)"
                                        value={resourceForm.source_url}
                                        onChange={e => setResourceForm({ ...resourceForm, source_url: e.target.value })}
                                    />
                                    <div className="file-input-wrapper">
                                        <input
                                            type="file"
                                            onChange={e => setResourceFile(e.target.files[0])}
                                        />
                                        {editingId && <small style={{ display: 'block', marginTop: '4px', color: '#666' }}>Leave empty to keep existing file</small>}
                                    </div>
                                </div>
                                <textarea
                                    placeholder="Summary" rows="3"
                                    value={resourceForm.summary}
                                    onChange={e => setResourceForm({ ...resourceForm, summary: e.target.value })}
                                />
                                <button type="submit" className="submit-resource-btn" disabled={actionLoading}>
                                    {actionLoading ? 'Saving...' : (editingId ? 'Update Resource' : 'Upload Resource')}
                                </button>
                            </form>

                            {/* Resources Table */}
                            <div className="admin-table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Type</th>
                                            <th>Access</th>
                                            <th>File</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resources.map(r => (
                                            <tr key={r.id}>
                                                <td>{r.title}</td>
                                                <td><span className="resource-badge">{r.type}</span></td>
                                                <td>{r.access_level}</td>
                                                <td>{r.file_path ? '✅ File' : '🔗 Link'}</td>
                                                <td className="actions-cell">
                                                    <button
                                                        className="action-btn view"
                                                        onClick={() => handleEditResource(r)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="action-btn ban"
                                                        onClick={() => handleDeleteResource(r.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

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
