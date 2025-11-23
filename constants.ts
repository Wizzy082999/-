
import { Decoration, Chapter, DecorationType } from './types';

export const INITIAL_DECORATIONS: Decoration[] = [
  { id: 'd1', type: 'santa', x: 10, y: 15, scale: 1.5, visible: true }, // Higher up
  { id: 'd2', type: 'tree', x: 85, y: 65, scale: 2.0, visible: true }, // Bigger
  { id: 'd3', type: 'snowman', x: 15, y: 75, scale: 1.5, visible: true },
];

export const INITIAL_CHAPTERS: Chapter[] = [
  {
    id: 'c1',
    title: '第一章：开始的篇章',
    heroTitle: 'Merry Christmas',
    heroSubtitle: '收集我们珍贵的瞬间，\n一片雪花，一段回忆。 ❄️',
    weather: 'snow',
    decorations: JSON.parse(JSON.stringify(INITIAL_DECORATIONS)),
    posts: [
      {
        id: 'sample-post-1',
        title: '文件夹创建成功！',
        date: '2023-12-25',
        content: '当你看到这张圣诞树图片时，说明 public/images 文件夹已经自动创建好啦！\n\n以后你只需要把照片上传到这个文件夹，然后路径填 "/images/你的照片名.jpg" 就可以永久保存了。',
        mediaUrl: '/images/sample.svg',
        mediaType: 'image',
        likes: 99
      }
    ]
  }
];

// Expanded asset list with bigger/complex emojis
export const DECORATION_ASSETS: Record<DecorationType, string> = {
  santa: '🎅🦌🛷', // Santa with reindeer and sleigh
  tree: '🎄',
  sock: '🧦',
  cat: '🐱',
  dog: '🐶',
  star: '🌟',
  gift: '🎁',
  rainbow: '🌈',
  flower: '🌸',
  moon: '🌙',
  snowman: '⛄',
  bell: '🔔',
  lantern: '🏮',
  firecracker: '🧨'
};

export const DECORATION_NAMES: Record<DecorationType, string> = {
  santa: '飞天圣诞老人',
  tree: '大圣诞树',
  sock: '圣诞袜',
  cat: '小猫咪',
  dog: '小狗狗',
  star: '闪亮星星',
  gift: '礼物盒',
  rainbow: '彩虹',
  flower: '小发发',
  moon: '弯弯月亮',
  snowman: '雪人',
  bell: '铃铛',
  lantern: '红灯笼',
  firecracker: '鞭炮'
};

// Helper array for the UI loop
export const AVAILABLE_DECORATIONS: DecorationType[] = [
  'santa', 'tree', 'snowman', 'sock', 'gift', 'bell', 
  'cat', 'dog', 'star', 'moon', 'rainbow', 'flower', 
  'lantern', 'firecracker'
];