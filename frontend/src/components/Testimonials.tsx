import React, { useState, useEffect } from 'react';
import { Star, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. Define the shape of your data outside the component
interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  stars: number;
}

// 2. Initial data array
const initialTestimonials: Testimonial[] = [
  {
    name: "Elena Richardson",
    role: "Marketing Director",
    content: "The attention to detail at Lumina is unmatched. Dr. Khan's approach was artistic and precise.",
    image: "https://picsum.photos/seed/p1/200/200",
    stars: 5
  },
  {
    name: "Marcus Thorne",
    role: "Architect",
    content: "The environment immediately put me at ease. The technology is futuristic but the care is human.",
    image: "https://picsum.photos/seed/p2/200/200",
    stars: 5
  },
  {
    name: "Sarah Chen",
    role: "Violinist",
    content: "The results are flawless. I never felt like just another number in a busy office.",
    image: "https://picsum.photos/seed/p3/200/200",
    stars: 5
  }
];

const Testimonials: React.FC = () => {
  // All hooks must be INSIDE the component function
  const [reviews, setReviews] = useState<Testimonial[]>(initialTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', role: '', content: '', stars: 5, image: '' });

  // Autoplay timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewToAdd = {
      ...newReview,
      image: newReview.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(newReview.name)}&background=6366f1&color=fff`
    };

    setReviews([reviewToAdd, ...reviews]);
    setCurrentIndex(0); // Jump to the new review
    setIsModalOpen(false);
    setNewReview({ name: '', role: '', content: '', stars: 5, image: '' });

    // Show success feedback
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-900 text-white overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
          <div>
            <span className="text-indigo-400 font-bold tracking-widest uppercase text-[10px] mb-2 block">Patient Stories</span>
            <h2 className="text-3xl md:text-4xl font-bold">Voices of <span className="serif italic font-normal text-indigo-400">Transformed</span> Lives.</h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full text-sm font-bold transition-all transform hover:scale-105"
          >
            <Plus size={18} /> Add Your Review
          </button>
        </div>

        {/* Carousel Content */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[2.5rem] relative text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(reviews[currentIndex].stars)].map((_, i) => (
                    <Star key={i} size={16} className="fill-indigo-400 text-indigo-400" />
                  ))}
                </div>

                <p className="text-lg text-slate-200 mb-8 italic leading-relaxed font-light">
                  "{reviews[currentIndex].content}"
                </p>

                <div className="flex flex-col items-center gap-3">
                  <img
                    src={reviews[currentIndex].image}
                    alt={reviews[currentIndex].name}
                    className="w-16 h-16 rounded-full border-2 border-indigo-500/20 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-white text-lg">{reviews[currentIndex].name}</h4>
                    <p className="text-indigo-400 font-medium uppercase tracking-widest text-[10px]">{reviews[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button onClick={() => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
              className="p-2 text-slate-500 hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-white/10'}`} />
              ))}
            </div>
            <button onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)}
              className="p-2 text-slate-500 hover:text-white transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Modal Window */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-slate-950/80">
            <div className="bg-white text-slate-900 w-full max-w-lg rounded-[3rem] p-10 relative shadow-2xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>

              <h3 className="text-3xl font-bold mb-2 text-slate-900">Share Your Experience</h3>
              <p className="text-slate-500 mb-8">How was your visit with Dr. Khan?</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Your Name" className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={e => setNewReview({ ...newReview, name: e.target.value })} />
                  <input required placeholder="Profession" className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={e => setNewReview({ ...newReview, role: e.target.value })} />
                </div>

                <textarea required placeholder="Your Review..." rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={e => setNewReview({ ...newReview, content: e.target.value })} />

                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Rating</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button type="button" key={num} onClick={() => setNewReview({ ...newReview, stars: num })}>
                        <Star className={num <= newReview.stars ? "fill-indigo-600 text-indigo-600" : "text-slate-300"} size={24} />
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-5 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
                  Publish Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-indigo-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            Thank you! Your review is now live.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;