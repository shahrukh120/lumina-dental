import React, { useState } from 'react';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { CLINIC, whatsappLink, mapsDirectionsLink } from '../constants/clinic';
import AdminLogin from './AdminLogin';

const Footer: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram size={18} />,
      url: "https://www.instagram.com/drmdstkhandentist/"
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com/in/md-suleman-tarique-khan-6a1a29164/"
    },
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      url: "#"
    },
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      url: "#"
    }
  ];

  const specialties = [
    'Maxillofacial Radiology', 'Oral Surgery', 'Periodontology', 'Dental Implants',
    'Full Mouth Rehab', 'Tooth Fillings', 'Tooth Removal', 'Teeth cleaning',
    'Laser Treatment', 'Dental Cap', 'Denture', 'Trauma', 'Oral Cancer', 'Ulcer',
    '3rd molar surgery', 'Braces', 'Sensitivity', 'Pain', 'TMJ pain', 'Jaw pain', 'Lock jaw'
  ];

  return (
    <footer className="bg-indigo-950 text-slate-300 pt-16 pb-10 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-400/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">

          {/* COLUMN 1: Brand & Social */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
                <span className="serif text-white text-xl leading-none -mt-0.5">M</span>
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-gold-400"></span>
              </div>
              <span className="flex flex-col leading-none">
                <span className="serif text-xl tracking-tight text-white">
                  Maxo<span className="text-indigo-300">Dent</span>
                </span>
                <span className="text-[0.58rem] font-semibold tracking-[0.24em] text-gold-400/90 uppercase mt-1">Dental Care Clinic</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Complete dental &amp; maxillofacial care under one roof, led by Dr. Md S T Khan —
              combining surgical precision with advanced diagnostics. Healthy smile, confident you.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-gold-300 hover:border-gold-400/40 transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Clinical Links */}
          <div>
            <h5 className="font-semibold text-white mb-6 uppercase tracking-[0.2em] text-[11px]">Clinical Links</h5>
            <ul className="space-y-3">
              {['About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Specialties */}
          <div className="lg:col-span-1">
            <h5 className="font-semibold text-white mb-6 uppercase tracking-[0.2em] text-[11px]">Specialties</h5>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5">
              {specialties.map(item => (
                <li key={item}>
                  <a href="#services" className="text-xs text-slate-400 hover:text-white transition-colors block truncate" title={item}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Consultation */}
          <div>
            <h5 className="font-semibold text-white mb-6 uppercase tracking-[0.2em] text-[11px]">Consultation</h5>
            <p className="text-sm text-slate-400 mb-2">
              <span className="font-semibold text-slate-200">Main Clinic (Apoorva Hospital)</span><br />
              {CLINIC.hours.weekdayLabel}<br />Sun: {CLINIC.hours.sundayLabel}
            </p>
            <p className="text-sm text-slate-400 mb-6">
              <span className="font-semibold text-slate-200">Baheri Clinic</span><br />
              Daily: 5:00 PM – 9:00 PM
            </p>
            <a
              href={whatsappLink(`Hi ${CLINIC.doctor}, I'd like to book an appointment.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors text-sm font-semibold block text-center shadow-lg mb-3"
            >
              Book via WhatsApp
            </a>
            <a
              href={mapsDirectionsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-white/15 text-slate-200 px-6 py-3 rounded-xl hover:border-gold-400/50 hover:text-gold-200 transition-colors text-sm font-semibold block text-center"
            >
              Get Directions
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left">
          <p className="text-xs text-slate-500">© 2026 MaxoDent Dental Care Clinic · Dr. Md S T Khan. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-2 text-xs text-slate-500">
            <a href="/ethics" className="hover:text-slate-300 transition-colors">Clinical Ethics</a>
            <a href="/terms" className="hover:text-slate-300 transition-colors">Terms of Care</a>
            <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <button onClick={() => setIsLoginOpen(true)} className="hover:text-slate-300 transition-colors">
              Staff Login
            </button>
          </div>
        </div>
      </div>

      {/* Secure Admin Login Modal */}
      <AdminLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </footer>
  );
};

export default Footer;
