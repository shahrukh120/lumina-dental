import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Phone, X } from 'lucide-react';
import API_BASE_URL from '../config'

// Shape of data coming from MongoDB
interface Service {
  _id: string;
  title: string;
  description: string;
  details?: string;
  image: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [active, setActive] = useState<Service | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while the detail modal is open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services`);
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to load services", error);
      }
    };
    fetchServices();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50/70 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-8">
          <div className="max-w-xl">
            <span className="eyebrow mb-4">Our Specialties</span>
            <h2 className="display-h2">
              Expert care for every<br />
              <span className="italic text-indigo-700">individual need.</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-3 mb-2">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll services left"
              className="p-3.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll services right"
              className="p-3.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-indigo-700 hover:text-white hover:border-indigo-700 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal scroller */}
        {services.length === 0 ? (
          <div className="text-center py-12 text-slate-400">Loading services...</div>
        ) : (
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 lg:gap-6 pb-10 snap-x snap-mandatory -mx-5 px-5 sm:-mx-6 sm:px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service) => (
              <div
                key={service._id}
                className="min-w-[82%] sm:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(25%-1.125rem)] snap-start group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_24px_50px_-20px_rgba(12,31,74,0.25)] transition-all duration-500 hover:-translate-y-1.5 border border-slate-200/70 flex flex-col"
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 lg:p-7 flex flex-col flex-1">
                  <h3 className="serif text-xl text-slate-900 mb-3 capitalize">{service.title}</h3>
                  <p className="text-slate-600 mb-5 leading-relaxed text-sm line-clamp-3">
                    {service.description}
                  </p>
                  <button
                    onClick={() => setActive(service)}
                    className="mt-auto text-indigo-700 font-semibold text-[11px] flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-[0.16em] hover:text-indigo-900"
                  >
                    Learn More
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Emergency banner */}
        <div className="mt-10 lg:mt-12 bg-indigo-900 rounded-3xl p-8 sm:p-10 lg:p-14 text-white relative overflow-hidden shadow-[0_30px_60px_-20px_rgba(12,31,74,0.4)]">
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-400/70 to-transparent"></div>
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-indigo-700/30 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 lg:gap-10">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-gold-300 text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
                24×7 Priority Line
              </span>
              <h3 className="serif text-2xl sm:text-3xl mb-3">Emergency care needed?</h3>
              <p className="text-indigo-100/90 text-base sm:text-lg leading-relaxed">
                Urgent cases come first. If you're in pain or facing a dental emergency, call the
                priority line right away.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <a href="tel:+918791785177" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-full font-semibold hover:bg-gold-50 transition-colors shadow-lg">
                <Phone size={17} /> +91 87917 85177
              </a>
              <a href="#contact" className="inline-flex items-center justify-center bg-transparent text-white border border-indigo-400/60 px-8 py-4 rounded-full font-semibold hover:bg-indigo-800 hover:border-indigo-400 transition-colors">
                Book Online
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setActive(null); }}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-slate-900 hover:bg-white shadow-md flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="h-52 sm:h-72 shrink-0 overflow-hidden">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <h3 className="serif text-2xl sm:text-3xl text-slate-900 mb-4 capitalize">{active.title}</h3>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                {active.details?.trim() || active.description}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="flex-1 bg-indigo-700 text-white text-center font-semibold py-3.5 rounded-xl hover:bg-indigo-800 transition-all shadow-brand"
                >
                  Book a Consultation
                </a>
                <a
                  href="tel:+918791785177"
                  className="flex-1 border border-slate-200 text-slate-700 text-center font-semibold py-3.5 rounded-xl hover:border-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Call +91 87917 85177
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
