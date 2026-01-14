import React from 'react';
import { Thread } from '../types';
import { MessageSquare, Eye, Share2, MoreHorizontal, Flame } from 'lucide-react';

interface ThreadCardProps {
  thread: Thread;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({ thread }) => {
  return (
    <div className="bg-white dark:bg-naira-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-naira-800 hover:border-naira-200 dark:hover:border-naira-700 hover:shadow-md transition-all duration-200 group cursor-pointer mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-2 text-xs text-gray-500 dark:text-naira-300">
            <span className="font-bold text-naira-800 dark:text-naira-800 dark:bg-naira-50 px-1.5 py-0.5 rounded hover:underline">
                {thread.category}
            </span>
            <span className="text-gray-300 dark:text-naira-600">•</span>
            <span className="truncate max-w-[150px] sm:max-w-none">
                Posted by <span className="font-medium text-gray-700 dark:text-naira-200">{thread.author}</span>
            </span>
            <span className="text-gray-300 dark:text-naira-600">•</span>
            <span className="whitespace-nowrap">{thread.timestamp}</span>
            
            {thread.isTrending && (
                <span className="flex-shrink-0 flex items-center gap-0.5 text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/40 px-1.5 py-0.5 rounded whitespace-nowrap font-medium">
                    <Flame className="w-3 h-3" /> Hot
                </span>
            )}
            {thread.isBreaking && (
                <span className="flex-shrink-0 text-white bg-red-600 px-1.5 py-0.5 rounded animate-pulse whitespace-nowrap font-medium">
                    Breaking
                </span>
            )}
          </div>

          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-naira-50 mb-2 leading-tight group-hover:text-naira-800 dark:group-hover:text-white">
            {thread.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-naira-200 line-clamp-2 mb-4">
            {thread.preview}
          </p>

          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4 md:gap-6">
                <button className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-naira-300 hover:bg-gray-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white px-2 py-1 rounded-md transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">{thread.replies}</span>
                    <span className="hidden sm:inline">Replies</span>
                </button>
                <div className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-naira-400 px-2 py-1">
                    <Eye className="w-4 h-4" />
                    <span>{(thread.views / 1000).toFixed(1)}k</span>
                </div>
                <button className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-naira-300 hover:bg-gray-50 dark:hover:bg-naira-800 hover:text-naira-800 dark:hover:text-white px-2 py-1 rounded-md transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                </button>
             </div>
          </div>
        </div>
        
        {/* Thumbnail */}
        {thread.hasMedia && (
            <div className="hidden sm:block w-24 h-24 md:w-32 md:h-24 bg-gray-100 dark:bg-naira-800 rounded-lg overflow-hidden flex-shrink-0">
                 <img src={`https://picsum.photos/seed/${thread.id}/200/200`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
        )}
      </div>
    </div>
  );
};