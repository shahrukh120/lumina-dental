import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Hero Specific Background Visuals */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-slate-200/50 rounded-full blur-2xl animate-pulse-slow"></div>

        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
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
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] relative">
            Precision Surgery. <br />
            <span className="text-indigo-600 italic serif font-normal">Advanced Dental Diagnostics.</span> <br />
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
    shadow-[0_20px_50px_rgba(79,70,229,0.3)]
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

          <div className="mt-16 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/${i + 10}/100/100`}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  alt="Patient"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Expert AMU Alumnus</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
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