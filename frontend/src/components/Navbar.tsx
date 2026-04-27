import React, { useState } from 'react';
import API_BASE_URL from '../config';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  // 1. State to track if mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Logic to handle Admin Verifications
  const handleAdminLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close menu if open
    
    const email = window.prompt("Enter Admin Email to access Dashboard:");
    
    if (!email) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        alert("Verification Successful. Welcome, Dr. Khan.");
        window.location.href = '/admin-dashboard'; 
      } else {
        alert(data.message || "Unauthorized Access");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Could not connect to the server.");
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-md bg-indigo-600 flex items-center justify-center shadow-sm ring-1 ring-indigo-700/20">
            <span className="serif text-white text-2xl leading-none -mt-0.5">D</span>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-px bg-gold-500"></span>
          </div>
          <span className="serif text-[1.35rem] leading-tight text-slate-900 tracking-tight">
            Dental <span className="text-gold-500">&amp;</span> <span className="text-slate-500 font-normal italic">Maxillofacial</span>
          </span>
        </a>
        
        {/* Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-10">
          {['About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item}
            </a>
          ))}

          <button
            onClick={handleAdminLogin}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Admin
          </button>
          
          <a
            href="#contact"
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-indigo-700 transition-all shadow-brand hover:-translate-y-0.5 inline-block"
          >
            Book Appointment
          </a>
        </div>
        
        {/* Mobile Toggle Button (Visible only on Mobile) */}
        <button 
          className="md:hidden text-slate-900 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            // Close (X) Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Menu Icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-6 animate-in slide-in-from-top-5">
          {['About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-slate-700 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {item}
            </a>
          ))}
          
          <hr className="border-slate-100" />

          <button
            onClick={handleAdminLogin}
            className="text-left text-lg font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Admin Access
          </button>
          
          <a 
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="bg-indigo-600 text-white px-6 py-4 rounded-xl text-center text-lg font-semibold hover:bg-indigo-700 transition-all shadow-md"
          >
            Book Appointment
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;