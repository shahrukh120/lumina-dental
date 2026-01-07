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

    const text = `Hi Dr. Khan, I'd like to request an appointment at Lumina Dental Studio.

*Patient Name:* ${formData.firstName} ${formData.lastName}
*Email:* ${formData.email}
*Requested Service:* ${serviceText}
*Patient Note:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-12 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">

          {/* LEFT COLUMN: Contact Info & Map */}
          <div className="flex flex-col h-full">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Ready for Your <br /> <span className="serif italic font-normal text-indigo-400">New Smile?</span></h2>
            <p className="text-lg text-slate-600 mb-10 font-light leading-relaxed">
              Dr. Md S T Khan is most responsive via his **WhatsApp Business** account for quick consultations and appointment scheduling.
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

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Location</h4>
                  <a 
                    href="https://www.google.com/maps?q=Apoorva+Hospital+And+Research+Centre+Pvt+Ltd" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 text-sm hover:text-indigo-600 transition-colors"
                  >
                    Apoorva Hospital And Research Centre Pvt Ltd<br />
                    Ballia - Bansdih Rd, Jalalpur Chak, UP
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">Office Hours</h4>
                  <p className="text-slate-500 text-sm">Mon - Sat: 10:00 AM - 5:00 PM<br />Sunday: Only Emergency</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-sm border border-slate-100 mt-auto">
              <iframe
                title="Clinic Location"
                src="https://maps.google.com/maps?q=Apoorva+Hospital+And+Research+Centre+Pvt+Ltd+Ballia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="bg-slate-50 p-6 sm:p-10 lg:p-16 rounded-[2.5rem] shadow-sm border border-slate-100 h-fit">
            <form className="space-y-5" onSubmit={handleWhatsAppSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                  <input required type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Service Required</label>
                <select 
                  required 
                  value={formData.service} 
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })} 
                  className={`w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer ${formData.service === "" ? "text-slate-400" : "text-slate-900"}`}
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
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Additional Notes</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="Briefly describe your dental concern..."></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
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