import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import API_BASE_URL from '../config'
// 1. Define the shape of data coming from MongoDB
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

  // 2. Fetch services from the real database on load
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
    <section id="services" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">Our Specialties</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Expert Care for Every <br/><span className="serif italic font-normal text-indigo-600">Individual Need.</span></h2>
          </div>
          <div className="flex gap-4 mb-4">
            <button onClick={() => scroll('left')} className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="p-4 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Horizontal Scrolling Container */}
        {services.length === 0 ? (
          <div className="text-center py-12 text-slate-400">Loading services...</div>
        ) : (
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service) => (
              <div 
                key={service._id} 
                className="min-w-[calc(100%-2rem)] md:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(25%-1.5rem)] snap-start group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 capitalize">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm font-light line-clamp-3">
                    {service.description}
                  </p>
                  <button
                    onClick={() => setActive(service)}
                    className="text-indigo-600 font-bold text-xs flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-widest hover:text-indigo-800"
                  >
                    Learn More
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Emergency Call-to-Action Section */}
        <div className="mt-12 bg-indigo-900 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold mb-4">Emergency Care Needed?</h3>
              <p className="text-indigo-100 text-lg font-light">We prioritize urgent cases. If you're experiencing pain or have a dental emergency, call our priority line immediately.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="tel:+918791785177" className="bg-white text-indigo-900 px-10 py-5 rounded-full font-bold text-center hover:bg-indigo-50 transition-colors shadow-lg">
                Call +91 87917 85177
              </a>
              <a href="#contact" className="bg-indigo-600 text-white border border-indigo-500 px-10 py-5 rounded-full font-bold text-center hover:bg-indigo-700 transition-colors">
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
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-200">
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-slate-900 hover:bg-white shadow-md flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="h-56 sm:h-72 shrink-0 overflow-hidden">
              <img src={active.image} alt={active.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-8 overflow-y-auto">
              <h3 className="serif text-3xl text-slate-900 mb-4 capitalize">{active.title}</h3>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                {active.details?.trim() || active.description}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="flex-1 bg-indigo-600 text-white text-center font-semibold py-3.5 rounded-xl hover:bg-indigo-700 transition-all shadow-brand"
                >
                  Book a Consultation
                </a>
                <a
                  href="tel:+918791785177"
                  className="flex-1 border border-slate-200 text-slate-700 text-center font-semibold py-3.5 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-colors"
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