import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import API_BASE_URL from '../config';

const categories = ['All', 'Clinic', 'Patients', 'Treatments', 'Working','Technology'];

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState<GalleryItem[]>([]);

  // FETCH FROM DB
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/gallery`);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to load gallery", error);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = activeTab === 'All' 
    ? items 
    : items.filter(item => item.category === activeTab);

  const displayItems = isExpanded ? filteredItems : filteredItems.slice(0, 6);

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">Visual Excellence</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Environment & <span className="serif italic font-normal text-indigo-400">Real Results.</span></h2>
            <p className="text-slate-600 font-light">See the technology we use and the transformations we achieve every single day.</p>
          </div>
          
          {/* UPDATED CONTAINER: Added w-full, max-w-full and scrollbar hiding styles */}
          <div 
            className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto w-full md:w-auto max-w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === cat 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* Gallery Grid */}
        {items.length === 0 ? (
          <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            No photos in gallery yet. Add some from the Admin Console!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map(item => (
              <div key={item._id} className="group relative rounded-[2.5rem] overflow-hidden aspect-square cursor-pointer border border-slate-100 shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-10">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">{item.category}</span>
                    <h4 className="text-white text-xl font-bold">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        {!isExpanded && items.length > 6 && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="group flex items-center gap-3 bg-white border-2 border-slate-200 text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-xl shadow-slate-200/50"
            >
              Explore Full Gallery
              <Maximize2 size={18} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>
        )}

        {/* Full Gallery Expanded View */}
        {isExpanded && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto px-6 py-12 animate-in fade-in zoom-in duration-300">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900">Full Clinical <span className="serif italic font-normal text-indigo-600">Portfolio</span></h2>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-4 rounded-full bg-slate-100 text-slate-900 hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                  <div key={`full-${item._id}`} className="rounded-3xl overflow-hidden aspect-square shadow-md border border-slate-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;