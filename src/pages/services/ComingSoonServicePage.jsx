import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from '../../components/CTAButton';
import './ServicePage.css';

const ComingSoonServicePage = ({ title, subtitle, features, phase }) => {
    return (
        <div className="service-page">
            <section className="service-hero" style={{ background: 'linear-gradient(135deg, #374151 0%, #1F293B 100%)' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="section-badge section-badge--light">Roadmap: {phase}</span>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </motion.div>
                </div>
            </section>

            <section className="service-section">
                <div className="container">
                    <div className="roadmap-banner">
                        <span className="roadmap-badge">Coming Soon</span>
                        <h2>Visualizing the Future of {title}</h2>
                        <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                            We are currently building this module to support your advanced sustainability needs.
                            Here is what you can expect when it launches.
                        </p>

                        <div className="feature-list" style={{ textAlign: 'left' }}>
                            {features.map((feature, index) => (
                                <div key={index} className="feature-item" style={{ opacity: 0.8 }}>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '3rem' }}>
                            <CTAButton href="/contact" variant="outline">Join the Waitlist</CTAButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ComingSoonServicePage;
