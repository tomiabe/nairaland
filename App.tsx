import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { PulseSection } from './components/PulseSection';
import { Sidebar } from './components/Sidebar';
import { ThreadCard } from './components/ThreadCard';
import { AdBanner } from './components/AdBanner';
import { CreateThreadModal } from './components/CreateThreadModal';
import { MAIN_FEED_THREADS, NEW_THREADS, FOLLOWING_THREADS, CATEGORIES } from './constants';
import { ListFilter, Plus, ChevronDown, Minus, Search } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'following'>('trending');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [visibleThreadCount, setVisibleThreadCount] = useState(6);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const filterRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // Initialize Dark Mode based on time (7pm - 7am)
  useEffect(() => {
    const checkTimeForTheme = () => {
      const hour = new Date().getHours();
      // Dark mode if time is 19:00 (7PM) or later, OR before 07:00 (7AM)
      const shouldBeDark = hour >= 19 || hour < 7;
      setIsDarkMode(shouldBeDark);
    };
    
    checkTimeForTheme();
  }, []);

  // Apply Dark Mode class to HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset pagination when tab changes
  useEffect(() => {
    setVisibleThreadCount(6);
  }, [activeTab]);

  const getThreads = () => {
    switch (activeTab) {
        case 'new':
            return NEW_THREADS;
        case 'following':
            return FOLLOWING_THREADS;
        default:
            return MAIN_FEED_THREADS;
    }
  };

  const allThreads = getThreads();
  const displayedThreads = allThreads.slice(0, visibleThreadCount);
  const hasMore = visibleThreadCount < allThreads.length;

  const displayedCategories = showAllCategories ? CATEGORIES : CATEGORIES.slice(0, 10);

  const handleLoadMore = () => {
      setVisibleThreadCount(prev => prev + 5);
  };

  const handleViewAllTrending = () => {
      setActiveTab('trending');
      if (feedRef.current) {
          feedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-300 ${isDarkMode ? 'bg-naira-950 text-naira-50' : 'bg-[#FDFCF5] text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      {/* Create Thread Modal */}
      <CreateThreadModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      
      {/* Mobile Search Bar (Visible only on mobile, top of page) */}
      <div className="md:hidden px-4 py-3 bg-white dark:bg-naira-900 border-b border-gray-200 dark:border-naira-800">
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 dark:text-naira-300" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-naira-700 rounded-lg leading-5 bg-gray-50 dark:bg-naira-800 placeholder-gray-500 dark:placeholder-naira-400 focus:outline-none focus:ring-1 focus:ring-naira-500 text-gray-900 dark:text-white text-sm"
                placeholder="Search Nairaland..."
            />
        </div>
      </div>

      {/* Hero / Pulse Section */}
      <PulseSection onViewAllClick={handleViewAllTrending} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={feedRef}>
        
        {/* Ad Banner Section */}
        <AdBanner />

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Feed */}
          <div className="flex-1 min-w-0">
            
            {/* Mobile Categories Scroll (visible only on mobile) */}
            <div className="lg:hidden mb-6 overflow-x-auto pb-2 hide-scrollbar">
                <div className="flex gap-2">
                    {CATEGORIES.slice(0, 10).map(cat => (
                        <button key={cat.id} className="whitespace-nowrap px-4 py-2 bg-white dark:bg-naira-900 border border-gray-200 dark:border-naira-800 rounded-full text-sm font-medium text-gray-700 dark:text-naira-100 hover:border-naira-500 hover:text-naira-600 transition-colors">
                            {cat.name}
                        </button>
                    ))}
                    <button className="whitespace-nowrap px-4 py-2 bg-gray-100 dark:bg-naira-800 rounded-full text-sm font-medium text-gray-600 dark:text-naira-200">
                        View All
                    </button>
                </div>
            </div>

            {/* Feed Header / Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
               <div className="flex bg-white dark:bg-naira-900 p-1 rounded-lg border border-gray-200 dark:border-naira-800 shadow-sm self-start">
                  <button 
                    onClick={() => setActiveTab('trending')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'trending' ? 'bg-naira-100 text-naira-800 shadow-sm dark:bg-naira-50 dark:text-naira-900' : 'text-gray-500 dark:text-naira-200 hover:text-gray-700 dark:hover:text-white'}`}
                  >
                    Trending
                  </button>
                  <button 
                    onClick={() => setActiveTab('new')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'new' ? 'bg-naira-100 text-naira-800 shadow-sm dark:bg-naira-50 dark:text-naira-900' : 'text-gray-500 dark:text-naira-200 hover:text-gray-700 dark:hover:text-white'}`}
                  >
                    New
                  </button>
                  <button 
                    onClick={() => setActiveTab('following')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'following' ? 'bg-naira-100 text-naira-800 shadow-sm dark:bg-naira-50 dark:text-naira-900' : 'text-gray-500 dark:text-naira-200 hover:text-gray-700 dark:hover:text-white'}`}
                  >
                    Following
                  </button>
               </div>
               
               <div className="flex items-center gap-3">
                 <div className="relative" ref={filterRef}>
                     <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors hidden sm:flex ${isFilterOpen ? 'bg-gray-100 dark:bg-naira-800 text-naira-800 dark:text-naira-50' : 'text-gray-500 dark:text-naira-200 hover:text-naira-800 dark:hover:text-naira-50'}`}
                    >
                        <ListFilter className="w-4 h-4" /> Filter <ChevronDown className={`w-3 h-3 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                     </button>

                     {isFilterOpen && (
                         <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-naira-900 rounded-xl shadow-lg border border-gray-100 dark:border-naira-800 z-20 py-1">
                             <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-naira-100 hover:bg-gray-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white">
                                Most Relevant
                             </button>
                             <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-naira-100 hover:bg-gray-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white">
                                Most Replied
                             </button>
                             <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-naira-100 hover:bg-gray-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white">
                                Most Viewed
                             </button>
                             <div className="h-px bg-gray-100 dark:bg-naira-800 my-1"></div>
                             <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-naira-100 hover:bg-gray-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white">
                                Last 24 Hours
                             </button>
                             <button className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-naira-100 hover:bg-gray-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white">
                                Last Week
                             </button>
                         </div>
                     )}
                 </div>

                 <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-naira-800 hover:bg-naira-900 dark:bg-naira-50 dark:hover:bg-naira-100 dark:text-naira-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-transparent dark:border-naira-200"
                 >
                    <Plus className="w-4 h-4" />
                    Create Thread
                 </button>
               </div>
            </div>

            {/* Categories Quick Bar (Desktop) */}
            <div className="hidden lg:flex flex-wrap gap-2 mb-6 transition-all duration-300">
                {displayedCategories.map(cat => (
                     <a href={`#${cat.slug}`} key={cat.id} className="text-xs font-semibold text-gray-500 dark:text-naira-200 hover:text-naira-800 dark:hover:text-white bg-white dark:bg-naira-900 border border-gray-100 dark:border-naira-800 hover:border-naira-200 dark:hover:border-naira-600 px-3 py-1.5 rounded-md transition-colors">
                        {cat.name}
                     </a>
                ))}
                <button 
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-xs font-semibold text-naira-600 dark:text-naira-300 hover:text-naira-800 dark:hover:text-white px-3 py-1.5 flex items-center gap-1"
                >
                    {showAllCategories ? (
                         <> <Minus className="w-3 h-3" /> Show Less </>
                    ) : (
                         <> <Plus className="w-3 h-3" /> View All </>
                    )}
                </button>
            </div>

            {/* Feed List */}
            <div className="space-y-4">
                {displayedThreads.length > 0 ? (
                    displayedThreads.map((thread) => (
                        <ThreadCard key={thread.id} thread={thread} />
                    ))
                ) : (
                    <div className="text-center py-10 bg-white dark:bg-naira-900 rounded-xl border border-dashed border-gray-300 dark:border-naira-800">
                        <p className="text-gray-500 dark:text-naira-300">No threads found in this tab.</p>
                    </div>
                )}
            </div>

            {/* Load More */}
            {hasMore && (
                <div className="mt-8 text-center">
                    <button 
                        onClick={handleLoadMore}
                        className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-naira-900 border border-gray-200 dark:border-naira-800 text-gray-700 dark:text-naira-100 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white transition-colors shadow-sm"
                    >
                        Load More Topics
                    </button>
                </div>
            )}
             {!hasMore && displayedThreads.length > 0 && (
                <div className="mt-8 text-center text-gray-400 dark:text-naira-400 text-sm">
                    You've reached the end of the list.
                </div>
            )}
          </div>

          {/* Right Sidebar (Full width on mobile, at bottom) */}
          <Sidebar />

        </div>
      </main>
    </div>
  );
}