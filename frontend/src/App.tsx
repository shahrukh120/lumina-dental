import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
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

const LandingPage: React.FC<{ isScrolled: boolean }> = ({ isScrolled }) => (
  <>
    <Navbar isScrolled={isScrolled} />
    <main>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
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
            <Route path="/" element={<LandingPage isScrolled={isScrolled} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;