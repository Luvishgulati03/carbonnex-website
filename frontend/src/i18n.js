import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "nav": {
                "home": "Home",
                "about": "About Us",
                "services": "Services",
                "resources": "Resources",
                "contact": "Contact",
                "accreditations": "Accreditations",
                "getStarted": "Get Started",
                "services_dropdown": {
                    "core_platform": "Core Platform",
                    "future_capabilities": "Future Capabilities",
                    "items": {
                        "carbon_accounting": { "title": "Carbon Accounting", "desc": "Scope 1, 2, & 3 measurement" },
                        "esg_data": { "title": "ESG Data Management", "desc": "Centralized data repository" },
                        "compliance": { "title": "Compliance Reporting", "desc": "BRSR & global mandates" },
                        "evidence": { "title": "Evidence Management", "desc": "Audit trail & tagging" },
                        "ai_validation": { "title": "AI Validation", "desc": "Intelligent quality checks" },
                        "insights": { "title": "Dashboards & Insights", "desc": "Strategic visibility" },
                        "carbon_credits": { "title": "Carbon Credits", "desc": "Offsetting marketplace" },
                        "blockchain": { "title": "Blockchain Assurance", "desc": "Immutable audit records" },
                        "integrations": { "title": "Integrations", "desc": "Utility & consumer APIs" },
                        "decarbonization": { "title": "Decarbonization", "desc": "AI-driven planning" },
                        "voluntary_frameworks": { "title": "Voluntary Frameworks", "desc": "SBTi, CDP, TCFD" },
                        "supply_chain": { "title": "Supply Chain", "desc": "Product carbon footprint" }
                    },
                    "badges": {
                        "soon": "Soon"
                    }
                }
            },
            "home": {
                "hero": {
                    "badge": "Leading ESG Consultancy",
                    "title": "Transform Your Carbon Footprint Into Competitive Advantage",
                    "subtitle": "Comprehensive ESG solutions for modern enterprises",
                    "cta_primary": "Start Your ESG Journey",
                    "cta_secondary": "Explore Services",
                    "emissions_breakdown": "Corporate Emissions Breakdown"
                },
                "beta": {
                    "badge": "Coming Soon",
                    "title": "CarbonNex Compliance Automation Platform",
                    "desc": "Our AI-powered compliance automation and advisory software is launching soon. Be among the first to experience seamless BRSR reporting.",
                    "cta": "Join Waitlist"
                },
                "esg": {
                    "badge": "Understanding ESG",
                    "title": "What is ESG Reporting?",
                    "subtitle": "A structured framework for organizations to disclose their environmental, social, and governance practices",
                    "desc_p1": "ESG Reporting includes a framework for organizations to display their environmental, social, and governance practices along with their impacts and influence. The reporting aims to provide transparency on how an organization manages various ESG risks and opportunities.",
                    "desc_p2": "ESG frameworks give a structured blueprint ensuring consistency and coherence in the sustainability landscape. ESG Reporting functions as a conduit for companies to communicate their progress to potential investors.",
                    "chart_title": "Emission Reduction Trajectory"
                },
                "services": {
                    "badge": "Our Services",
                    "title": "Comprehensive ESG Solutions",
                    "subtitle": "End-to-end carbon management and sustainability services for your organization",
                    "learn_more": "Learn More"
                },
                "infographic": {
                    "badge": "Carbon Intelligence",
                    "title": "Global Emissions by Sector",
                    "desc": "Understanding where emissions come from is the first step to reducing them. Our platform provides granular insights into your industry-specific footprint."
                },
                "process": {
                    "badge": "How We Work",
                    "title": "Our Proven Process",
                    "subtitle": "A systematic approach to achieving your ESG and net-zero goals"
                },
                "regulations": {
                    "badge": "Compliance",
                    "title": "Global ESG Regulations",
                    "subtitle": "Stay compliant with evolving ESG reporting requirements worldwide"
                },
                "frameworks": {
                    "badge": "Standards",
                    "title": "Frameworks We Support",
                    "subtitle": "We help you report against all major ESG frameworks and standards"
                },
                "cta": {
                    "badge": "Get Started",
                    "title": "Ready to Begin Your Sustainability Journey?",
                    "subtitle": "Join 150+ companies that have transformed their ESG reporting and reduced their carbon footprint with CarbonNex.",
                    "primary": "Schedule Free Consultation",
                    "secondary": "Download ESG Guide"
                },
                "scope_data": {
                    "scope1": { "name": "Scope 1", "short_desc": "Direct Emissions", "desc": "Emissions from sources that an organization owns or controls directly." },
                    "scope2": { "name": "Scope 2", "short_desc": "Indirect Energy", "desc": "Emissions that a company causes indirectly when the energy it purchases and uses is produced." },
                    "scope3": { "name": "Scope 3", "short_desc": "Value Chain", "desc": "Emissions that are not produced by the company itself, but by those that it's indirectly responsible for, up and down its value chain." }
                },
                "sectors": {
                    "energy": "Energy",
                    "transport": "Transport",
                    "industry": "Industry",
                    "agriculture": "Agriculture",
                    "buildings": "Buildings"
                },
                "services_list": {
                    "scope1": { "title": "Scope 1 Emissions", "desc": "Direct emissions from owned or controlled sources" },
                    "scope2": { "title": "Scope 2 Emissions", "desc": "Indirect emissions from purchased energy" },
                    "scope3": { "title": "Scope 3 Emissions", "desc": "All other indirect emissions in value chain" },
                    "esg": { "title": "ESG Advisory", "desc": "Strategic guidance for environmental, social, and governance goals" },
                    "compliance": { "title": "Compliance Reporting", "desc": "Automated reporting for global standards", "badge": "New" },
                    "accounting": { "title": "Carbon Accounting", "desc": "Precise calculation and tracking of GHG footprint" }
                },
                "frameworks_list": {
                    "gri": "Global Reporting Initiative",
                    "tcfd": "Task Force on Climate-related Financial Disclosures",
                    "sasb": "Sustainability Accounting Standards Board",
                    "cdp": "Carbon Disclosure Project",
                    "brsr": "Business Responsibility and Sustainability Reporting",
                    "sdg": "Sustainable Development Goals"
                },
                "esg_pillars": {
                    "env": { "title": "Environmental", "items": ["Carbon Footprint", "Waste Management", "Water Usage", "Energy Efficiency"] },
                    "social": { "title": "Social", "items": ["Labor Standards", "Community Engagement", "Human Rights", "Employee Safety"] },
                    "gov": { "title": "Governance", "items": ["Board Diversity", "Ethical Conduct", "Risk Management", "Transparency"] }
                },
                "process_steps": {
                    "step1": { "title": "Discovery", "desc": "Comprehensive assessment of current ESG status and emission sources" },
                    "step2": { "title": "Data Collection", "desc": "Gather activity data from all emission sources across operations" },
                    "step3": { "title": "Analysis", "desc": "Calculate emissions using GHG Protocol methodologies" },
                    "step4": { "title": "Strategy", "desc": "Develop reduction roadmap with science-based targets" },
                    "step5": { "title": "Implementation", "desc": "Deploy CarbonNex platform for continuous monitoring" },
                    "step6": { "title": "Verification", "desc": "Third-party audit and certification of your emissions data" }
                },
                "regulations_list": {
                    "eu": { "region": "European Union", "desc": "Corporate Sustainability Reporting Directive requires detailed ESG disclosures" },
                    "us": { "region": "United States", "desc": "SEC Climate Disclosure Rules for public companies" },
                    "india": { "region": "India", "desc": "SEBI-mandated BRSR reporting for top listed companies" },
                    "uk": { "region": "United Kingdom", "desc": "Streamlined Energy and Carbon Reporting (SECR) framework" }
                }
            },
            "about": {
                "hero": {
                    "badge": "About CarbonNex",
                    "title": "Changing the World's <span class=\"text-lime\">Climattude</span>",
                    "desc": "We are a leading ESG consultancy firm helping organizations measure, manage, and reduce their environmental impact through innovative technology and expert guidance."
                },
                "mission": {
                    "title": "Our Mission",
                    "desc": "To make ESG compliance accessible, transparent, and actionable for businesses of all sizes. We combine expert consultancy with cutting-edge technology to drive meaningful environmental impact and help organizations achieve their sustainability goals.",
                    "list": ["Democratize access to ESG expertise", "Simplify complex compliance requirements", "Drive measurable environmental impact", "Enable data-driven sustainability decisions"]
                },
                "vision": {
                    "title": "Our Vision",
                    "desc": "A world where every business operates sustainably, contributing to a healthier planet and thriving communities. We envision being the global leader in ESG transformation, setting new standards for environmental accountability.",
                    "list": ["Net-zero economy by 2050", "100% transparency in corporate emissions", "Sustainability as a competitive advantage", "Climate action at the core of business strategy"]
                },
                "story": {
                    "badge": "Our Journey",
                    "title": "Our Story",
                    "p1": "Founded in 2020, CarbonNex emerged from a shared vision between environmental scientists and technology innovators. What began as a small research initiative focused on accurate carbon measurement has grown into a global consultancy trusted by enterprises worldwide.",
                    "p2": "We recognized early on that for sustainability to be truly effective, it had to be measurable, transparent, and integrated into core business strategy. The gap between corporate intentions and environmental impact was often bridged by complex data challenges—challenges we set out to solve.",
                    "p3": "Today, CarbonNex stands at the forefront of the ESG revolution. Our journey has been defined by a relentless pursuit of scientific rigor and technological excellence. From our first client partnership to enabling net-zero transitions for Industry 500 companies, our commitment remains unchanged: to empower businesses to turn their carbon footprint into a competitive advantage, leaving a lasting legacy for generations to come."
                },
                "what_we_do": {
                    "badge": "What We Do",
                    "title": "Comprehensive ESG & Carbon Solutions",
                    "subtitle": "End-to-end services covering the entire spectrum of environmental sustainability",
                    "items": [
                        { "title": "Carbon Emissions Management", "desc": "Complete Scope 1, 2, and 3 emissions tracking, calculation, and reduction strategies using GHG Protocol methodologies." },
                        { "title": "ESG Reporting & Assurance", "desc": "Sustainability reporting aligned with GRI, TCFD, SASB, and regional frameworks like BRSR with third-party verification." },
                        { "title": "Net-Zero Strategy", "desc": "Science-based target setting, decarbonization roadmaps, and implementation support to achieve net-zero goals." },
                        { "title": "Supply Chain Sustainability", "desc": "Supplier engagement, Scope 3 mapping, and value chain decarbonization programs for comprehensive impact." }
                    ]
                },
                "why_choose_us": {
                    "badge": "Why CarbonNex",
                    "title": "What Sets Us Apart",
                    "subtitle": "Trusted by organizations for ESG excellence",
                    "items": [
                        { "icon": "🎯", "title": "Domain Expertise", "desc": "Deep knowledge in carbon markets, ESG regulations, and sustainability frameworks across industries." },
                        { "icon": "🔬", "title": "Scientific Rigor", "desc": "All our methodologies are aligned with IPCC guidelines and GHG Protocol standards." },
                        { "icon": "⚡", "title": "Digital-First Approach", "desc": "Proprietary CarbonNex platform for real-time tracking, automated reporting, and data validation." },
                        { "icon": "🌍", "title": "Global Coverage", "desc": "Expertise in regulations across EU, US, UK, India, and emerging markets." },
                        { "icon": "🤝", "title": "End-to-End Support", "desc": "From baseline assessment to third-party verification, we handle the complete ESG journey." },
                        { "icon": "📊", "title": "Data-Driven Insights", "desc": "Advanced analytics to identify reduction opportunities and benchmark against industry peers." }
                    ]
                },
                "team": {
                    "badge": "Leadership",
                    "title": "Meet Our Team",
                    "subtitle": "Industry veterans with deep expertise in sustainability and climate science",
                    "items": [
                        { "name": "Dr. Priya Sharma", "role": "CEO & Founder", "expertise": "Climate Science & Policy", "image": "👩‍💼" },
                        { "name": "Rajesh Kumar", "role": "Chief Technology Officer", "expertise": "Carbon Analytics & AI", "image": "👨‍💼" },
                        { "name": "Anita Desai", "role": "Head of ESG Advisory", "expertise": "Sustainability Strategy", "image": "👩‍💼" },
                        { "name": "Michael Chen", "role": "Director of Operations", "expertise": "GHG Protocol & Verification", "image": "👨‍💼" }
                    ]
                },
                "certifications": {
                    "badge": "Credentials",
                    "title": "Our Certifications & Expertise",
                    "items": [
                        "ISO 14064 Lead Verifier",
                        "GHG Protocol Certified",
                        "CDP Accredited Partner",
                        "BRSR Framework Expert",
                        "Science-Based Targets Certified",
                        "TCFD Aligned Reporting"
                    ]
                },
                "cta": {
                    "title": "Ready to Partner With Us?",
                    "subtitle": "Join 150+ organizations that trust CarbonNex for their ESG transformation journey",
                    "primary": "Schedule Consultation",
                    "secondary": "Explore Services"
                }
            },
            "contact": {
                "hero": {
                    "title": "Get In Touch",
                    "subtitle": "Let's start your sustainability journey together"
                },
                "info": {
                    "title": "Contact Information",
                    "email_label": "Email",
                    "phone_label": "Phone",
                    "office_label": "Office"
                },
                "form": {
                    "title": "Send us a Message",
                    "name": "Name",
                    "email": "Email",
                    "company": "Company",
                    "message": "Message",
                    "submit": "Send Message",
                    "success": "Thank you for your message! We will get back to you soon."
                }
            },
            "resources": {
                "hero": {
                    "badge": "Knowledge Hub",
                    "title": "ESG Resources & Insights",
                    "desc": "Expert knowledge, guides, and tools to accelerate your sustainability journey"
                },
                "categories": [
                    { "id": "all", "name": "All Resources" },
                    { "id": "guide", "name": "Guides" },
                    { "id": "whitepaper", "name": "Whitepapers" },
                    { "id": "article", "name": "Articles" },
                    { "id": "tool", "name": "Tools" }
                ],
                "items": [
                    { "title": "Complete ESG Compliance Guide 2024", "category": "guide", "description": "A comprehensive guide covering all aspects of ESG compliance.", "topics": ["GRI Standards", "TCFD Alignment"], "readTime": "45 min read", "link": "https://www.globalreporting.org/standards/" },
                    { "title": "Carbon Accounting Best Practices", "category": "whitepaper", "description": "Learn industry best practices for accurate carbon accounting.", "topics": ["Scope 1/2/3", "Emission Factors"], "readTime": "30 min read", "link": "https://ghgprotocol.org/corporate-standard" },
                    { "title": "Understanding Scope 3 Emissions", "category": "article", "description": "Deep dive into value chain emissions management.", "topics": ["Supply Chain", "Supplier Engagement"], "readTime": "15 min read", "link": "https://www.epa.gov/climateleadership/scope-3-inventory-guidance" },
                    { "title": "BRSR Framework Overview", "category": "guide", "description": "Everything about Business Responsibility Reporting in India.", "topics": ["SEBI Guidelines", "Reporting"], "readTime": "25 min read", "link": "https://www.sebi.gov.in" },
                    { "title": "Carbon Footprint Calculator", "category": "tool", "description": "Interactive tool for estimating carbon footprint.", "topics": ["Scope 1", "Scope 2"], "readTime": "5 min to use", "link": "https://www.carbonfootprint.com/calculator.aspx" },
                    { "title": "Net Zero Roadmap Template", "category": "tool", "description": "Framework for your organization's net-zero plan.", "topics": ["Target Setting", "Milestones"], "readTime": "20 min to customize", "link": "https://sciencebasedtargets.org/net-zero" },
                    { "title": "CSRD Compliance Checklist", "category": "guide", "description": "EU CSRD requirements checklist.", "topics": ["EU Regulations", "Disclosure"], "readTime": "20 min read", "link": "https://finance.ec.europa.eu" },
                    { "title": "Science-Based Targets Explained", "category": "article", "description": "How to set science-based emissions targets.", "topics": ["SBTi", "1.5°C Pathway"], "readTime": "12 min read", "link": "https://sciencebasedtargets.org" },
                    { "title": "ESG Data Management", "category": "whitepaper", "description": "Best practices for managing ESG data.", "topics": ["Data Collection", "QA"], "readTime": "35 min read", "link": "https://www.weforum.org" }
                ],
                "glossary_section": {
                    "badge": "Reference",
                    "title": "ESG Glossary",
                    "subtitle": "Key terms and definitions in environmental sustainability"
                },
                "glossary": [
                    { "term": "ESG", "definition": "Environmental, Social, and Governance - a framework for evaluating corporate sustainability." },
                    { "term": "GHG Protocol", "definition": "The most widely used international accounting tool for greenhouse gas emissions." },
                    { "term": "Scope 1", "definition": "Direct emissions from owned or controlled sources." },
                    { "term": "Scope 2", "definition": "Indirect emissions from purchased electricity, steam, heating, and cooling." },
                    { "term": "Scope 3", "definition": "All other indirect emissions in your value chain." },
                    { "term": "BRSR", "definition": "Business Responsibility and Sustainability Reporting - mandatory for top 1000 listed companies in India." },
                    { "term": "Net Zero", "definition": "Achieving a balance between carbon emissions produced and removed from atmosphere." },
                    { "term": "Carbon Credits", "definition": "Tradeable certificates representing the right to emit one tonne of CO2." }
                ],
                "faq_section": {
                    "badge": "FAQ",
                    "title": "Frequently Asked Questions"
                },
                "faqs": [
                    { "question": "What is ESG Reporting?", "answer": "ESG Reporting is a framework for organizations to disclose their environmental, social, and governance practices." },
                    { "question": "Why is carbon accounting important?", "answer": "Carbon accounting helps organizations measure their greenhouse gas emissions and identify reduction opportunities." },
                    { "question": "What are Scope 1, 2, and 3 emissions?", "answer": "Scope 1 covers direct emissions. Scope 2 covers indirect from energy. Scope 3 includes all value chain emissions." },
                    { "question": "How long does ESG compliance take?", "answer": "Initial baseline assessment typically takes 4-8 weeks, with ongoing reporting cycles." }
                ],
                "newsletter": {
                    "title": "Stay Updated on ESG Trends",
                    "desc": "Subscribe to our newsletter for the latest insights, regulatory updates, and best practices in sustainability.",
                    "placeholder": "Enter your email address",
                    "button": "Subscribe"
                },
                "accessBtn": "Access Now"
            },

            "accreditations": {
                "title": "Our Accreditations",
                "subtitle": "Working towards global standards and certifications",
                "comingSoon": "Coming Soon"
            },
            "service_pages": {
                "common": {
                    "core_platform": "Core Platform",
                    "coming_soon": "Coming Soon",
                    "future_capabilities": "Future Capabilities",
                    "value_to_customer": "Value to Customer",
                    "join_waitlist": "Join Waitlist",
                    "request_demo": "Request Demo",
                    "explore_platform": "Explore Platform",
                    "start_accounting": "Start Accounting",
                    "automate_compliance": "Automate Compliance",
                    "unlock_insights": "Unlock Insights"
                },
                "carbon_accounting": {
                    "title": "Carbon Accounting",
                    "hero_desc": "Measure and manage your carbon emissions accurately. Reduce manual work and Excel dependency.",
                    "section_title": "Accurate, Standardized Measurement",
                    "features": [
                        { "title": "Scope 1 Emissions", "desc": "Direct emissions calculation for fuel, generators, and company vehicles." },
                        { "title": "Scope 2 Emissions", "desc": "Indirect emissions calculation for purchased electricity and heat." },
                        { "title": "Scope 3 Emissions", "desc": "Complete calculation for travel, logistics, waste, suppliers, and employee commute." },
                        { "title": "Automated Calculations", "desc": "Automated calculations aligned with GHG Protocol using industry-specific emission factor libraries." }
                    ],
                    "value_items": [
                        { "strong": "Accurate", "text": "Standardized Footprint" },
                        { "strong": "Audit-Ready", "text": "Calculations" },
                        { "strong": "Efficient", "text": "Reduced Manual Work" }
                    ]
                },
                "esg_data": {
                    "title": "ESG Data Collection & Management",
                    "hero_desc": "A central repository acting as the one source of truth for all your ESG data.",
                    "section_title": "One Source of Truth",
                    "features": [
                        { "title": "Structured Data Input", "desc": "Standardized input forms for Environmental, Social, and Governance data to ensure consistency." },
                        { "title": "Role-Based Access", "desc": "Granular permissions for Reporters, Reviewers, Auditors, and Admins." },
                        { "title": "Multi-Entity Support", "desc": "Manage data across multiple entities, locations, and business units seamlessly." },
                        { "title": "Periodic Tracking", "desc": "Flexible data collection frequencies: monthly, quarterly, or annually." }
                    ],
                    "value_items": [
                        { "strong": "Truth", "text": "One Source" },
                        { "strong": "Accountability", "text": "Internal Governance" },
                        { "strong": "Readiness", "text": "For Audits" }
                    ]
                },
                "compliance": {
                    "title": "Compliance Reporting (India + Global)",
                    "hero_desc": "Confidence in compliance. Generate disclosure-ready reports, map data to templates, and highlight missing evidence.",
                    "section_title": "Excellence in Disclosure",
                    "features": [
                        { "title": "BRSR & BRSR Core", "desc": "Full support for India's Business Responsibility and Sustainability Reporting mandates." },
                        { "title": "GHG Protocol & CCTS", "desc": "Reporting aligned with CCTS-ready emissions reporting and global GHG standards." },
                        { "title": "CBAM Preparation", "desc": "Specialized data preparation for exporters aiding in Carbon Border Adjustment Mechanism compliance." },
                        { "title": "Automated Mapping", "desc": "Automatically maps collected data to compliance templates and highlights gaps." }
                    ],
                    "value_items": [
                        { "strong": "Confidence", "text": "In Compliance" },
                        { "strong": "Safety", "text": "Low Regulatory Risk" },
                        { "strong": "Speed", "text": "Faster Reporting" }
                    ]
                },
                "insights": {
                    "title": "Dashboards & Insights",
                    "hero_desc": "Management-level visibility into your sustainability performance for strategic decision making.",
                    "section_title": "Data-Driven Decision Making",
                    "features": [
                        { "title": "Emission Trends", "desc": "Visualize historical data and track emission reduction progress over time." },
                        { "title": "Granular Breakdown", "desc": "Drill down into emissions by Scope, location, and facility to identify hotspots." },
                        { "title": "Intensity Metrics", "desc": "Monitor key performance indicators like Emissions per Revenue or Emissions per Employee." },
                        { "title": "Readiness Scores", "desc": "Real-time assessment of your compliance readiness and data completeness." }
                    ],
                    "value_items": [
                        { "strong": "Support", "text": "Decision Making" },
                        { "strong": "Reporting", "text": "Board-Level" },
                        { "strong": "Strategy", "text": "Future Planning" }
                    ]
                },
                "evidence": {
                    "title": "Evidence Management & Audit Trail",
                    "hero_desc": "Ensure every sustainability claim is backed by proof. Build trust with auditors and regulators through immutable record-keeping.",
                    "section_title": "CarbonNex ensures every number is backed by proof.",
                    "features": [
                        { "title": "Evidence Upload & Tagging", "desc": "Upload bills, invoices, policies, and logs directly to the platform. Tag evidence to specific data points for effortless retrieval." },
                        { "title": "Mandatory Linking", "desc": "Enforce accountability by requiring evidence links for critical data points before submission." },
                        { "title": "Version Control", "desc": "Track every change with a complete audit trail. Access version history and ensure data integrity over time." },
                        { "title": "Review & Approval History", "desc": "Streamline collaboration with built-in reviewer comments and a permanent record of all approval actions." }
                    ],
                    "value_items": [
                        { "strong": "Audit-Ready", "text": "Documentation" },
                        { "strong": "Reduced Risk", "text": "Of Greenwashing" },
                        { "strong": "Trusted", "text": "By Auditors" }
                    ]
                },
                "ai_validation": {
                    "title": "AI-Assisted Validation",
                    "hero_desc": "Intelligent decision support that amplifies your team's capability. Enhance data quality and reduce human error without replacing human oversight.",
                    "section_title": "AI in CarbonNex assists users, it does not replace them.",
                    "features": [
                        { "title": "Document Classification", "desc": "Automatically classify uploaded documents like utility bills, invoices, and policy documents using advanced AI models." },
                        { "title": "Missing Evidence Detection", "desc": "Proactively flag data points that lack supporting documentation before they become audit findings." },
                        { "title": "Data Inconsistency Flags", "desc": "Identify anomalies and outliers in your data automatically. Our AI learns your baseline and warns you of deviations." },
                        { "title": "Confidence Scoring", "desc": "Every data point receives an AI-generated confidence score, helping you focus review efforts where they matter most." }
                    ],
                    "value_items": [
                        { "strong": "Higher Quality", "text": "Data Assurance" },
                        { "strong": "Faster Reviews", "text": "Automated Checks" },
                        { "strong": "Reduced Error", "text": "Human-in-the-loop AI" }
                    ]
                },
                "carbon_credits": {
                    "title": "Carbon Credit & Offset Enablement",
                    "hero_desc": "Enable emission offsetting and trading with complete transparency and verification.",
                    "features": [
                        { "title": "Verified Registries", "desc": "Integration with verified carbon registries for transparent tracking." },
                        { "title": "Marketplace Integration", "desc": "Access a marketplace for credit discovery and purchasing." },
                        { "title": "Offset Matching", "desc": "Automated offset matching based on your specific emission profile." },
                        { "title": "Retirement Tracking", "desc": "End-to-end tracking of credit retirement to prevent double counting." }
                    ],
                    "value_items": [
                        { "strong": "Net-Zero", "text": "End-to-End Journey" },
                        { "strong": "Transparency", "text": "In Usage" }
                    ]
                },
                "blockchain": {
                    "title": "Blockchain-Based Assurance",
                    "hero_desc": "Anchor critical data snapshots on the blockchain for high trust and integrity.",
                    "features": [
                        { "title": "Immutable Snapshots", "desc": "Audit snapshots anchored on blockchain for tamper-proof records." },
                        { "title": "Timestamped Records", "desc": "Verifiable timestamps for all emission data entries." },
                        { "title": "Verifiable Hashes", "desc": "Cryptographic hashes available for regulators and auditors to verify data integrity." }
                    ],
                    "value_items": [
                        { "strong": "Tamper-Proof", "text": "Reporting" },
                        { "strong": "High Trust", "text": "For Regulators" }
                    ]
                },
                "integrations": {
                    "title": "Utility & Consumer Integrations",
                    "hero_desc": "Automated B2B2C integrations with external data providers for scalable data capture.",
                    "features": [
                        { "title": "Utility Integrations", "desc": "Automated carbon data extraction directly from electricity bills." },
                        { "title": "Travel Platforms", "desc": "Integration with airlines and travel providers for flight emission data." },
                        { "title": "Logistics Providers", "desc": "Seamless data capture from logistics partners." },
                        { "title": "E-commerce & Retail", "desc": "Carbon visibility for retail and e-commerce transactions." }
                    ],
                    "value_items": [
                        { "strong": "Automated", "text": "Scope 3 Data" },
                        { "strong": "Scalable", "text": "Data Capture" }
                    ]
                },
                "decarbonization": {
                    "title": "Decarbonization Planning",
                    "hero_desc": "Move beyond reporting into action. Plan your net-zero journey with data-backed strategies.",
                    "features": [
                        { "title": "Hotspot Identification", "desc": "Pinpoint exact sources of high emissions within your operations." },
                        { "title": "Scenario Modeling", "desc": "Model different reduction scenarios to see potential outcomes." },
                        { "title": "Cost-Benefit Analysis", "desc": "Evaluate the ROI of various decarbonization actions." },
                        { "title": "AI Recommendations", "desc": "Get AI-driven suggestions for practical emission reduction." }
                    ],
                    "value_items": [
                        { "strong": "Practical", "text": "Reduction Actions" },
                        { "strong": "ROI-Driven", "text": "Strategy" }
                    ]
                },
                "voluntary_frameworks": {
                    "title": "Voluntary Frameworks",
                    "hero_desc": "Expanded support for voluntary sustainability initiatives beyond mandatory compliance.",
                    "features": [
                        { "title": "SBTi Tracking", "desc": "Track progress against Science Based Targets initiative goals." },
                        { "title": "CDP Support", "desc": "Data preparation and support for Carbon Disclosure Project submissions." },
                        { "title": "RE100 Monitoring", "desc": "Monitor renewable energy usage for RE100 commitments." },
                        { "title": "TCFD & SDGs", "desc": "Insights aligned with TCFD risks and UN Sustainable Development Goals." }
                    ],
                    "value_items": [
                        { "strong": "Investor", "text": "Readiness" },
                        { "strong": "Global", "text": "Credibility" }
                    ]
                },
                "supply_chain": {
                    "title": "Supply Chain & Product Accounting",
                    "hero_desc": "Advanced Scope 3 tracking and product sustainability analysis for export readiness.",
                    "features": [
                        { "title": "Supplier Data Portals", "desc": "Dedicated portals for suppliers to input their emission data directly." },
                        { "title": "Product Carbon Footprint", "desc": "Calculate PCF for individual products to assess lifecycle impact." },
                        { "title": "LCA Integration", "desc": "Integration with Life Cycle Assessment tools for deeper analysis." },
                        { "title": "Digital Product Passport", "desc": "Preparation for upcoming Digital Product Passport requirements." }
                    ],
                    "value_items": [
                        { "strong": "Export", "text": "Readiness" },
                        { "strong": "Transparency", "text": "Supply Chain" }
                    ]
                }
            },
            "accreditations": {
                "title": "Our Accreditations & Standards",
                "subtitle": "CarbonNex is aligned with global standards and continuously expanding its verification network.",
                "comingSoon": "Coming Soon",
                "items": [
                    { "name": "Global Accreditation Bureau (GAB)", "category": "Accreditation" },
                    { "name": "Clean Development Mechanism (CDM)", "category": "UNFCCC" },
                    { "name": "ANSI National Accreditation Board (ANAB)", "category": "Accreditation" },
                    { "name": "Social Carbon", "category": "Standard" },
                    { "name": "Climate, Community & Biodiversity Alliance (CCBA)", "category": "Standard" },
                    { "name": "Global Carbon Council (GCC)", "category": "Standard" },
                    { "name": "Gold Standard", "category": "Standard" },
                    { "name": "Ministry of Agriculture & Farmers Welfare (SFAC)", "category": "Government" },
                    { "name": "Open Forest Protocol (OFP)", "category": "Protocol" },
                    { "name": "AA1000AS", "category": "AccountAbility" },
                    { "name": "Cercarbono", "category": "Standard" },
                    { "name": "Climate Action Reserve (CAR)", "category": "Standard" },
                    { "name": "KliK Foundation", "category": "Foundation" },
                    { "name": "Ormex", "category": "Registry" },
                    { "name": "International Carbon Registry (ICR)", "category": "Registry" },
                    { "name": "Universal Carbon Registry (UCR)", "category": "Registry" },
                    { "name": "Ecosystem Restoration Standard (ERS)", "category": "Standard" },
                    { "name": "Puro.earth", "category": "Standard" },
                    { "name": "VCS / Verra", "category": "Standard" },
                    { "name": "American Carbon Registry (ACR)", "category": "Registry" },
                    { "name": "BioCarbon Standard", "category": "Standard" },
                    { "name": "GRESB", "category": "Benchmark" },
                    { "name": "Joint Crediting Mechanism (JCM)", "category": "Mechanism" }
                ]
            },
            "services_hub": {
                "hero": {
                    "badge": "Our Platform",
                    "title": "End-to-End ESG Solutions",
                    "desc": "From accurate carbon accounting to advanced decarbonization strategies, CarbonNex empowers your sustainability journey."
                },
                "core": {
                    "title": "Core Operations Module",
                    "subtitle": "Essential tools available now to streamline your ESG reporting"
                },
                "future": {
                    "badge": "Innovation Roadmap",
                    "title": "Future Capabilities",
                    "subtitle": "Pioneering the next generation of sustainability technology"
                },
                "cta": {
                    "title": "Ready to get started?",
                    "subtitle": "Book a demo to see our core platform in action.",
                    "button": "Schedule Demo"
                },
                "common": {
                    "explore": "Explore Solution",
                    "learn_more": "Learn more about this module"
                },
                "items": {
                    "carbon_accounting": {
                        "desc": "Measure and manage Scope 1, 2, and 3 emissions accurately with industry-specific factors.",
                        "icon": "📊",
                        "features": ["GHG Protocol Aligned", "Automated Calculations", "Audit-Ready"]
                    },
                    "esg_data": {
                        "desc": "Central repository for structured ESG data input with role-based access and multi-entity support.",
                        "icon": "💾",
                        "features": ["Structured Input", "Role-Based Access", "Multi-Entity Support"]
                    },
                    "compliance": {
                        "desc": "Generate disclosure-ready reports for BRSR, GHG Protocol, and CBAM.",
                        "icon": "📝",
                        "features": ["BRSR Core", "Global Templates", "Gap Analysis"]
                    },
                    "evidence": {
                        "desc": "Ensure every number is backed by proof with mandatory linking and version control.",
                        "icon": "🔒",
                        "features": ["Evidence Tagging", "Version Control", "Reviewer History"]
                    },
                    "ai_validation": {
                        "desc": "Intelligent decision support for document classification and anomaly detection.",
                        "icon": "🤖",
                        "features": ["Smart Classification", "Anomaly Detection", "Confidence Scoring"]
                    },
                    "insights": {
                        "desc": "Management-level visibility with real-time trends, intensity metrics, and compliance scores.",
                        "icon": "📈",
                        "features": ["Real-time Trends", "Intensity Metrics", "Decision Support"]
                    },
                    "carbon_credits": {
                        "desc": "Marketplace integration for verified carbon credit discovery, matching, and retirement.",
                        "icon": "🌱"
                    },
                    "blockchain": {
                        "desc": "Immutable audit snapshots and timestamped emission records anchored on blockchain.",
                        "icon": "⛓️"
                    },
                    "integrations": {
                        "desc": "Automated data capture from electricity utilities, airlines, logistics, and e-commerce.",
                        "icon": "🔌"
                    },
                    "decarbonization": {
                        "desc": "Action planning with emission hotspot identification and reduction scenario modeling.",
                        "icon": "📉"
                    },
                    "voluntary_frameworks": {
                        "desc": "Expanded support for SBTi target tracking, CDP submissions, and TCFD-aligned insights.",
                        "icon": "🎯"
                    },
                    "supply_chain": {
                        "desc": "Supplier data portals, Product Carbon Footprint (PCF), and LCA integration.",
                        "icon": "📦"
                    }
                }
            },

        }
    },
    fr: {
        translation: {
            "nav": {
                "home": "Accueil",
                "about": "À Propos",
                "services": "Services",
                "resources": "Ressources",
                "contact": "Contact",
                "accreditations": "Accréditations",
                "getStarted": "Excel",
                "services_dropdown": {
                    "core_platform": "Plateforme Principale",
                    "future_capabilities": "Capacités Futures",
                    "items": {
                        "carbon_accounting": { "title": "Comptabilité Carbone", "desc": "Mesure Scope 1, 2 & 3" },
                        "esg_data": { "title": "Gestion Données ESG", "desc": "Référentiel centralisé" },
                        "compliance": { "title": "Reporting Conformité", "desc": "BRSR & mandats globaux" },
                        "evidence": { "title": "Gestion des Preuves", "desc": "Piste d'audit & marquage" },
                        "ai_validation": { "title": "Validation IA", "desc": "Contrôles qualité intelligents" },
                        "insights": { "title": "Tableaux de Bord", "desc": "Visibilité stratégique" },
                        "carbon_credits": { "title": "Crédits Carbone", "desc": "Place de marché compensation" },
                        "blockchain": { "title": "Assurance Blockchain", "desc": "Dossiers d'audit immuables" },
                        "integrations": { "title": "Intégrations", "desc": "APIs utilitaires & conso" },
                        "decarbonization": { "title": "Décarbonation", "desc": "Planification pilotée par IA" },
                        "voluntary_frameworks": { "title": "Cadres Volontaires", "desc": "SBTi, CDP, TCFD" },
                        "supply_chain": { "title": "Chaîne d'Appro", "desc": "Empreinte carbone produit" }
                    },
                    "badges": {
                        "soon": "Bientôt"
                    }
                }
            },
            "home": {
                "hero": {
                    "badge": "Conseil ESG Leader",
                    "title": "Transformez Votre Empreinte Carbone en Avantage Concurrentiel",
                    "subtitle": "Solutions ESG complètes pour les entreprises modernes",
                    "cta_primary": "Commencer Votre Parcours",
                    "cta_secondary": "Explorer les Services",
                    "emissions_breakdown": "Répartition des Émissions"
                },
                "beta": {
                    "badge": "Bientôt Disponible",
                    "title": "Plateforme d'Automatisation CarbonNex",
                    "desc": "Notre logiciel d'automatisation de la conformité alimenté par l'IA arrive bientôt. Soyez parmi les premiers à expérimenter le reporting BRSR transparent.",
                    "cta": "Rejoindre la liste"
                },
                "esg": {
                    "badge": "Comprendre l'ESG",
                    "title": "Qu'est-ce que le Reporting ESG ?",
                    "subtitle": "Un cadre structuré pour divulguer les pratiques environnementales, sociales et de gouvernance",
                    "desc_p1": "Le reporting ESG permet aux organisations d'afficher leurs pratiques environnementales, sociales et de gouvernance ainsi que leurs impacts. Il vise à offrir de la transparence sur la gestion des risques et opportunités ESG.",
                    "desc_p2": "Les cadres ESG fournissent un modèle structuré assurant cohérence dans le paysage du développement durable. Ils servent de canal pour communiquer les progrès aux investisseurs potentiels.",
                    "chart_title": "Trajectoire de Réduction"
                },
                "services": {
                    "badge": "Nos Services",
                    "title": "Solutions ESG Complètes",
                    "subtitle": "Gestion du carbone de bout en bout et services de durabilité pour votre organisation",
                    "learn_more": "En Savoir Plus"
                },
                "infographic": {
                    "badge": "Intelligence Carbone",
                    "title": "Émissions Globales par Secteur",
                    "desc": "Comprendre l'origine des émissions est la première étape pour les réduire. Notre plateforme fournit des informations granulaires sur votre empreinte sectorielle."
                },
                "process": {
                    "badge": "Notre Méthode",
                    "title": "Notre Processus Éprouvé",
                    "subtitle": "Une approche systématique pour atteindre vos objectifs ESG et net-zéro"
                },
                "regulations": {
                    "badge": "Conformité",
                    "title": "Réglementations ESG Globales",
                    "subtitle": "Restez conforme aux exigences de reporting ESG en constante évolution"
                },
                "frameworks": {
                    "badge": "Standards",
                    "title": "Cadres Supportés",
                    "subtitle": "Nous vous aidons à reporter selon tous les principaux cadres et normes ESG"
                },
                "cta": {
                    "badge": "Commencer",
                    "title": "Prêt à Commencer Votre Voyage Durable ?",
                    "subtitle": "Rejoignez plus de 150 entreprises qui ont transformé leur reporting ESG avec CarbonNex.",
                    "primary": "Consultation Gratuite",
                    "secondary": "Guide ESG"
                },
                "scope_data": {
                    "scope1": { "name": "Scope 1", "short_desc": "Émissions directes", "desc": "Émissions provenant de sources détenues ou contrôlées par l'organisation." },
                    "scope2": { "name": "Scope 2", "short_desc": "Énergie indirecte", "desc": "Émissions indirectes liées à la production d'énergie achetée et consommée." },
                    "scope3": { "name": "Scope 3", "short_desc": "Chaîne de valeur", "desc": "Toutes les autres émissions indirectes de la chaîne de valeur, en amont et en aval." }
                },
                "sectors": {
                    "energy": "Énergie",
                    "transport": "Transport",
                    "industry": "Industrie",
                    "agriculture": "Agriculture",
                    "buildings": "Bâtiments"
                },
                "services_list": {
                    "scope1": { "title": "Émissions Scope 1", "desc": "Émissions directes des sources contrôlées" },
                    "scope2": { "title": "Émissions Scope 2", "desc": "Émissions indirectes de l'énergie achetée" },
                    "scope3": { "title": "Émissions Scope 3", "desc": "Émissions indirectes de la chaîne de valeur" },
                    "esg": { "title": "Conseil ESG", "desc": "Orientation stratégique pour les objectifs ESG" },
                    "compliance": { "title": "Reporting de Conformité", "desc": "Reporting automatisé pour les normes mondiales", "badge": "Nouveau" },
                    "accounting": { "title": "Comptabilité Carbone", "desc": "Calcul précis et suivi de l'empreinte GES" }
                },
                "frameworks_list": {
                    "gri": "Initiative Mondiale de Reporting",
                    "tcfd": "Groupe de travail sur l'information financière relative aux changements climatiques",
                    "sasb": "Conseil des normes comptables de durabilité",
                    "cdp": "Projet de divulgation du carbone",
                    "brsr": "Rapport sur la responsabilité et la durabilité des entreprises",
                    "sdg": "Objectifs de développement durable"
                },
                "esg_pillars": {
                    "env": { "title": "Environnemental", "items": ["Empreinte carbone", "Gestion des déchets", "Utilisation de l'eau", "Efficacité énergétique"] },
                    "social": { "title": "Social", "items": ["Normes du travail", "Engagement communautaire", "Droits de l'homme", "Sécurité des employés"] },
                    "gov": { "title": "Gouvernance", "items": ["Diversité du conseil", "Conduite éthique", "Gestion des risques", "Transparence"] }
                },
                "process_steps": {
                    "step1": { "title": "Découverte", "desc": "Évaluation complète du statut ESG actuel et des sources d'émission" },
                    "step2": { "title": "Collecte de Données", "desc": "Rassembler les données d'activité de toutes les sources d'émission" },
                    "step3": { "title": "Analyse", "desc": "Calculer les émissions en utilisant les méthodologies du GHG Protocol" },
                    "step4": { "title": "Stratégie", "desc": "Développer une feuille de route de réduction avec des objectifs scientifiques" },
                    "step5": { "title": "Mise en œuvre", "desc": "Déployer la plateforme CarbonNex pour une surveillance continue" },
                    "step6": { "title": "Vérification", "desc": "Audit tiers et certification de vos données d'émissions" }
                },
                "regulations_list": {
                    "eu": { "region": "Union Européenne", "desc": "La directive CSRD exige des divulgations ESG détaillées" },
                    "us": { "region": "États-Unis", "desc": "Règles de divulgation climatique de la SEC pour les entreprises publiques" },
                    "india": { "region": "Inde", "desc": "Reporting BRSR mandaté par le SEBI pour les grandes entreprises cotées" },
                    "uk": { "region": "Royaume-Uni", "desc": "Cadre de reporting énergétique et carbone simplifié (SECR)" }
                }
            },
            "about": {
                "hero": {
                    "badge": "À Propos",
                    "title": "Changer la <span class=\"text-lime\">Climatitude</span> du Monde",
                    "desc": "Nous sommes un cabinet de conseil ESG de premier plan aidant les organisations à mesurer, gérer et réduire leur impact environnemental."
                },
                "mission": {
                    "title": "Notre Mission",
                    "desc": "Rendre la conformité ESG accessible, transparente et exploitable pour les entreprises de toutes tailles.",
                    "list": ["Démocratiser l'accès à l'expertise ESG", "Simplifier les exigences de conformité", "Générer un impact environnemental mesurable", "Permettre des décisions durables basées sur les données"]
                },
                "vision": {
                    "title": "Notre Vision",
                    "desc": "Un monde où chaque entreprise fonctionne de manière durable, contribuant à une planète plus saine.",
                    "list": ["Économie net-zéro d'ici 2050", "Transparence totale des émissions", "La durabilité comme avantage concurrentiel", "L'action climatique au cœur de la stratégie"]
                },
                "story": {
                    "badge": "Notre Parcours",
                    "title": "Notre Histoire",
                    "p1": "Fondée en 2020, CarbonNex est née d'une vision partagée entre scientifiques de l'environnement et innovateurs technologiques.",
                    "p2": "Nous avons reconnu tôt que pour être efficace, la durabilité devait être mesurable et transparente.",
                    "p3": "Aujourd'hui, CarbonNex est à la pointe de la révolution ESG."
                },
                "what_we_do": {
                    "badge": "Ce Que Nous Faisons",
                    "title": "Solutions ESG et Carbone Complètes",
                    "subtitle": "Services de bout en bout couvrant tout le spectre de la durabilité environnementale",
                    "items": [
                        { "title": "Gestion des Émissions", "desc": "Suivi complet des Scope 1, 2 et 3." },
                        { "title": "Reporting ESG", "desc": "Rapports alignés avec GRI, TCFD, SASB." },
                        { "title": "Stratégie Net-Zéro", "desc": "Définition d'objectifs basés sur la science." },
                        { "title": "Durabilité de la Chaîne", "desc": "Engagement des fournisseurs et décarbonisation." }
                    ]
                },
                "why_choose_us": {
                    "badge": "Pourquoi Nous",
                    "title": "Ce Qui Nous Distingue",
                    "subtitle": "Reconnu pour l'excellence ESG",
                    "items": [
                        { "icon": "🎯", "title": "Expertise Domaine", "desc": "Connaissance approfondie des marchés carbone." },
                        { "icon": "🔬", "title": "Rigueur Scientifique", "desc": "Méthodologies alignées sur le GIEC." },
                        { "icon": "⚡", "title": "Approche Numérique", "desc": "Plateforme propriétaire CarbonNex." },
                        { "icon": "🌍", "title": "Couverture Globale", "desc": "Expertise en réglementations mondiales." },
                        { "icon": "🤝", "title": "Support Complet", "desc": "De l'évaluation à la vérification." },
                        { "icon": "📊", "title": "Insights Données", "desc": "Analyses avancées." }
                    ]
                },
                "team": {
                    "badge": "Leadership",
                    "title": "Notre Équipe",
                    "subtitle": "Vétérans de l'industrie avec une expertise approfondie",
                    "items": [
                        { "name": "Dr. Priya Sharma", "role": "PDG et Fondatrice", "expertise": "Science du Climat", "image": "👩‍💼" },
                        { "name": "Rajesh Kumar", "role": "Directeur Technique", "expertise": "IA et Analyse Carbone", "image": "👨‍💼" },
                        { "name": "Anita Desai", "role": "Responsable Conseil ESG", "expertise": "Stratégie Durable", "image": "👩‍💼" },
                        { "name": "Michael Chen", "role": "Directeur Opérations", "expertise": "GHG Protocol", "image": "👨‍💼" }
                    ]
                },
                "certifications": {
                    "badge": "Certifications",
                    "title": "Nos Certifications",
                    "items": [
                        "Vérificateur Principal ISO 14064",
                        "Certifié GHG Protocol",
                        "Partenaire Accrédité CDP",
                        "Expert Cadre BRSR",
                        "Certifié SBTi",
                        "Reporting TCFD"
                    ]
                },
                "cta": {
                    "title": "Prêt à Collaborer ?",
                    "subtitle": "Rejoignez plus de 150 organisations qui nous font confiance",
                    "primary": "Planifier Consultation",
                    "secondary": "Voir Services"
                }
            },
            "contact": {
                "hero": {
                    "title": "Contactez-nous",
                    "subtitle": "Commençons votre voyage durable ensemble"
                },
                "info": {
                    "title": "Informations de Contact",
                    "email_label": "Email",
                    "phone_label": "Téléphone",
                    "office_label": "Bureau"
                },
                "form": {
                    "title": "Envoyez un Message",
                    "name": "Nom",
                    "email": "Email",
                    "company": "Entreprise",
                    "message": "Message",
                    "submit": "Envoyer",
                    "success": "Merci pour votre message ! Nous vous répondrons bientôt."
                }
            },
            "resources": {
                "hero": {
                    "badge": "Centre de Connaissances",
                    "title": "Ressources et Perspectives ESG",
                    "desc": "Connaissances d'experts, guides et outils pour accélérer votre parcours durable"
                },
                "categories": [
                    { "id": "all", "name": "Toutes" },
                    { "id": "guide", "name": "Guides" },
                    { "id": "whitepaper", "name": "Livres Blancs" },
                    { "id": "article", "name": "Articles" },
                    { "id": "tool", "name": "Outils" }
                ],
                "items": [
                    { "title": "Guide de Conformité ESG 2024", "category": "guide", "description": "Un guide complet couvrant tous les aspects de la conformité ESG.", "topics": ["Normes GRI", "Alignement TCFD"], "readTime": "45 min de lecture", "link": "https://www.globalreporting.org/standards/" },
                    { "title": "Meilleures Pratiques Comptabilité Carbone", "category": "whitepaper", "description": "Apprenez les meilleures pratiques pour une comptabilité carbone précise.", "topics": ["Scope 1/2/3", "Facteurs d'Émission"], "readTime": "30 min de lecture", "link": "https://ghgprotocol.org/corporate-standard" },
                    { "title": "Comprendre les Émissions Scope 3", "category": "article", "description": "Plongée dans la gestion des émissions de la chaîne de valeur.", "topics": ["Chaîne d'Appro", "Fournisseurs"], "readTime": "15 min de lecture", "link": "https://www.epa.gov/climateleadership/scope-3-inventory-guidance" },
                    { "title": "Aperçu du Cadre BRSR", "category": "guide", "description": "Tout sur le reporting de responsabilité en Inde.", "topics": ["Directives SEBI", "Reporting"], "readTime": "25 min de lecture", "link": "https://www.sebi.gov.in" },
                    { "title": "Calculateur d'Empreinte Carbone", "category": "tool", "description": "Outil interactif pour estimer l'empreinte carbone.", "topics": ["Scope 1", "Scope 2"], "readTime": "5 min d'utilisation", "link": "https://www.carbonfootprint.com/calculator.aspx" },
                    { "title": "Modèle de Feuille de Route Net Zéro", "category": "tool", "description": "Cadre pour votre plan de transition net-zéro.", "topics": ["Cibles", "Jalons"], "readTime": "20 min pour personnaliser", "link": "https://sciencebasedtargets.org/net-zero" },
                    { "title": "Liste de Contrôle Conformité CSRD", "category": "guide", "description": "Liste de contrôle des exigences CSRD de l'UE.", "topics": ["Règles UE", "Divulgation"], "readTime": "20 min de lecture", "link": "https://finance.ec.europa.eu" },
                    { "title": "Objectifs Basés sur la Science Expliqués", "category": "article", "description": "Comment définir des cibles de réduction d'émissions.", "topics": ["SBTi", "Trajectoire 1.5°C"], "readTime": "12 min de lecture", "link": "https://sciencebasedtargets.org" },
                    { "title": "Gestion des Données ESG", "category": "whitepaper", "description": "Meilleures pratiques pour gérer les données ESG.", "topics": ["Collecte de Données", "QA"], "readTime": "35 min de lecture", "link": "https://www.weforum.org" }
                ],
                "glossary_section": {
                    "badge": "Référence",
                    "title": "Glossaire ESG",
                    "subtitle": "Termes et définitions clés en durabilité environnementale"
                },
                "glossary": [
                    { "term": "ESG", "definition": "Environnement, Social et Gouvernance - un cadre pour évaluer la durabilité." },
                    { "term": "GHG Protocol", "definition": "L'outil comptable le plus utilisé pour les gaz à effet de serre." },
                    { "term": "Scope 1", "definition": "Émissions directes de sources détenues ou contrôlées." },
                    { "term": "Scope 2", "definition": "Émissions indirectes provenant de l'électricité achetée." },
                    { "term": "Scope 3", "definition": "Toutes les autres émissions indirectes de votre chaîne de valeur." },
                    { "term": "BRSR", "definition": "Reporting de Responsabilité et Durabilité - obligatoire en Inde." },
                    { "term": "Net Zero", "definition": "Atteindre un équilibre entre le carbone émis et éliminé." },
                    { "term": "Crédits Carbone", "definition": "Certificats échangeables représentant une tonne de CO2." }
                ],
                "faq_section": {
                    "badge": "FAQ",
                    "title": "Questions Fréquentes"
                },
                "faqs": [
                    { "question": "Qu'est-ce que le Reporting ESG ?", "answer": "Le Reporting ESG est un cadre pour divulguer les pratiques environnementales, sociales et de gouvernance." },
                    { "question": "Pourquoi la comptabilité carbone est-elle importante ?", "answer": "Elle aide les organisations à mesurer leurs émissions de GES et à identifier les opportunités de réduction." },
                    { "question": "Que sont les émissions Scope 1, 2 et 3 ?", "answer": "Scope 1 : directes. Scope 2 : indirectes énergie. Scope 3 : chaîne de valeur." },
                    { "question": "Combien de temps prend la conformité ESG ?", "answer": "L'évaluation initiale prend généralement 4 à 8 semaines, avec des cycles continus." }
                ],
                "newsletter": {
                    "title": "Restez Informé des Tendances ESG",
                    "desc": "Abonnez-vous à notre newsletter pour les dernières informations et meilleures pratiques.",
                    "placeholder": "Entrez votre adresse email",
                    "button": "S'abonner"
                },
                "accessBtn": "Accéder"
            },

            "accreditations": {
                "title": "Nos Accréditations",
                "subtitle": "Travailler vers des normes et certifications mondiales",
                "comingSoon": "Bientôt Disponible"
            },
            "service_pages": {
                "common": {
                    "core_platform": "Plateforme Principale",
                    "coming_soon": "Bientôt",
                    "future_capabilities": "Fonctionnalités Futures",
                    "value_to_customer": "Valeur pour le Client",
                    "join_waitlist": "Rejoindre la Liste",
                    "request_demo": "Demander une Démo",
                    "explore_platform": "Explorer la Plateforme",
                    "start_accounting": "Commencer",
                    "automate_compliance": "Automatiser la Conformité",
                    "unlock_insights": "Voir les Insights"
                },
                "carbon_accounting": {
                    "title": "Comptabilité Carbone",
                    "hero_desc": "Mesurez et gérez vos émissions de carbone avec précision. Réduisez le travail manuel.",
                    "section_title": "Mesure Précise et Standardisée",
                    "features": [
                        { "title": "Émissions Scope 1", "desc": "Calcul des émissions directes (carburant, générateurs, véhicules)." },
                        { "title": "Émissions Scope 2", "desc": "Calcul des émissions indirectes (électricité et chaleur achetées)." },
                        { "title": "Émissions Scope 3", "desc": "Calcul complet pour voyages, logistique, déchets, fournisseurs." },
                        { "title": "Calculs Automatisés", "desc": "Calculs alignés sur le GHG Protocol avec des bibliothèques de facteurs d'émission." }
                    ],
                    "value_items": [
                        { "strong": "Précis", "text": "Empreinte Standardisée" },
                        { "strong": "Prêt pour l'Audit", "text": "Calculs Vérifiables" },
                        { "strong": "Efficace", "text": "Moins de Travail Manuel" }
                    ]
                },
                "esg_data": {
                    "title": "Collecte & Gestion des Données ESG",
                    "hero_desc": "Un référentiel central comme source unique de vérité pour toutes vos données ESG.",
                    "section_title": "Source Unique de Vérité",
                    "features": [
                        { "title": "Saisie de Données Structurée", "desc": "Formulaires standardisés pour assurer la cohérence des données." },
                        { "title": "Accès Basé sur les Rôles", "desc": "Permissions granulaires pour Reporters, Réviseurs, Auditeurs et Admins." },
                        { "title": "Support Multi-Entités", "desc": "Gérez les données de plusieurs entités et sites de manière transparente." },
                        { "title": "Suivi Périodique", "desc": "Fréquences de collecte flexibles : mensuelle, trimestrielle ou annuelle." }
                    ],
                    "value_items": [
                        { "strong": "Vérité", "text": "Source Unique" },
                        { "strong": "Responsabilité", "text": "Gouvernance Interne" },
                        { "strong": "Préparation", "text": "Pour les Audits" }
                    ]
                },
                "compliance": {
                    "title": "Reporting de Conformité",
                    "hero_desc": "Conformité en toute confiance. Générez des rapports prêts à être divulgués.",
                    "section_title": "Excellence dans la Divulgation",
                    "features": [
                        { "title": "BRSR & BRSR Core", "desc": "Support complet pour les mandats BRSR de l'Inde." },
                        { "title": "GHG Protocol & CCTS", "desc": "Reporting aligné sur le CCTS et les normes mondiales GHG." },
                        { "title": "Préparation CBAM", "desc": "Préparation des données spécialisée pour les exportateurs (CBAM)." },
                        { "title": "Mappage Automatisé", "desc": "Mappe automatiquement les données aux modèles de conformité." }
                    ],
                    "value_items": [
                        { "strong": "Confiance", "text": "En Conformité" },
                        { "strong": "Sécurité", "text": "Risque Réglementaire Faible" },
                        { "strong": "Vitesse", "text": "Reporting Plus Rapide" }
                    ]
                },
                "insights": {
                    "title": "Tableaux de Bord & Insights",
                    "hero_desc": "Visibilité au niveau de la direction sur votre performance durable.",
                    "section_title": "Prise de Décision Basée sur les Données",
                    "features": [
                        { "title": "Tendances d'Émission", "desc": "Visualisez les données historiques et suivez les progrès de réduction." },
                        { "title": "Répartition Granulaire", "desc": "Analysez les émissions par Scope, site et installation." },
                        { "title": "Métriques d'Intensité", "desc": "Suivez les KPI comme les émissions par revenu ou par employé." },
                        { "title": "Scores de Préparation", "desc": "Évaluation en temps réel de votre préparation à la conformité." }
                    ],
                    "value_items": [
                        { "strong": "Support", "text": "Prise de Décision" },
                        { "strong": "Reporting", "text": "Niveau Conseil" },
                        { "strong": "Stratégie", "text": "Planification Future" }
                    ]
                },
                "evidence": {
                    "title": "Gestion des Preuves & Piste d'Audit",
                    "hero_desc": "Assurez que chaque affirmation est étayée par des preuves. Établissez la confiance.",
                    "section_title": "CarbonNex garantit que chaque chiffre est prouvé.",
                    "features": [
                        { "title": "Téléchargement de Preuves", "desc": "Téléchargez factures et journaux. Taguez les preuves pour une récupération facile." },
                        { "title": "Lien Obligatoire", "desc": "Exigez des liens de preuve pour les points de données critiques." },
                        { "title": "Contrôle de Version", "desc": "Suivez chaque changement avec une piste d'audit complète." },
                        { "title": "Historique d'Approbation", "desc": "Rationalisez la collaboration avec des commentaires et un registre permanent." }
                    ],
                    "value_items": [
                        { "strong": "Prêt Audit", "text": "Documentation" },
                        { "strong": "Risque Réduit", "text": "De Greenwashing" },
                        { "strong": "Confiance", "text": "Des Auditeurs" }
                    ]
                },
                "ai_validation": {
                    "title": "Validation Assistée par IA",
                    "hero_desc": "Support décisionnel intelligent. Améliorez la qualité des données sans remplacer l'humain.",
                    "section_title": "L'IA dans CarbonNex assiste les utilisateurs.",
                    "features": [
                        { "title": "Classification de Documents", "desc": "Classifiez automatiquement les factures et documents par IA." },
                        { "title": "Détection de Preuves Manquantes", "desc": "Signalez proactivement les données manquant de documentation." },
                        { "title": "Drapeaux d'Incohérence", "desc": "Identifiez automatiquement les anomalies et valeurs aberrantes." },
                        { "title": "Score de Confiance", "desc": "Chaque point de données reçoit un score de confiance IA." }
                    ],
                    "value_items": [
                        { "strong": "Haute Qualité", "text": "Assurance Données" },
                        { "strong": "Vitesse", "text": "Vérifications Auto" },
                        { "strong": "Erreur Réduite", "text": "IA avec Humain" }
                    ]
                },
                "carbon_credits": {
                    "title": "Crédits Carbone & Compensation",
                    "hero_desc": "Activez la compensation et le commerce des émissions avec transparence.",
                    "features": [
                        { "title": "Registres Vérifiés", "desc": "Intégration avec des registres carbone vérifiés pour la transparence." },
                        { "title": "Intégration Marketplace", "desc": "Accès à une place de marché pour l'achat de crédits." },
                        { "title": "Matching de Compensation", "desc": "Correspondance automatisée basée sur votre profil d'émission." },
                        { "title": "Suivi des Retraites", "desc": "Suivi de bout en bout pour éviter le double comptage." }
                    ],
                    "value_items": [
                        { "strong": "Net-Zero", "text": "Voyage Complet" },
                        { "strong": "Transparence", "text": "Dans l'Usage" }
                    ]
                },
                "blockchain": {
                    "title": "Assurance Basée sur Blockchain",
                    "hero_desc": "Ancrez les instantanés de données critiques sur la blockchain.",
                    "features": [
                        { "title": "Instantanés Immuables", "desc": "Instantanés d'audit ancrés sur la blockchain." },
                        { "title": "Enregistrements Horodatés", "desc": "Horodatage vérifiable pour toutes les entrées de données." },
                        { "title": "Hachages Vérifiables", "desc": "Hachages cryptographiques disponibles pour les auditeurs." }
                    ],
                    "value_items": [
                        { "strong": "Inviolable", "text": "Reporting" },
                        { "strong": "Haute Confiance", "text": "Pour Régulateurs" }
                    ]
                },
                "integrations": {
                    "title": "Intégrations Utilitaires & Consommateurs",
                    "hero_desc": "Intégrations automatisées pour une capture de données évolutive.",
                    "features": [
                        { "title": "Intégrations Utilitaires", "desc": "Extraction automatique des données carbone des factures." },
                        { "title": "Plateformes de Voyage", "desc": "Intégration avec les compagnies aériennes pour les données de vol." },
                        { "title": "Fournisseurs Logistiques", "desc": "Capture de données transparente depuis les partenaires logistiques." },
                        { "title": "E-commerce & Détail", "desc": "Visibilité carbone pour les transactions de détail." }
                    ],
                    "value_items": [
                        { "strong": "Automatisé", "text": "Données Scope 3" },
                        { "strong": "Évolutif", "text": "Capture Données" }
                    ]
                },
                "decarbonization": {
                    "title": "Planification de Décarbonation",
                    "hero_desc": "Passez du reporting à l'action. Planifiez votre voyage net-zéro.",
                    "features": [
                        { "title": "Identification des Points Chauds", "desc": "Localisez les sources exactes d'émissions élevées." },
                        { "title": "Modélisation de Scénarios", "desc": "Modélisez différents scénarios de réduction." },
                        { "title": "Analyse Coûts-Bénéfices", "desc": "Évaluez le ROI de diverses actions de décarbonation." },
                        { "title": "Recommandations IA", "desc": "Obtenez des suggestions IA pour la réduction des émissions." }
                    ],
                    "value_items": [
                        { "strong": "Pratique", "text": "Actions Réduction" },
                        { "strong": "ROI", "text": "Stratégie" }
                    ]
                },
                "voluntary_frameworks": {
                    "title": "Cadres Volontaires",
                    "hero_desc": "Soutien étendu aux initiatives de durabilité volontaires.",
                    "features": [
                        { "title": "Suivi SBTi", "desc": "Suivez les progrès par rapport aux objectifs SBTi." },
                        { "title": "Support CDP", "desc": "Préparation des données pour les soumissions CDP." },
                        { "title": "Surveillance RE100", "desc": "Surveillez l'utilisation d'énergie renouvelable pour RE100." },
                        { "title": "TCFD & ODD", "desc": "Insights alignés sur les risques TCFD et les ODD de l'ONU." }
                    ],
                    "value_items": [
                        { "strong": "Investisseur", "text": "Préparation" },
                        { "strong": "Mondial", "text": "Crédibilité" }
                    ]
                },
                "supply_chain": {
                    "title": "Chaîne d'Appro & Produit",
                    "hero_desc": "Suivi avancé du Scope 3 et analyse de durabilité produit.",
                    "features": [
                        { "title": "Portails Fournisseurs", "desc": "Portails dédiés pour la saisie des données fournisseurs." },
                        { "title": "Empreinte Carbone Produit", "desc": "Calculez l'ECP pour évaluer l'impact du cycle de vie." },
                        { "title": "Intégration ACV", "desc": "Intégration avec les outils d'Analyse du Cycle de Vie." },
                        { "title": "Passeport Produit Numérique", "desc": "Préparation aux exigences du Passeport Produit Numérique." }
                    ],
                    "value_items": [
                        { "strong": "Export", "text": "Préparation" },
                        { "strong": "Transparence", "text": "Chaîne d'Appro" }
                    ]
                }
            },
            "accreditations": {
                "title": "Nos Accréditations et Normes",
                "subtitle": "CarbonNex est aligné sur les normes mondiales et étend continuellement son réseau de vérification.",
                "comingSoon": "Bientôt disponible",
                "items": [
                    { "name": "Global Accreditation Bureau (GAB)", "category": "Accréditation" },
                    { "name": "Clean Development Mechanism (CDM)", "category": "CCNUCC" },
                    { "name": "ANSI National Accreditation Board (ANAB)", "category": "Accréditation" },
                    { "name": "Social Carbon", "category": "Norme" },
                    { "name": "Climate, Community & Biodiversity Alliance (CCBA)", "category": "Norme" },
                    { "name": "Global Carbon Council (GCC)", "category": "Norme" },
                    { "name": "Gold Standard", "category": "Norme" },
                    { "name": "Ministry of Agriculture & Farmers Welfare (SFAC)", "category": "Gouvernement" },
                    { "name": "Open Forest Protocol (OFP)", "category": "Protocole" },
                    { "name": "AA1000AS", "category": "AccountAbility" },
                    { "name": "Cercarbono", "category": "Norme" },
                    { "name": "Climate Action Reserve (CAR)", "category": "Norme" },
                    { "name": "KliK Foundation", "category": "Fondation" },
                    { "name": "Ormex", "category": "Registre" },
                    { "name": "International Carbon Registry (ICR)", "category": "Registre" },
                    { "name": "Universal Carbon Registry (UCR)", "category": "Registre" },
                    { "name": "Ecosystem Restoration Standard (ERS)", "category": "Norme" },
                    { "name": "Puro.earth", "category": "Norme" },
                    { "name": "VCS / Verra", "category": "Norme" },
                    { "name": "American Carbon Registry (ACR)", "category": "Registre" },
                    { "name": "BioCarbon Standard", "category": "Norme" },
                    { "name": "GRESB", "category": "Référence" },
                    { "name": "Joint Crediting Mechanism (JCM)", "category": "Mécanisme" }
                ]
            },
            "services_hub": {
                "hero": {
                    "badge": "Notre Plateforme",
                    "title": "Solutions ESG de Bout en Bout",
                    "desc": "De la comptabilité carbone précise aux stratégies avancées de décarbonation, CarbonNex renforce votre voyage durable."
                },
                "core": {
                    "title": "Module Opérations Cœur",
                    "subtitle": "Outils essentiels disponibles maintenant pour rationaliser votre reporting ESG"
                },
                "future": {
                    "badge": "Feuille de Route Innovation",
                    "title": "Capacités Futures",
                    "subtitle": "Pionnier de la prochaine génération de technologie de durabilité"
                },
                "cta": {
                    "title": "Prêt à commencer ?",
                    "subtitle": "Réservez une démo pour voir notre plateforme cœur en action.",
                    "button": "Planifier une Démo"
                },
                "common": {
                    "explore": "Explorer la Solution",
                    "learn_more": "En savoir plus sur ce module"
                },
                "items": {
                    "carbon_accounting": {
                        "desc": "Mesurez et gérez les émissions Scope 1, 2 et 3 avec précision grâce aux facteurs spécifiques à l'industrie.",
                        "icon": "📊",
                        "features": ["Aligné GHG Protocol", "Calculs Automatisés", "Prêt pour Audit"]
                    },
                    "esg_data": {
                        "desc": "Référentiel central pour les données ESG structurées avec accès par rôle et support multi-entité.",
                        "icon": "💾",
                        "features": ["Entrée Structurée", "Accès par Rôle", "Support Multi-Entité"]
                    },
                    "compliance": {
                        "desc": "Générez des rapports prêts à être divulgués pour BRSR, GHG Protocol et CBAM.",
                        "icon": "📝",
                        "features": ["BRSR Core", "Modèles Globaux", "Analyse des Écarts"]
                    },
                    "evidence": {
                        "desc": "Assurez que chaque chiffre est soutenu par une preuve avec lien obligatoire et contrôle de version.",
                        "icon": "🔒",
                        "features": ["Marquage de Preuve", "Contrôle de Version", "Historique Réviseur"]
                    },
                    "ai_validation": {
                        "desc": "Support intelligent à la décision pour la classification des documents et la détection d'anomalies.",
                        "icon": "🤖",
                        "features": ["Classification Intelligente", "Détection Anomalies", "Score de Confiance"]
                    },
                    "insights": {
                        "desc": "Visibilité niveau direction avec tendances en temps réel, métriques d'intensité et scores de conformité.",
                        "icon": "📈",
                        "features": ["Tendances Temps Réel", "Métriques Intensité", "Support Décision"]
                    },
                    "carbon_credits": {
                        "desc": "Intégration de marché pour la découverte, le matching et la retraite des crédits carbone vérifiés.",
                        "icon": "🌱"
                    },
                    "blockchain": {
                        "desc": "Instantanés d'audit immuables et enregistrements d'émissions horodatés ancrés sur la blockchain.",
                        "icon": "⛓️"
                    },
                    "integrations": {
                        "desc": "Capture automatisée des données des services publics, compagnies aériennes, logistique et e-commerce.",
                        "icon": "🔌"
                    },
                    "decarbonization": {
                        "desc": "Planification d'action avec identification des points chauds d'émissions et modélisation de scénarios.",
                        "icon": "📉"
                    },
                    "voluntary_frameworks": {
                        "desc": "Support étendu pour le suivi des objectifs SBTi, les soumissions CDP et les insights alignés TCFD.",
                        "icon": "🎯"
                    },
                    "supply_chain": {
                        "desc": "Portails de données fournisseurs, Empreinte Carbone Produit (PCF) et intégration ACV.",
                        "icon": "📦"
                    }
                }
            },

        }
    },
    de: {
        translation: {
            "nav": {
                "home": "Startseite",
                "about": "Über Uns",
                "services": "Dienstleistungen",
                "resources": "Ressourcen",
                "contact": "Kontakt",
                "accreditations": "Akkreditierungen",
                "getStarted": "Loslegen",
                "services_dropdown": {
                    "core_platform": "Kernplattform",
                    "future_capabilities": "Zukunftsfunktionen",
                    "items": {
                        "carbon_accounting": { "title": "CO2-Bilanzierung", "desc": "Scope 1, 2 & 3 Messung" },
                        "esg_data": { "title": "ESG Datenmanagement", "desc": "Zentrales Repository" },
                        "compliance": { "title": "Compliance Reporting", "desc": "BRSR & globale Mandate" },
                        "evidence": { "title": "Beweismanagement", "desc": "Audit-Trail & Tagging" },
                        "ai_validation": { "title": "KI-Validierung", "desc": "Intelligente Checks" },
                        "insights": { "title": "Dashboards", "desc": "Strategische Sicht" },
                        "carbon_credits": { "title": "CO2-Gutschriften", "desc": "Kompensations-Marktplatz" },
                        "blockchain": { "title": "Blockchain-Sicherheit", "desc": "Immutables Audit" },
                        "integrations": { "title": "Integrationen", "desc": "Versorger & APIs" },
                        "decarbonization": { "title": "Dekarbonisierung", "desc": "KI-gestützte Planung" },
                        "voluntary_frameworks": { "title": "Freiwillige Rahmen", "desc": "SBTi, CDP, TCFD" },
                        "supply_chain": { "title": "Lieferkette", "desc": "Produkt-CO2-Fußabdruck" }
                    },
                    "badges": {
                        "soon": "Bald"
                    }
                }
            },
            "home": {
                "hero": {
                    "badge": "Führende ESG-Beratung",
                    "title": "Verwandeln Sie Ihren CO2-Fußabdruck in einen Wettbewerbsvorteil",
                    "subtitle": "Umfassende ESG-Lösungen für moderne Unternehmen",
                    "cta_primary": "ESG-Reise Starten",
                    "cta_secondary": "Dienste Erkunden",
                    "emissions_breakdown": "Unternehmens-Emissionen"
                },
                "beta": {
                    "badge": "Demnächst",
                    "title": "CarbonNex Compliance-Automatisierung",
                    "desc": "Unsere KI-gestützte Compliance-Software startet bald. Seien Sie unter den Ersten, die nahtloses BRSR-Reporting erleben.",
                    "cta": "Warteliste Beitreten"
                },
                "esg": {
                    "badge": "ESG Verstehen",
                    "title": "Was ist ESG-Reporting?",
                    "subtitle": "Ein strukturierter Rahmen zur Offenlegung von Umwelt-, Sozial- und Governance-Praktiken",
                    "desc_p1": "ESG-Reporting umfasst einen Rahmen, in dem Organisationen ihre Umwelt-, Sozial- und Governance-Praktiken sowie deren Auswirkungen darstellen. Es zielt darauf ab, Transparenz über das Management von ESG-Risiken zu schaffen.",
                    "desc_p2": "ESG-Rahmenwerke bieten einen strukturierten Entwurf für Konsistenz in der Nachhaltigkeitslandschaft. Sie dienen als Kanal für Unternehmen, um Fortschritte an potenzielle Investoren zu kommunizieren.",
                    "chart_title": "Emissionsreduktionspfad"
                },
                "services": {
                    "badge": "Unsere Leistungen",
                    "title": "Umfassende ESG-Lösungen",
                    "subtitle": "End-to-End-Kohlenstoffmanagement und Nachhaltigkeitsdienste für Ihr Unternehmen",
                    "learn_more": "Mehr Erfahren"
                },
                "infographic": {
                    "badge": "Kohlenstoff-Intelligenz",
                    "title": "Globale Emissionen nach Sektor",
                    "desc": "Zu verstehen, woher Emissionen kommen, ist der erste Schritt zu ihrer Reduzierung. Unsere Plattform bietet granulare Einblicke."
                },
                "process": {
                    "badge": "Arbeitsweise",
                    "title": "Unser Bewährter Prozess",
                    "subtitle": "Ein systematischer Ansatz zur Erreichung Ihrer ESG- und Net-Zero-Ziele"
                },
                "regulations": {
                    "badge": "Compliance",
                    "title": "Globale ESG-Vorschriften",
                    "subtitle": "Bleiben Sie konform mit sich entwickelnden ESG-Berichtsanforderungen weltweit"
                },
                "frameworks": {
                    "badge": "Standards",
                    "title": "Unterstützte Rahmenwerke",
                    "subtitle": "Wir helfen Ihnen, nach allen wichtigen ESG-Rahmenwerken und Standards zu berichten"
                },
                "cta": {
                    "badge": "Loslegen",
                    "title": "Bereit für Ihre Nachhaltigkeitsreise?",
                    "subtitle": "Schließen Sie sich über 150 Unternehmen an, die ihr ESG-Reporting mit CarbonNex transformiert haben.",
                    "primary": "Kostenlose Beratung",
                    "secondary": "ESG-Leitfaden"
                },
                "scope_data": {
                    "scope1": { "name": "Scope 1", "short_desc": "Direkte Emissionen", "desc": "Emissionen aus Quellen, die der Organisation gehören oder von ihr kontrolliert werden." },
                    "scope2": { "name": "Scope 2", "short_desc": "Indirekte Energie", "desc": "Emissionen, die durch die Erzeugung der eingekauften Energie entstehen." },
                    "scope3": { "name": "Scope 3", "short_desc": "Wertschöpfungskette", "desc": "Alle anderen indirekten Emissionen, die entlang der Wertschöpfungskette entstehen." }
                },
                "sectors": {
                    "energy": "Energie",
                    "transport": "Verkehr",
                    "industry": "Industrie",
                    "agriculture": "Landwirtschaft",
                    "buildings": "Gebäude"
                },
                "services_list": {
                    "scope1": { "title": "Scope 1 Emissionen", "desc": "Direkte Emissionen aus eigenen Quellen" },
                    "scope2": { "title": "Scope 2 Emissionen", "desc": "Indirekte Emissionen aus eingekaufter Energie" },
                    "scope3": { "title": "Scope 3 Emissionen", "desc": "Alle indirekten Emissionen in der Wertschöpfungskette" },
                    "esg": { "title": "ESG-Beratung", "desc": "Strategische Beratung für Umwelt-, Sozial- und Governance-Ziele" },
                    "compliance": { "title": "Compliance-Reporting", "desc": "Automatisiertes Reporting für globale Standards", "badge": "Neu" },
                    "accounting": { "title": "CO2-Bilanzierung", "desc": "Präzise Berechnung und Verfolgung des THG-Fußabdrucks" }
                },
                "frameworks_list": {
                    "gri": "Global Reporting Initiative",
                    "tcfd": "Task Force on Climate-related Financial Disclosures",
                    "sasb": "Sustainability Accounting Standards Board",
                    "cdp": "Carbon Disclosure Project",
                    "brsr": "Business Responsibility and Sustainability Reporting",
                    "sdg": "Ziele für nachhaltige Entwicklung (SDGs)"
                },
                "esg_pillars": {
                    "env": { "title": "Umwelt", "items": ["CO2-Fußabdruck", "Abfallmanagement", "Wasserverbrauch", "Energieeffizienz"] },
                    "social": { "title": "Soziales", "items": ["Arbeitsstandards", "Gemeinschaftsengagement", "Menschenrechte", "Mitarbeitersicherheit"] },
                    "gov": { "title": "Unternehmensführung", "items": ["Vorstandsvielfalt", "Ethisches Verhalten", "Risikomanagement", "Transparenz"] }
                },
                "process_steps": {
                    "step1": { "title": "Entdeckung", "desc": "Umfassende Bewertung des aktuellen ESG-Status und der Emissionsquellen" },
                    "step2": { "title": "Datensammlung", "desc": "Erfassung von Aktivitätsdaten aus allen Emissionsquellen" },
                    "step3": { "title": "Analyse", "desc": "Berechnung der Emissionen nach GHG-Protocol-Methoden" },
                    "step4": { "title": "Strategie", "desc": "Entwicklung eines Reduktionsplans mit wissenschaftsbasierten Zielen" },
                    "step5": { "title": "Implementierung", "desc": "Einsatz der CarbonNex-Plattform zur kontinuierlichen Überwachung" },
                    "step6": { "title": "Verifizierung", "desc": "Prüfung und Zertifizierung Ihrer Emissionsdaten durch Dritte" }
                },
                "regulations_list": {
                    "eu": { "region": "Europäische Union", "desc": "Die CSRD-Richtlinie erfordert detaillierte ESG-Offenlegungen" },
                    "us": { "region": "Vereinigte Staaten", "desc": "SEC-Klimaschutzregeln für börsennotierte Unternehmen" },
                    "india": { "region": "Indien", "desc": "BRSR-Berichterstattung für börsennotierte Unternehmen" },
                    "uk": { "region": "Vereinigtes Königreich", "desc": "Rahmenwerk für vereinfachtes Energie- und CO2-Reporting (SECR)" }
                }
            },
            "about": {
                "hero": {
                    "badge": "Über CarbonNex",
                    "title": "Die <span class=\"text-lime\">Klimatitüde</span> der Welt verändern",
                    "desc": "Wir sind ein führendes ESG-Beratungsunternehmen."
                },
                "mission": {
                    "title": "Unsere Mission",
                    "desc": "ESG-Compliance zugänglich und transparent machen.",
                    "list": ["Zugang zu ESG-Expertise demokratisieren", "Komplexe Compliance vereinfachen", "Messbaren Einfluss erzielen", "Datengetriebene Entscheidungen ermöglichen"]
                },
                "vision": {
                    "title": "Unsere Vision",
                    "desc": "Eine Welt, in der jedes Unternehmen nachhaltig arbeitet.",
                    "list": ["Net-Zero-Wirtschaft bis 2050", "100% Transparenz", "Nachhaltigkeit als Vorteil", "Klimaschutz als Kernstrategie"]
                },
                "story": {
                    "badge": "Unsere Reise",
                    "title": "Unsere Geschichte",
                    "p1": "Gegründet im Jahr 2020.",
                    "p2": "Nachhaltigkeit muss messbar sein.",
                    "p3": "Heute steht CarbonNex an der Spitze."
                },
                "what_we_do": {
                    "badge": "Was Wir Tun",
                    "title": "Umfassende ESG-Lösungen",
                    "subtitle": "End-to-End-Dienste für Nachhaltigkeit",
                    "items": [
                        { "title": "Emissionsmanagement", "desc": "Scope 1, 2 und 3 Tracking." },
                        { "title": "ESG-Reporting", "desc": "Berichterstattung nach GRI, TCFD, SASB." },
                        { "title": "Net-Zero-Strategie", "desc": "Wissenschaftsbasierte Ziele." },
                        { "title": "Lieferketten", "desc": "Dekarbonisierung der Wertschöpfungskette." }
                    ]
                },
                "why_choose_us": {
                    "badge": "Warum Wir",
                    "title": "Was Uns Auszeichnet",
                    "subtitle": "Vertraut für ESG-Exzellenz",
                    "items": [
                        { "icon": "🎯", "title": "Expertise", "desc": "Tiefes Wissen in Carbon Markets." },
                        { "icon": "🔬", "title": "Wissenschaft", "desc": "Methoden nach IPCC." },
                        { "icon": "⚡", "title": "Digital-First", "desc": "Eigene Plattform." },
                        { "icon": "🌍", "title": "Globale Abdeckung", "desc": "EU, US, UK, Indien." },
                        { "icon": "🤝", "title": "End-to-End", "desc": "Von Bewertung bis Verifizierung." },
                        { "icon": "📊", "title": "Daten-Insights", "desc": "Fortschrittliche Analytik." }
                    ]
                },
                "team": {
                    "badge": "Führung",
                    "title": "Unser Team",
                    "subtitle": "Branchenveteranen mit tiefer Expertise",
                    "items": [
                        { "name": "Dr. Priya Sharma", "role": "CEO & Gründerin", "expertise": "Klimawissenschaft", "image": "👩‍💼" },
                        { "name": "Rajesh Kumar", "role": "CTO", "expertise": "KI & Carbon Analytics", "image": "👨‍💼" },
                        { "name": "Anita Desai", "role": "Head of ESG", "expertise": "Nachhaltigkeitsstrategie", "image": "👩‍💼" },
                        { "name": "Michael Chen", "role": "Director Ops", "expertise": "GHG Protocol", "image": "👨‍💼" }
                    ]
                },
                "certifications": {
                    "badge": "Zertifikate",
                    "title": "Unsere Expertise",
                    "items": [
                        "ISO 14064 Lead Verifier",
                        "GHG Protocol Zertifiziert",
                        "CDP Partner",
                        "BRSR Experte",
                        "SBTi Zertifiziert",
                        "TCFD Reporting"
                    ]
                },
                "cta": {
                    "title": "Bereit für eine Partnerschaft?",
                    "subtitle": "Schließen Sie sich über 150 Organisationen an",
                    "primary": "Beratung Buchen",
                    "secondary": "Dienste Ansehen"
                }
            },
            "contact": {
                "hero": {
                    "title": "Kontaktieren Sie Uns",
                    "subtitle": "Starten wir gemeinsam Ihre Reise"
                },
                "info": {
                    "title": "Kontaktinformationen",
                    "email_label": "E-Mail",
                    "phone_label": "Telefon",
                    "office_label": "Büro"
                },
                "form": {
                    "title": "Nachricht Senden",
                    "name": "Name",
                    "email": "E-Mail",
                    "company": "Firma",
                    "message": "Nachricht",
                    "submit": "Senden",
                    "success": "Danke für Ihre Nachricht! Wir melden uns bald."
                }
            },
            "resources": {
                "hero": {
                    "badge": "Wissenszentrum",
                    "title": "ESG Ressourcen & Einblicke",
                    "desc": "Expertenwissen, Leitfäden und Tools für Ihre Nachhaltigkeitsreise"
                },
                "categories": [
                    { "id": "all", "name": "Alle" },
                    { "id": "guide", "name": "Leitfäden" },
                    { "id": "whitepaper", "name": "Whitepapers" },
                    { "id": "article", "name": "Artikel" },
                    { "id": "tool", "name": "Tools" }
                ],
                "items": [
                    { "title": "Kompletter ESG Compliance Guide 2024", "category": "guide", "description": "Ein umfassender Leitfaden zu allen Aspekten der ESG-Compliance.", "topics": ["GRI Standards", "TCFD"], "readTime": "45 Min Lesezeit", "link": "https://www.globalreporting.org/standards/" },
                    { "title": "Best Practices Carbon Accounting", "category": "whitepaper", "description": "Lernen Sie die besten Methoden für präzise CO2-Bilanzierung.", "topics": ["Scope 1/2/3", "Emissionsfaktoren"], "readTime": "30 Min Lesezeit", "link": "https://ghgprotocol.org/corporate-standard" },
                    { "title": "Scope 3 Emissionen Verstehen", "category": "article", "description": "Vertiefung in die Verwaltung von Emissionen der Wertschöpfungskette.", "topics": ["Lieferkette", "Lieferanten"], "readTime": "15 Min Lesezeit", "link": "https://www.epa.gov/climateleadership/scope-3-inventory-guidance" },
                    { "title": "BRSR Rahmenwerk Übersicht", "category": "guide", "description": "Alles über Business Responsibility Reporting in Indien.", "topics": ["SEBI Richtlinien", "Berichterstattung"], "readTime": "25 Min Lesezeit", "link": "https://www.sebi.gov.in" },
                    { "title": "CO2-Fußabdruck Rechner", "category": "tool", "description": "Interaktives Tool zur Schätzung des CO2-Fußabdrucks.", "topics": ["Scope 1", "Scope 2"], "readTime": "5 Min Nutzung", "link": "https://www.carbonfootprint.com/calculator.aspx" },
                    { "title": "Net Zero Roadmap Vorlage", "category": "tool", "description": "Rahmenwerk für den Net-Zero-Plan Ihrer Organisation.", "topics": ["Ziele", "Meilensteine"], "readTime": "20 Min Anpassung", "link": "https://sciencebasedtargets.org/net-zero" },
                    { "title": "CSRD Compliance Checkliste", "category": "guide", "description": "Checkliste für EU CSRD-Anforderungen.", "topics": ["EU Regeln", "Offenlegung"], "readTime": "20 Min Lesezeit", "link": "https://finance.ec.europa.eu" },
                    { "title": "Science-Based Targets Erklärt", "category": "article", "description": "Wie man wissenschaftsbasierte Emissionsziele setzt.", "topics": ["SBTi", "1.5°C Pfad"], "readTime": "12 Min Lesezeit", "link": "https://sciencebasedtargets.org" },
                    { "title": "ESG Datenmanagement", "category": "whitepaper", "description": "Best Practices für das Management von ESG-Daten.", "topics": ["Datenerfassung", "QS"], "readTime": "35 Min Lesezeit", "link": "https://www.weforum.org" }
                ],
                "glossary_section": {
                    "badge": "Referenz",
                    "title": "ESG Glossar",
                    "subtitle": "Schlüsselbegriffe und Definitionen der Nachhaltigkeit"
                },
                "glossary": [
                    { "term": "ESG", "definition": "Umwelt, Soziales und Unternehmensführung - ein Bewertungsrahmen." },
                    { "term": "GHG Protocol", "definition": "Das weltweit meistgenutzte Tool zur Treibhausgasbilanzierung." },
                    { "term": "Scope 1", "definition": "Direkte Emissionen aus eigenen Quellen." },
                    { "term": "Scope 2", "definition": "Indirekte Emissionen aus eingekaufter Energie." },
                    { "term": "Scope 3", "definition": "Alle anderen indirekten Emissionen in der Wertschöpfungskette." },
                    { "term": "BRSR", "definition": "Business Responsibility Reporting - verpflichtend in Indien." },
                    { "term": "Net Zero", "definition": "Gleichgewicht zwischen ausgestoßenem und entferntem Kohlenstoff." },
                    { "term": "Carbon Credits", "definition": "Handelbare Zertifikate für eine Tonne CO2." }
                ],
                "faq_section": {
                    "badge": "FAQ",
                    "title": "Häufig Gestellte Fragen"
                },
                "faqs": [
                    { "question": "Was ist ESG Reporting?", "answer": "ESG Reporting legt Umwelt-, Sozial- und Governance-Praktiken offen." },
                    { "question": "Warum ist Carbon Accounting wichtig?", "answer": "Es hilft Organisationen, THG-Emissionen zu messen und zu reduzieren." },
                    { "question": "Was sind Scope 1, 2 und 3 Emissionen?", "answer": "Scope 1: direkt. Scope 2: indirekt Energie. Scope 3: Wertschöpfungskette." },
                    { "question": "Wie lange dauert ESG-Compliance?", "answer": "Die erste Bewertung dauert typischerweise 4-8 Wochen." }
                ],
                "newsletter": {
                    "title": "Bleiben Sie auf dem Laufenden",
                    "desc": "Abonnieren Sie unseren Newsletter für die neuesten ESG-Einblicke.",
                    "placeholder": "Geben Sie Ihre E-Mail ein",
                    "button": "Abonnieren"
                },
                "accessBtn": "Jetzt Zugreifen"
            },

            "accreditations": {
                "title": "Unsere Akkreditierungen",
                "subtitle": "Arbeiten an globalen Standards und Zertifizierungen",
                "comingSoon": "Demnächst"
            },
            "service_pages": {
                "common": {
                    "core_platform": "Kernplattform",
                    "coming_soon": "Demnächst",
                    "future_capabilities": "Zukünftige Funktionen",
                    "value_to_customer": "Mehrwert für Kunden",
                    "join_waitlist": "Warteliste beitreten",
                    "request_demo": "Demo anfordern",
                    "explore_platform": "Plattform erkunden",
                    "start_accounting": "Starten",
                    "automate_compliance": "Compliance Autom.",
                    "unlock_insights": "Einblicke freischalten"
                },
                "carbon_accounting": {
                    "title": "CO2-Bilanzierung",
                    "hero_desc": "Messen und verwalten Sie Ihre CO2-Emissionen präzise. Reduzieren Sie manuelle Arbeit.",
                    "section_title": "Präzise, Standardisierte Messung",
                    "features": [
                        { "title": "Scope 1 Emissionen", "desc": "Berechnung direkter Emissionen (Kraftstoff, Generatoren, Fahrzeuge)." },
                        { "title": "Scope 2 Emissionen", "desc": "Berechnung indirekter Emissionen (eingekaufter Strom und Wärme)." },
                        { "title": "Scope 3 Emissionen", "desc": "Komplette Berechnung für Reisen, Logistik, Abfall, Lieferanten." },
                        { "title": "Automatisierte Berechnungen", "desc": "Berechnungen nach GHG-Protokoll mit Emissionsfaktor-Bibliotheken." }
                    ],
                    "value_items": [
                        { "strong": "Genau", "text": "Standardisierter Fußabdruck" },
                        { "strong": "Audit-Bereit", "text": "Berechnungen" },
                        { "strong": "Effizient", "text": "Weniger Manuelle Arbeit" }
                    ]
                },
                "esg_data": {
                    "title": "ESG Datenerfassung & Management",
                    "hero_desc": "Ein zentrales Repository als einzige Wahrheitsquelle für alle Ihre ESG-Daten.",
                    "section_title": "Auf Daten Vertrauen",
                    "features": [
                        { "title": "Strukturierte Eingabe", "desc": "Standardisierte Eingabeformulare für konsistente Daten." },
                        { "title": "Rollenbasierter Zugriff", "desc": "Granulare Berechtigungen für Reporter, Prüfer und Admins." },
                        { "title": "Multi-Entity Support", "desc": "Verwalten Sie Daten über mehrere Einheiten und Standorte hinweg." },
                        { "title": "Periodisches Tracking", "desc": "Flexible Erfassungsfrequenzen: monatlich, vierteljährlich oder jährlich." }
                    ],
                    "value_items": [
                        { "strong": "Wahrheit", "text": "Eine Quelle" },
                        { "strong": "Verantwortung", "text": "Interne Governance" },
                        { "strong": "Bereitschaft", "text": "Für Audits" }
                    ]
                },
                "compliance": {
                    "title": "Compliance Reporting",
                    "hero_desc": "Sicherheit in der Compliance. Erstellen Sie berichtsfertige Reports.",
                    "section_title": "Exzellenz in der Offenlegung",
                    "features": [
                        { "title": "BRSR & BRSR Core", "desc": "Volle Unterstützung für Indiens BRSR-Mandate." },
                        { "title": "GHG Protocol & CCTS", "desc": "Reporting abgestimmt auf CCTS und globale GHG-Standards." },
                        { "title": "CBAM Vorbereitung", "desc": "Spezielle Datenaufbereitung für Exporteure (CBAM)." },
                        { "title": "Automatisches Mapping", "desc": "Ordnet gesammelte Daten automatisch Compliance-Vorlagen zu." }
                    ],
                    "value_items": [
                        { "strong": "Vertrauen", "text": "In Compliance" },
                        { "strong": "Sicherheit", "text": "Geringes Risiko" },
                        { "strong": "Tempo", "text": "Schnelleres Reporting" }
                    ]
                },
                "insights": {
                    "title": "Dashboards & Einblicke",
                    "hero_desc": "Sichtbarkeit auf Managementebene für strategische Entscheidungen.",
                    "section_title": "Datengestützte Entscheidungsfindung",
                    "features": [
                        { "title": "Emissionstrends", "desc": "Visualisieren Sie historische Daten und Fortschritte." },
                        { "title": "Granulare Aufschlüsselung", "desc": "Drill-Down in Emissionen nach Scope, Standort und Anlage." },
                        { "title": "Intensitätskennzahlen", "desc": "Überwachen Sie KPIs wie Emissionen pro Umsatz." },
                        { "title": "Bereitschafts-Scores", "desc": "Echtzeit-Bewertung Ihrer Compliance-Bereitschaft." }
                    ],
                    "value_items": [
                        { "strong": "Support", "text": "Entscheidung" },
                        { "strong": "Reporting", "text": "Vorstandsebene" },
                        { "strong": "Strategie", "text": "Zukunftsplanung" }
                    ]
                },
                "evidence": {
                    "title": "Beweismanagement & Audit-Trail",
                    "hero_desc": "Stellen Sie sicher, dass jede Behauptung belegt ist. Bauen Sie Vertrauen auf.",
                    "section_title": "CarbonNex garantiert belegte Zahlen.",
                    "features": [
                        { "title": "Beweis-Upload", "desc": "Laden Sie Rechnungen hoch und taggen Sie sie für einfachen Abruf." },
                        { "title": "Pflichtverknüpfung", "desc": "Erfordern Sie Beweise für kritische Datenpunkte." },
                        { "title": "Versionskontrolle", "desc": "Verfolgen Sie jede Änderung mit komplettem Audit-Trail." },
                        { "title": "Genehmigungsverlauf", "desc": "Optimieren Sie die Zusammenarbeit mit dauerhaftem Register." }
                    ],
                    "value_items": [
                        { "strong": "Audit-Bereit", "text": "Dokumentation" },
                        { "strong": "Reduziert", "text": "Greenwashing-Risiko" },
                        { "strong": "Vertrauen", "text": "Der Prüfer" }
                    ]
                },
                "ai_validation": {
                    "title": "KI-gestützte Validierung",
                    "hero_desc": "Intelligente Entscheidungshilfe. Verbessern Sie die Datenqualität.",
                    "section_title": "KI in CarbonNex unterstützt Nutzer.",
                    "features": [
                        { "title": "Dokumentenklassifizierung", "desc": "Klassifizieren Sie Rechnungen automatisch mit KI." },
                        { "title": "Fehlende Beweise", "desc": "Markieren Sie proaktiv Daten ohne Belege." },
                        { "title": "Inkonsistenz-Flags", "desc": "Identifizieren Sie Anomalien automatisch." },
                        { "title": "Konfidenz-Score", "desc": "Jeder Datenpunkt erhält einen KI-Konfidenz-Score." }
                    ],
                    "value_items": [
                        { "strong": "Hohe Qualität", "text": "Datensicherheit" },
                        { "strong": "Tempo", "text": "Auto-Checks" },
                        { "strong": "Weniger Fehler", "text": "KI mit Mensch" }
                    ]
                },
                "carbon_credits": {
                    "title": "CO2-Gutschriften & Kompensation",
                    "hero_desc": "Ermöglichen Sie Emissionsausgleich und Handel mit Transparenz.",
                    "features": [
                        { "title": "Verifizierte Register", "desc": "Integration mit verifizierten Registern für Transparenz." },
                        { "title": "Marktplatz-Integration", "desc": "Zugang zu einem Marktplatz für den Kauf von Gutschriften." },
                        { "title": "Offset-Matching", "desc": "Automatischer Abgleich basierend auf Ihrem Emissionsprofil." },
                        { "title": "Stilllegungs-Tracking", "desc": "End-to-End-Verfolgung zur Vermeidung von Doppelzählungen." }
                    ],
                    "value_items": [
                        { "strong": "Net-Zero", "text": "Komplette Reise" },
                        { "strong": "Transparenz", "text": "In der Nutzung" }
                    ]
                },
                "blockchain": {
                    "title": "Blockchain-basierte Sicherheit",
                    "hero_desc": "Verankern Sie kritische Daten-Snapshots auf der Blockchain.",
                    "features": [
                        { "title": "Unveränderliche Snapshots", "desc": "Audit-Snapshots auf der Blockchain verankert." },
                        { "title": "Zeitgestempelte Einträge", "desc": "Verifizierbare Zeitstempel für alle Dateneinträge." },
                        { "title": "Verifizierbare Hashes", "desc": "Kryptografische Hashes für Prüfer verfügbar." }
                    ],
                    "value_items": [
                        { "strong": "Manipulationssicher", "text": "Reporting" },
                        { "strong": "Hohes Vertrauen", "text": "Für Regulatoren" }
                    ]
                },
                "integrations": {
                    "title": "Versorger & Verbraucher Integrationen",
                    "hero_desc": "Automatisierte Integrationen für skalierbare Datenerfassung.",
                    "features": [
                        { "title": "Versorger-Integrationen", "desc": "Automatische Extraktion von CO2-Daten aus Rechnungen." },
                        { "title": "Reiseplattformen", "desc": "Integration mit Fluggesellschaften für Flugdaten." },
                        { "title": "Logistikanbieter", "desc": "Nahtlose Datenerfassung von Logistikpartnern." },
                        { "title": "E-Commerce & Einzelhandel", "desc": "CO2-Sichtbarkeit für Transaktionen." }
                    ],
                    "value_items": [
                        { "strong": "Automatisiert", "text": "Scope 3 Daten" },
                        { "strong": "Skalierbar", "text": "Datenerfassung" }
                    ]
                },
                "decarbonization": {
                    "title": "Dekarbonisierungsplanung",
                    "hero_desc": "Vom Reporting zum Handeln. Planen Sie Ihre Net-Zero-Reise.",
                    "features": [
                        { "title": "Hotspot-Identifikation", "desc": "Finden Sie die genauen Quellen hoher Emissionen." },
                        { "title": "Szenario-Modellierung", "desc": "Modellieren Sie verschiedene Reduktionsszenarien." },
                        { "title": "Kosten-Nutzen-Analyse", "desc": "Bewerten Sie den ROI von Dekarbonisierungsmaßnahmen." },
                        { "title": "KI-Empfehlungen", "desc": "Erhalten Sie KI-Vorschläge zur Emissionsreduktion." }
                    ],
                    "value_items": [
                        { "strong": "Praktisch", "text": "Reduktionsmaßnahmen" },
                        { "strong": "ROI-Getrieben", "text": "Strategie" }
                    ]
                },
                "voluntary_frameworks": {
                    "title": "Freiwillige Rahmenwerke",
                    "hero_desc": "Erweiterte Unterstützung für freiwillige Nachhaltigkeitsinitiativen.",
                    "features": [
                        { "title": "SBTi Tracking", "desc": "Verfolgen Sie Fortschritte gegenüber SBTi-Zielen." },
                        { "title": "CDP Support", "desc": "Datenaufbereitung für CDP-Einreichungen." },
                        { "title": "RE100 Überwachung", "desc": "Überwachen Sie die Nutzung erneuerbarer Energien." },
                        { "title": "TCFD & SDGs", "desc": "Einblicke abgestimmt auf TCFD-Risiken und UN SDGs." }
                    ],
                    "value_items": [
                        { "strong": "Investor", "text": "Bereitschaft" },
                        { "strong": "Global", "text": "Glaubwürdigkeit" }
                    ]
                },
                "supply_chain": {
                    "title": "Lieferkette & Produktbuchhaltung",
                    "hero_desc": "Erweitertes Scope 3 Tracking und Produktnachhaltigkeitsanalyse.",
                    "features": [
                        { "title": "Lieferantenportale", "desc": "Portale für Lieferanten zur direkten Dateneingabe." },
                        { "title": "Produkt-CO2-Fußabdruck", "desc": "Berechnen Sie den PCF für Lebenszyklusanalysen." },
                        { "title": "LCA Integration", "desc": "Integration mit Life Cycle Assessment Tools." },
                        { "title": "Digitaler Produktpass", "desc": "Vorbereitung auf Anforderungen des digitalen Produktpasses." }
                    ],
                    "value_items": [
                        { "strong": "Export", "text": "Bereitschaft" },
                        { "strong": "Transparenz", "text": "Lieferkette" }
                    ]
                }
            },
            "accreditations": {
                "title": "Unsere Akkreditierungen & Standards",
                "subtitle": "CarbonNex richtet sich nach globalen Standards und erweitert ständig sein Verifizierungsnetzwerk.",
                "comingSoon": "Demnächst",
                "items": [
                    { "name": "Global Accreditation Bureau (GAB)", "category": "Akkreditierung" },
                    { "name": "Clean Development Mechanism (CDM)", "category": "UNFCCC" },
                    { "name": "ANSI National Accreditation Board (ANAB)", "category": "Akkreditierung" },
                    { "name": "Social Carbon", "category": "Standard" },
                    { "name": "Climate, Community & Biodiversity Alliance (CCBA)", "category": "Standard" },
                    { "name": "Global Carbon Council (GCC)", "category": "Standard" },
                    { "name": "Gold Standard", "category": "Standard" },
                    { "name": "Ministry of Agriculture & Farmers Welfare (SFAC)", "category": "Regierung" },
                    { "name": "Open Forest Protocol (OFP)", "category": "Protokoll" },
                    { "name": "AA1000AS", "category": "AccountAbility" },
                    { "name": "Cercarbono", "category": "Standard" },
                    { "name": "Climate Action Reserve (CAR)", "category": "Standard" },
                    { "name": "KliK Foundation", "category": "Stiftung" },
                    { "name": "Ormex", "category": "Register" },
                    { "name": "International Carbon Registry (ICR)", "category": "Register" },
                    { "name": "Universal Carbon Registry (UCR)", "category": "Register" },
                    { "name": "Ecosystem Restoration Standard (ERS)", "category": "Standard" },
                    { "name": "Puro.earth", "category": "Standard" },
                    { "name": "VCS / Verra", "category": "Standard" },
                    { "name": "American Carbon Registry (ACR)", "category": "Register" },
                    { "name": "BioCarbon Standard", "category": "Standard" },
                    { "name": "GRESB", "category": "Maßstab" },
                    { "name": "Joint Crediting Mechanism (JCM)", "category": "Mechanismus" }
                ]
            },
            "services_hub": {
                "hero": {
                    "badge": "Unsere Plattform",
                    "title": "End-to-End ESG-Lösungen",
                    "desc": "Von genauer CO2-Buchhaltung bis zu fortschrittlichen Dekarbonisierungsstrategien stärkt CarbonNex Ihre Nachhaltigkeitsreise."
                },
                "core": {
                    "title": "Kernbetriebsmodul",
                    "subtitle": "Wesentliche Tools jetzt verfügbar, um Ihr ESG-Reporting zu optimieren"
                },
                "future": {
                    "badge": "Innovations-Roadmap",
                    "title": "Zukünftige Fähigkeiten",
                    "subtitle": "Wegbereiter der nächsten Generation von Nachhaltigkeitstechnologie"
                },
                "cta": {
                    "title": "Bereit loszulegen?",
                    "subtitle": "Buchen Sie eine Demo, um unsere Kernplattform in Aktion zu sehen.",
                    "button": "Demo Vereinbaren"
                },
                "common": {
                    "explore": "Lösung Erkunden",
                    "learn_more": "Mehr über dieses Modul erfahren"
                },
                "items": {
                    "carbon_accounting": {
                        "desc": "Messen und verwalten Sie Scope 1, 2 und 3 Emissionen genau mit industriespezifischen Faktoren.",
                        "icon": "📊",
                        "features": ["GHG Protocol Ausgerichtet", "Automatisierte Berechnungen", "Audit-Bereit"]
                    },
                    "esg_data": {
                        "desc": "Zentrales Repository für strukturierte ESG-Daten mit rollenbasiertem Zugriff und Multi-Entity-Support.",
                        "icon": "💾",
                        "features": ["Strukturierte Eingabe", "Rollenbasierter Zugriff", "Multi-Entity-Support"]
                    },
                    "compliance": {
                        "desc": "Erstellen Sie veröffentlichungsreife Berichte für BRSR, GHG Protocol und CBAM.",
                        "icon": "📝",
                        "features": ["BRSR Core", "Globale Vorlagen", "Lückenanalyse"]
                    },
                    "evidence": {
                        "desc": "Stellen Sie sicher, dass jede Zahl durch Beweise mit obligatorischer Verknüpfung und Versionskontrolle belegt ist.",
                        "icon": "🔒",
                        "features": ["Beweis-Tagging", "Versionskontrolle", "Prüfer-Historie"]
                    },
                    "ai_validation": {
                        "desc": "Intelligente Entscheidungsunterstützung für Dokumentenklassifizierung und Anomalieerkennung.",
                        "icon": "🤖",
                        "features": ["Smarte Klassifizierung", "Anomalie-Erkennung", "Vertrauens-Scoring"]
                    },
                    "insights": {
                        "desc": "Sichtbarkeit auf Managementebene mit Echtzeit-Trends, Intensitätsmetriken und Compliance-Scores.",
                        "icon": "📈",
                        "features": ["Echtzeit-Trends", "Intensitätsmetriken", "Entscheidungsunterstützung"]
                    },
                    "carbon_credits": {
                        "desc": "Marktplatzintegration für verifizierte CO2-Gutschrift-Suche, Matching und Stilllegung.",
                        "icon": "🌱"
                    },
                    "blockchain": {
                        "desc": "Unveränderliche Audit-Snapshots und zeitgestempelte Emissionsaufzeichnungen auf der Blockchain verankert.",
                        "icon": "⛓️"
                    },
                    "integrations": {
                        "desc": "Automatisierte Datenerfassung von Energieversorgern, Fluggesellschaften, Logistik und E-Commerce.",
                        "icon": "🔌"
                    },
                    "decarbonization": {
                        "desc": "Handlungsplanung mit Identifikation von Emissions-Hotspots und Szenario-Modellierung.",
                        "icon": "📉"
                    },
                    "voluntary_frameworks": {
                        "desc": "Erweiterte Unterstützung für SBTi-Zielverfolgung, CDP-Einreichungen und TCFD-konforme Einblicke.",
                        "icon": "🎯"
                    },
                    "supply_chain": {
                        "desc": "Lieferantendaten-Portale, Produkt-CO2-Fußabdruck (PCF) und LCA-Integration.",
                        "icon": "📦"
                    }
                }
            },

        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
