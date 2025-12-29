import React from 'react';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  // Define social links with their respective icons and URLs
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
      url: "#" // Add link if available
    },
    { 
      name: 'Twitter', 
      icon: <Twitter size={18} />, 
      url: "#" // Add link if available
    }
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">D</div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Dental & <span className="font-light text-slate-500">maxillofacial clinic</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              A specialized dental studio led by Dr. Md S T Khan, dedicated to advanced Maxillofacial diagnostics and surgical precision.
            </p>
            
            {/* UPDATED SOCIAL LINKS SECTION */}
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
          
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Clinical Links</h5>
            <ul className="space-y-4">
              {['About', 'Services', 'Gallery', 'Testimonials', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-[10px]">Specialties</h5>
            <ul className="space-y-4">
              {['Maxillofacial Radiology', 'Oral Surgery', 'Periodontology', 'Dental Implants', 'Full Mouth Rehab'].map(item => (
                <li key={item}>
                  <a href="#services" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
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
        
        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-xs text-slate-400">© 2026 Dr. Md S T Khan | Dental & maxillofacial clinic. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">Clinical Ethics</a>
            <a href="#" className="hover:text-slate-600">Terms of Care</a>
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;