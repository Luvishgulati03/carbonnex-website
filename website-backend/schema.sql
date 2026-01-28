-- Create Database
CREATE DATABASE IF NOT EXISTS carbonnex_resources;
USE carbonnex_resources;

-- Users (With Auth Support)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    is_banned BOOLEAN DEFAULT FALSE,
    reset_token VARCHAR(255),
    reset_token_expires DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories (e.g., 'General', 'Technical', 'Compliance')
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT,
    title VARCHAR(255) NOT NULL,
    details TEXT,
    status ENUM('open', 'closed', 'answered') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Answers
CREATE TABLE IF NOT EXISTS answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    is_official BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed Initial Categories
INSERT IGNORE INTO categories (name, slug, description) VALUES 
('General', 'general', 'General inquiries about CarbonNex services'), 
('Technical', 'technical', 'Platform usage and technical integration'), 
('Compliance', 'compliance', 'ESG reporting standards and regulations');

-- Articles (Knowledge Base)
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    source_url VARCHAR(512) NOT NULL,
    image_url VARCHAR(512),
    category_slug VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Articles
INSERT IGNORE INTO articles (title, summary, source_url, image_url, category_slug) VALUES 
('Carbon Accounting 101: The Essentials', 'A comprehensive guide to understanding the basics of carbon accounting, including Scopes 1, 2, and 3, and why it matters for modern businesses.', 'https://greenly.earth/en-us/blog/company-guide/carbon-accounting-explained', 'https://images.unsplash.com/photo-1662185206263-c7e6c1df3d35?auto=format&fit=crop&q=80&w=600', 'technical'),

('Why ESG is Essential for Business Success', 'Discover how a strong ESG strategy not only helps the planet but also drives financial performance, risk management, and investor confidence.', 'https://www.forbes.com/sites/forbesbusinesscouncil/2021/08/12/five-reasons-why-esg-is-essential-for-business-success/', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600', 'compliance'),

('The Ultimate Guide to Reducing Carbon Emissions', 'Practical steps and strategies for businesses to lower their carbon footprint, from energy efficiency to supply chain engagement.', 'https://normative.io/insight/business-guide-to-net-zero/', 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5d71?auto=format&fit=crop&q=80&w=600', 'compliance'),

('Understanding Scope 1, 2, and 3 Emissions', 'A deep dive into the three scopes of emissions defined by the GHG Protocol and how to properly classify and measure them.', 'https://www.climatiq.io/blog/measure-greenhouse-gas-emissions-scope-1-2-3', 'https://images.unsplash.com/photo-1569163139599-0f4517e36b31?auto=format&fit=crop&q=80&w=600', 'technical'),

('The Business Case for Sustainability', 'Analysis of how sustainability initiatives drive innovation, operational efficiency, and long-term value creation.', 'https://www.ibm.com/thought-leadership/institute-business-value/en-us/report/sustainability-business-case', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', 'general'),

('ESG Regulation Landscape 2025', 'An overview of the evolving regulatory landscape for ESG reporting, including CSRD, SEC rules, and global standards.', 'https://kpmg.com/xx/en/home/insights/2024/01/esg-regulation-outlook-2024.html', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600', 'compliance');
