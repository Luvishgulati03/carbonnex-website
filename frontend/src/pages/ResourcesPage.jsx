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

    // Community FAQ State
    const [activeFaqTab, setActiveFaqTab] = useState('official');
    const [showAskForm, setShowAskForm] = useState(false);
    const [answeringQuestionId, setAnsweringQuestionId] = useState(null);

    // Form States
    const [newAnswer, setNewAnswer] = useState({ content: '', email: '', name: '' });
    const [newQuestion, setNewQuestion] = useState({ title: '', details: '', author: '', email: '', category: '' });

    // Data States
    const [communityQuestions, setCommunityQuestions] = useState([]);
    const [dbCategories, setDbCategories] = useState([]);

    // Fetch Data on Mount
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [qRes, cRes] = await Promise.all([
                    fetch('http://localhost:5000/api/questions'),
                    fetch('http://localhost:5000/api/categories')
                ]);
                const questions = await qRes.json();
                const categories = await cRes.json();

                // Format questions for UI (backend returns flat list, we need to nest answers if not already)
                // Note: The backend SQL query counts answers but doesn't return them nested yet. 
                // For this demo, we will use the backend questions but keep answers empty until we add an endpoint to fetch answers.
                // Or simplistic approach: just use the data as is. 
                // Wait, current UI expects `q.answers` array.
                // Let's attach an empty array if missing.
                const formattedQuestions = questions.map(q => ({
                    ...q,
                    date: new Date(q.created_at).toLocaleDateString(),
                    author: q.author_name || 'Anonymous',
                    answers: [] // Placeholder until we implementing fetching answers per question
                }));

                setCommunityQuestions(formattedQuestions);
                setDbCategories(categories);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };
        fetchData();
    }, []);

    const handleAskSubmit = async (e) => {
        e.preventDefault();
        if (!newQuestion.title || !newQuestion.email) {
            alert("Title and Email are required!");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: newQuestion.title,
                    details: newQuestion.details,
                    email: newQuestion.email,
                    name: newQuestion.author,
                    category: newQuestion.category
                })
            });

            if (res.ok) {
                const result = await res.json();
                // Optimistic UI update
                const question = {
                    id: result.id,
                    title: newQuestion.title,
                    details: newQuestion.details,
                    author: newQuestion.author || "Guest",
                    date: new Date().toLocaleDateString(),
                    answers: []
                };
                setCommunityQuestions([question, ...communityQuestions]);
                setNewQuestion({ title: '', details: '', author: '', email: '', category: '' });
                setShowAskForm(false);
            } else {
                alert("Failed to post question. Please try again.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAnswerSubmit = async (e, qId) => {
        e.preventDefault();
        if (!newAnswer.content || !newAnswer.email) {
            alert("Answer content and Email are required!");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/answers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question_id: qId,
                    email: newAnswer.email,
                    name: newAnswer.name,
                    content: newAnswer.content
                })
            });

            if (res.ok) {
                const updatedQuestions = communityQuestions.map(q => {
                    if (q.id === qId) {
                        return {
                            ...q,
                            answers: [...q.answers, { text: newAnswer.content, author: newAnswer.name || "Guest", isOfficial: false }]
                        };
                    }
                    return q;
                });

                setCommunityQuestions(updatedQuestions);
                setNewAnswer({ content: '', email: '', name: '' });
                setAnsweringQuestionId(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // News Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const newsItems = [
        {
            id: 1,
            title: "New ESG Reporting Standards for 2026",
            date: "Jan 24, 2026",
            summary: "The global regulatory landscape is shifting. Here's what you need to know about the upcoming changes.",
            link: "#",
            image: "/images/news/news-1.jpg" // Placeholder
        },
        {
            id: 2,
            title: "CarbonNex Partners with GreenTech Alliance",
            date: "Jan 10, 2026",
            summary: "A strategic partnership to accelerate carbon reduction technologies for the manufacturing sector.",
            link: "#",
            image: "/images/news/news-2.jpg"
        },
        {
            id: 3,
            title: "Scope 3 Emissions: The Hidden Challenge",
            date: "Dec 28, 2025",
            summary: "Understanding the complexities of supply chain emissions and how to tackle them effectively.",
            link: "#",
            image: "/images/news/news-3.jpg"
        },
        {
            id: 4,
            title: "Success Story: 40% Reduction in One Year",
            date: "Dec 15, 2025",
            summary: "How a leading logistics provider transformed their carbon footprint using our platform.",
            link: "#",
            image: "/images/news/news-4.jpg"
        }
    ];

    // Auto-sliding effect
    React.useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % newsItems.length);
            }, 5000); // 5 seconds
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, newsItems.length]);

    const nextSlide = () => {
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    };

    const prevSlide = () => {
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
    };

    // Calculate visible slides for responsive behavior (simplified logic for demo)
    // In a real app, use a carousel library or more robust resize listener
    const getVisibleSlides = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

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

            {/* News & Insights Carousel */}
            <section className="news-carousel section">
                <div className="container">
                    <div className="section-header">
                        <h2>Trending News & Insights</h2>
                    </div>

                    <div className="carousel-wrapper">
                        <button className="nav-arrow left" onClick={prevSlide} aria-label="Previous Slide">
                            &#10094;
                        </button>

                        <div className="carousel-track-container">
                            <motion.div
                                className="carousel-track"
                                animate={{ x: `-${currentSlide * 340}px` }} // Simplified width assumption
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {newsItems.map((item) => (
                                    <div key={item.id} className="news-card">
                                        <div className="news-card__content">
                                            <span className="news-date">{item.date}</span>
                                            <h3>{item.title}</h3>
                                            <p>{item.summary}</p>
                                            <a href={item.link} className="news-link">Read More &rarr;</a>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <button className="nav-arrow right" onClick={nextSlide} aria-label="Next Slide">
                            &#10095;
                        </button>
                    </div>
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

                    {/* Tabs */}
                    <div className="faq-tabs">
                        <button
                            className={`faq-tab-btn ${activeFaqTab === 'official' ? 'active' : ''}`}
                            onClick={() => setActiveFaqTab('official')}
                        >
                            Official FAQs
                        </button>
                        <button
                            className={`faq-tab-btn ${activeFaqTab === 'community' ? 'active' : ''}`}
                            onClick={() => setActiveFaqTab('community')}
                        >
                            Community Q&A
                        </button>
                    </div>

                    <div className="faqs-content">
                        {activeFaqTab === 'official' ? (
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
                        ) : (
                            <div className="community-qna">
                                <div className="community-header">
                                    <h3>Community Discussion</h3>
                                    <CTAButton size="small" onClick={() => setShowAskForm(!showAskForm)}>
                                        {showAskForm ? 'Cancel' : 'Ask a Question'}
                                    </CTAButton>
                                </div>

                                {showAskForm && (
                                    <motion.form
                                        className="ask-form"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        onSubmit={handleAskSubmit}
                                    >
                                        <select
                                            value={newQuestion.category}
                                            onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
                                            className="form-select"
                                            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '10px' }}
                                        >
                                            <option value="">Select Category</option>
                                            {dbCategories.map(cat => (
                                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                                            ))}
                                            <option value="other">Other</option>
                                        </select>

                                        <input
                                            type="text"
                                            placeholder="What's your question? *"
                                            value={newQuestion.title}
                                            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                                            required
                                        />
                                        <textarea
                                            placeholder="Add more details..."
                                            value={newQuestion.details}
                                            onChange={(e) => setNewQuestion({ ...newQuestion, details: e.target.value })}
                                            rows="3"
                                        />
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                            <input
                                                type="email"
                                                placeholder="Your Email (Required) *"
                                                value={newQuestion.email}
                                                onChange={(e) => setNewQuestion({ ...newQuestion, email: e.target.value })}
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Your Name (Optional)"
                                                value={newQuestion.author}
                                                onChange={(e) => setNewQuestion({ ...newQuestion, author: e.target.value })}
                                            />
                                        </div>
                                        <button type="submit" className="submit-btn" style={{ marginTop: '10px' }}>Post Question</button>
                                    </motion.form>
                                )}

                                <div className="community-list">
                                    {communityQuestions.map((q) => (
                                        <motion.div
                                            key={q.id}
                                            className="community-card"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="community-card__header">
                                                <h4>{q.title}</h4>
                                                <span className="meta">By {q.author} • {q.date}</span>
                                            </div>
                                            {q.details && <p className="community-card__details">{q.details}</p>}

                                            <div className="community-card__answers">
                                                {q.answers.map((ans, i) => (
                                                    <div key={i} className={`answer-item ${ans.isOfficial ? 'official' : ''}`}>
                                                        <p>{ans.text}</p>
                                                        <span className="answer-author">{ans.author} {ans.isOfficial && '✓'}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="community-card__actions">
                                                {answeringQuestionId === q.id ? (
                                                    <form onSubmit={(e) => handleAnswerSubmit(e, q.id)} className="answer-form" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                                                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                                            <input
                                                                type="text"
                                                                placeholder="Write your answer... *"
                                                                value={newAnswer.content}
                                                                onChange={(e) => setNewAnswer({ ...newAnswer, content: e.target.value })}
                                                                autoFocus
                                                                required
                                                                style={{ flex: 2 }}
                                                            />
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                                            <input
                                                                type="email"
                                                                placeholder="Your Email *"
                                                                value={newAnswer.email}
                                                                onChange={(e) => setNewAnswer({ ...newAnswer, email: e.target.value })}
                                                                required
                                                                style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Your Name"
                                                                value={newAnswer.name}
                                                                onChange={(e) => setNewAnswer({ ...newAnswer, name: e.target.value })}
                                                                style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                                            />
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                                            <button type="button" className="cancel" onClick={() => setAnsweringQuestionId(null)}>Cancel</button>
                                                            <button type="submit">Reply</button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <button className="reply-btn" onClick={() => setAnsweringQuestionId(q.id)}>
                                                        💬 {q.answers.length} Answers • Reply
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
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
