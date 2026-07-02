import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Floating "back to top" button. Fades in after the user scrolls down a bit.
// Positioned bottom-left so it never overlaps the chat assistant (bottom-right).
const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={`fixed bottom-20 left-5 md:bottom-8 md:left-8 z-[60] w-11 h-11 md:w-13 md:h-13 rounded-full bg-white text-indigo-700 border border-slate-200 shadow-[0_10px_30px_-10px_rgba(12,31,74,0.35)] flex items-center justify-center transition-all duration-300 hover:bg-indigo-700 hover:text-white hover:border-indigo-700 hover:-translate-y-1 active:scale-95 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
