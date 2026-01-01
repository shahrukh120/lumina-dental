import React, { useState } from 'react';
import { MessageSquare, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'Maxillofacial Radiology',
    message: ''
  });

  const WHATSAPP_NUMBER = "918791785177"; 

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Dr. Khan, I'd like to request an appointment at Lumina Dental Studio.

*Patient Name:* ${formData.firstName} ${formData.lastName}
*Email:* ${formData.email}
*Requested Service:* ${formData.service}
*Patient Note:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* LEFT COLUMN: Contact Info */}
          <div>
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Ready for Your <br/> <span className="serif italic font-normal text-indigo-400">New Smile?</span></h2>
            <p className="text-lg text-slate-600 mb-12 font-light leading-relaxed">
              Dr. Md S T Khan is most responsive via his **WhatsApp Business** account for quick consultations and appointment scheduling.
            </p>
            
            <div className="space-y-10 mb-12">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0 transition-colors group-hover:bg-green-100">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Business</h4>
                  <p className="text-slate-500 mb-1">Direct line for immediate assistance.</p>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-green-600 font-bold hover:underline">
                    +91 87917 85177 →
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Location</h4>
                  {/* Used the place name found from Maps */}

http://googleusercontent.com/map_location_reference/1
                  <p className="text-slate-500">[Apoorva Hospital And Research Centre Pvt Ltd](http://googleusercontent.com/map_location_reference/0) <br />Ballia - Bansdih Rd, Jalalpur Chak, Uttar Pradesh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Office Hours</h4>
                  <p className="text-slate-500">Mon - Sat: 10:00 AM - 5:00 PM<br />Sunday: Only Emergency</p>
                </div>
              </div>
            </div>

            {/* NEW: Embedded Google Map */}
            <div className="w-full h-64 rounded-3xl overflow-hidden shadow-sm border border-slate-100 relative group">
               <iframe 
                title="Clinic Location"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?q=Apoorva+Hospital+And+Research+Centre+Pvt+Ltd+Ballia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
               ></iframe>
               {/* Optional: Overlay to make it interactive on click only if needed, currently it's fully interactive */}
            </div>

          </div>
          
          {/* RIGHT COLUMN: Contact Form (Unchanged) */}
          <div className="bg-slate-50 p-10 lg:p-16 rounded-[3rem] shadow-sm border border-slate-100 h-fit">
            <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                  <input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Service Required</label>
                <select value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer">
                  <option>Maxillofacial Radiology</option>
                  <option>Maxillofacial Surgery</option>
                  <option>Periodontal Treatment</option>
                  <option>Dental Implants</option>
                  <option>Routine Consultation</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Additional Notes</label>
                <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="Briefly describe your dental concern..."></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
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