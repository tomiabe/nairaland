import React, { useState, useEffect } from 'react';
import { TrendingUp, ExternalLink, ShieldCheck, BarChart3 } from 'lucide-react';
import { ADS } from '../constants';

export const Sidebar: React.FC = () => {
  const [onlineStats, setOnlineStats] = useState({
    members: 1260,
    guests: 6047,
    topicTime: '2 mins ago'
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateOnlineStats = () => {
        // Random delay between 2 mins (120000ms) and 3 mins (180000ms)
        const delay = Math.floor(Math.random() * (180000 - 120000 + 1) + 120000);
        
        timeoutId = setTimeout(() => {
            setOnlineStats(prev => ({
                // Fluctuate members by +/- 5
                members: prev.members + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5),
                // Fluctuate guests by +/- 20
                guests: prev.guests + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 20),
                // Simulate new topic activity
                topicTime: 'Just now'
            }));
            updateOnlineStats(); // Schedule next update
        }, delay);
    };

    updateOnlineStats();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <aside className="w-full lg:w-80 space-y-6 mt-8 lg:mt-0">
      {/* Community Stats Card */}
      <div className="bg-white dark:bg-naira-900 rounded-xl shadow-sm border border-gray-100 dark:border-naira-800 p-5 transition-colors">
        <h3 className="text-sm font-bold text-gray-900 dark:text-naira-50 uppercase tracking-wide mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-naira-500" />
            Live Activity
        </h3>

        <div className="space-y-3 pt-1">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-naira-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Members Online
                </span>
                <span className="font-bold text-naira-800 dark:text-naira-100 transition-all duration-500">{onlineStats.members.toLocaleString()}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-naira-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Guests Online
                </span>
                <span className="font-bold text-naira-800 dark:text-naira-100 transition-all duration-500">{onlineStats.guests.toLocaleString()}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-naira-300">New Topic</span>
                <span className="font-bold text-naira-800 dark:text-naira-100 transition-all duration-500">{onlineStats.topicTime}</span>
             </div>
        </div>
        <button className="w-full mt-5 bg-white dark:bg-naira-800 border border-naira-200 dark:border-naira-700 text-naira-800 dark:text-naira-50 text-sm font-bold py-2 rounded-lg hover:bg-naira-50 dark:hover:bg-naira-700 transition-colors shadow-sm">
            View Leaderboard
        </button>
      </div>

      {/* Trending Topics (Text Only List) */}
      <div className="bg-white dark:bg-naira-900 rounded-xl shadow-sm border border-gray-100 dark:border-naira-800 p-5 transition-colors">
         <h3 className="text-sm font-bold text-gray-900 dark:text-naira-50 uppercase tracking-wide mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-naira-500" />
            Trending Topics
        </h3>
        <ul className="space-y-3">
            {[
                "#AFCON2025",
                "Tinubu Economics",
                "Tech Salaries in Lagos",
                "Japa Plans",
                "Big Brother Naija"
            ].map((topic, idx) => (
                <li key={idx} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm text-gray-700 dark:text-naira-200 font-medium group-hover:text-naira-600 dark:group-hover:text-naira-50 transition-colors">{topic}</span>
                    <span className="text-xs text-gray-400 dark:text-naira-400 bg-gray-50 dark:bg-naira-800 px-1.5 py-0.5 rounded">{120 - idx * 20} posts</span>
                </li>
            ))}
        </ul>
      </div>

      {/* Trust / Verified Section */}
      <div className="bg-gradient-to-br from-naira-800 to-naira-900 rounded-xl shadow-md p-5 text-white">
        <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-green-300 flex-shrink-0" />
            <div>
                <h3 className="font-bold text-lg leading-tight mb-1">Stay Safe Online</h3>
                <p className="text-green-100 text-xs leading-relaxed mb-3">
                    Always verify sellers before making payments. Use Nairaland's escrow service for high-value transactions.
                </p>
                <a href="#" className="text-xs font-bold text-white underline decoration-green-400 underline-offset-2 hover:text-green-200">Read Safety Guidelines</a>
            </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-gray-200 dark:border-naira-800">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-naira-400">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Advertising</a>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Contact</a>
            </div>
            <p className="text-xs text-gray-400 dark:text-naira-500 mt-2">© 2005-2026 Founded by Oluwaseun Osewa. Designed by Tomi Abe Studio</p>
      </div>
    </aside>
  );
};