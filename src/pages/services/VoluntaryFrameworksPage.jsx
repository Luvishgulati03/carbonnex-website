import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedBackground from '../../components/AnimatedBackground';
import CTAButton from '../../components/CTAButton';
import './ServicePage.css';

const VoluntaryFrameworksPage = () => {
    const { t } = useTranslation();
    const features = t('service_pages.voluntary_frameworks.features', { returnObjects: true });
    const valueItems = t('service_pages.voluntary_frameworks.value_items', { returnObjects: true });

    return (
        <div className="service-page">
            <section className="service-hero" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}>
                <div className="service-hero__background">
                    <AnimatedBackground variant="grid" intensity="low" />
                </div>
                <div className="container">
                    <motion.div
                        className="service-hero__content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="service-badge" style={{ background: '#374151', color: '#E5E7EB' }}>
                            {t('service_pages.common.coming_soon')}
                        </span>
                        <h1>{t('service_pages.voluntary_frameworks.title')}</h1>
                        <p>{t('service_pages.voluntary_frameworks.hero_desc')}</p>
                        <CTAButton href="/contact" variant="outline" size="large">
                            {t('service_pages.common.join_waitlist')}
                        </CTAButton>
                    </motion.div>
                </div>
            </section>

            <section className="service-section">
                <div className="container">
                    <h2>{t('service_pages.common.future_capabilities')}</h2>
                    <div className="feature-list">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-item"
                                style={{ opacity: 0.8 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 0.8, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="roadmap-banner">
                        <h3>{t('service_pages.common.value_to_customer')}</h3>
                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                            {valueItems.map((item, index) => (
                                <div key={index} className="value-item"><strong>{item.strong}</strong><br />{item.text}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VoluntaryFrameworksPage;
