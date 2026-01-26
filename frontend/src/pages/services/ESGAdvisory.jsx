import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../../components/AnimatedBackground';
import CTAButton from '../../components/CTAButton';
import './ServicePage.css';
import './ESGAdvisory.css';

const ESGAdvisory = () => {
    const frameworks = [
        { name: 'GRI', desc: 'Global Reporting Initiative Standards' },
        { name: 'TCFD', desc: 'Task Force on Climate-related Financial Disclosures' },
        { name: 'SASB', desc: 'Sustainability Accounting Standards Board' },
        { name: 'CDP', desc: 'Carbon Disclosure Project' },
        { name: 'BRSR', desc: 'Business Responsibility and Sustainability Reporting' },
        { name: 'SDG', desc: 'UN Sustainable Development Goals' },
    ];

    const services = [
        { title: 'Materiality Assessment', desc: 'Identify and prioritize ESG issues most relevant to your business and stakeholders' },
        { title: 'ESG Strategy Development', desc: 'Create comprehensive sustainability roadmaps aligned with business objectives' },
        { title: 'Sustainability Reporting', desc: 'Prepare reports aligned with GRI, TCFD, SASB, and regional frameworks' },
        { title: 'ESG Due Diligence', desc: 'Assess ESG risks and opportunities in M&A transactions and investments' },
        { title: 'Stakeholder Engagement', desc: 'Design and implement effective stakeholder communication strategies' },
        { title: 'Performance Benchmarking', desc: 'Benchmark ESG performance against peers and industry leaders' },
    ];

    const esgPillars = [
        {
            title: 'Environmental',
            color: '#059669',
            items: ['Climate Change & Carbon Emissions', 'Energy Management', 'Water & Wastewater', 'Waste & Circular Economy', 'Biodiversity']
        },
        {
            title: 'Social',
            color: '#2563EB',
            items: ['Human Capital Development', 'Health & Safety', 'Diversity & Inclusion', 'Community Relations', 'Human Rights']
        },
        {
            title: 'Governance',
            color: '#7C3AED',
            items: ['Board Composition', 'Executive Compensation', 'Business Ethics', 'Risk Management', 'Data Privacy & Security']
        }
    ];

    return (
        <div className="servicepage">
            <section className="service-hero service-hero--green">
                <div className="service-hero__background">
                    <AnimatedBackground variant="particles" intensity="medium" />
                </div>
                <div className="container">
                    <motion.div className="service-hero__content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="service-badge">Sustainability Services</span>
                        <h1>ESG Advisory & Assurance</h1>
                        <p>Strategic guidance for building robust ESG frameworks and achieving sustainability excellence</p>
                    </motion.div>
                </div>
            </section>

            <section className="service-intro section">
                <div className="container">
                    <div className="service-intro__grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="service-intro__content" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                            <span className="service-badge">What is ESG?</span>
                            <h2>ESG Reporting & Assurance</h2>
                            <p className="service-intro__lead">
                                ESG Reporting includes a framework for organizations to display their <strong>environmental, social, and governance</strong> practices
                                along with their impacts and influence. The reporting aims to levy transparency on how an organization manages various
                                ESG risks and opportunities, allowing stakeholders to understand the company's commitment to ethical and sustainable practices.
                            </p>
                            <p className="service-intro__lead">
                                ESG frameworks give a structured blueprint ensuring consistency and coherence in the sustainability landscape.
                                ESG Reporting functions as a conduit for companies to communicate their progress to potential investors and ensure
                                that their initiatives can yield credible and actionable results.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="service-pillars section" style={{ background: 'var(--color-gray-50)' }}>
                <div className="container">
                    <div className="section-header text-center">
                        <span className="service-badge">The Three Pillars</span>
                        <h2>Environmental, Social & Governance</h2>
                    </div>
                    <div className="pillars-grid">
                        {esgPillars.map((pillar, index) => (
                            <motion.div key={index} className="pillar-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ borderTop: `4px solid ${pillar.color}` }}>
                                <h3 style={{ color: pillar.color }}>{pillar.title}</h3>
                                <ul>
                                    {pillar.items.map((item, i) => (
                                        <li key={i}>
                                            <svg viewBox="0 0 20 20" fill={pillar.color} width="16" height="16">
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

            <section className="service-offerings section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="service-badge">Our Services</span>
                        <h2>Comprehensive ESG Advisory</h2>
                    </div>
                    <div className="offerings-grid">
                        {services.map((service, index) => (
                            <motion.div key={index} className="offering-card" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                <div className="offering-card__num">{String(index + 1).padStart(2, '0')}</div>
                                <h3>{service.title}</h3>
                                <p>{service.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="service-frameworks section" style={{ background: '#111827' }}>
                <div className="container">
                    <div className="section-header text-center">
                        <span className="service-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>Standards</span>
                        <h2 style={{ color: 'var(--color-white)' }}>Frameworks We Support</h2>
                        <p style={{ color: 'var(--color-gray-400)' }}>Reporting aligned with global ESG standards</p>
                    </div>
                    <div className="frameworks-grid">
                        {frameworks.map((fw, index) => (
                            <motion.div key={index} className="framework-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3>{fw.name}</h3>
                                <p>{fw.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="service-cta-section section">
                <div className="service-cta-section__background">
                    <AnimatedBackground variant="circuit" intensity="low" />
                </div>
                <div className="container">
                    <div className="service-cta-section__content">
                        <h2>Transform Your ESG Strategy</h2>
                        <p>Partner with our experts to build a sustainable future</p>
                        <div className="service-cta-section__buttons">
                            <CTAButton href="/contact" size="large">Get Started</CTAButton>
                            <CTAButton href="/services/compliance" variant="outline" size="large">BRSR Compliance →</CTAButton>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ESGAdvisory;
