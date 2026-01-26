import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './AccreditationsPage.css';

const AccreditationsPage = () => {
    const { t } = useTranslation();

    const accreditationsData = t('accreditations.items', { returnObjects: true });
    const accreditations = Array.isArray(accreditationsData) ? accreditationsData : [];

    return (
        <div className="accreditations-page">
            <div className="accreditations-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="page-title"
                    >
                        {t('accreditations.title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="page-subtitle"
                    >
                        {t('accreditations.subtitle')}
                    </motion.p>
                </div>
            </div>

            <div className="container accreditations-content">
                <div className="accreditations-grid">
                    {accreditations && accreditations.map((item, index) => (
                        <motion.div
                            key={index}
                            className="accreditation-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <div className="card-header">
                                <span className="category-tag">{item.category}</span>
                                <span className="status-badge">{t('accreditations.comingSoon')}</span>
                            </div>
                            <h3 className="card-title">{item.name}</h3>
                            <div className="card-decoration"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccreditationsPage;
