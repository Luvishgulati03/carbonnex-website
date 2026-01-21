import './Accreditations.css';

function Accreditations() {
    const frameworks = [
        'BRSR', 'GRI', 'SASB', 'TCFD', 'CDP', 'UN SDGs',
        'ISO 14001', 'SEBI', 'MCA', 'NGRBC', 'ESG Standards', 'Carbon Trust'
    ];

    return (
        <section id="accreditations" className="accreditations">
            <div className="container">
                <h2 className="section-title">Standards & Frameworks</h2>
                <p className="section-subtitle">
                    Aligned with leading global and Indian ESG reporting frameworks and compliance standards
                </p>

                <div className="accreditations-grid">
                    {frameworks.map((framework, index) => (
                        <div key={index} className="accreditation-badge" style={{ animationDelay: `${index * 0.05}s` }}>
                            <div className="badge-content">
                                <div className="badge-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="badge-text">{framework}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="trust-indicators">
                    <div className="trust-item">
                        <h3 className="trust-number">100+</h3>
                        <p className="trust-label">Compliance Metrics</p>
                    </div>
                    <div className="trust-item">
                        <h3 className="trust-number">50+</h3>
                        <p className="trust-label">Regulatory Updates</p>
                    </div>
                    <div className="trust-item">
                        <h3 className="trust-number">99.9%</h3>
                        <p className="trust-label">Accuracy Rate</p>
                    </div>
                    <div className="trust-item">
                        <h3 className="trust-number">24/7</h3>
                        <p className="trust-label">Support Available</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Accreditations;
