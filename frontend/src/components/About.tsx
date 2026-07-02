import React from 'react';
import { GraduationCap, Award, Stethoscope, Microscope, ArrowUpRight } from 'lucide-react';

const CREDENTIALS = [
  { icon: Microscope,     title: 'MDS — Maxillofacial Radiology', desc: 'Aligarh Muslim University' },
  { icon: Stethoscope,    title: 'Periodontist & Implantologist', desc: 'Ex Resident, Periodontology (AMU)' },
  { icon: GraduationCap,  title: 'Cert. Maxillofacial Surgery',   desc: 'Aligarh Muslim University' },
  { icon: Award,          title: 'Cert. Oral Cancer & Oral Health', desc: 'UCL London · University of Pennsylvania' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white/60 backdrop-blur-sm overflow-hidden relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Portrait */}
          <div className="relative max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative z-10 bg-white rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_30px_60px_-20px_rgba(12,31,74,0.25)] border border-slate-200">
              <img
                src="/profile_pic.jpeg"
                alt="Dr. Md S T Khan"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 rounded-3xl"></div>
            </div>

            {/* Name card */}
            <div className="relative sm:absolute -mt-10 sm:mt-0 sm:-bottom-8 sm:-right-6 lg:-right-10 mx-4 sm:mx-0 bg-white p-6 sm:p-7 rounded-2xl shadow-[0_20px_50px_rgba(12,31,74,0.15)] sm:max-w-xs border border-slate-100 z-20">
              <h4 className="serif text-xl text-slate-900 mb-1.5">Dr. Md S T Khan</h4>
              <p className="text-[11px] text-gold-600 mb-3 font-semibold uppercase tracking-[0.18em]">BDS (AMU) · MDS (Radiology)</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Maxillofacial surgeon &amp; radiologist — surgical precision backed by advanced diagnostics.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="relative">
            <span className="eyebrow mb-4">Meet Your Doctor</span>
            <h2 className="display-h2 mb-7">
              Advanced diagnostics.<br />
              <span className="italic text-indigo-700">Surgical expertise.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 mb-5 leading-relaxed">
              <span className="font-semibold text-slate-900">Dr. Md Suleman Tarique Khan</span> is a
              specialist dental surgeon trained at <span className="font-semibold text-slate-900">Aligarh
              Muslim University</span>. With an MDS in Maxillofacial Radiology, he brings diagnostic
              insight that bridges medical imaging and dental care.
            </p>

            <p className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed">
              As an Ex Resident in Periodontology with certification in Maxillofacial Surgery, he
              handles complex oral rehabilitations, surgical extractions, and advanced gum
              treatments — every procedure grounded in rigorous clinical training.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {CREDENTIALS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-white/70 hover:border-gold-300 hover:shadow-[0_12px_30px_-12px_rgba(12,31,74,0.15)] transition-all duration-300"
                >
                  <span className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                    <Icon size={18} />
                  </span>
                  <h5 className="text-slate-900 font-semibold text-[0.95rem] leading-snug mb-1">{title}</h5>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              ))}
            </div>

            <a
              href="https://www.linkedin.com/in/md-suleman-tarique-khan-6a1a29164/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-900 font-semibold border-b-2 border-gold-400 pb-1 hover:text-indigo-700 hover:border-indigo-600 transition-all group"
            >
              View Detailed Clinical Profile
              <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
