-- Migration: Add RBAC columns to users table
-- Run this in MySQL Workbench or phpMyAdmin

USE carbonnex_resources;

-- Add password_hash column
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255) AFTER name;

-- Add role column
ALTER TABLE users ADD COLUMN IF NOT EXISTS role ENUM('user', 'admin') DEFAULT 'user' AFTER password_hash;

-- Add is_banned column
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE AFTER role;

-- Add reset_token columns for password reset
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token VARCHAR(255) AFTER is_banned;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expires DATETIME AFTER reset_token;

-- Make name required (may need to update existing null names first)
UPDATE users SET name = 'Guest' WHERE name IS NULL OR name = '';
ALTER TABLE users MODIFY COLUMN name VARCHAR(255) NOT NULL;

-- Verify changes
DESCRIBE users;
