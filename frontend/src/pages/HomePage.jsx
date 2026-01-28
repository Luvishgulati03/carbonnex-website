import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, Tooltip, Legend } from 'recharts';
import CTAButton from '../components/CTAButton';
import AnimatedBackground from '../components/AnimatedBackground';
import GlobalEmissionsTracker from '../components/GlobalEmissionsTracker';
import './HomePage.css';

const HomePage = () => {
    const { t } = useTranslation();
    const statsRef = useRef(null);
    const isStatsInView = useInView(statsRef, { once: true });

    const [counters, setCounters] = useState({
        projects: 0,
        emissions: 0,
        clients: 0,
        countries: 0
    });

    // Animated counters
    useEffect(() => {
        if (isStatsInView) {
            const duration = 2000;
            const fps = 60;
            const frames = (duration / 1000) * fps;

            const targets = { projects: 500, emissions: 250000, clients: 150, countries: 25 };

            let frame = 0;
            const interval = setInterval(() => {
                frame++;
                const progress = frame / frames;
                setCounters({
                    projects: Math.floor(targets.projects * progress),
                    emissions: Math.floor(targets.emissions * progress),
                    clients: Math.floor(targets.clients * progress),
                    countries: Math.floor(targets.countries * progress)
                });
                if (frame >= frames) {
                    setCounters(targets);
                    clearInterval(interval);
                }
            }, 1000 / fps);
            return () => clearInterval(interval);
        }
    }, [isStatsInView]);

    // Chart Data - Updated to be more factually accurate
    // Chart Data - Updated to be more factually accurate
    const scopeData = [
        { name: t('home.scope_data.scope1.name'), value: 15, color: '#EA580C', shortDesc: t('home.scope_data.scope1.short_desc'), desc: t('home.scope_data.scope1.desc'), link: '/services/scope-1' },
        { name: t('home.scope_data.scope2.name'), value: 20, color: '#2563EB', shortDesc: t('home.scope_data.scope2.short_desc'), desc: t('home.scope_data.scope2.desc'), link: '/services/scope-2' },
        { name: t('home.scope_data.scope3.name'), value: 65, color: '#7C3AED', shortDesc: t('home.scope_data.scope3.short_desc'), desc: t('home.scope_data.scope3.desc'), link: '/services/scope-3' }
    ];

    const emissionsTrend = [
        { year: '2020', emissions: 100 },
        { year: '2021', emissions: 85 },
        { year: '2022', emissions: 70 },
        { year: '2023', emissions: 55 },
        { year: '2024', emissions: 40 },
    ];

    // Translated sector names
    const sectorData = [
        { sector: t('home.sectors.energy'), value: 35 },
        { sector: t('home.sectors.transport'), value: 25 },
        { sector: t('home.sectors.industry'), value: 20 },
        { sector: t('home.sectors.agriculture'), value: 12 },
        { sector: t('home.sectors.buildings'), value: 8 },
    ];

    const services = [
        { icon: <ScopeIcon type="1" />, title: t('home.services_list.scope1.title'), desc: t('home.services_list.scope1.desc'), color: '#EA580C', link: '/services/scope-1' },
        { icon: <ScopeIcon type="2" />, title: t('home.services_list.scope2.title'), desc: t('home.services_list.scope2.desc'), color: '#2563EB', link: '/services/scope-2' },
        { icon: <ScopeIcon type="3" />, title: t('home.services_list.scope3.title'), desc: t('home.services_list.scope3.desc'), color: '#7C3AED', link: '/services/scope-3' },
        { icon: <ESGIcon />, title: t('home.services_list.esg.title'), desc: t('home.services_list.esg.desc'), color: '#059669', link: '/services/esg-advisory' },
        { icon: <ComplianceIcon />, title: t('home.services_list.compliance.title'), desc: t('home.services_list.compliance.desc'), color: '#059669', link: '/services/compliance', badge: t('home.services_list.compliance.badge') },
        { icon: <AccountingIcon />, title: t('home.services_list.accounting.title'), desc: t('home.services_list.accounting.desc'), color: '#059669', link: '/services/carbon-accounting' },
    ];

    const frameworks = [
        { name: 'GRI', fullName: t('home.frameworks_list.gri') },
        { name: 'TCFD', fullName: t('home.frameworks_list.tcfd') },
        { name: 'SASB', fullName: t('home.frameworks_list.sasb') },
        { name: 'CDP', fullName: t('home.frameworks_list.cdp') },
        { name: 'BRSR', fullName: t('home.frameworks_list.brsr') },
        { name: 'SDG', fullName: t('home.frameworks_list.sdg') },
    ];

    const esgPillars = [
        {
            letter: 'E',
            title: t('home.esg_pillars.env.title'),
            color: '#059669',
            items: t('home.esg_pillars.env.items', { returnObjects: true })
        },
        {
            letter: 'S',
            title: t('home.esg_pillars.social.title'),
            color: '#2563EB',
            items: t('home.esg_pillars.social.items', { returnObjects: true })
        },
        {
            letter: 'G',
            title: t('home.esg_pillars.gov.title'),
            color: '#7C3AED',
            items: t('home.esg_pillars.gov.items', { returnObjects: true })
        }
    ].map(pillar => ({
        ...pillar,
        items: Array.isArray(pillar.items) ? pillar.items : []
    }));

    const processSteps = [
        { num: 1, title: t('home.process_steps.step1.title'), desc: t('home.process_steps.step1.desc') },
        { num: 2, title: t('home.process_steps.step2.title'), desc: t('home.process_steps.step2.desc') },
        { num: 3, title: t('home.process_steps.step3.title'), desc: t('home.process_steps.step3.desc') },
        { num: 4, title: t('home.process_steps.step4.title'), desc: t('home.process_steps.step4.desc') },
        { num: 5, title: t('home.process_steps.step5.title'), desc: t('home.process_steps.step5.desc') },
        { num: 6, title: t('home.process_steps.step6.title'), desc: t('home.process_steps.step6.desc') },
    ];

    const [insights, setInsights] = useState([]);
    const [loadingInsights, setLoadingInsights] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/resources');
                if (res.ok) {
                    const data = await res.json();
                    setInsights(data);
                }
            } catch (err) {
                console.error("Failed to fetch insights", err);
            } finally {
                setLoadingInsights(false);
            }
        };
        fetchInsights();
    }, []);

    const regulations = [
        { region: t('home.regulations_list.eu.region'), regulation: 'CSRD', desc: t('home.regulations_list.eu.desc') },
        { region: t('home.regulations_list.us.region'), regulation: 'SEC Climate Rules', desc: t('home.regulations_list.us.desc') },
        { region: t('home.regulations_list.india.region'), regulation: 'BRSR', desc: t('home.regulations_list.india.desc') },
        { region: t('home.regulations_list.uk.region'), regulation: 'SECR', desc: t('home.regulations_list.uk.desc') },
    ];



    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__background">
                    {/* NATURE VARIANT: Earth & Growing Trees */}
                    <AnimatedBackground variant="nature" intensity="medium" />
                </div>
                <div className="container hero__container">
                    <motion.div
                        className="hero__content"
                    /* Removed entry animation as requested */
                    >
                        <span className="hero__badge">{t('home.hero.badge')}</span>
                        <h1 className="hero__title">
                            {t('home.hero.title')}
                        </h1>
                        <p className="hero__subtitle">
                            {t('home.hero.subtitle')}
                        </p>
                        <div className="hero__ctas">
                            <CTAButton href="/contact" size="large">{t('home.hero.cta_primary')}</CTAButton>
                            <CTAButton href="#services" variant="outline" size="large">{t('home.hero.cta_secondary')}</CTAButton>
                        </div>
                    </motion.div>

                    <motion.div
                        className="hero__visual"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="hero__chart-container">
                            <h4>{t('home.hero.emissions_breakdown')}</h4>
                            <div className="emissions-breakdown">
                                {scopeData.map((item, index) => (
                                    <Link key={index} to={item.link} style={{ textDecoration: 'none', display: 'block' }}>
                                        <motion.div
                                            className="breakdown-item"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + (index * 0.1) }}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                        >
                                            <div className="breakdown-info">
                                                <div className="breakdown-label">
                                                    <span className="scope-name">{item.name}</span>
                                                    <span className="scope-desc-short">{item.shortDesc}</span>
                                                </div>
                                                <span className="scope-value">{item.value}%</span>
                                            </div>
                                            <div className="breakdown-bar-track">
                                                <motion.div
                                                    className="breakdown-bar-fill"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.value}%` }}
                                                    transition={{ duration: 1, delay: 0.8 + (index * 0.1) }}
                                                    style={{ background: item.color }}
                                                />
                                            </div>
                                            <p className="breakdown-tooltip">{item.desc}</p>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Real-time AQI Tracker (Replaces Stats) */}
            {/* Global Emissions Tracker (Replaces Stats) */}
            <GlobalEmissionsTracker />

            {/* Beta Announcement Banner */}
            <section className="beta-banner">
                <div className="container">
                    <div className="beta-banner__content">
                        <div className="beta-banner__text">
                            <span className="beta-banner__badge">{t('home.beta.badge')}</span>
                            <h3>{t('home.beta.title')}</h3>
                            <p>{t('home.beta.desc')}</p>
                        </div>
                        <CTAButton href="/contact" variant="outline">{t('home.beta.cta')}</CTAButton>
                    </div>
                </div>
            </section>

            {/* What is ESG Section - Small Element Background */}
            <section className="esg-intro section" style={{ position: 'relative' }}>
                {/* Particles for small section */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none' }}>
                    <AnimatedBackground variant="particles" intensity="low" />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="section-header text-center">
                        <span className="section-badge">{t('home.esg.badge')}</span>
                        <h2>{t('home.esg.title')}</h2>
                        <p>{t('home.esg.subtitle')}</p>
                    </div>

                    <div className="esg-definition">
                        <div className="esg-definition__content">
                            <p className="esg-definition__text">
                                {t('home.esg.desc_p1')}
                            </p>
                            <p className="esg-definition__text">
                                {t('home.esg.desc_p2')}
                            </p>
                        </div>
                        <div className="esg-trend-chart">
                            <h4>{t('home.esg.chart_title')}</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={emissionsTrend}>
                                    <defs>
                                        <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#059669" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="year" stroke="#6B7280" fontSize={12} />
                                    <YAxis stroke="#6B7280" fontSize={12} />
                                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} itemStyle={{ color: '#1f2937' }} />
                                    <Area type="monotone" dataKey="emissions" stroke="#059669" strokeWidth={2} fill="url(#colorEmissions)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* ESG Pillars */}
                    <div className="esg-pillars">
                        {esgPillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                className="esg-pillar"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="esg-pillar__header" style={{ background: pillar.color }}>
                                    <span className="esg-pillar__letter">{pillar.letter}</span>
                                    <h3>{pillar.title}</h3>
                                </div>
                                <ul className="esg-pillar__items">
                                    {pillar.items.map((item, i) => (
                                        <li key={i}>
                                            <svg className="check-icon" viewBox="0 0 20 20" fill={pillar.color} width="16" height="16">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('home.services.badge')}</span>
                        <h2>{t('home.services.title')}</h2>
                        <p>{t('home.services.subtitle')}</p>
                    </div>

                    <div className="services__grid">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="service-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                {service.badge && <span className="service-card__badge">{service.badge}</span>}
                                <div className="service-card__icon" style={{ background: `${service.color}12`, color: service.color }}>
                                    {service.icon}
                                </div>
                                <h3 className="service-card__title">{service.title}</h3>
                                <p className="service-card__desc">{service.desc}</p>
                                <Link to={service.link} className="service-card__link" style={{ color: service.color }}>
                                    {t('home.services.learn_more')} →
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emissions by Sector Infographic */}
            <section className="infographic section">
                <div className="container">
                    <div className="infographic__grid">
                        <div className="infographic__content">
                            <span className="section-badge">{t('home.infographic.badge')}</span>
                            <h2>{t('home.infographic.title')}</h2>
                            <p>{t('home.infographic.desc')}</p>

                            <div className="sector-list">
                                {sectorData.map((sector, i) => (
                                    <div key={i} className="sector-item">
                                        <span className="sector-name">{sector.sector}</span>
                                        <div className="sector-bar">
                                            <div className="sector-bar__fill" style={{ width: `${sector.value}%` }}></div>
                                        </div>
                                        <span className="sector-value">{sector.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="infographic__visual">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={sectorData} layout="vertical">
                                    <XAxis type="number" stroke="#FFFFFF" fontSize={12} tick={{ fill: '#FFFFFF' }} />
                                    <YAxis dataKey="sector" type="category" stroke="#FFFFFF" width={100} fontSize={12} tick={{ fill: '#FFFFFF' }} />
                                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} cursor={{ fill: 'transparent' }} itemStyle={{ color: '#1f2937' }} />
                                    <Bar dataKey="value" fill="#059669" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Flow */}
            <section className="process section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('home.process.badge')}</span>
                        <h2>{t('home.process.title')}</h2>
                        <p>{t('home.process.subtitle')}</p>
                    </div>

                    <div className="process__flow">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="process__step"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="process__step-num">{step.num}</div>
                                <div className="process__step-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Regulatory Landscape */}
            <section className="regulations section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('home.regulations.badge')}</span>
                        <h2>{t('home.regulations.title')}</h2>
                        <p>{t('home.regulations.subtitle')}</p>
                    </div>

                    <div className="regulations__grid">
                        {regulations.map((reg, index) => (
                            <motion.div
                                key={index}
                                className="regulation-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="regulation-card__region">{reg.region}</div>
                                <h4 className="regulation-card__name">{reg.regulation}</h4>
                                <p className="regulation-card__desc">{reg.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Frameworks */}
            <section className="frameworks section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('home.frameworks.badge')}</span>
                        <h2>{t('home.frameworks.title')}</h2>
                        <p>{t('home.frameworks.subtitle')}</p>
                    </div>

                    <div className="frameworks__grid">
                        {frameworks.map((fw, index) => (
                            <motion.div
                                key={index}
                                className="framework-badge"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="framework-badge__name">{fw.name}</span>
                                <span className="framework-badge__full">{fw.fullName}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Insights Section */}
            <section className="latest-insights section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">Resources</span>
                        <h2>Latest Insights</h2>
                        <p>Stay updated with our latest articles, whitepapers, and guides.</p>
                    </div>

                    <div className="insights-grid">
                        {loadingInsights ? (
                            <p>Loading insights...</p>
                        ) : insights.length > 0 ? (
                            insights.slice(0, 3).map((insight) => (
                                <Link to="/resources" key={insight.id} className="insight-card-link">
                                    <motion.div
                                        className="insight-card"
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="insight-card__content">
                                            <span className="insight-type">{insight.type}</span>
                                            <h3>{insight.title}</h3>
                                            <p>{insight.summary ? insight.summary.substring(0, 100) + '...' : ''}</p>
                                            <span className="read-more">Read More →</span>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                        ) : (
                            <p className="no-insights">No insights available at the moment.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section section">
                <div className="cta-section__background">
                    <AnimatedBackground variant="pollution" intensity="medium" />
                </div>
                <div className="container">
                    <div className="cta-section__content">
                        <span className="section-badge section-badge--light">{t('home.cta.badge')}</span>
                        <h2>{t('home.cta.title')}</h2>
                        <p>{t('home.cta.subtitle')}</p>
                        <div className="cta-section__buttons">
                            <CTAButton href="/contact" size="large">{t('home.cta.primary')}</CTAButton>
                            <CTAButton href="/resources" variant="outline" size="large">{t('home.cta.secondary')}</CTAButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// SVG Icon Components (Same as before)
const ScopeIcon = ({ type }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        {type === "1" && <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm3-6c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />}
        {type === "2" && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />}
        {type === "3" && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />}
    </svg>
);

const ESGIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
);

const ComplianceIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
);

const AccountingIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </svg>
);

export default HomePage;