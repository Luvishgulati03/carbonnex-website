import './Services.css';

function Services() {
    const services = [
        {
            title: 'BRSR Compliance Automation',
            description: 'End-to-end automation of Business Responsibility and Sustainability Reporting framework compliance, from data collection to report generation.',
            features: [
                'Automated data aggregation',
                'Real-time compliance scoring',
                'One-click report generation',
                'Regulatory change tracking'
            ]
        },
        {
            title: 'ESG Data Management',
            description: 'Centralized platform for managing all your ESG data with intelligent categorization, validation, and analytics for informed decision-making.',
            features: [
                'Unified data repository',
                'AI-powered validation',
                'Advanced analytics dashboard',
                'Multi-stakeholder access'
            ]
        },
        {
            title: 'Regulatory Advisory',
            description: 'Expert guidance on evolving ESG regulations, BRSR framework updates, and strategic compliance planning tailored to your industry.',
            features: [
                'Compliance roadmap planning',
                'Regulatory intelligence',
                'Industry benchmarking',
                'Expert consultations'
            ]
        }
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <h2 className="section-title">Comprehensive ESG Solutions</h2>
                <p className="section-subtitle">
                    Tailored services to meet your organization's unique sustainability and compliance needs
                </p>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card card" style={{ animationDelay: `${index * 0.2}s` }}>
                            <div className="service-icon">
                                <img src="/assets/images/esg-icon.png" alt={service.title} />
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <svg viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a href="#contact" className="service-link">
                                Learn More
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;
