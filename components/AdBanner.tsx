import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ADS } from '../constants';

export const AdBanner: React.FC = () => {
  return (
    <div className="flex overflow-x-auto snap-x md:grid md:grid-cols-3 gap-4 mb-8 pb-4 md:pb-0 hide-scrollbar">
      {ADS.map((ad) => (
        <div key={ad.id} className="min-w-[85%] md:min-w-0 snap-center bg-white dark:bg-naira-900 border border-gray-200 dark:border-naira-800 rounded-lg p-4 flex flex-col justify-between relative overflow-hidden group hover:border-naira-300 dark:hover:border-naira-700 transition-colors shadow-sm">
            {/* "Ad" Label */}
            <div className="absolute top-0 right-0 bg-gray-100 dark:bg-naira-800 text-[10px] text-gray-500 dark:text-naira-300 font-bold px-2 py-0.5 rounded-bl-lg">
                Sponsored
            </div>

            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-naira-800 flex items-center justify-center text-[10px] font-bold text-gray-500 dark:text-naira-300">
                        {ad.company[0]}
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-naira-50 text-sm">{ad.company}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-naira-200 leading-snug mb-3">{ad.tagline}</p>
            </div>
            
            <a href="#" className="inline-flex items-center gap-1 text-xs font-bold text-naira-600 dark:text-naira-300 uppercase tracking-wide group-hover:underline">
                {ad.ctaText} <ExternalLink className="w-3 h-3" />
            </a>
        </div>
      ))}
    </div>
  );
};