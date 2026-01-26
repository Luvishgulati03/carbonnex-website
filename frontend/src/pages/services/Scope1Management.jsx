import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import CTAButton from '../../components/CTAButton';
import './ServicePage.css';

const Scope1Management = () => {
    const emissionSources = [
        { source: 'Company Vehicles', percentage: 35, icon: '🚗' },
        { source: 'Manufacturing', percentage: 30, icon: '🏭' },
        { source: 'Heating/Cooling', percentage: 20, icon: '🌡️' },
        { source: 'Fugitive Emissions', percentage: 15, icon: '💨' },
    ];

    const chartData = [
        { name: 'Transport', value: 35 },
        { name: 'Production', value: 30 },
        { name: 'HVAC', value: 20 },
        { name: 'Fugitive', value: 15 },
    ];

    const reductionStrategies = [
        { title: 'Fleet Electrification', desc: 'Transition to electric or hybrid vehicles to reduce transport emissions by up to 70%', impact: 'High' },
        { title: 'Process Optimization', desc: 'Improve manufacturing efficiency and reduce fuel consumption', impact: 'Medium' },
        { title: 'Fuel Switching', desc: 'Replace high-carbon fuels with natural gas or renewable alternatives', impact: 'High' },
        { title: 'Leak Detection & Repair', desc: 'Implement programs to identify and fix fugitive emission sources', impact: 'Medium' },
    ];

    const benefits = [
        { icon: '📊', title: 'Accurate Measurement', desc: 'GHG Protocol-compliant calculations for all direct emission sources' },
        { icon: '🎯', title: 'Targeted Reduction', desc: 'Identify hotspots and prioritize high-impact reduction opportunities' },
        { icon: '📈', title: 'Real-time Tracking', desc: 'Continuous monitoring through our CarbonNex platform' },
        { icon: '✅', title: 'Verification Ready', desc: 'Audit-ready documentation for third-party assurance' },
    ];

    return (
        <div className="servicepage servicepage--scope1">
            {/* Hero */}
            <section className="service-hero service-hero--orange">
                <div className="service-hero__background"></div>
                <div className="container">
                    <motion.div
                        className="service-hero__content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="section-badge section-badge--light">Carbon Management</span>
                        <h1>Scope 1 Emissions Management</h1>
                        <p>Direct emissions from owned or controlled sources including company vehicles, manufacturing processes, and on-site fuel combustion</p>
                    </motion.div>
                </div>
            </section>

            {/* What is Scope 1 */}
            <section className="service-intro section">
                <div className="container">
                    <div className="service-intro__grid">
                        <div className="service-intro__content">
                            <span className="section-badge">Understanding Scope 1</span>
                            <h2>What are Scope 1 Emissions?</h2>
                            <p>
                                Scope 1 emissions are <strong>direct greenhouse gas emissions</strong> that occur from sources
                                owned or controlled by your organization. These are the emissions you have the most
                                control over and can often reduce through operational changes.
                            </p>
                            <p>
                                According to the GHG Protocol, Scope 1 includes emissions from combustion of fuels in
                                owned or controlled boilers, furnaces, and vehicles, as well as emissions from chemical
                                production and processing in owned or controlled equipment.
                            </p>
                            <ul className="service-list">
                                <li>Company-owned vehicles and fleet</li>
                                <li>On-site fuel combustion (boilers, furnaces)</li>
                                <li>Manufacturing and industrial processes</li>
                                <li>Fugitive emissions (refrigerants, gas leaks)</li>
                            </ul>
                        </div>
                        <div className="service-intro__visual">
                            <h4>Typical Scope 1 Breakdown</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={index} fill={['#F97316', '#FB923C', '#FDBA74', '#FED7AA'][index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="chart-legend">
                                {chartData.map((item, i) => (
                                    <span key={i} className="legend-item">
                                        <span className="legend-dot" style={{ background: ['#F97316', '#FB923C', '#FDBA74', '#FED7AA'][i] }}></span>
                                        {item.name}: {item.value}%
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emission Sources */}
            <section className="emission-sources section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">Emission Sources</span>
                        <h2>Common Scope 1 Sources</h2>
                        <p>Identify and measure emissions from all direct sources</p>
                    </div>

                    <div className="sources-grid">
                        {emissionSources.map((source, index) => (
                            <motion.div
                                key={index}
                                className="source-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="source-card__icon">{source.icon}</span>
                                <h3>{source.source}</h3>
                                <div className="source-card__bar">
                                    <div className="source-card__fill" style={{ width: `${source.percentage}%` }}></div>
                                </div>
                                <span className="source-card__percentage">{source.percentage}% of typical Scope 1</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Help */}
            <section className="service-benefits section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">Our Approach</span>
                        <h2>How We Help Manage Scope 1</h2>
                    </div>

                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="benefit-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="benefit-card__icon">{benefit.icon}</span>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reduction Strategies */}
            <section className="reduction-strategies section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">Decarbonization</span>
                        <h2>Reduction Strategies</h2>
                        <p>Proven approaches to reduce your Scope 1 emissions</p>
                    </div>

                    <div className="strategies-list">
                        {reductionStrategies.map((strategy, index) => (
                            <motion.div
                                key={index}
                                className="strategy-item"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="strategy-item__num">{index + 1}</div>
                                <div className="strategy-item__content">
                                    <h3>{strategy.title}</h3>
                                    <p>{strategy.desc}</p>
                                </div>
                                <span className={`strategy-item__impact strategy-item__impact--${strategy.impact.toLowerCase()}`}>
                                    {strategy.impact} Impact
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="service-cta-section section">
                <div className="service-cta-section__background"></div>
                <div className="container">
                    <div className="service-cta-section__content">
                        <h2>Ready to Manage Your Scope 1 Emissions?</h2>
                        <p>Get started with a comprehensive emissions assessment today</p>
                        <div className="service-cta-section__buttons">
                            <CTAButton href="/contact" size="large">Get Started</CTAButton>
                            <CTAButton href="/services/scope-2" variant="outline" size="large">Explore Scope 2 →</CTAButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Scope1Management;
