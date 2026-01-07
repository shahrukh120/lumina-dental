import React from 'react';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
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

  // Extracted list for cleaner code
  const specialties = [
    'Maxillofacial Radiology', 'Oral Surgery', 'Periodontology', 'Dental Implants', 
    'Full Mouth Rehab', 'Tooth Fillings', 'Tooth Removal', 'Teeth cleaning', 
    'Laser Treatment', 'Dental Cap', 'Denture', 'Trauma', 'Oral Cancer', 'Ulcer', 
    '3rd molar surgery', 'Braces', 'Sensitivity', 'Pain', 'TMJ pain', 'Jaw pain', 'Lock jaw'
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Changed grid gap slightly to accommodate wider specialty column if needed */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          
          {/* COLUMN 1: Brand & Social */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">D</div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Dental & <span className="font-light text-slate-500">maxillofacial clinic</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              A specialized dental studio led by Dr. Md S T Khan, dedicated to advanced Maxillofacial diagnostics and surgical precision.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:shadow-sm transition-all"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* COLUMN 2: Clinical Links */}
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Clinical Links</h5>
            <ul className="space-y-3"> {/* Reduced spacing from 4 to 3 */}
              {['About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* COLUMN 3: Specialties (THE FIX) */}
          <div className="lg:col-span-1"> {/* Expanded width context */}
            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Specialties</h5>
            
            {/* CHANGE MADE HERE: 
               1. Changed from space-y-4 to grid grid-cols-2 
               2. Added gap-x-2 for horizontal space 
               3. Added gap-y-2 for tight vertical space
            */}
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
              {specialties.map(item => (
                <li key={item}>
                  <a href="#services" className="text-xs text-slate-500 hover:text-indigo-600 transition-colors block truncate" title={item}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* COLUMN 4: Consultation */}
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Consultation</h5>
            <p className="text-sm text-slate-500 mb-6">Schedule a diagnostic evaluation for specialized surgical care.</p>
            <a 
              href="#contact" 
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm font-bold block text-center shadow-lg shadow-indigo-100"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-xs text-slate-400">© 2026 Dr. Md S T Khan | Dental & maxillofacial clinic. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-slate-400">
            <a href="/ethics" className="hover:text-slate-600">Clinical Ethics</a>
            <a href="/terms" className="hover:text-slate-600">Terms of Care</a>
            <a href="/privacy" className="hover:text-slate-600">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;