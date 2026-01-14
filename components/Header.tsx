import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Menu, X, ChevronDown, LogOut, Settings, MessageCircle, Heart, Star, Clock, BarChart3, Users, Moon, Sun } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface HeaderProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'categories' | 'notifications' | 'profile' | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Dynamic stats state
  const [stats, setStats] = useState({
    members: 3306135,
    topics: 8334335
  });
  
  // Refs for click outside handling - Attach to root container
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        // Only close dropdowns on desktop via click outside
        // Mobile uses close buttons
        if (window.innerWidth >= 768) {
            setActiveDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live Date/Time Effect
  useEffect(() => {
    const updateDateTime = () => {
        const now = new Date();
        const dateOptions: Intl.DateTimeFormatOptions = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric'
        };
        const timeOptions: Intl.DateTimeFormatOptions = { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };
        const dateStr = now.toLocaleDateString('en-GB', dateOptions);
        const timeStr = now.toLocaleTimeString('en-US', timeOptions);
        setCurrentTime(`${dateStr} • ${timeStr}`);
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic Stats Update Effect
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateStats = () => {
        const delay = Math.floor(Math.random() * (180000 - 120000 + 1) + 120000);
        timeoutId = setTimeout(() => {
            setStats(prev => ({
                members: prev.members + Math.floor(Math.random() * 3),
                topics: prev.topics + Math.floor(Math.random() * 5) + 1
            }));
            updateStats();
        }, delay);
    };
    updateStats();
    return () => clearTimeout(timeoutId);
  }, []);

  const toggleDropdown = (name: 'categories' | 'notifications' | 'profile') => {
    if (window.innerWidth < 768) {
        // Mobile behavior: Close hamburger if open, then toggle specific drawer
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        setActiveDropdown(activeDropdown === name ? null : name);
    } else {
        // Desktop behavior
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  const toggleMobileMenu = () => {
    // Close any active dropdowns if opening mobile menu
    if (activeDropdown) setActiveDropdown(null);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // --- Desktop Content Renderers ---

  const renderDesktopNotifications = () => (
    <div className="flex flex-col h-full bg-white dark:bg-naira-900">
        <div className="p-3 border-b border-gray-50 dark:border-naira-800 flex justify-between items-center flex-shrink-0 bg-gray-50/50 dark:bg-naira-800/50">
            <span className="font-bold text-gray-900 dark:text-naira-100">Notifications</span>
            <span className="text-xs text-naira-600 dark:text-naira-400 font-medium cursor-pointer hover:underline">Mark all read</span>
        </div>
        <div className="flex-1 overflow-y-auto max-h-96">
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="p-3 hover:bg-gray-50 dark:hover:bg-naira-800 transition-colors cursor-pointer border-b border-gray-50 dark:border-naira-800 last:border-0 flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                        <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-800 dark:text-naira-200 leading-snug">
                            <span className="font-bold">Seun</span> quoted your post in <span className="font-medium italic">"Tinubu's Policy..."</span>
                        </p>
                        <span className="text-xs text-gray-400 mt-1 block">2 hours ago</span>
                    </div>
                </div>
            ))}
            <div className="p-3 hover:bg-gray-50 dark:hover:bg-naira-800 transition-colors cursor-pointer border-b border-gray-50 dark:border-naira-800 flex gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0">
                    <Heart className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm text-gray-800 dark:text-naira-200 leading-snug">
                        <span className="font-bold">Mukina2</span> liked your comment.
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">5 hours ago</span>
                </div>
            </div>
        </div>
        <div className="p-2 text-center border-t border-gray-50 dark:border-naira-800 bg-gray-50 dark:bg-naira-800/50 flex-shrink-0">
            <a href="#" className="text-xs font-bold text-naira-600 dark:text-naira-400 hover:text-naira-800 dark:hover:text-white">View all notifications</a>
        </div>
    </div>
  );

  const renderDesktopProfile = () => (
    <div className="flex flex-col h-full bg-white dark:bg-naira-900">
        <div className="px-4 py-4 border-b border-gray-100 dark:border-naira-800 bg-gray-50 dark:bg-naira-900 flex-shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-naira-100 dark:bg-naira-800 border border-naira-200 dark:border-naira-700 flex items-center justify-center text-naira-800 dark:text-naira-200 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Tomi+Abe&background=16A34A&color=fff" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-base font-bold text-gray-900 dark:text-white">Tomi Abe</p>
                    <p className="text-xs text-gray-500 dark:text-naira-400">Member since 2012</p>
                </div>
            </div>
        </div>
        <div className="p-2 flex-1 overflow-y-auto">
            <a href="#" className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 dark:text-naira-200 hover:bg-naira-50 dark:hover:bg-naira-800 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-400" /> Profile
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 dark:text-naira-200 hover:bg-naira-50 dark:hover:bg-naira-800 rounded-lg transition-colors">
                <Star className="w-5 h-5 text-gray-400" /> Saved Topics
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 dark:text-naira-200 hover:bg-naira-50 dark:hover:bg-naira-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" /> Settings
            </a>
            <div className="h-px bg-gray-100 dark:bg-naira-800 my-2"></div>
            <a href="#" className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" /> Log Out
            </a>
        </div>
    </div>
  );

  // --- Mobile Content Renderers (Fullscreen Overlays) ---

  const renderMobileNotifications = () => (
    <div className="fixed inset-0 z-[60] md:hidden bg-white dark:bg-naira-950 flex flex-col animate-in slide-in-from-right duration-200">
       <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-naira-800 bg-white dark:bg-naira-950">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
            <div className="flex items-center gap-3">
                <button className="text-xs font-bold text-naira-600 dark:text-naira-400 uppercase tracking-wide hover:text-naira-800 dark:hover:text-white transition-colors">
                   Mark all read
                </button>
                <button onClick={() => setActiveDropdown(null)} className="p-2 bg-gray-100 dark:bg-naira-800 rounded-full text-gray-500 dark:text-naira-300 hover:bg-gray-200 dark:hover:bg-naira-700 transition-colors">
                   <X className="w-5 h-5" />
                </button>
            </div>
       </div>
       <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20">
           {[1, 2, 3].map((_, i) => (
               <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-naira-900 border border-gray-100 dark:border-naira-800 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                       <MessageCircle className="w-5 h-5" />
                   </div>
                   <div>
                       <p className="text-sm text-gray-800 dark:text-naira-200 leading-snug">
                           <span className="font-bold">Seun</span> quoted your post in <span className="font-medium italic">"Tinubu's Policy..."</span>
                       </p>
                       <span className="text-xs text-gray-400 mt-1 block">2 hours ago</span>
                   </div>
               </div>
           ))}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-naira-900 border border-gray-100 dark:border-naira-800 flex gap-4">
               <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0">
                   <Heart className="w-5 h-5" />
               </div>
               <div>
                   <p className="text-sm text-gray-800 dark:text-naira-200 leading-snug">
                       <span className="font-bold">Mukina2</span> liked your comment.
                   </p>
                   <span className="text-xs text-gray-400 mt-1 block">5 hours ago</span>
               </div>
           </div>
       </div>
    </div>
 );

 const renderMobileProfile = () => (
    <div className="fixed inset-0 z-[60] md:hidden bg-white dark:bg-naira-950 flex flex-col animate-in slide-in-from-right duration-200">
       <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-naira-800 bg-white dark:bg-naira-950">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h2>
            <button onClick={() => setActiveDropdown(null)} className="p-2 bg-gray-100 dark:bg-naira-800 rounded-full text-gray-500 dark:text-naira-300 hover:bg-gray-200 dark:hover:bg-naira-700 transition-colors">
               <X className="w-5 h-5" />
            </button>
       </div>
       <div className="p-6 flex flex-col items-center border-b border-gray-100 dark:border-naira-800">
            <div className="w-24 h-24 rounded-full bg-naira-100 dark:bg-naira-800 border-4 border-white dark:border-naira-700 shadow-lg flex items-center justify-center text-naira-800 dark:text-naira-200 overflow-hidden mb-4">
               <img src="https://ui-avatars.com/api/?name=Tomi+Abe&background=16A34A&color=fff" alt="User" className="w-full h-full object-cover" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">Tomi Abe</p>
            <p className="text-sm text-gray-500 dark:text-naira-400">Member since 2012</p>
       </div>
       <div className="p-4 space-y-2 pb-20">
           <a href="#" className="flex items-center gap-4 px-4 py-4 text-base font-medium text-gray-700 dark:text-naira-200 hover:bg-naira-50 dark:hover:bg-naira-800 rounded-xl transition-colors">
               <User className="w-6 h-6 text-gray-400" /> My Profile
           </a>
            <a href="#" className="flex items-center gap-4 px-4 py-4 text-base font-medium text-gray-700 dark:text-naira-200 hover:bg-naira-50 dark:hover:bg-naira-800 rounded-xl transition-colors">
               <Star className="w-6 h-6 text-gray-400" /> Saved Topics
           </a>
           <a href="#" className="flex items-center gap-4 px-4 py-4 text-base font-medium text-gray-700 dark:text-naira-200 hover:bg-naira-50 dark:hover:bg-naira-800 rounded-xl transition-colors">
               <Settings className="w-6 h-6 text-gray-400" /> Settings
           </a>
           <div className="h-px bg-gray-100 dark:bg-naira-800 my-2"></div>
           <a href="#" className="flex items-center gap-4 px-4 py-4 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
               <LogOut className="w-6 h-6" /> Log Out
           </a>
       </div>
    </div>
 );

 const renderMobileCategories = () => (
    <div className="fixed inset-0 z-[60] md:hidden bg-white dark:bg-naira-950 flex flex-col animate-in slide-in-from-right duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-naira-800 bg-white dark:bg-naira-950">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h2>
            <button onClick={toggleMobileMenu} className="p-2 bg-gray-100 dark:bg-naira-800 rounded-full text-gray-500 dark:text-naira-300 hover:bg-gray-200 dark:hover:bg-naira-700 transition-colors">
               <X className="w-5 h-5" />
            </button>
       </div>
       <div className="p-4 overflow-y-auto flex-1 pb-20">
            <h3 className="text-xs font-bold text-gray-400 dark:text-naira-400 uppercase tracking-wider mb-4 px-1">All Sections</h3>
            <div className="grid grid-cols-2 gap-3">
               {CATEGORIES.map(cat => (
                   <a key={cat.id} href={`#${cat.slug}`} onClick={toggleMobileMenu} className="flex items-center justify-center text-center text-sm font-medium px-3 py-3 rounded-lg bg-gray-50 dark:bg-naira-900 text-gray-700 dark:text-naira-200 hover:bg-naira-100 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white transition-colors border border-gray-100 dark:border-naira-800">
                       {cat.name}
                   </a>
               ))}
           </div>
       </div>
    </div>
 );

  return (
    <div ref={containerRef} className="flex flex-col w-full z-50 sticky top-0 transition-colors duration-300">
        {/* Top Utility Bar - Date, Time & Stats (Visible on all screens) */}
        <div className="bg-naira-900 dark:bg-black text-naira-100 text-xs py-2 border-b border-naira-800 dark:border-naira-800 block">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2 font-medium">
                    <Clock className="w-3 h-3 text-naira-500" />
                    <span>{currentTime || "Loading time..."}</span>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-naira-500" />
                        <span><span className="font-bold text-white">{stats.members.toLocaleString()}</span> Members</span>
                    </div>
                    <div className="block w-px h-3 bg-naira-800 dark:bg-naira-800"></div>
                    <div className="flex items-center gap-1.5">
                        <BarChart3 className="w-3 h-3 text-naira-500" />
                        <span><span className="font-bold text-white">{stats.topics.toLocaleString()}</span> Topics</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Main Header */}
        <header className="bg-[#FDFCF5]/95 dark:bg-naira-900/95 backdrop-blur-md border-b border-naira-200 dark:border-naira-800 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                
                {/* Logo Area */}
                <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-naira-800 dark:bg-naira-50 rounded-lg flex items-center justify-center">
                        <span className="text-white dark:text-naira-900 font-bold text-xl">₦</span>
                    </div>
                    <span className="font-bold text-xl md:text-2xl text-naira-800 dark:text-naira-50 tracking-tight">Nairaland</span>
                </div>

                {/* Desktop Navigation (Search) */}
                <div className="hidden md:flex flex-1 items-center justify-center px-8">
                    <div className="relative w-full max-w-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 dark:text-naira-300" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-naira-700 rounded-full leading-5 bg-white dark:bg-naira-800 placeholder-gray-500 dark:placeholder-naira-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-naira-500 focus:border-naira-500 sm:text-sm transition-all duration-200 text-gray-900 dark:text-naira-50"
                        placeholder="Search topics, members, or news..."
                    />
                    </div>
                </div>

                {/* Desktop Right Actions */}
                <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme}
                        className="p-2 text-gray-500 dark:text-naira-50 hover:bg-gray-100 dark:hover:bg-naira-800 rounded-full transition-colors"
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {/* Categories Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => toggleDropdown('categories')}
                            className={`text-gray-600 dark:text-naira-200 hover:text-naira-800 dark:hover:text-white font-medium text-sm flex items-center gap-1 ${activeDropdown === 'categories' ? 'text-naira-800 dark:text-white' : ''}`}
                        >
                            Categories <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'categories' ? 'rotate-180' : ''}`} />
                        </button>
                        {activeDropdown === 'categories' && (
                            <div className="absolute top-full right-0 mt-2 w-80 lg:w-96 bg-white dark:bg-naira-900 rounded-xl shadow-xl border border-gray-100 dark:border-naira-800 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                                <h3 className="text-xs font-bold text-gray-400 dark:text-naira-400 uppercase tracking-wider mb-3 px-2">All Sections</h3>
                                <div className="grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto">
                                    {CATEGORIES.map(cat => (
                                        <a key={cat.id} href={`#${cat.slug}`} className="block px-3 py-2 text-sm text-gray-700 dark:text-naira-200 hover:bg-naira-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white rounded-lg transition-colors">
                                            {cat.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Notifications */}
                    <div className="relative">
                        <button 
                            onClick={() => toggleDropdown('notifications')}
                            className={`relative p-1 rounded-full text-gray-500 dark:text-naira-200 hover:text-naira-800 dark:hover:text-white focus:outline-none ${activeDropdown === 'notifications' ? 'bg-naira-50 dark:bg-naira-800 text-naira-800 dark:text-white' : ''}`}
                        >
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-naira-900 bg-red-500"></span>
                            <Bell className="h-6 w-6" />
                        </button>
                        {/* Desktop Dropdown only */}
                        {activeDropdown === 'notifications' && (
                            <div className="hidden md:block absolute top-full right-0 mt-2 w-80 bg-white dark:bg-naira-900 rounded-xl shadow-xl border border-gray-100 dark:border-naira-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                {renderDesktopNotifications()}
                            </div>
                        )}
                    </div>

                    {/* Desktop Profile */}
                    <div className="relative">
                        <button 
                            onClick={() => toggleDropdown('profile')}
                            className="flex items-center space-x-2 text-gray-700 dark:text-naira-200 hover:text-naira-800 dark:hover:text-white focus:outline-none"
                        >
                            <div className="w-8 h-8 rounded-full bg-naira-100 dark:bg-naira-800 border border-naira-200 dark:border-naira-700 flex items-center justify-center text-naira-800 dark:text-naira-200 overflow-hidden">
                                <img src="https://ui-avatars.com/api/?name=Tomi+Abe&background=16A34A&color=fff" alt="User" />
                            </div>
                            <span className="text-sm font-medium">Tomi Abe</span>
                        </button>
                        {/* Desktop Dropdown only */}
                        {activeDropdown === 'profile' && (
                            <div className="hidden md:block absolute top-full right-0 mt-2 w-64 bg-white dark:bg-naira-900 rounded-xl shadow-xl border border-gray-100 dark:border-naira-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                {renderDesktopProfile()}
                            </div>
                        )}
                    </div>
                </div>

                {/* MOBILE RIGHT ACTIONS */}
                <div className="flex items-center gap-3 md:hidden">
                    {/* Theme */}
                    <button 
                        onClick={toggleTheme}
                        className="p-2 text-gray-500 dark:text-naira-200 hover:bg-gray-100 dark:hover:bg-naira-800 rounded-full transition-colors"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {/* Mobile Notifications (Clickable) */}
                    <div className="relative">
                        <button 
                            onClick={() => toggleDropdown('notifications')}
                            className={`relative p-2 rounded-full text-gray-500 dark:text-naira-200 hover:text-naira-800 dark:hover:text-white ${activeDropdown === 'notifications' ? 'bg-gray-100 dark:bg-naira-800' : ''}`}
                        >
                            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full ring-1 ring-white dark:ring-naira-900 bg-red-500"></span>
                            <Bell className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Profile (Clickable) */}
                    <div className="relative">
                        <button 
                            onClick={() => toggleDropdown('profile')}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-naira-100 dark:bg-naira-800 border border-naira-200 dark:border-naira-700 overflow-hidden"
                        >
                            <img src="https://ui-avatars.com/api/?name=Tomi+Abe&background=16A34A&color=fff" alt="User" />
                        </button>
                    </div>

                    {/* Mobile Hamburger (Categories Only) */}
                    <button
                        onClick={toggleMobileMenu}
                        className={`inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-naira-200 hover:text-naira-800 dark:hover:text-white focus:outline-none ${isMobileMenuOpen ? 'bg-gray-100 dark:bg-naira-800' : ''}`}
                    >
                        {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                    </button>
                </div>
                </div>
            </div>
            {/* REMOVED renderMobileCategories() call from here */}
        </header>

        {/* Mobile Side Drawers (Fullscreen) */}
        {activeDropdown === 'notifications' && renderMobileNotifications()}
        {activeDropdown === 'profile' && renderMobileProfile()}
        {isMobileMenuOpen && renderMobileCategories()}

    </div>
  );
};