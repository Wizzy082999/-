
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
        "x": 23.117154811715483,
        "y": 26.83982683982684,
        "scale": 1.5,
        "visible": true
      },
      {
        "id": "d2",
        "type": "tree",
        "x": 79.81171548117155,
        "y": 68.18181818181817,
        "scale": 2,
        "visible": true
      },
      {
        "id": "d3",
        "type": "snowman",
        "x": 12.186192468619247,
        "y": 60.71428571428571,
        "scale": 1.5,
        "visible": true
      },
      {
        "id": "deco-1763879907010-re875",
        "type": "tree",
        "x": 17.625523012552303,
        "y": 59.09090909090909,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763879907246-rx04c",
        "type": "tree",
        "x": 87.22730062348305,
        "y": 76.17274800955505,
        "scale": 1,
        "visible": true
      }
    ],
    "posts": [
      {
        "id": "p-1763881134134-vocsxna87",
        "title": "111",
        "content": "111111",
        "date": "2025-11-23",
        "mediaUrl": "/images/test1.png",
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "blob:https://miaomiao-theta.vercel.app/1a11a2c0-8a55-4b8e-9520-7b48fa959492"
  },
  {
    "id": "c-1763879954839-0.7468223961682955",
    "title": "第二章",
    "heroTitle": "Merry Christmas",
    "heroSubtitle": "收集我们珍贵的瞬间，\n一片雪花，一段回忆。 ❄️",
    "weather": "sunny",
    "decorations": [
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
        "id": "deco-1763879980077-p2xis",
        "type": "dog",
        "x": 21.986834335624764,
        "y": 63.719761489325094,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763879980246-vm6yb",
        "type": "dog",
        "x": 21.809623430962343,
        "y": 82.57575757575758,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763879981193-5ulsg",
        "type": "cat",
        "x": 76.25523012552301,
        "y": 53.896103896103895,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763879981335-q8hqv",
        "type": "cat",
        "x": 76.88284518828452,
        "y": 75.32467532467533,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763879987901-3chrq",
        "type": "snowman",
        "x": 23.744769874476987,
        "y": 41.883116883116884,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763879988230-3kgf1",
        "type": "snowman",
        "x": 76.6213389121339,
        "y": 34.090909090909086,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763879993596-nubgp",
        "type": "lantern",
        "x": 78.5041841004184,
        "y": 90.47619047619048,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763879994044-5nvuj",
        "type": "lantern",
        "x": 23.48326359832636,
        "y": 27.27272727272727,
        "scale": 1,
        "visible": true
      }
    ],
    "posts": [
      {
        "id": "p-1763879974146-vfj4llm3i",
        "title": "222",
        "content": "2额饿额额",
        "date": "2025-11-22",
        "mediaUrl": "/images/test2.png",
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1763880017222-6q1rug0ev",
        "title": "2222",
        "content": "e22e2e2e2",
        "date": "2025-11-23",
        "mediaUrl": "/images/test3.jpg",
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "blob:https://miaomiao-theta.vercel.app/9d891058-5d41-4c4f-ad26-772481888977"
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
