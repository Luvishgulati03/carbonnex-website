import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ResourcesPage from './pages/ResourcesPage';

// Services
import ServicesHubPage from './pages/ServicesHubPage';
import CarbonAccounting from './pages/services/CarbonAccounting';
import ESGDataPage from './pages/services/ESGDataPage';
import ComplianceAutomation from './pages/services/ComplianceAutomation';
import EvidenceManagementPage from './pages/services/EvidenceManagementPage';
import AIValidationPage from './pages/services/AIValidationPage';
import InsightsPage from './pages/services/InsightsPage';

// Future Services
import CarbonCreditsPage from './pages/services/CarbonCreditsPage';
import BlockchainPage from './pages/services/BlockchainPage';
import IntegrationsPage from './pages/services/IntegrationsPage';
import DecarbonizationPage from './pages/services/DecarbonizationPage';
import SupplyChainPage from './pages/services/SupplyChainPage';
import VoluntaryFrameworksPage from './pages/services/VoluntaryFrameworksPage';

import Scope1Management from './pages/services/Scope1Management';
import Scope2Management from './pages/services/Scope2Management';
import Scope3Management from './pages/services/Scope3Management';
import ESGAdvisory from './pages/services/ESGAdvisory';
import AccreditationsPage from './pages/AccreditationsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/resources" element={<ResourcesPage />} />

            {/* Services Hub */}
            <Route path="/services" element={<ServicesHubPage />} />

            {/* Core Services */}
            {/* Core Services */}
            <Route path="/services/carbon-accounting" element={<CarbonAccounting />} />
            <Route path="/services/esg-data" element={<ESGDataPage />} />
            <Route path="/services/compliance" element={<ComplianceAutomation />} />
            <Route path="/services/evidence-management" element={<EvidenceManagementPage />} />
            <Route path="/services/ai-validation" element={<AIValidationPage />} />
            <Route path="/services/insights" element={<InsightsPage />} />

            {/* Future Services */}
            <Route path="/services/carbon-credits" element={<CarbonCreditsPage />} />
            <Route path="/services/blockchain" element={<BlockchainPage />} />
            <Route path="/services/integrations" element={<IntegrationsPage />} />
            <Route path="/services/decarbonization" element={<DecarbonizationPage />} />
            <Route path="/services/supply-chain" element={<SupplyChainPage />} />
            <Route path="/services/voluntary-frameworks" element={<VoluntaryFrameworksPage />} />

            {/* Legacy/Specific Pages (Keeping if linked elsewhere) */}
            <Route path="/services/scope-1" element={<Scope1Management />} />
            <Route path="/services/scope-2" element={<Scope2Management />} />
            <Route path="/services/scope-3" element={<Scope3Management />} />
            <Route path="/services/esg-advisory" element={<ESGAdvisory />} />

            <Route path="/accreditations" element={<AccreditationsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
