import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react';
import API_BASE_URL from '../config'
// 1. Define the shape of data coming from MongoDB
interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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
                  <button className="text-indigo-600 font-bold text-xs flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-widest">
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
    </section>
  );
};

export default Services;