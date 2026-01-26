import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const services = [
        { name: 'Scope 1 Management', path: '/services/scope-1' },
        { name: 'Scope 2 Management', path: '/services/scope-2' },
        { name: 'Scope 3 Management', path: '/services/scope-3' },
        { name: 'ESG Advisory', path: '/services/esg-advisory' },
        { name: 'Carbon Accounting', path: '/services/carbon-accounting' },
    ];

    const company = [
        { name: 'Our Story', path: '/about' },
        { name: 'Resources', path: '/resources' },
        { name: 'Contact Us', path: '/contact' },
    ];

    return (
        <footer className="footer">
            <div className="footer__gradient"></div>

            <div className="container footer__container">
                {/* Top Section */}
                <div className="footer__top">
                    {/* Brand */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <img src="/logo.png" alt="CarbonNex Logo" className="footer__logo-image" />
                            <span className="footer__logo-text">
                                Carbon<span className="gradient-text">Nex</span>
                            </span>
                        </Link>
                        <p className="footer__tagline">
                            Transforming businesses with sustainable ESG solutions and carbon management expertise.
                        </p>
                        <div className="footer__social">
                            <a href="#" className="footer__social-link" aria-label="LinkedIn">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M17.04 17.043h-2.962v-4.64c0-1.107-.02-2.532-1.543-2.532-1.544 0-1.78 1.206-1.78 2.45v4.722H7.793V7.5h2.844v1.307h.04c.396-.75 1.364-1.542 2.809-1.542 3.003 0 3.557 1.976 3.557 4.546v5.232zM4.447 6.194c-.951 0-1.72-.77-1.72-1.72 0-.95.769-1.72 1.72-1.72.949 0 1.719.77 1.719 1.72 0 .95-.77 1.72-1.72 1.72zm1.48 10.849H2.965V7.5h2.962v9.543zM18.52 0H1.475C.66 0 0 .645 0 1.44v17.12C0 19.355.66 20 1.475 20h17.042C19.335 20 20 19.355 20 18.56V1.44C20 .645 19.335 0 18.52 0z" fill="currentColor" />
                                </svg>
                            </a>
                            <a href="#" className="footer__social-link" aria-label="Twitter">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" fill="currentColor" />
                                </svg>
                            </a>
                            <a href="#" className="footer__social-link" aria-label="Email">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" fill="currentColor" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="footer__column">
                        <h4 className="footer__column-title">Services</h4>
                        <ul className="footer__links">
                            {services.map((service) => (
                                <li key={service.path}>
                                    <Link to={service.path} className="footer__link">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="footer__column">
                        <h4 className="footer__column-title">Company</h4>
                        <ul className="footer__links">
                            {company.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path} className="footer__link">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="footer__newsletter">
                        <h4 className="footer__column-title">Stay Updated</h4>
                        <p className="footer__newsletter-text">
                            Get the latest ESG insights and updates delivered to your inbox.
                        </p>
                        <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="footer__newsletter-input"
                                required
                            />
                            <button type="submit" className="footer__newsletter-button">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} CarbonNex. All rights reserved.
                    </p>
                    <div className="footer__legal">
                        <Link to="/contact" className="footer__legal-link">Privacy Policy</Link>
                        <Link to="/contact" className="footer__legal-link">Terms of Service</Link>
                    </div>
                </div>
            </div>


        </footer>
    );
};

export default Footer;
