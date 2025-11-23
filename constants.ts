
import { Decoration, Chapter, DecorationType } from './types';

export const INITIAL_DECORATIONS: Decoration[] = [
  { id: 'd1', type: 'santa', x: 10, y: 15, scale: 1.5, visible: true }, // Higher up
  { id: 'd2', type: 'tree', x: 85, y: 65, scale: 2.0, visible: true }, // Bigger
  { id: 'd3', type: 'snowman', x: 15, y: 75, scale: 1.5, visible: true },
];

export const INITIAL_CHAPTERS = [
  {
    "id": "c1",
    "title": "第一章：开始的篇章",
    "heroTitle": "Merry Christmas",
    "heroSubtitle": "收集我们珍贵的瞬间，\n一片雪花，一段回忆。 ❄️",
    "weather": "snow",
    "decorations": [
      {
        "id": "d1",
        "type": "santa",
        "x": 10,
        "y": 15,
        "scale": 1.5,
        "visible": true
      },
      {
        "id": "d2",
        "type": "tree",
        "x": 89.0625,
        "y": 64.97354497354497,
        "scale": 2,
        "visible": true
      },
      {
        "id": "d3",
        "type": "snowman",
        "x": 15,
        "y": 75,
        "scale": 1.5,
        "visible": true
      }
    ],
    "posts": [
      {
        "id": "p-1763882804955-2fksao1og",
        "title": "111",
        "content": "111",
        "date": "2025-11-22",
        "mediaUrl": "/images/test1.png",
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "blob:https://miaomiao-theta.vercel.app/b3410f5a-11ca-430c-833a-6596e3a76047"
  },
  {
    "id": "c-1763882830286-0.9762468187284853",
    "title": "222",
    "heroTitle": "Merry Christmas",
    "heroSubtitle": "收集我们珍贵的瞬间，\n一片雪花，一段回忆。 ❄️",
    "weather": "sunny",
    "decorations": [
      {
        "id": "d1",
        "type": "santa",
        "x": 10,
        "y": 15,
        "scale": 1.5,
        "visible": true
      },
      {
        "id": "d2",
        "type": "tree",
        "x": 85,
        "y": 65,
        "scale": 2,
        "visible": true
      },
      {
        "id": "d3",
        "type": "snowman",
        "x": 15,
        "y": 75,
        "scale": 1.5,
        "visible": true
      },
      {
        "id": "deco-1763882837476-nxl3k",
        "type": "bell",
        "x": 74.54778043494598,
        "y": 75.28561244048919,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763882837886-3ptll",
        "type": "gift",
        "x": 20.260416666666668,
        "y": 60.10582010582011,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763882838726-zmva0",
        "type": "star",
        "x": 19.492965336149943,
        "y": 87.92140960777127,
        "scale": 1,
        "visible": true
      }
    ],
    "posts": [
      {
        "id": "p-1763882856186-en4pq6nei",
        "title": "222",
        "content": "222",
        "date": "2025-11-24",
        "mediaUrl": "/images/test2.png",
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "blob:https://miaomiao-theta.vercel.app/17880a3f-eeb9-42ad-b128-2652d5413995"
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
