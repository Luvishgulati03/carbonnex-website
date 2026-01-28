import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import CTAButton from './CTAButton';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [showLockedModal, setShowLockedModal] = useState(false);
    const [lockedServiceName, setLockedServiceName] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const { user, isLoggedIn, isAdmin, logout } = useAuth();
    const location = useLocation();

    const handleLockedClick = (e, serviceName) => {
        e.preventDefault();
        setLockedServiceName(serviceName);
        setShowLockedModal(true);
        setActiveDropdown(null);
    };

    const LockIcon = () => (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px', opacity: 0.8 }}>
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
    );

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsLangDropdownOpen(false);
    };

    const languages = [
        { code: 'en', label: 'EN', name: 'English' },
        { code: 'fr', label: 'FR', name: 'Français' },
        { code: 'de', label: 'DE', name: 'Deutsch' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    const navItems = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.about'), path: '/about' },
        {
            name: t('nav.services'),
            dropdown: [
                {
                    category: t('nav.services_dropdown.core_platform'),
                    items: [
                        { name: t('nav.services_dropdown.items.carbon_accounting.title'), path: '/services/carbon-accounting', desc: t('nav.services_dropdown.items.carbon_accounting.desc'), color: '#10B981' },
                        { name: t('nav.services_dropdown.items.esg_data.title'), path: '/services/esg-data', desc: t('nav.services_dropdown.items.esg_data.desc'), color: '#3B82F6' },
                        { name: t('nav.services_dropdown.items.compliance.title'), path: '/services/compliance', desc: t('nav.services_dropdown.items.compliance.desc'), color: '#F59E0B' },
                        { name: t('nav.services_dropdown.items.evidence.title'), path: '/services/evidence-management', desc: t('nav.services_dropdown.items.evidence.desc'), color: '#8B5CF6' },
                        { name: t('nav.services_dropdown.items.ai_validation.title'), path: '/services/ai-validation', desc: t('nav.services_dropdown.items.ai_validation.desc'), color: '#EC4899' },
                        { name: t('nav.services_dropdown.items.insights.title'), path: '/services/insights', desc: t('nav.services_dropdown.items.insights.desc'), color: '#6366F1' },
                    ]
                },
                {
                    category: t('nav.services_dropdown.future_capabilities'),
                    items: [
                        { name: t('nav.services_dropdown.items.carbon_credits.title'), path: '/services/carbon-credits', desc: t('nav.services_dropdown.items.carbon_credits.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon'), isLocked: true },
                        { name: t('nav.services_dropdown.items.blockchain.title'), path: '/services/blockchain', desc: t('nav.services_dropdown.items.blockchain.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon'), isLocked: true },
                        { name: t('nav.services_dropdown.items.integrations.title'), path: '/services/integrations', desc: t('nav.services_dropdown.items.integrations.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon'), isLocked: true },
                        { name: t('nav.services_dropdown.items.decarbonization.title'), path: '/services/decarbonization', desc: t('nav.services_dropdown.items.decarbonization.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon'), isLocked: true },
                        { name: t('nav.services_dropdown.items.voluntary_frameworks.title'), path: '/services/voluntary-frameworks', desc: t('nav.services_dropdown.items.voluntary_frameworks.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon'), isLocked: true },
                        { name: t('nav.services_dropdown.items.supply_chain.title'), path: '/services/supply-chain', desc: t('nav.services_dropdown.items.supply_chain.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon'), isLocked: true },
                    ]
                }
            ]
        },
        { name: t('nav.accreditations'), path: '/accreditations' },
        { name: t('nav.resources'), path: '/resources' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    return (
        <>
            <motion.header
                className={`header ${isScrolled ? 'header--scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container header__container">
                    {/* Logo */}
                    <Link to="/" className="header__logo">
                        <img
                            src="/logo.png"
                            alt="CarbonNex Logo"
                            className="header__logo-image"
                        />
                        <div className="header__logo-text">
                            <span className="header__logo-name">CarbonNex</span>
                            <span className="header__logo-tagline">Nexus For Carbon</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="header__nav">
                        {navItems.map((item, index) => (
                            item.dropdown ? (
                                <div
                                    key={index}
                                    className="header__dropdown"
                                    onMouseEnter={() => setActiveDropdown(index)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <button className="header__nav-link header__dropdown-trigger">
                                        {item.name}
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>

                                    <AnimatePresence>
                                        {activeDropdown === index && (
                                            <motion.div
                                                className="header__mega-menu"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {item.dropdown.map((category, catIndex) => (
                                                    <div key={catIndex} className="header__mega-column">
                                                        <h4 className="header__mega-title">{category.category}</h4>
                                                        {category.items.map((subItem, subIndex) => (
                                                            subItem.isLocked ? (
                                                                <a
                                                                    key={subIndex}
                                                                    href="#"
                                                                    className="header__mega-item header__mega-item--locked"
                                                                    onClick={(e) => handleLockedClick(e, subItem.name)}
                                                                >
                                                                    <span className="header__mega-dot" style={{ background: subItem.color }}></span>
                                                                    <div className="header__mega-item-content">
                                                                        <span className="header__mega-name">
                                                                            <LockIcon />
                                                                            {subItem.name}
                                                                            {subItem.badge && <span className="header__mega-badge">{subItem.badge}</span>}
                                                                        </span>
                                                                        <span className="header__mega-desc">{subItem.desc}</span>
                                                                    </div>
                                                                </a>
                                                            ) : (
                                                                <Link
                                                                    key={subIndex}
                                                                    to={subItem.path}
                                                                    className="header__mega-item"
                                                                >
                                                                    <span className="header__mega-dot" style={{ background: subItem.color }}></span>
                                                                    <div className="header__mega-item-content">
                                                                        <span className="header__mega-name">
                                                                            {subItem.name}
                                                                            {subItem.badge && <span className="header__mega-badge">{subItem.badge}</span>}
                                                                        </span>
                                                                        <span className="header__mega-desc">{subItem.desc}</span>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        ))}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link key={index} to={item.path} className="header__nav-link">
                                    {item.name}
                                </Link>
                            )
                        ))}
                    </nav>

                    {/* CTA & Language */}
                    <div className="header__actions">
                        <div className="language-selector">
                            <button
                                className="lang-btn"
                                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                            >
                                <span className="lang-code">{languages.find(l => l.code === i18n.language)?.label || 'EN'}</span>
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={isLangDropdownOpen ? 'rotated' : ''}>
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isLangDropdownOpen && (
                                    <motion.div
                                        className="lang-dropdown"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                    >
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
                                                onClick={() => changeLanguage(lang.code)}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* User/Login Button */}
                        <div className="user-menu">
                            {isLoggedIn ? (
                                <div className="user-dropdown-wrapper">
                                    <button
                                        className="user-btn"
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    >
                                        <span className="user-avatar">
                                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </span>
                                        <span className="user-name">{user?.name}</span>
                                        {isAdmin && <span className="admin-badge">Admin</span>}
                                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={isUserDropdownOpen ? 'rotated' : ''}>
                                            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>

                                    <AnimatePresence>
                                        {isUserDropdownOpen && (
                                            <motion.div
                                                className="user-dropdown"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                            >
                                                <div className="user-dropdown__header">
                                                    <span className="user-email">{user?.email}</span>
                                                </div>
                                                {isAdmin && (
                                                    <Link to="/admin/dashboard" className="user-dropdown__item" onClick={() => setIsUserDropdownOpen(false)}>
                                                        📊 Dashboard
                                                    </Link>
                                                )}
                                                <Link to="/resources#community-faq" className="user-dropdown__item" onClick={() => setIsUserDropdownOpen(false)}>
                                                    💬 My FAQ
                                                </Link>
                                                <button className="user-dropdown__item user-dropdown__item--logout" onClick={() => { logout(); setIsUserDropdownOpen(false); }}>
                                                    🚪 Logout
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    Login
                                </button>
                            )}
                        </div>

                        <div className="header__cta">
                            <CTAButton href="/contact" size="small">{t('nav.getStarted')}</CTAButton>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`header__mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="header__mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="header__mobile-content">
                                {navItems.map((item, index) => (
                                    item.dropdown ? (
                                        <div key={index} className="header__mobile-dropdown">
                                            <button
                                                className="header__mobile-link"
                                                onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                            >
                                                {item.name}
                                                <svg className={activeDropdown === index ? 'rotated' : ''} width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                            {activeDropdown === index && (
                                                <div className="header__mobile-submenu">
                                                    {item.dropdown.map((category, catIndex) => (
                                                        <div key={catIndex}>
                                                            <span className="header__mobile-category">{category.category}</span>
                                                            {category.items.map((subItem, subIndex) => (
                                                                subItem.isLocked ? (
                                                                    <a
                                                                        key={subIndex}
                                                                        href="#"
                                                                        className="header__mobile-sublink header__mobile-sublink--locked"
                                                                        onClick={(e) => handleLockedClick(e, subItem.name)}
                                                                    >
                                                                        <LockIcon />
                                                                        {subItem.name}
                                                                        {subItem.badge && <span className="header__mobile-badge">{subItem.badge}</span>}
                                                                    </a>
                                                                ) : (
                                                                    <Link key={subIndex} to={subItem.path} className="header__mobile-sublink">
                                                                        {subItem.name}
                                                                        {subItem.badge && <span className="header__mobile-badge">{subItem.badge}</span>}
                                                                    </Link>
                                                                )
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link key={index} to={item.path} className="header__mobile-link">
                                            {item.name}
                                        </Link>
                                    )
                                ))}
                                <div className="header__mobile-cta">
                                    <CTAButton href="/contact" size="large">{t('nav.getStarted')}</CTAButton>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
            </motion.header>

            {/* Login Modal */}
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </>
    );
};

export default Header;
