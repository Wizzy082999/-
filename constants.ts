
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
    "heroTitle": "小答老师，你好哇！",
    "heroSubtitle": "很开心认识你，虽然是暴雨天🌧️\n但我开始不那么讨厌坏天气",
    "weather": "rain",
    "decorations": [],
    "posts": [
      {
        "id": "p-1763894205812-dal8w2prh",
        "title": "第一次发帖",
        "content": "亲爱的苗苗，今天是我第一次发帖，也是我第一次做网站，还不知道能不能成功呢，也不知道你能不能看见这个网站。嘻嘻，其实我之前尝试过，但是失败了，如果成功了，我希望你看见之后会喜欢这份礼物！如果失败了，我想让你知道在很多你看不见的地方我也在悄悄爱着你喔。第一篇用于测试，我就先写这么多啦~",
        "date": "2025-11-21",
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1763894761792-ay6ht63b0",
        "title": "第二次发帖",
        "content": "亲爱的喵喵老师，我跟你说哦，我好像已经成功啦！也太开心！这就是我送你的礼物哦，这几天我真的专心致志在做这个，虽然有AI的帮助，但是做起来还是很麻烦，因为一些工具、创意、还有部署啥的AI并不能帮到我，期间还有好几次，我已经做了差不多但是可恶啊，怎么也找不到了，只好重新来过。哼哼哼，如何呢，我真厉害，应该是完成啦，不知道后期会不会还有什么问题，希望不会啦~爱你~",
        "date": "2025-11-23",
        "mediaUrl": "images/1_2.jpg",
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "bgm/%E5%BF%AB%E4%B9%90%E5%A5%B3%E5%AD%A9.mp3"
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
      },
      {
        "id": "p-1763889385023-xl8g1w2sw",
        "title": "222",
        "content": "22",
        "date": "2025-11-16",
        "mediaUrl": "/images/pic1.jpg",
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "/bgm/又是艳阳天.mp3"
  },
  {
    "id": "c-1763889537549-0.7878904477871393",
    "title": "驱动器",
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
      }
    ],
    "posts": [
      {
        "id": "p-1763889574742-w1qhlptir",
        "title": "s ",
        "content": "w ",
        "date": "2025-11-16",
        "mediaUrl": "/images/test3.jpg",
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "/bgm/快乐女孩.mp3"
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
  firecracker: '🧨',
  umbrella: '☂️',
  milk: '🧋',
  flash: '⚡️',
  beatheart: '💗',
  popcorn: '🍿',
  film: '🎥'
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
  firecracker: '鞭炮',
  umbrella: '雨伞',
  milk: '奶茶',
  flash: '闪电',
  beatheart: '跳动的心',
  popcorn: '爆米花',
  film: '电影'
};

// Helper array for the UI loop
export const AVAILABLE_DECORATIONS: DecorationType[] = [
  'santa', 'tree', 'snowman', 'sock', 'gift', 'bell', 
  'cat', 'dog', 'star', 'moon', 'rainbow', 'flower', 
  'lantern', 'firecracker', 'umbrella', 'milk', 'flash', 
  'beatheart', 'popcorn','film'
];
