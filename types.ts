export interface Thread {
  id: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  views: number;
  timestamp: string;
  preview: string;
  isTrending?: boolean;
  isBreaking?: boolean;
  hasMedia?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Ad {
  id: string;
  company: string;
  tagline: string;
  imageUrl?: string;
  ctaText: string;
}