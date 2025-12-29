
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white/50 backdrop-blur-sm overflow-hidden relative">
      {/* Decorative Background for Section */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1/3 h-full bg-gradient-to-r from-indigo-50/30 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            {/* Animated pulsing background circle */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-50/80 rounded-full z-0 blur-3xl animate-pulse-slow" />

            <div className="relative z-10 bg-slate-100 rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl group border border-slate-200">
              <img
                src="/pphoto.png"
                alt="Dr. Md S T Khan"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-slate-900/10 rounded-[3rem]"></div>
            </div>

            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-xs hidden sm:block border border-slate-100/50 backdrop-blur-md z-20">
              <h4 className="text-xl font-bold text-slate-900 mb-2">Dr. Md S T Khan</h4>
              <p className="text-xs text-indigo-600 mb-4 font-bold uppercase tracking-widest">BDS (AMU) | MDS (Radiology)</p>
              <div className="flex items-center gap-3 text-indigo-600 font-bold">
                <span className="text-4xl">Ex</span>
                <span className="text-[10px] uppercase tracking-[0.2em] leading-tight text-slate-400 font-semibold">Resident <br />Periodontology (AMU)</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <span className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Distinguished Clinician</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Advanced Dental Diagnostics & <br /><span className="serif italic font-normal text-indigo-600">Surgical Expertise.</span></h2>
<p className="text-lg text-slate-700 mb-6 leading-relaxed font-light/40">
  <span className="font-bold text-slate-900">Dr. Md Suleman Tarique Khan</span> is a highly specialized dental surgeon with a distinguished academic pedigree from <span className="font-bold text-slate-900">Aligarh Muslim University (AMU)</span>. With an <span className="font-bold text-indigo-600">MDS in Maxillofacial Radiology</span>, he offers unparalleled diagnostic insight that bridges the gap between medical science and dental care.
</p>

<p className="text-lg text-slate-700 mb-10 leading-relaxed font-normal">
  Having served as an <span className="font-bold text-slate-900">Ex Resident in Periodontology</span> and holding a <span className="font-bold text-slate-900">Cert. in Maxillofacial Surgery</span>, Dr. Khan specializes in complex oral rehabilitations, surgical extractions, and advanced gum treatments, ensuring every procedure is backed by rigorous clinical expertise.
</p>

<div className="grid grid-cols-2 gap-8 mb-10">
  {[
    { title: "MDS", desc: "Maxillofacial Radiology", primary: true },
    { title: "Aligarh Muslim University Alum", desc: "Residency Honors" },
    { title: "Maxillofacial Surgery", desc: "Certification (AMU)" },
    { title: "Periodontist & Implantologist", desc: "Clinical Expert", primary: true },
    { title: "Cert. in Oral Cancer", desc: "UCL London | Certification", primary: true },
    { title: "Cert. in Oral Health", desc: "University of Pennsylvania", primary: true },
  ].map((item, index) => (
    <div 
      key={index}
      className={`p-6 rounded-2xl border transition-all duration-300 cursor-default group
        ${item.primary 
          ? 'bg-indigo-50/30 border-indigo-100/20 hover:bg-white hover:border-indigo-400 hover:shadow-indigo-100' 
          : 'bg-slate-50/50 border-slate-100/50 hover:bg-white hover:border-slate-300 hover:shadow-slate-100'
        } hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02]`}
    >
      <h5 className="text-indigo-600 font-bold text-lg mb-1 transition-colors group-hover:text-indigo-700 capitalize">
        {item.title}
      </h5>
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold group-hover:text-slate-500">
        {item.desc}
      </p>
    </div>
  ))}
</div>

            <button className="inline-flex items-center gap-3 text-slate-900 font-bold border-b-2 border-indigo-600 pb-1 hover:text-indigo-600 transition-all group">
              View Detailed Clinical Profile
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
