
export type WeatherType = 'snow' | 'rain' | 'sunny' | 'starry';

export type DecorationType = 'santa' | 'bigtree' | 'sock' | 'cat' | 'dog' | 'star' | 'gift' | 'rainbow' | 'flower' | 'moon' | 'snowman' |
                              'bell' | 'lantern' | 'firecracker' | 'umbrella' | 'milk' | 'flash' | 'beatheart'| 'popcorn'|'film'| 
                              'camera' | 'train' | 'ticket' | 'tree' | 'temple' |;

export interface Decoration {
  id: string;
  type: DecorationType;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  scale: number;
  visible: boolean; // Keep for compatibility, though we mostly use add/remove now
}

export interface MemoryPost {
  id: string;
  title: string;
  date: string;
  content: string;
  mediaUrl?: string; // Legacy support for single media
  images?: string[]; // New: Support for multiple images (9-grid)
  mediaType: 'image' | 'video';
  likes: number;
  // Comments removed as requested
}

export interface Chapter {
  id: string;
  title: string; 
  heroTitle: string; 
  heroSubtitle: string; 
  weather: WeatherType;
  decorations: Decoration[];
  bgmUrl?: string;
  posts: MemoryPost[];
}

export type AppMode = 'editor' | 'viewer';
