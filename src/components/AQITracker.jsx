import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AQITracker.css';

const AQITracker = () => {
    const [aqiData, setAqiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAQI = async () => {
            try {
                // Using Open-Meteo Air Quality API (Free, no key required)
                // Coordinates for Delhi: 28.6139° N, 77.2090° E
                const response = await fetch(
                    'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=28.6139&longitude=77.2090&current=us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide&timezone=Asia%2FKolkata'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch AQI data');
                }

                const data = await response.json();
                setAqiData(data.current);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching AQI:", err);
                setError("Unable to load real-time data");
                setLoading(false);
            }
        };

        fetchAQI();
    }, []);

    const getAQIStatus = (aqi) => {
        if (aqi <= 50) return { label: 'Good', color: '#10B981', desc: 'Air quality is considered satisfactory.' };
        if (aqi <= 100) return { label: 'Moderate', color: '#F59E0B', desc: 'Air quality is acceptable.' };
        if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', color: '#F97316', desc: 'Members of sensitive groups may experience health effects.' };
        if (aqi <= 200) return { label: 'Unhealthy', color: '#EF4444', desc: 'Everyone may begin to experience health effects.' };
        if (aqi <= 300) return { label: 'Very Unhealthy', color: '#DC2626', desc: 'Health warnings of emergency conditions.' };
        return { label: 'Hazardous', color: '#7F1D1D', desc: 'Health alert: everyone may experience more serious health effects.' };
    };

    if (loading) return (
        <div className="aqi-tracker section">
            <div className="container">
                <div className="aqi-loading">Loading real-time air quality data for Delhi...</div>
            </div>
        </div>
    );

    if (error) return null; // Hide if error, or show fallback

    const status = getAQIStatus(aqiData.us_aqi);

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
                            <span className="location-badge">
                                <span className="pulsing-dot"></span>
                                Live Delhi Air Quality
                            </span>
                            <h3>Environmental Impact</h3>
                        </div>

                        <div className="aqi-main-display">
                            <div className="aqi-circle" style={{ borderColor: status.color, color: status.color }}>
                                <span className="aqi-value">{aqiData.us_aqi}</span>
                                <span className="aqi-label">US AQI</span>
                            </div>
                            <div className="aqi-info">
                                <h4 style={{ color: status.color }}>{status.label}</h4>
                                <p>{status.desc}</p>
                            </div>
                        </div>

                        <div className="aqi-pollutants">
                            <div className="pollutant-item">
                                <span className="p-label">PM2.5</span>
                                <span className="p-value">{aqiData.pm2_5} µg/m³</span>
                            </div>
                            <div className="pollutant-item">
                                <span className="p-label">PM10</span>
                                <span className="p-value">{aqiData.pm10} µg/m³</span>
                            </div>
                            <div className="pollutant-item">
                                <span className="p-label">NO₂</span>
                                <span className="p-value">{aqiData.nitrogen_dioxide} µg/m³</span>
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
                        <h3>Why This Matters?</h3>
                        <p>
                            High AQI levels in cities like Delhi are directly linked to industrial emissions,
                            vehicular pollution, and agricultural burning.
                        </p>
                        <p>
                            <strong>How CarbonNex Helps:</strong> By helping organizations track and reduce their
                            Scope 1, 2, and 3 emissions, we directly contribute to lowering the concentration
                            of harmful pollutants. Our BRSR compliance tools ensure companies stay accountable
                            for their environmental footprint.
                        </p>

                        <div className="aqi-cta-box">
                            <span>Ready to reduce your contribution to these numbers?</span>
                            <a href="/contact" className="text-link">Start Emission Tracking →</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AQITracker;
