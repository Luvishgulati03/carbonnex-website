import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CTAButton from './CTAButton';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const location = useLocation();

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
                        { name: t('nav.services_dropdown.items.carbon_credits.title'), path: '/services/carbon-credits', desc: t('nav.services_dropdown.items.carbon_credits.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon') },
                        { name: t('nav.services_dropdown.items.blockchain.title'), path: '/services/blockchain', desc: t('nav.services_dropdown.items.blockchain.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon') },
                        { name: t('nav.services_dropdown.items.integrations.title'), path: '/services/integrations', desc: t('nav.services_dropdown.items.integrations.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon') },
                        { name: t('nav.services_dropdown.items.decarbonization.title'), path: '/services/decarbonization', desc: t('nav.services_dropdown.items.decarbonization.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon') },
                        { name: t('nav.services_dropdown.items.voluntary_frameworks.title'), path: '/services/voluntary-frameworks', desc: t('nav.services_dropdown.items.voluntary_frameworks.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon') },
                        { name: t('nav.services_dropdown.items.supply_chain.title'), path: '/services/supply-chain', desc: t('nav.services_dropdown.items.supply_chain.desc'), color: '#64748B', badge: t('nav.services_dropdown.badges.soon') },
                    ]
                }
            ]
        },
        { name: t('nav.accreditations'), path: '/accreditations' },
        { name: t('nav.resources'), path: '/resources' },
        { name: t('nav.contact'), path: '/contact' },
    ];

    return (
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
                                                            <Link key={subIndex} to={subItem.path} className="header__mobile-sublink">
                                                                {subItem.name}
                                                                {subItem.badge && <span className="header__mobile-badge">{subItem.badge}</span>}
                                                            </Link>
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
        </motion.header>
    );
};

export default Header;
