import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CTAButton from '../components/CTAButton';
import './ResourcesPage.css';

const ResourcesPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const { user, token, isLoggedIn, isAdmin } = useAuth();

    // UI States
    const [activeCategory, setActiveCategory] = useState('all');
    const [showLockModal, setShowLockModal] = useState(false);
    const [activeFaqTab, setActiveFaqTab] = useState('official');
    const [showAskForm, setShowAskForm] = useState(false);
    const [answeringQuestionId, setAnsweringQuestionId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    // Form States
    const [newAnswer, setNewAnswer] = useState({ content: '', email: '', name: '' });
    const [newQuestion, setNewQuestion] = useState({ title: '', details: '', author: '', email: '', category: '' });

    // Data States
    const [communityQuestions, setCommunityQuestions] = useState([]);
    const [dbCategories, setDbCategories] = useState([]);
    const [newsItems, setNewsItems] = useState([]);
    const [myQuestions, setMyQuestions] = useState([]);
    const [myAnswers, setMyAnswers] = useState([]);

    // Static Data from i18n
    const categories = t('resources.categories', { returnObjects: true });
    const resources = t('resources.items', { returnObjects: true });
    const glossaryTerms = t('resources.glossary', { returnObjects: true });
    const faqs = t('resources.faqs', { returnObjects: true });

    // Fetch Data on Mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [qRes, cRes, aRes] = await Promise.all([
                    fetch('http://localhost:5000/api/questions'),
                    fetch('http://localhost:5000/api/categories'),
                    fetch('http://localhost:5000/api/articles')
                ]);

                const questions = await qRes.json();
                const categories = await cRes.json();
                const articles = await aRes.json();

                // Format questions
                const formattedQuestions = questions.map(q => ({
                    ...q,
                    date: new Date(q.created_at).toLocaleDateString(),
                    author: q.author_name || 'Anonymous',
                    answers: []
                }));

                // Format articles for carousel (Removed Date as per request)
                const formattedArticles = articles.map(a => ({
                    id: a.id,
                    title: a.title,
                    summary: a.summary,
                    link: a.source_url,
                    image: a.image_url || "/images/news/news-1.jpg"
                }));

                setCommunityQuestions(formattedQuestions);
                setDbCategories(categories);
                setNewsItems(formattedArticles);

            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };
        fetchData();
    }, []);

    // Handle hash scrolling
    useEffect(() => {
        if (location.hash === '#community-faq') {
            setActiveFaqTab('community');
            const element = document.getElementById('community-faq');
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    // Fetch user's Q&A when logged in and My FAQ tab is active
    useEffect(() => {
        if (isLoggedIn && activeFaqTab === 'myfaq') {
            fetchMyFaq();
        }
    }, [isLoggedIn, activeFaqTab, token]);

    const fetchMyFaq = async () => {
        try {
            const [qRes, aRes] = await Promise.all([
                fetch('http://localhost:5000/api/users/me/questions', {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch('http://localhost:5000/api/users/me/answers', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            const questions = await qRes.json();
            const answers = await aRes.json();

            setMyQuestions(questions);
            setMyAnswers(answers);
        } catch (err) {
            console.error('Failed to fetch My FAQ:', err);
        }
    };

    // Search handler
    const handleSearch = async () => {
        if (searchQuery.trim().length < 2) return;

        try {
            const res = await fetch(`http://localhost:5000/api/questions/search?q=${encodeURIComponent(searchQuery)}`);
            const results = await res.json();

            const formattedQuestions = results.map(q => ({
                ...q,
                date: new Date(q.created_at).toLocaleDateString(),
                author: q.author_name || 'Anonymous',
                answers: []
            }));

            setCommunityQuestions(formattedQuestions);
        } catch (err) {
            console.error('Search failed:', err);
        }
    };

    // Delete question
    const handleDeleteQuestion = async (questionId) => {
        if (!window.confirm('Are you sure you want to delete this question?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/questions/${questionId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                setCommunityQuestions(communityQuestions.filter(q => q.id !== questionId));
                if (activeFaqTab === 'myfaq') fetchMyFaq();
            }
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    // Question Submission
    const handleAskSubmit = async (e) => {
        e.preventDefault();
        if (!newQuestion.title || !newQuestion.email) {
            alert("Title and Email are required!");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
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

    // Answer Submission
    const handleAnswerSubmit = async (e, qId) => {
        e.preventDefault();
        if (!newAnswer.content || !newAnswer.email) {
            alert("Answer content and Email are required!");
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
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

    useEffect(() => {
        if (newsItems.length === 0) return;
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % newsItems.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, newsItems.length]);

    const nextSlide = () => {
        if (newsItems.length === 0) return;
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    };

    const prevSlide = () => {
        if (newsItems.length === 0) return;
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
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
                                animate={{ x: `-${currentSlide * 340}px` }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {newsItems.map((item) => (
                                    <div key={item.id} className="news-card">
                                        <div className="news-card__content">
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
                                onClick={() => {
                                    if (cat.id === 'tool') {
                                        setShowLockModal(true);
                                    } else {
                                        setActiveCategory(cat.id);
                                    }
                                }}
                                style={cat.id === 'tool' ? { display: 'flex', alignItems: 'center', gap: '6px' } : {}}
                            >
                                {cat.id === 'tool' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                )}
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

            {/* Glossary */}
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
            <section id="community-faq" className="faqs section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-badge">{t('resources.faq_section.badge')}</span>
                        <h2>{t('resources.faq_section.title')}</h2>
                    </div>

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
                        {isLoggedIn && (
                            <button
                                className={`faq-tab-btn ${activeFaqTab === 'myfaq' ? 'active' : ''}`}
                                onClick={() => setActiveFaqTab('myfaq')}
                            >
                                📋 My FAQ
                            </button>
                        )}
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
                                    <div className="community-header__actions">
                                        <div className="search-bar">
                                            <input
                                                type="text"
                                                placeholder="Search questions..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                            />
                                            <button onClick={handleSearch}>🔍</button>
                                        </div>
                                        <CTAButton size="small" onClick={() => setShowAskForm(!showAskForm)}>
                                            {showAskForm ? 'Cancel' : 'Ask a Question'}
                                        </CTAButton>
                                    </div>
                                </div>

                                {showAskForm && (
                                    <motion.form
                                        className="ask-form"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        onSubmit={handleAskSubmit}
                                    >
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
                                                <div className="community-card__title-row">
                                                    <h4>{q.title}</h4>
                                                    {q.author_role === 'admin' && (
                                                        <span className="carbonnex-team-badge">🌿 CarbonNex Team</span>
                                                    )}
                                                </div>
                                                <div className="community-card__meta">
                                                    <span className="meta">By {q.author} • {q.date}</span>
                                                    {(isAdmin || (isLoggedIn && user?.id === q.user_id)) && (
                                                        <button
                                                            className="delete-btn"
                                                            onClick={() => handleDeleteQuestion(q.id)}
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    )}
                                                </div>
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

                        {/* My FAQ Tab */}
                        {activeFaqTab === 'myfaq' && isLoggedIn && (
                            <div className="myfaq-content">
                                <div className="myfaq-section">
                                    <h3>📝 My Questions ({myQuestions.length})</h3>
                                    {myQuestions.length > 0 ? (
                                        <div className="myfaq-list">
                                            {myQuestions.map(q => (
                                                <div key={q.id} className="myfaq-item">
                                                    <div className="myfaq-item__header">
                                                        <h4>{q.title}</h4>
                                                        <span className="meta">{new Date(q.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    {q.details && <p>{q.details}</p>}
                                                    <div className="myfaq-item__footer">
                                                        <span className="answer-count">💬 {q.answer_count} answers</span>
                                                        <button
                                                            className="delete-btn"
                                                            onClick={() => handleDeleteQuestion(q.id)}
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-content">You haven't asked any questions yet.</p>
                                    )}
                                </div>

                                <div className="myfaq-section">
                                    <h3>💬 My Answers ({myAnswers.length})</h3>
                                    {myAnswers.length > 0 ? (
                                        <div className="myfaq-list">
                                            {myAnswers.map(a => (
                                                <div key={a.id} className="myfaq-item myfaq-item--answer">
                                                    <div className="myfaq-item__header">
                                                        <h4>Re: {a.question_title}</h4>
                                                        <span className="meta">{new Date(a.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <p className="answer-content">{a.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-content">You haven't answered any questions yet.</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
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

            {/* Lock Modal */}
            {showLockModal && (
                <div className="modal-overlay" onClick={() => setShowLockModal(false)}>
                    <motion.div
                        className="modal-content"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-icon">🚀</div>
                        <h3>Coming Soon</h3>
                        <p>We are working hard to bring you powerful interactive tools. Stay tuned!</p>
                        <button className="modal-close-btn" onClick={() => setShowLockModal(false)}>Got it</button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ResourcesPage;
