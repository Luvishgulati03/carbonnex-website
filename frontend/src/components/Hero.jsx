import './Hero.css';

function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-background"></div>
            <div className="hero-overlay"></div>
            <div className="container">
                <div className="hero-content fade-in">
                    <h1 className="hero-title">
                        Automating ESG Compliance with <span className="highlight">AI-Powered Tech</span>
                    </h1>
                    <p className="hero-subtitle">
                        Streamline your sustainability reporting with CarbonNex – Your intelligent partner for end-to-end ESG compliance automation and AI-driven data insights.
                    </p>
                    <div className="hero-cta">
                        <a href="#contact" className="btn btn-primary">Get Started</a>
                        <a href="#features" className="btn btn-secondary">Learn More</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
