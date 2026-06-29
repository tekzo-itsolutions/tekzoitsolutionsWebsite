import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import BackToTop from './components/BackToTop';

import Home from './pages/Home';
import About from './pages/About';
import CompanyDetails from './pages/CompanyDetails';
import VisionMission from './pages/VisionMission';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import RefundPolicy from './pages/RefundPolicy';
import Login from './pages/Login';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    if (typeof window !== 'undefined' && window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 80
      });
      window.AOS.refresh();
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Loader />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/company-details" element={<CompanyDetails />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          {/* Support existing .html links if anyone bookmarks them */}
          <Route path="/index.html" element={<Home />} />
          <Route path="/about.html" element={<About />} />
          <Route path="/company-details.html" element={<CompanyDetails />} />
          <Route path="/vision-mission.html" element={<VisionMission />} />
          <Route path="/services.html" element={<Services />} />
          <Route path="/portfolio.html" element={<Portfolio />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="/terms.html" element={<Terms />} />
          <Route path="/privacy.html" element={<Privacy />} />
          <Route path="/refund-policy.html" element={<RefundPolicy />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin-login.html" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/admin.html" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default App;

