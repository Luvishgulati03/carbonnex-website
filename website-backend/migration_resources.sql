-- Migration: Expand articles table for multiple resource types
-- Run this to allow whitepapers, guides, and downloadable files

USE carbonnex_resources;

-- Add 'type' column to distinguish resource kinds
ALTER TABLE articles ADD COLUMN IF NOT EXISTS type ENUM('article', 'whitepaper', 'guide', 'tool', 'report') DEFAULT 'article' AFTER id;

-- Add 'file_path' for downloadable content (e.g., PDFs)
ALTER TABLE articles ADD COLUMN IF NOT EXISTS file_path VARCHAR(512) AFTER source_url;

-- Add 'access_level' to gate content
ALTER TABLE articles ADD COLUMN IF NOT EXISTS access_level ENUM('public', 'registered') DEFAULT 'public' AFTER file_path;

-- Add 'download_count' for analytics
ALTER TABLE articles ADD COLUMN IF NOT EXISTS download_count INT DEFAULT 0 AFTER access_level;

-- Seed some sample whitepapers/reports
INSERT INTO articles (type, title, summary, source_url, file_path, access_level, category_slug) VALUES
('whitepaper', 'Carbon Accounting Best Practices 2025', 'A definitive technical guide for implementing rigorous carbon accounting standards across Scope 1, 2, and 3 emissions.', 'https://ghgprotocol.org', '/uploads/carbon-accounting-2025.pdf', 'registered', 'technical'),
('report', 'Global ESG Trends Report', 'Annual analysis of global environmental, social, and governance trends affecting major industries.', 'https://example.com/report', '/uploads/esg-trends-2025.pdf', 'public', 'general');

-- Verify
DESCRIBE articles;
SELECT id, title, type, access_level FROM articles;
