import React, { useRef } from 'react';
import { PULSE_THREADS } from '../constants';
import { TrendingUp, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface PulseSectionProps {
    onViewAllClick?: () => void;
}

export const PulseSection: React.FC<PulseSectionProps> = ({ onViewAllClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340; // Approx width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-naira-950 border-b border-naira-200 dark:border-naira-800 py-6 relative group/section transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-naira-900 dark:text-naira-50 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-naira-500 dark:text-naira-50" />
                What Nigerians are talking about
            </h2>
            <div className="flex items-center gap-2">
                <button 
                  onClick={() => scroll('left')}
                  className="p-1.5 rounded-full bg-gray-100 dark:bg-naira-800 hover:bg-gray-200 dark:hover:bg-naira-700 text-gray-600 dark:text-naira-200 transition-colors md:hidden"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="p-1.5 rounded-full bg-gray-100 dark:bg-naira-800 hover:bg-gray-200 dark:hover:bg-naira-700 text-gray-600 dark:text-naira-200 transition-colors md:hidden"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                    onClick={onViewAllClick}
                    className="text-sm font-medium text-naira-500 hover:text-naira-800 dark:text-naira-200 dark:hover:text-white transition-colors hidden md:block"
                >
                    View all trending
                </button>
            </div>
        </div>
        
        <div className="relative group">
            {/* Desktop Left Navigation Arrow */}
            <button 
                onClick={() => scroll('left')}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-white dark:bg-naira-800 border border-gray-200 dark:border-naira-700 shadow-lg rounded-full items-center justify-center text-gray-600 dark:text-naira-200 hover:text-naira-600 dark:hover:text-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                aria-label="Scroll left"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 hide-scrollbar pb-2 scroll-smooth"
            >
              {PULSE_THREADS.map((thread) => (
                <div 
                    key={thread.id} 
                    className="flex-shrink-0 w-80 bg-naira-50 dark:bg-naira-900 border border-naira-200 dark:border-naira-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group/card"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-naira-800 dark:text-naira-800 bg-naira-200 dark:bg-naira-50 px-2 py-0.5 rounded-full">
                            {thread.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-naira-300">{thread.timestamp}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-naira-50 leading-snug mb-2 group-hover/card:text-naira-800 dark:group-hover/card:text-naira-200 line-clamp-2">
                        {thread.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-naira-200 line-clamp-2 mb-3">
                        {thread.preview}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-naira-300 gap-4">
                        <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> {thread.replies} replies
                        </span>
                        <span className="font-medium text-gray-700 dark:text-naira-200">by {thread.author}</span>
                    </div>
                </div>
              ))}
            </div>

            {/* Desktop Right Navigation Arrow */}
            <button 
                onClick={() => scroll('right')}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-white dark:bg-naira-800 border border-gray-200 dark:border-naira-700 shadow-lg rounded-full items-center justify-center text-gray-600 dark:text-naira-200 hover:text-naira-600 dark:hover:text-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>
  );
};