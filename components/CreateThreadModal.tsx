import React from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface CreateThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit data to backend
    alert("Your thread has been posted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-naira-900 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-naira-800 bg-white dark:bg-naira-900 z-10">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create New Thread</h3>
            <button 
                onClick={onClose} 
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-naira-800 text-gray-400 hover:text-gray-600 dark:hover:text-naira-300 transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
        
        {/* Scrollable Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
            <div>
                <label className="block text-sm font-bold text-gray-800 dark:text-naira-200 mb-1.5">Topic Title</label>
                <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-naira-700 rounded-lg focus:ring-2 focus:ring-naira-500 focus:border-naira-500 outline-none transition-all placeholder-gray-400 dark:placeholder-naira-500 text-gray-900 dark:text-white bg-white dark:bg-naira-950" 
                    placeholder="E.g., What is the best way to invest 100k in 2025?" 
                />
            </div>
            
            <div>
                <label className="block text-sm font-bold text-gray-800 dark:text-naira-200 mb-1.5">Category</label>
                <select 
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-naira-700 rounded-lg focus:ring-2 focus:ring-naira-500 focus:border-naira-500 outline-none transition-all bg-white dark:bg-naira-950 text-gray-900 dark:text-white"
                >
                    <option value="">Select a section...</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-800 dark:text-naira-200 mb-1.5">Message Body</label>
                <div className="border border-gray-200 dark:border-naira-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-naira-500 focus-within:border-naira-500 transition-all bg-white dark:bg-naira-950">
                    {/* Fake Toolbar */}
                    <div className="bg-gray-50 dark:bg-naira-900 border-b border-gray-200 dark:border-naira-700 px-3 py-2 flex gap-2">
                        <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-naira-800 rounded text-xs font-bold text-gray-600 dark:text-naira-300">B</button>
                        <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-naira-800 rounded text-xs italic font-serif text-gray-600 dark:text-naira-300">I</button>
                        <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-naira-800 rounded text-xs underline text-gray-600 dark:text-naira-300">U</button>
                        <div className="w-px h-4 bg-gray-300 dark:bg-naira-700 mx-1 self-center"></div>
                        <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-naira-800 rounded text-xs text-gray-600 dark:text-naira-300">Link</button>
                        <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-naira-800 rounded text-xs text-gray-600 dark:text-naira-300">Image</button>
                    </div>
                    <textarea 
                        required
                        rows={8} 
                        className="w-full px-4 py-3 outline-none resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-naira-500 bg-transparent" 
                        placeholder="Share your thoughts, questions, or news here..."
                    ></textarea>
                </div>
                <p className="text-xs text-gray-500 dark:text-naira-400 mt-2 text-right">Markdown supported</p>
            </div>

            {/* Footer actions inside form to enable submit */}
            <div className="pt-2 flex items-center justify-end gap-3">
                <button 
                    type="button" 
                    onClick={onClose} 
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-naira-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-naira-800 rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="px-6 py-2.5 bg-naira-800 hover:bg-naira-900 dark:bg-naira-50 dark:hover:bg-naira-100 dark:text-naira-800 text-white text-sm font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95"
                >
                    Post Thread
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};