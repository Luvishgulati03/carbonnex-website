import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AQITracker.css'; // Reusing the CSS for layout, but we might rename it later

const GlobalEmissionsTracker = () => {
    // Mock Data based on global averages (Source: IEA/IPCC estimates for 2024-2025)
    // Values in Billion Tonnes CO2e
    const [emissionData] = useState([
        { industry: 'Energy Systems', value: 14.2, trend: '+1.2%', color: '#EF4444' }, // Red
        { industry: 'Transport', value: 8.4, trend: '+2.5%', color: '#F97316' },     // Orange
        { industry: 'Manufacturing', value: 6.3, trend: '-0.5%', color: '#F59E0B' },  // Amber
        { industry: 'Agriculture', value: 5.8, trend: '+0.8%', color: '#10B981' },   // Green (ironic, but sticking to palette)
        { industry: 'Buildings', value: 3.1, trend: '-1.1%', color: '#3B82F6' },     // Blue
    ]);

    const totalEmissions = emissionData.reduce((acc, item) => acc + item.value, 0).toFixed(1);

    return (
        <section className="aqi-tracker section">
            <div className="container">
                <div className="aqi-grid">
                    <motion.div
                        className="aqi-card"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="aqi-header">
                            <span className="location-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                <span className="pulsing-dot" style={{ background: '#60A5FA' }}></span>
                                Global CO₂ Emissions (2025 Est.)
                            </span>
                            <h3 style={{ color: '#FFFFFF' }}>Global Industry Impact</h3>
                        </div>

                        <div className="aqi-main-display" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                            <div className="total-emissions">
                                <span className="aqi-value" style={{ fontSize: '3.5rem', color: '#E5E7EB' }}>{totalEmissions}</span>
                                <span className="aqi-label" style={{ marginLeft: '1rem', fontSize: '1.1rem' }}>Gt CO₂e / Year</span>
                            </div>

                            <div className="industry-list" style={{ width: '100%', marginTop: '1rem' }}>
                                {emissionData.map((item, index) => (
                                    <div key={index} className="pollutant-item" style={{ marginBottom: '0.8rem', padding: '0.8rem', background: 'rgba(255,255,255,0.03)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                            <span className="p-label" style={{ color: '#D1D5DB', fontSize: '1rem' }}>{item.industry}</span>
                                            <div style={{ textAlign: 'right' }}>
                                                <span className="p-value" style={{ display: 'block', fontSize: '1.1rem' }}>{item.value} Gt</span>
                                                <span style={{ fontSize: '0.8rem', color: item.trend.startsWith('+') ? '#EF4444' : '#10B981' }}>
                                                    {item.trend} YoY
                                                </span>
                                            </div>
                                        </div>
                                        {/* Simple Progress Bar */}
                                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '0.5rem', borderRadius: '2px' }}>
                                            <div style={{ width: `${(item.value / 15) * 100}%`, height: '100%', background: item.color, borderRadius: '2px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="aqi-context"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Global Carbon Footprint</h3>
                        <p>
                            Industrial emissions remain the largest contributor to global warming.
                            While the energy sector leads in total status, transport and manufacturing are critical areas for decarbonization.
                        </p>
                        <p>
                            <strong>The CarbonNex Advantage:</strong> We provide industry-specific solutions tailored to these high-impact sectors.
                            Whether it's optimizing energy systems or supply chain decarbonization for manufacturing, our platform
                            turns data into actionable reduction strategies.
                        </p>

                        <div className="aqi-cta-box">
                            <span>Is your industry on this list?</span>
                            <a href="/services" className="text-link">See How We Can Help →</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GlobalEmissionsTracker;
