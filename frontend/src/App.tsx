import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import SmileAssistant from './components/SmileAssistant';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ClinicalEthics from './components/ClinicalEthics';
import TermsOfCare from './components/TermsOfCare';
import PrivacyPolicy from './components/PrivacyPolicy';
import Reveal from './components/Reveal';

const LandingPage: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <>
    <Navbar isScrolled={isScrolled} />
    <main>
      <Hero />
      <Reveal><About /></Reveal>
      <Reveal><Services /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
    
    <SmileAssistant />
    <Footer />
  </>
);

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Buttery-smooth inertial scrolling. Disabled when the user prefers
  // reduced motion or on coarse-pointer (touch) devices, where native
  // scrolling already feels best.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen selection:bg-indigo-100 selection:text-indigo-900">
        {/* Global Background Visuals */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-slate-200/30 blur-[100px] animate-float"></div>
        </div>

        <div className="relative z-10">
          <Routes>
            {/* Main Landing Page */}
            <Route path="/" element={<LandingPage isScrolled={isScrolled} />} />
            
            {/* Admin Dashboard */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Policy Pages (Wrapped with Navbar & Footer for navigation) */}
            <Route path="/ethics" element={
              <>
                <Navbar isScrolled={true} />
                <ClinicalEthics />
                <Footer />
              </>
            } />
            
            <Route path="/terms" element={
              <>
                <Navbar isScrolled={true} />
                <TermsOfCare />
                <Footer />
              </>
            } />
            
            <Route path="/privacy" element={
              <>
                <Navbar isScrolled={true} />
                <PrivacyPolicy />
                <Footer />
              </>
            } />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;