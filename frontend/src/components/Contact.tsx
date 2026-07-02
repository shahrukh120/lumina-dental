import React, { useState } from 'react';
import { MessageSquare, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  // UPDATED: Set initial service to empty string so placeholder shows first
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '', 
    message: ''
  });

  const WHATSAPP_NUMBER = "918791785177";

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation to ensure a service is selected
    const serviceText = formData.service === '' ? 'General Inquiry' : formData.service;

    const text = `Hi Dr. Khan, I'd like to request an appointment at MaxoDent Dental Care Clinic.

*Patient Name:* ${formData.firstName} ${formData.lastName}
*Email:* ${formData.email}
*Requested Service:* ${serviceText}
*Patient Note:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT COLUMN: Contact Info & Map */}
          <div className="flex flex-col h-full">
            <span className="eyebrow mb-4">Get In Touch</span>
            <h2 className="display-h2 mb-7">Ready for your <br /> <span className="italic text-indigo-700">new smile?</span></h2>
            <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed">
              Dr. Md S T Khan is most responsive on <span className="font-semibold text-slate-900">WhatsApp Business</span> for quick consultations and appointment scheduling.
            </p>

            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0 transition-colors group-hover:bg-green-100">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">WhatsApp Business</h4>
                  <p className="text-slate-500 text-sm mb-1">Direct line for immediate assistance.</p>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-green-600 font-bold hover:underline">
                    +91 87917 85177 →
                  </a>
                </div>
              </div>

              {/* Clinic 1 — Main (Apoorva Hospital) */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Main Clinic · Apoorva Hospital</h4>
                  <a
                    href="https://www.google.com/maps?q=Apoorva+Hospital+And+Research+Centre+Pvt+Ltd+Ballia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 text-sm hover:text-indigo-600 transition-colors block"
                  >
                    Apoorva Hospital And Research Centre Pvt Ltd<br />
                    Ballia - Bansdih Rd, Jalalpur Chak, UP
                  </a>
                  <p className="text-sm text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-500 shrink-0" /> Mon – Sat: 10:00 AM – 5:00 PM · Sun: Emergency
                  </p>
                </div>
              </div>

              {/* Clinic 2 — Baheri */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Baheri Clinic</h4>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=25.757378,84.143394"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 text-sm hover:text-indigo-600 transition-colors block"
                  >
                    Delhi Public Convent School,<br />
                    Baheri, Ballia, UP 277001
                  </a>
                  <p className="text-sm text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-500 shrink-0" /> Daily: 5:00 PM – 9:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Maps for both clinics */}
            <div className="grid sm:grid-cols-2 gap-4 mt-auto">
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em] mb-2 ml-1">Main Clinic</p>
                <div className="w-full h-56 rounded-2xl overflow-hidden shadow-sm border border-slate-200/70">
                  <iframe
                    title="Main Clinic Location"
                    src="https://maps.google.com/maps?q=Apoorva+Hospital+And+Research+Centre+Pvt+Ltd+Ballia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em] mb-2 ml-1">Baheri Clinic</p>
                <div className="w-full h-56 rounded-2xl overflow-hidden shadow-sm border border-slate-200/70">
                  <iframe
                    title="Baheri Clinic Location"
                    src="https://maps.google.com/maps?q=25.757378,84.143394&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="bg-slate-50/80 p-6 sm:p-10 lg:p-12 rounded-3xl shadow-sm border border-slate-200/70 h-fit">
            <form className="space-y-5" onSubmit={handleWhatsAppSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em] ml-1">First Name</label>
                  <input required type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 outline-none transition-all" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em] ml-1">Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 outline-none transition-all" placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em] ml-1">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 outline-none transition-all" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em] ml-1">Service Required</label>
                <select 
                  required 
                  value={formData.service} 
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })} 
                  className={`w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 outline-none transition-all appearance-none cursor-pointer ${formData.service === "" ? "text-slate-400" : "text-slate-900"}`}
                >
                  {/* UPDATED: Added placeholder option */}
                  <option value="" disabled>Select Services</option>
                  <option value="Routine Consultation">Routine Consultation</option>
                  <option value="Maxillofacial Radiology">Maxillofacial Radiology</option>
                  <option value="Maxillofacial Surgery">Maxillofacial Surgery</option>
                  <option value="Periodontal Treatment">Periodontal Treatment</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="Tooth Fillings">Tooth Fillings</option>
                  <option value="Tooth removal">Tooth removal</option>
                  <option value="Teeth Cleaning">Teeth Cleaning</option>
                  <option value="Teeth Whitening">Teeth Whitening</option>
                  <option value="Laser Treatment">Laser Treatment</option>
                  <option value="Dental cap">Dental cap</option>
                  <option value="Denture">Denture</option>
                  <option value="Trauma">Trauma</option>
                  <option value="Oral Cancer">Oral Cancer</option>
                  <option value="Ulcer">Ulcer</option>
                  <option value="3rd Molar Surgery">3rd Molar Surgery</option>
                  <option value="Braces">Braces</option>
                  <option value="Sensitivity">Sensitivity</option>
                  <option value="Pain">Pain</option>
                  <option value="TMJ pain">TMJ pain</option>
                  <option value="Jaw pain">Jaw pain</option>
                  <option value="Lock jaw">Lock jaw</option>
                  <option value="RE-RCT">RE-RCT</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.14em] ml-1">Additional Notes</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-300 outline-none transition-all resize-none" placeholder="Briefly describe your dental concern..."></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white font-semibold py-4 rounded-xl shadow-lg shadow-green-100 hover:bg-green-700 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <MessageSquare size={20} /> Request via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;