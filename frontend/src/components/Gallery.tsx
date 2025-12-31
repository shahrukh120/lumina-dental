import React, { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import API_BASE_URL from '../config';

const categories = ['All', 'Clinic', 'Patients', 'Treatments', 'Working', 'Technology'];

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
}

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  // 1. Controls the "Full Gallery" Popup
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 2. Controls the "Single Image" Lightbox
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  
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

  // Show only first 6 on the landing page
  const displayItems = filteredItems.slice(0, 6);

  return (
    <section id="gallery" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs mb-4 block">Visual Excellence</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Environment & <span className="serif italic font-normal text-indigo-400">Real Results.</span></h2>
            <p className="text-slate-600 font-light">See the technology we use and the transformations we achieve every single day.</p>
          </div>
          
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
        
        {/* LANDING PAGE GRID (Max 6 Items) */}
        {items.length === 0 ? (
          <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            No photos in gallery yet. Add some from the Admin Console!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map(item => (
              <div 
                key={item._id} 
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-[2.5rem] overflow-hidden aspect-square cursor-pointer border border-slate-100 shadow-sm"
              >
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

        {/* BUTTON: Opens the Full Gallery Modal */}
        {filteredItems.length > 6 && (
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

        {/* --- MODAL 1: FULL GALLERY VIEW (Z-INDEX 100) --- */}
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                {filteredItems.map(item => (
                  <div 
                    key={`full-${item._id}`} 
                    onClick={() => setSelectedImage(item)} // Clicking here opens Lightbox
                    className="rounded-3xl overflow-hidden aspect-square shadow-md border border-slate-100 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 group relative"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Hover Overlay for Title */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-bold px-4 text-center">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL 2: SINGLE IMAGE LIGHTBOX (Z-INDEX 200 - HIGHEST) --- */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <X size={32} />
            </button>
            
            <div 
              className="relative max-w-6xl max-h-[90vh] flex flex-col items-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title} 
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl" 
              />
              <div className="mt-6 text-center">
                <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest">{selectedImage.category}</span>
                <h3 className="text-white text-2xl font-bold mt-2">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Gallery;