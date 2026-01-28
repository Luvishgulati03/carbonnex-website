import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import './ServicesHubPage.css';

const ServicesHubPage = () => {
    const { t } = useTranslation();
    const [showLockedModal, setShowLockedModal] = useState(false);
    const [lockedServiceName, setLockedServiceName] = useState('');

    const handleLockedClick = (serviceName) => {
        setLockedServiceName(serviceName);
        setShowLockedModal(true);
    };

    const LockIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" style={{ marginRight: '8px' }}>
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
    );

    const coreServices = [
        'carbon_accounting',
        'esg_data',
        'compliance',
        'evidence',
        'ai_validation',
        'insights'
    ].map(id => {
        const features = t(`services_hub.items.${id}.features`, { returnObjects: true });
        return {
            id,
            title: t(`service_pages.${id}.title`),
            desc: t(`services_hub.items.${id}.desc`),
            icon: t(`services_hub.items.${id}.icon`),
            link: `/services/${id.replace('_', '-')}`,
            features: Array.isArray(features) ? features : []
        };
    });

    const futureServices = [
        'carbon_credits',
        'blockchain',
        'integrations',
        'decarbonization',
        'voluntary_frameworks',
        'supply_chain'
    ].map(id => ({
        id,
        title: t(`service_pages.${id}.title`),
        desc: t(`services_hub.items.${id}.desc`),
        icon: t(`services_hub.items.${id}.icon`),
        link: `/services/${id.replace('_', '-')}`,
        isLocked: true
    }));

    return (
        <div className="services-hub">
            {/* Hero */}
            <section className="services-hub__hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="section-badge section-badge--light">{t('services_hub.hero.badge')}</span>
                        <h1>{t('services_hub.hero.title')}</h1>
                        <p>{t('services_hub.hero.desc')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Core Services */}
            <section className="services-hub__core section">
                <div className="container">
                    <div className="section-header">
                        <h2>{t('services_hub.core.title')}</h2>
                        <p>{t('services_hub.core.subtitle')}</p>
                    </div>

                    <div className="services-grid services-grid--core">
                        {coreServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className="service-card-hub"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <ul className="service-features">
                                    {service.features.map((f, i) => (
                                        <li key={i}>✓ {f}</li>
                                    ))}
                                </ul>
                                <Link to={service.link} className="service-btn">
                                    {t('services_hub.common.explore')} →
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Future/Roadmap Services */}
            <section className="services-hub__future section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('services_hub.future.badge')}</span>
                        <h2>{t('services_hub.future.title')}</h2>
                        <p>{t('services_hub.future.subtitle')}</p>
                    </div>

                    <div className="services-grid services-grid--future">
                        {futureServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className="service-card-hub service-card-hub--future service-card-hub--locked"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => handleLockedClick(service.title)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="coming-soon-badge">
                                    <LockIcon />
                                    {t('service_pages.common.coming_soon')}
                                </div>
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <span className="service-link-muted">
                                    {t('services_hub.common.learn_more')}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section section">
                <div className="container text-center">
                    <h2>{t('services_hub.cta.title')}</h2>
                    <p>{t('services_hub.cta.subtitle')}</p>
                    <div style={{ marginTop: '2rem' }}>
                        <CTAButton href="/contact" size="large">{t('services_hub.cta.button')}</CTAButton>
                    </div>
                </div>
            </section>

            {/* Locked Service Modal */}
            <AnimatePresence>
                {showLockedModal && (
                    <motion.div
                        className="locked-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowLockedModal(false)}
                    >
                        <motion.div
                            className="locked-modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="locked-modal__close" onClick={() => setShowLockedModal(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="locked-modal__icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="#F59E0B">
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                </svg>
                            </div>
                            <h3 className="locked-modal__title">Coming Soon!</h3>
                            <p className="locked-modal__service">{lockedServiceName}</p>
                            <p className="locked-modal__message">
                                This service will be introduced in the near future. Till then, you can explore our Resources or FAQ section to gain more insight on these services.
                            </p>
                            <div className="locked-modal__actions">
                                <Link
                                    to="/resources"
                                    className="locked-modal__btn locked-modal__btn--primary"
                                    onClick={() => setShowLockedModal(false)}
                                >
                                    Explore Resources
                                </Link>
                                <Link
                                    to="/resources#community-faq"
                                    className="locked-modal__btn locked-modal__btn--secondary"
                                    onClick={() => setShowLockedModal(false)}
                                >
                                    View FAQ
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServicesHubPage;
