import React from 'react';
import { Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import { CLINIC, whatsappLink } from '../constants/clinic';

// Sticky bottom action bar — mobile only. Call / WhatsApp / Book, always one tap away.
const MobileActionBar: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_30px_-12px_rgba(12,31,74,0.25)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 divide-x divide-slate-100">
        <a
          href="tel:+918791785177"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-slate-700 active:bg-slate-50"
        >
          <Phone size={19} className="text-indigo-700" />
          <span className="text-[11px] font-semibold">Call</span>
        </a>
        <a
          href={whatsappLink(`Hi ${CLINIC.doctor}, I'd like to book an appointment.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-slate-700 active:bg-slate-50"
        >
          <MessageSquare size={19} className="text-green-600" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center justify-center gap-1 py-2.5 bg-indigo-700 text-white active:bg-indigo-800"
        >
          <CalendarCheck size={19} />
          <span className="text-[11px] font-semibold">Book</span>
        </a>
      </div>
    </div>
  );
};

export default MobileActionBar;
