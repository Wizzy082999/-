
export type WeatherType = 'snow' | 'rain' | 'sunny' | 'starry';

// 使用换行可以让代码更清晰
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
  | 'flash'      
  | 'beatheart'  
  | 'popcorn'    
  | 'film';      

export interface Decoration {
  id: string;
  type: DecorationType;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  scale: number;
  visible: boolean; 
}

export interface MemoryPost {
  id: string;
  title: string;
  date: string;
  content: string;
  mediaUrl?: string; // 兼容旧的单图/视频模式
  images?: string[]; // 新增：支持多张图片链接，用于九宫格展示
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
