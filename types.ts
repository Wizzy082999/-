
export type WeatherType = 'snow' | 'rain' | 'sunny' | 'starry';

export type DecorationType = 'santa' | 'tree' | 'sock' | 'cat' | 'dog' | 'star' | 'gift' | 'rainbow' | 'flower' | 'moon' | 'snowman' | 'bell' | 'lantern' | 'firecracker';

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
  mediaUrl?: string; // Optional now
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
