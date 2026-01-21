import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CTAButton from '../components/CTAButton';
import './AboutPage.css';

const AboutPage = () => {
    const { t } = useTranslation();

    const leadership = t('about.team.items', { returnObjects: true });
    const certifications = t('about.certifications.items', { returnObjects: true });
    const whyChooseUs = t('about.why_choose_us.items', { returnObjects: true });
    const servicesOverview = t('about.what_we_do.items', { returnObjects: true });

    // Mission & Vision Lists
    const missionList = t('about.mission.list', { returnObjects: true });
    const visionList = t('about.vision.list', { returnObjects: true });

    return (
        <div className="aboutpage">
            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero__background"></div>
                <div className="container">
                    <motion.div
                        className="about-hero__content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="section-badge section-badge--light">{t('about.hero.badge')}</span>
                        <h1><span dangerouslySetInnerHTML={{ __html: t('about.hero.title') }}></span></h1>
                        <p>{t('about.hero.desc')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="about-mission section" style={{ paddingTop: '4rem' }}>
                <div className="container">
                    <div className="mission-grid">
                        <motion.div
                            className="mission-card mission-card--primary"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="mission-card__icon">🎯</div>
                            <h2>{t('about.mission.title')}</h2>
                            <p>{t('about.mission.desc')}</p>
                            <ul className="mission-list">
                                {missionList.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="mission-card"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="mission-card__icon">🌍</div>
                            <h2>{t('about.vision.title')}</h2>
                            <p>{t('about.vision.desc')}</p>
                            <ul className="mission-list">
                                {visionList.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="about-story section">
                <div className="container">
                    <div className="mission-grid">
                        <motion.div
                            className="story-content"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            style={{ gridColumn: '1 / -1', background: 'rgba(255, 255, 255, 0.03)', padding: '3rem', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                        >
                            <div className="section-header">
                                <span className="section-badge">{t('about.story.badge')}</span>
                                <h2>{t('about.story.title')}</h2>
                            </div>
                            <div className="story-text" style={{ color: '#E5E7EB', lineHeight: '1.7', fontSize: '1.1rem' }}>
                                <p style={{ marginBottom: '1.5rem' }}>{t('about.story.p1')}</p>
                                <p style={{ marginBottom: '1.5rem' }}>{t('about.story.p2')}</p>
                                <p>{t('about.story.p3')}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="about-services section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('about.what_we_do.badge')}</span>
                        <h2>{t('about.what_we_do.title')}</h2>
                        <p>{t('about.what_we_do.subtitle')}</p>
                    </div>

                    <div className="services-overview">
                        {servicesOverview.map((item, index) => (
                            <div className="services-overview__item" key={index}>
                                <div className="services-overview__icon" style={{ background: index === 0 ? '#F9731620' : index === 1 ? '#10B98120' : index === 2 ? '#3B82F620' : '#A855F720', color: index === 0 ? '#F97316' : index === 1 ? '#10B981' : index === 2 ? '#3B82F6' : '#A855F7' }}>
                                    {index === 0 ? '🏭' : index === 1 ? '📊' : index === 2 ? '🎯' : '🔗'}
                                </div>
                                <div className="services-overview__content">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="about-why section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('about.why_choose_us.badge')}</span>
                        <h2>{t('about.why_choose_us.title')}</h2>
                        <p>{t('about.why_choose_us.subtitle')}</p>
                    </div>

                    <div className="why-grid">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                className="why-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <span className="why-card__icon">{item.icon}</span>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="about-team section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('about.team.badge')}</span>
                        <h2>{t('about.team.title')}</h2>
                        <p>{t('about.team.subtitle')}</p>
                    </div>

                    <div className="team-grid">
                        {leadership.map((member, index) => (
                            <motion.div
                                key={index}
                                className="team-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="team-card__avatar">{member.image}</div>
                                <h3>{member.name}</h3>
                                <span className="team-card__role">{member.role}</span>
                                <span className="team-card__expertise">{member.expertise}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="about-certs section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('about.certifications.badge')}</span>
                        <h2>{t('about.certifications.title')}</h2>
                    </div>

                    <div className="certs-grid">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="cert-badge"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <span className="cert-icon">✓</span>
                                {cert}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta section">
                <div className="about-cta__background"></div>
                <div className="container">
                    <div className="about-cta__content">
                        <h2>{t('about.cta.title')}</h2>
                        <p>{t('about.cta.subtitle')}</p>
                        <div className="about-cta__buttons">
                            <CTAButton href="/contact" size="large">{t('about.cta.primary')}</CTAButton>
                            <CTAButton href="/services/esg-advisory" variant="outline" size="large">{t('about.cta.secondary')}</CTAButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default AboutPage;
