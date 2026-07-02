import React from 'react';
import { MessageSquare, MapPin, Clock, ArrowDown } from 'lucide-react';
import { CLINIC, whatsappLink, mapsDirectionsLink, getClinicStatus } from '../constants/clinic';

const Hero: React.FC = () => {
  const status = getClinicStatus();
  const statusDot =
    status.state === 'open'      ? 'bg-green-500' :
    status.state === 'emergency' ? 'bg-amber-500' : 'bg-slate-400';
  const statusText =
    status.state === 'open'      ? 'text-green-700' :
    status.state === 'emergency' ? 'text-amber-700' : 'text-slate-600';

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 lg:pt-20 lg:pb-0 overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#1b4ba8 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }}></div>
      </div>

      {/* Desktop hero image */}
      <div className="absolute top-0 right-0 w-[45%] h-full hidden lg:block z-10">
        <div className="absolute inset-0 bg-linear-to-r from-[#faf8f4] via-[#faf8f4]/40 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#faf8f4] to-transparent z-10" />
        <img
          src="hero.jpeg"
          alt="MaxoDent Dental Care Clinic"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 w-full relative z-20">
        <div className="lg:w-[55%]">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm text-indigo-800 text-[11px] font-semibold tracking-[0.18em] uppercase mb-7 border border-gold-200/70 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            Clinical Excellence from AMU
          </div>

          <h1 className="serif text-[2.6rem] sm:text-6xl lg:text-[4.6rem] text-slate-900 mb-6 leading-[1.06] tracking-tight">
            Precision surgery.
            <br />
            Advanced diagnostics.
            <br />
            <span className="italic text-indigo-700">Complete dental care.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mb-9 max-w-lg leading-relaxed">
            Consult <span className="font-semibold text-slate-900">Dr. Md S T Khan</span> — maxillofacial
            surgeon and radiologist trained at AMU — for everything from routine dentistry
            to complex oral surgery, in Ballia.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-indigo-700 text-white px-8 py-4 rounded-full text-base font-semibold leading-none hover:bg-indigo-800 transition-all shadow-brand hover:-translate-y-0.5 active:scale-95"
            >
              Book a Consultation
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-3 px-2 sm:px-4 py-3 text-slate-700 font-semibold hover:text-indigo-700 transition-colors group"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-full border border-slate-300 group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all">
                <ArrowDown size={17} />
              </span>
              Meet Dr. Khan
            </a>
          </div>

          {/* Mobile hero image */}
          <div className="lg:hidden mb-8 rounded-2xl overflow-hidden shadow-[0_18px_40px_-18px_rgba(12,31,74,0.35)] border border-slate-200/70 aspect-[16/10]">
            <img src="hero.jpeg" alt="MaxoDent Dental Care Clinic" className="w-full h-full object-cover" />
          </div>

          {/* Clinic info card — live status, hours, WhatsApp & Directions */}
          <div className="max-w-xl rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-[0_10px_40px_-12px_rgba(12,31,74,0.15)] overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100">
              <span className="relative flex h-2.5 w-2.5">
                {status.state === 'open' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusDot}`}></span>
              </span>
              <span className={`text-sm font-semibold ${statusText}`}>{status.label}</span>
              <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Clock size={13} /> {CLINIC.hours.weekdayLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-100">
              <a
                href={whatsappLink(`Hi ${CLINIC.doctor}, I'd like to book an appointment.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-4 py-4 text-sm font-semibold text-slate-700 hover:text-green-700 hover:bg-green-50/60 transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-colors shrink-0">
                  <MessageSquare size={15} />
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <span>WhatsApp</span>
                  <span className="text-[11px] font-normal text-slate-500">{CLINIC.whatsappDisplay}</span>
                </span>
              </a>

              <a
                href={mapsDirectionsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-4 py-4 text-sm font-semibold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/40 transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors shrink-0">
                  <MapPin size={15} />
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <span>Directions</span>
                  <span className="text-[11px] font-normal text-slate-500">Ballia, UP</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block text-slate-400/60">
        <ArrowDown size={20} />
      </div>
    </section>
  );
};

export default Hero;
