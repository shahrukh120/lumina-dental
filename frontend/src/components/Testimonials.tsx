import React, { useState, useEffect } from 'react';
import { Star, Plus, X, ChevronLeft, ChevronRight, Quote, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  stars: number;
}

const initialTestimonials: Testimonial[] = [
  {
    name: "Elena Richardson",
    role: "Marketing Director",
    content: "The attention to detail at MaxoDent is unmatched. Dr. Khan's approach was artistic and precise.",
    image: "",
    stars: 5
  },
  {
    name: "Marcus Thorne",
    role: "Architect",
    content: "The environment immediately put me at ease. The technology is futuristic but the care is human.",
    image: "",
    stars: 5
  },
  {
    name: "Sarah Chen",
    role: "Violinist",
    content: "The results are flawless. I never felt like just another number in a busy office.",
    image: "",
    stars: 5
  }
];

const initialsOf = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');

const Avatar: React.FC<{ t: Testimonial }> = ({ t }) =>
  t.image ? (
    <img
      src={t.image}
      alt={t.name}
      className="w-14 h-14 rounded-full border-2 border-gold-400/40 object-cover"
    />
  ) : (
    <span className="w-14 h-14 rounded-full border-2 border-gold-400/40 bg-indigo-800 text-gold-200 serif text-lg flex items-center justify-center">
      {initialsOf(t.name)}
    </span>
  );

const MAX_SHOWN_REVIEWS = 10;

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(initialTestimonials);
  const [totalReviews, setTotalReviews] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newReview, setNewReview] = useState({ name: '', role: '', content: '', stars: 5, image: '' });

  const showToast = (type: 'success' | 'error', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3500);
  };

  // Load persisted reviews; fall back to the built-in ones if the API is
  // unreachable or has none yet.
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/reviews`);
        const data = await res.json();
        if (Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews.map((r: any) => ({
            name: r.name,
            role: r.role || 'Patient',
            content: r.content,
            image: '',
            stars: r.stars || 5,
          })));
          setCurrentIndex(0);
        }
        if (typeof data.total === 'number') setTotalReviews(data.total);
      } catch (error) {
        console.error('Failed to load reviews', error);
      }
    };
    fetchReviews();
  }, []);

  // Autoplay timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newReview.name,
          role: newReview.role,
          content: newReview.content,
          stars: newReview.stars,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');

      setReviews(prev => [{
        name: data.review.name,
        role: data.review.role || 'Patient',
        content: data.review.content,
        image: '',
        stars: data.review.stars || 5,
      }, ...prev].slice(0, MAX_SHOWN_REVIEWS));
      if (typeof data.total === 'number') setTotalReviews(data.total);

      setCurrentIndex(0);
      setIsModalOpen(false);
      setNewReview({ name: '', role: '', content: '', stars: 5, image: '' });
      showToast('success', 'Thank you! Your review is now live.');
    } catch (error) {
      console.error('Failed to submit review', error);
      showToast('error', "Couldn't submit your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const current = reviews[currentIndex % reviews.length];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-indigo-900 text-white overflow-hidden relative scroll-mt-20">
      {/* Gold hairline + soft glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-400/60 to-transparent"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-indigo-700/25 blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 text-center md:text-left">
          <div>
            <span className="text-gold-300 font-semibold tracking-[0.2em] uppercase text-[11px] mb-3 block">Patient Stories</span>
            <h2 className="serif text-3xl sm:text-4xl leading-tight">Voices of <span className="italic text-gold-200">transformed</span> lives.</h2>
            {totalReviews > 0 && (
              <p className="mt-3 text-sm text-indigo-200 flex items-center justify-center md:justify-start gap-1.5">
                <Star size={13} className="fill-gold-400 text-gold-400" />
                {totalReviews} patient review{totalReviews > 1 ? 's' : ''}
                {totalReviews > MAX_SHOWN_REVIEWS && <span className="text-indigo-300/80">· showing the latest {MAX_SHOWN_REVIEWS}</span>}
              </p>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            <Plus size={17} /> Add Your Review
          </button>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl relative text-center">
                <Quote size={36} className="absolute top-6 left-6 text-gold-400/25" aria-hidden="true" />
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(current.stars)].map((_, i) => (
                    <Star key={i} size={15} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>

                <p className="serif text-lg sm:text-xl text-slate-100 mb-8 italic leading-relaxed">
                  "{current.content}"
                </p>

                <div className="flex flex-col items-center gap-3">
                  <Avatar t={current} />
                  <div>
                    <h4 className="font-semibold text-white text-lg">{current.name}</h4>
                    <p className="text-gold-300/90 font-medium uppercase tracking-[0.18em] text-[10px] mt-1">{current.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-6 mt-10">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
              aria-label="Previous review"
              className="p-2 text-indigo-300 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/15 hover:bg-white/30'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)}
              aria-label="Next review"
              className="p-2 text-indigo-300 hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Add-review modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-slate-950/80">
            <div className="bg-white text-slate-900 w-full max-w-lg rounded-2xl p-7 sm:p-10 relative shadow-2xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600" aria-label="Close">
                <X size={22} />
              </button>

              <h3 className="serif text-2xl sm:text-3xl mb-2 text-slate-900">Share your experience</h3>
              <p className="text-slate-500 mb-7">How was your visit with Dr. Khan?</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required maxLength={60} placeholder="Your Name" value={newReview.name} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                    onChange={e => setNewReview({ ...newReview, name: e.target.value })} />
                  <input maxLength={60} placeholder="Profession (optional)" value={newReview.role} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                    onChange={e => setNewReview({ ...newReview, role: e.target.value })} />
                </div>

                <textarea required maxLength={500} placeholder="Your Review..." rows={4} value={newReview.content} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={e => setNewReview({ ...newReview, content: e.target.value })} />

                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-[0.16em]">Rating</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(num => (
                      <button type="button" key={num} onClick={() => setNewReview({ ...newReview, stars: num })} aria-label={`${num} star${num > 1 ? 's' : ''}`}>
                        <Star className={num <= newReview.stars ? "fill-gold-500 text-gold-500" : "text-slate-300"} size={22} />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-700 text-white font-semibold py-4 rounded-xl hover:bg-indigo-800 transition-all shadow-brand disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting && <Loader2 size={18} className="animate-spin" />}
                  {isSubmitting ? 'Publishing…' : 'Publish Review'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Feedback toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[110] ${toast.type === 'success' ? 'bg-indigo-700' : 'bg-red-600'} text-white px-7 py-4 rounded-2xl shadow-2xl font-semibold flex items-center gap-3 max-w-[calc(100vw-2.5rem)]`}
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              {toast.type === 'success' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
