import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import CTAButton from '../components/CTAButton';
import './ContactPage.css';

const ContactPage = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert(t('contact.form.success'));
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="contactpage">
            <section className="contact-hero">
                <div className="contact-hero__background"></div>
                <div className="container">
                    <motion.div
                        className="contact-hero__content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>{t('contact.hero.title')}</h1>
                        <p>{t('contact.hero.subtitle')}</p>
                    </motion.div>
                </div>
            </section>

            <section className="contact-content section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h2>{t('contact.info.title')}</h2>
                            <div className="contact-info__item">
                                <div className="contact-info__icon">📧</div>
                                <div>
                                    <h4>{t('contact.info.email_label')}</h4>
                                    <p>contact@carbonnex.com</p>
                                </div>
                            </div>
                            <div className="contact-info__item">
                                <div className="contact-info__icon">📞</div>
                                <div>
                                    <h4>{t('contact.info.phone_label')}</h4>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="contact-info__item">
                                <div className="contact-info__icon">📍</div>
                                <div>
                                    <h4>{t('contact.info.office_label')}</h4>
                                    <p>123 Sustainability St, Green City</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <motion.form
                            className="contact-form glass"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h3>{t('contact.form.title')}</h3>
                            <div className="form-group">
                                <label htmlFor="name">{t('contact.form.name')} *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">{t('contact.form.email')} *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">{t('contact.form.company')}</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">{t('contact.form.message')} *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <CTAButton type="submit" size="large">{t('contact.form.submit')}</CTAButton>
                        </motion.form>
                    </div>
                </div>
            </section>
        </div>
    );
};



export default ContactPage;
