import './Features.css';

function Features() {
    const features = [
        {
            number: '01',
            title: 'Automated BRSR Reporting',
            description: 'Streamline your Business Responsibility and Sustainability Reporting with intelligent automation, reducing manual effort by 80%.'
        },
        {
            number: '02',
            title: 'Real-Time Compliance Tracking',
            description: 'Monitor your ESG compliance status in real-time with live dashboards and instant alerts for regulatory changes.'
        },
        {
            number: '03',
            title: 'Data Verification & Validation',
            description: 'Ensure accuracy with AI-powered data validation and automated cross-referencing against regulatory standards.'
        },
        {
            number: '04',
            title: 'Regulatory Updates',
            description: 'Stay ahead with automated notifications on BRSR framework changes and emerging compliance requirements.'
        },
        {
            number: '05',
            title: 'Stakeholder Dashboard',
            description: 'Provide transparent ESG performance metrics to investors, boards, and stakeholders through customizable dashboards.'
        },
        {
            number: '06',
            title: 'Audit Trail Management',
            description: 'Maintain comprehensive audit trails with timestamped records, ensuring full transparency and accountability.'
        }
    ];

    return (
        <section id="features" className="features">
            <div className="container">
                <h2 className="section-title slide-up">Transforming ESG Compliance with Technology</h2>
                <p className="section-subtitle">
                    Empowering organizations with cutting-edge automation tools for seamless BRSR framework compliance
                </p>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card card" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="feature-number">{feature.number}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
