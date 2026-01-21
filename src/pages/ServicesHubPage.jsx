import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import './ServicesHubPage.css';

const ServicesHubPage = () => {
    const { t } = useTranslation();

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
        link: `/services/${id.replace('_', '-')}`
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
                                className="service-card-hub service-card-hub--future"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="coming-soon-badge">{t('service_pages.common.coming_soon')}</div>
                                <div className="service-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                                <Link to={service.link} className="service-link-muted">
                                    {t('services_hub.common.learn_more')}
                                </Link>
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
        </div>
    );
};

export default ServicesHubPage;
