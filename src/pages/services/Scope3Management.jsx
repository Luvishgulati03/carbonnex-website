import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CTAButton from '../../components/CTAButton';
import './ServicePage.css';

const Scope3Management = () => {
    const categories = [
        { name: 'Purchased Goods', percentage: 30, icon: '📦' },
        { name: 'Transportation', percentage: 25, icon: '🚛' },
        { name: 'Business Travel', percentage: 15, icon: '✈️' },
        { name: 'Employee Commuting', percentage: 10, icon: '🚗' },
        { name: 'Waste', percentage: 8, icon: '🗑️' },
        { name: 'Other', percentage: 12, icon: '📊' },
    ];

    const chartData = [
        { name: 'Purchased Goods', value: 30 },
        { name: 'Transport & Logistics', value: 25 },
        { name: 'Business Travel', value: 15 },
        { name: 'Commuting', value: 10 },
        { name: 'Waste & Other', value: 20 },
    ];

    const scope3Categories = [
        { num: 1, name: 'Purchased Goods & Services', upstream: true },
        { num: 2, name: 'Capital Goods', upstream: true },
        { num: 3, name: 'Fuel & Energy Activities', upstream: true },
        { num: 4, name: 'Upstream Transportation', upstream: true },
        { num: 5, name: 'Waste in Operations', upstream: true },
        { num: 6, name: 'Business Travel', upstream: true },
        { num: 7, name: 'Employee Commuting', upstream: true },
        { num: 8, name: 'Upstream Leased Assets', upstream: true },
        { num: 9, name: 'Downstream Transportation', upstream: false },
        { num: 10, name: 'Processing of Sold Products', upstream: false },
        { num: 11, name: 'Use of Sold Products', upstream: false },
        { num: 12, name: 'End-of-Life Treatment', upstream: false },
    ];

    const benefits = [
        { icon: '🗺️', title: 'Hotspot Mapping', desc: 'Identify the biggest emission sources in your value chain' },
        { icon: '🤝', title: 'Supplier Engagement', desc: 'Tools and programs to collaborate with suppliers on reduction' },
        { icon: '📈', title: 'Data Quality Scoring', desc: 'Improve accuracy from spend-based to supplier-specific data' },
        { icon: '🎯', title: 'Science-Based Targets', desc: 'Set and track SBTi-aligned Scope 3 reduction goals' },
    ];

    return (
        <div className="servicepage servicepage--scope3">
            <section className="service-hero service-hero--purple">
                <div className="service-hero__background"></div>
                <div className="container">
                    <motion.div className="service-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="section-badge section-badge--light">Carbon Management</span>
                        <h1>Scope 3 Emissions Management</h1>
                        <p>Indirect emissions across your entire value chain — typically 70-90% of your total carbon footprint</p>
                    </motion.div>
                </div>
            </section>

            <section className="service-intro section">
                <div className="container">
                    <div className="service-intro__grid">
                        <div className="service-intro__content">
                            <span className="section-badge">Understanding Scope 3</span>
                            <h2>What are Scope 3 Emissions?</h2>
                            <p>Scope 3 emissions are all <strong>indirect emissions in your value chain</strong> that are not included in Scope 2. These typically represent the largest portion of a company's carbon footprint — often 70-90% of total emissions.</p>
                            <p>While harder to measure and control, addressing Scope 3 is essential for comprehensive climate action and increasingly required by investors and regulations.</p>
                            <ul className="service-list">
                                <li>Purchased goods and services</li>
                                <li>Transportation and distribution</li>
                                <li>Business travel and employee commuting</li>
                                <li>Use and end-of-life of sold products</li>
                            </ul>
                        </div>
                        <div className="service-intro__visual">
                            <h4>Typical Scope 3 Breakdown</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={5} dataKey="value">
                                        {chartData.map((entry, index) => (
                                            <Cell key={index} fill={['#A855F7', '#C084FC', '#D8B4FE', '#E9D5FF', '#F3E8FF'][index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="chart-legend">
                                {chartData.map((item, i) => (
                                    <span key={i} className="legend-item">
                                        <span className="legend-dot" style={{ background: ['#A855F7', '#C084FC', '#D8B4FE', '#E9D5FF', '#F3E8FF'][i] }}></span>
                                        {item.name}: {item.value}%
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="emission-sources section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">GHG Protocol</span>
                        <h2>15 Categories of Scope 3</h2>
                        <p>The GHG Protocol defines 15 categories split between upstream and downstream activities</p>
                    </div>
                    <div className="sources-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                        {scope3Categories.slice(0, 8).map((cat, index) => (
                            <motion.div key={index} className="source-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                                <span className="source-card__icon" style={{ fontSize: '24px', background: '#A855F720', padding: '8px', borderRadius: '8px' }}>Cat {cat.num}</span>
                                <h3 style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--spacing-3)' }}>{cat.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="service-benefits section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">Our Approach</span>
                        <h2>How We Help with Scope 3</h2>
                    </div>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <motion.div key={index} className="benefit-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                                <span className="benefit-card__icon">{benefit.icon}</span>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="service-cta-section section">
                <div className="service-cta-section__background"></div>
                <div className="container">
                    <div className="service-cta-section__content">
                        <h2>Master Your Supply Chain Emissions</h2>
                        <p>Get complete visibility into your value chain carbon footprint</p>
                        <div className="service-cta-section__buttons">
                            <CTAButton href="/contact" size="large">Get Started</CTAButton>
                            <CTAButton href="/services/esg-advisory" variant="outline" size="large">ESG Advisory →</CTAButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Scope3Management;
