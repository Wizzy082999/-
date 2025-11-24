

export type WeatherType = 'snow' | 'rain' | 'sunny' | 'starry';

// 使用换行可以让代码更清晰，想加新的直接在后面接着写就行
export type DecorationType = 
  | 'santa' 
  | 'tree' 
  | 'sock' 
  | 'cat' 
  | 'dog' 
  | 'star' 
  | 'gift' 
  | 'rainbow' 
  | 'flower' 
  | 'moon' 
  | 'snowman' 
  | 'bell' 
  | 'lantern' 
  | 'firecracker' 
  | 'umbrella' 
  | 'milk'
  | 'flash'      // 新增：闪电
  | 'beatheart'  // 新增：跳动的心
  | 'popcorn'    // 新增：爆米花
  | 'film';      // 新增：胶卷

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
  mediaUrl?: string; // Kept for video or backward compatibility
  images?: string[]; // New: For multiple images (WeChat style)
  mediaType: 'image' | 'video';
  likes: number;
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
