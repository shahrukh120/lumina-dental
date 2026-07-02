import React, { useState } from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import AdminLogin from './AdminLogin';

interface NavbarProps {
  isScrolled: boolean;
}

const NAV_ITEMS = ['About', 'Services', 'Gallery', 'Testimonials', 'Contact'];

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openAdminLogin = () => {
    setIsMenuOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMenuOpen
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(15,23,42,0.06),0_8px_30px_-12px_rgba(12,31,74,0.12)] py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-indigo-900 to-indigo-600 flex items-center justify-center shadow-md ring-1 ring-indigo-900/20">
            <span className="serif text-white text-xl sm:text-2xl leading-none -mt-0.5">M</span>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] rounded-full bg-gold-400"></span>
          </div>
          <span className="flex flex-col leading-none">
            <span className="serif text-[1.3rem] sm:text-[1.4rem] tracking-tight">
              <span className="text-indigo-900 font-semibold">Maxo</span><span className="text-indigo-500 font-semibold">Dent</span>
            </span>
            <span className="text-[0.58rem] font-semibold tracking-[0.24em] text-gold-600 uppercase mt-1">Dental Care Clinic</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[0.9rem] font-medium text-slate-600 hover:text-indigo-700 transition-colors"
            >
              {item}
            </a>
          ))}

          <button
            onClick={openAdminLogin}
            className="text-[0.9rem] font-medium text-slate-600 hover:text-indigo-700 transition-colors"
          >
            Admin
          </button>

          <div className="h-5 w-px bg-slate-200" aria-hidden="true"></div>

          <a
            href="tel:+918791785177"
            className="flex items-center gap-2 text-[0.9rem] font-semibold text-slate-700 hover:text-indigo-700 transition-colors"
          >
            <Phone size={15} className="text-gold-500" />
            +91 87917 85177
          </a>

          <a
            href="#contact"
            className="bg-indigo-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-indigo-800 transition-all shadow-brand hover:-translate-y-0.5 inline-block"
          >
            Book Appointment
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-900 p-2 -mr-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h10" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl py-5 px-6 flex flex-col animate-in slide-in-from-top-3 duration-200">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="py-3.5 text-[1.05rem] font-medium text-slate-700 hover:text-indigo-700 border-b border-slate-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}

          <button
            onClick={openAdminLogin}
            className="py-3.5 text-[1.05rem] font-medium text-slate-700 hover:text-indigo-700 text-left flex items-center gap-2 transition-colors"
          >
            <ShieldCheck size={17} className="text-gold-500" /> Admin Access
          </button>

          <div className="flex flex-col gap-3 mt-5">
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="bg-indigo-700 text-white px-6 py-3.5 rounded-xl text-center text-base font-semibold hover:bg-indigo-800 transition-all shadow-md"
            >
              Book Appointment
            </a>
            <a
              href="tel:+918791785177"
              className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl text-center text-base font-semibold hover:border-indigo-300 transition-colors"
            >
              <Phone size={16} className="text-gold-500" /> Call the Clinic
            </a>
          </div>
        </div>
      )}

      {/* Secure Admin Login Modal */}
      <AdminLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
};

export default Navbar;
