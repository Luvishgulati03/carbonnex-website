import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('adminToken') || sessionStorage.getItem('userToken');
        if (storedToken) {
            validateToken(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const validateToken = async (storedToken) => {
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${storedToken}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                setToken(storedToken);
            } else {
                // Token invalid, clear storage
                localStorage.removeItem('adminToken');
                sessionStorage.removeItem('userToken');
            }
        } catch (err) {
            console.error('Token validation failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Login failed');
        }

        setUser(data.user);
        setToken(data.token);

        // Admin: persist in localStorage; User: session only
        if (data.user.role === 'admin') {
            localStorage.setItem('adminToken', data.token);
        } else {
            sessionStorage.setItem('userToken', data.token);
        }

        return data;
    };

    const register = async (email, name, password) => {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        setUser(data.user);
        setToken(data.token);
        sessionStorage.setItem('userToken', data.token);

        return data;
    };

    const forgotPassword = async (email) => {
        const res = await fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Request failed');
        }

        return data;
    };

    const resetPassword = async (token, newPassword) => {
        const res = await fetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Reset failed');
        }

        return data;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('adminToken');
        sessionStorage.removeItem('userToken');
    };

    const isAdmin = user?.role === 'admin';
    const isLoggedIn = !!user;

    const value = {
        user,
        token,
        loading,
        isLoggedIn,
        isAdmin,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
