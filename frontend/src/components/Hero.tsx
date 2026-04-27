import React from 'react';
import { MessageSquare, MapPin, Clock } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Hero Specific Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl animate-pulse-slow"></div>

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#1f4a55 0.5px, transparent 0.5px)', backgroundSize: '28px 28px' }}></div>
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block z-10">
        <div className="absolute inset-0 bg-linear-to-r from-slate-50 via-transparent to-transparent z-10" />
        <img
          src="hero.jpeg"
          alt="Modern Dental Studio"
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.05]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 backdrop-blur-sm text-indigo-600 text-xs font-bold tracking-wider uppercase mb-8 border border-indigo-100/50 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            Clinical Excellence from AMU
          </div>
          <h1 className="serif text-5xl lg:text-[5.25rem] font-medium text-slate-900 mb-8 leading-[1.05] relative tracking-tight">
            Precision Surgery. <br />
            <span className="text-indigo-600 italic font-normal">Advanced Dental Diagnostics.</span> <br />
            Total Care.
            {/* Subtle glow behind text */}
            <div className="absolute -z-10 top-1/2 left-0 -translate-y-1/2 w-full h-32 bg-indigo-200/10 blur-[60px]"></div>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-light">
            Experience Best-in-class care under <span className="font-bold text-slate-900">Dr. Md S T Khan</span>, an expert in <span className="font-bold text-slate-900"> Dental Procedures, Maxillofacial Surgery </span> and <span className="font-bold text-slate-900">Radiology</span>. We combine surgical precision with specialized periodontal insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* UPDATED: Changed button to anchor tag for navigation */}
            <a
              href="#contact"
              className="
    inline-flex items-center justify-center
    bg-indigo-600 text-white
    px-8 py-4
    rounded-full
    text-lg font-semibold
    leading-none
    hover:bg-indigo-700
    transition-all
    shadow-[0_20px_50px_rgba(31,74,85,0.35)]
    hover:-translate-y-1
    active:scale-95
    text-center
  "
            >
              Book a Consultation
            </a>


            <button className="flex items-center gap-3 px-8 py-4 text-slate-700 font-semibold hover:text-indigo-600 transition-colors group">
              <span className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 group-hover:border-indigo-600 transition-all group-hover:bg-indigo-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              Clinical Experience
            </button>
          </div>

          {/* Clinic info card — live status, hours, WhatsApp & Directions */}
          <div className="mt-12 max-w-xl rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/70 shadow-[0_10px_40px_-12px_rgba(15,42,50,0.18)] overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100/80">
              <span className="relative flex h-2.5 w-2.5">
                {status.state === 'open' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusDot}`}></span>
              </span>
              <span className={`text-sm font-semibold ${statusText}`}>{status.label}</span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Clock size={13} /> {CLINIC.hours.weekdayLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-100/80">
              <a
                href={whatsappLink(`Hi ${CLINIC.doctor}, I'd like to book an appointment.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-5 py-4 text-sm font-semibold text-slate-700 hover:text-green-700 hover:bg-green-50/60 transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <MessageSquare size={16} />
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
                className="flex items-center justify-center gap-2.5 px-5 py-4 text-sm font-semibold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/40 transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <MapPin size={16} />
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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block text-slate-400/50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;