import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CTAButton from '../components/CTAButton';
import './ResourcesPage.css';

const ResourcesPage = () => {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = t('resources.categories', { returnObjects: true });
    const resources = t('resources.items', { returnObjects: true });
    const glossaryTerms = t('resources.glossary', { returnObjects: true });
    const faqs = t('resources.faqs', { returnObjects: true });

    const filteredResources = activeCategory === 'all'
        ? resources
        : resources.filter(r => r.category === activeCategory);

    return (
        <div className="resourcespage">
            {/* Hero */}
            <section className="resources-hero">
                <div className="resources-hero__background"></div>
                <div className="container">
                    <motion.div
                        className="resources-hero__content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="section-badge section-badge--light">{t('resources.hero.badge')}</span>
                        <h1>{t('resources.hero.title')}</h1>
                        <p>{t('resources.hero.desc')}</p>
                    </motion.div>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="resources-main section">
                <div className="container">
                    {/* Category Filter */}
                    <div className="resources-filter">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`resources-filter__btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Resources Grid */}
                    <div className="resources-grid">
                        {filteredResources.map((resource, index) => (
                            <motion.div
                                key={index}
                                className="resource-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -8 }}
                            >
                                <span className="resource-card__category">{resource.category}</span>
                                <h3>{resource.title}</h3>
                                <p>{resource.description}</p>
                                <div className="resource-card__topics">
                                    {resource.topics.map((topic, i) => (
                                        <span key={i} className="resource-card__topic">{topic}</span>
                                    ))}
                                </div>
                                <div className="resource-card__footer">
                                    <span className="resource-card__time">⏱️ {resource.readTime}</span>
                                    <a href={resource.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                        <CTAButton variant="secondary" size="small" style={{ pointerEvents: 'none' }}>{t('resources.accessBtn')}</CTAButton>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ESG Glossary */}
            <section className="glossary section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('resources.glossary_section.badge')}</span>
                        <h2>{t('resources.glossary_section.title')}</h2>
                        <p>{t('resources.glossary_section.subtitle')}</p>
                    </div>

                    <div className="glossary-grid">
                        {glossaryTerms.map((item, index) => (
                            <motion.div
                                key={index}
                                className="glossary-item"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <h4>{item.term}</h4>
                                <p>{item.definition}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="faqs section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('resources.faq_section.badge')}</span>
                        <h2>{t('resources.faq_section.title')}</h2>
                    </div>

                    <div className="faqs-list">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className="faq-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h4>{faq.question}</h4>
                                <p>{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="newsletter section">
                <div className="container">
                    <div className="newsletter-content">
                        <div className="newsletter-text">
                            <h2>{t('resources.newsletter.title')}</h2>
                            <p>{t('resources.newsletter.desc')}</p>
                        </div>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder={t('resources.newsletter.placeholder')} required />
                            <CTAButton type="submit">{t('resources.newsletter.button')}</CTAButton>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResourcesPage;
