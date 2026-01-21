import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CTAButton from '../../components/CTAButton';
import './ServicePage.css';

const Scope2Management = () => {
    const energySources = [
        { source: 'Grid Electricity', percentage: 60, icon: '⚡' },
        { source: 'Steam Purchase', percentage: 20, icon: '💨' },
        { source: 'Heating', percentage: 12, icon: '🔥' },
        { source: 'Cooling', percentage: 8, icon: '❄️' },
    ];

    const chartData = [
        { name: 'Grid Power', value: 60 },
        { name: 'Steam', value: 20 },
        { name: 'Heating', value: 12 },
        { name: 'Cooling', value: 8 },
    ];

    const reductionStrategies = [
        { title: 'Renewable Energy Procurement', desc: 'Purchase renewable energy certificates (RECs) or enter power purchase agreements (PPAs)', impact: 'High' },
        { title: 'On-site Solar/Wind', desc: 'Install solar panels or wind turbines to generate clean energy on-site', impact: 'High' },
        { title: 'Energy Efficiency', desc: 'Upgrade to LED lighting, efficient HVAC, and smart building management', impact: 'Medium' },
        { title: 'Grid Decarbonization', desc: 'Advocate for and support grid-level renewable energy investments', impact: 'Medium' },
    ];

    const accountingMethods = [
        { method: 'Location-Based', desc: 'Uses average grid emission factors based on your geographic location' },
        { method: 'Market-Based', desc: 'Reflects contractual instruments like RECs and PPAs for purchased energy' },
    ];

    return (
        <div className="servicepage servicepage--scope2">
            <section className="service-hero service-hero--blue">
                <div className="service-hero__background"></div>
                <div className="container">
                    <motion.div className="service-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="section-badge section-badge--light">Carbon Management</span>
                        <h1>Scope 2 Emissions Management</h1>
                        <p>Indirect emissions from purchased electricity, steam, heating, and cooling consumed by your organization</p>
                    </motion.div>
                </div>
            </section>

            <section className="service-intro section">
                <div className="container">
                    <div className="service-intro__grid">
                        <div className="service-intro__content">
                            <span className="section-badge">Understanding Scope 2</span>
                            <h2>What are Scope 2 Emissions?</h2>
                            <p>Scope 2 emissions are <strong>indirect greenhouse gas emissions</strong> from the generation of purchased energy consumed by your organization. While these emissions occur at the power plant, they are a result of your energy consumption choices.</p>
                            <p>These emissions are often the easiest to reduce through strategic energy management, renewable energy procurement, and efficiency improvements.</p>
                            <ul className="service-list">
                                <li>Purchased electricity consumption</li>
                                <li>Purchased steam and heating</li>
                                <li>Purchased cooling and chilled water</li>
                                <li>District energy systems</li>
                            </ul>
                        </div>
                        <div className="service-intro__visual">
                            <h4>Typical Scope 2 Sources</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={5} dataKey="value">
                                        {chartData.map((entry, index) => (
                                            <Cell key={index} fill={['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'][index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="chart-legend">
                                {chartData.map((item, i) => (
                                    <span key={i} className="legend-item">
                                        <span className="legend-dot" style={{ background: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'][i] }}></span>
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
                        <span className="section-badge">Accounting Methods</span>
                        <h2>Two Approaches to Scope 2</h2>
                        <p>GHG Protocol provides two methods for calculating Scope 2 emissions</p>
                    </div>
                    <div className="sources-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        {accountingMethods.map((method, index) => (
                            <motion.div key={index} className="source-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3>{method.method}</h3>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)', marginTop: 'var(--spacing-3)' }}>{method.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="reduction-strategies section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">Decarbonization</span>
                        <h2>Reduction Strategies</h2>
                    </div>
                    <div className="strategies-list">
                        {reductionStrategies.map((strategy, index) => (
                            <motion.div key={index} className="strategy-item" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                <div className="strategy-item__num">{index + 1}</div>
                                <div className="strategy-item__content">
                                    <h3>{strategy.title}</h3>
                                    <p>{strategy.desc}</p>
                                </div>
                                <span className={`strategy-item__impact strategy-item__impact--${strategy.impact.toLowerCase()}`}>{strategy.impact} Impact</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="service-cta-section section">
                <div className="service-cta-section__background"></div>
                <div className="container">
                    <div className="service-cta-section__content">
                        <h2>Optimize Your Energy Emissions</h2>
                        <p>Start your energy transition with expert guidance</p>
                        <div className="service-cta-section__buttons">
                            <CTAButton href="/contact" size="large">Get Started</CTAButton>
                            <CTAButton href="/services/scope-3" variant="outline" size="large">Explore Scope 3 →</CTAButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Scope2Management;
