
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
    "decorations": [
      {
        "id": "deco-1763895735376-m44qp",
        "type": "umbrella",
        "x": 18.489583333333336,
        "y": 51.746031746031754,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763895739049-9lgxy",
        "type": "milk",
        "x": 91.40625,
        "y": 77.77777777777779,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763895751230-mys8z",
        "type": "dog",
        "x": 12.291666666666666,
        "y": 66.45502645502646,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763895751953-panq5",
        "type": "cat",
        "x": 18.28125,
        "y": 65.71428571428571,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763895759535-6qz0t",
        "type": "umbrella",
        "x": 12.395833333333334,
        "y": 51.53439153439153,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763895779755-1svin",
        "type": "milk",
        "x": 75.36458333333333,
        "y": 42.96296296296296,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763896368125-5qj61",
        "type": "film",
        "x": 12.916666666666668,
        "y": 86.45502645502646,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763896368566-j8ouz",
        "type": "film",
        "x": 86.5625,
        "y": 45.3968253968254,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763896369363-66irq",
        "type": "popcorn",
        "x": 23.229166666666668,
        "y": 35.026455026455025,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763896369655-94abe",
        "type": "popcorn",
        "x": 81.25,
        "y": 62.96296296296296,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763896371181-thiss",
        "type": "flash",
        "x": 81.25,
        "y": 21.48148148148148,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763896371485-fez3v",
        "type": "flash",
        "x": 25.624999999999996,
        "y": 15.76719576719577,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1763896371801-l3zjf",
        "type": "flash",
        "x": 16.71875,
        "y": 23.28042328042328,
        "scale": 1,
        "visible": true
      }
    ],
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
      },
      {
        "id": "p-1763984984378-drtj96f2t",
        "title": "可恶的组会🫩",
        "content": "    今天是周一，明天又是开组会的日子啦，好烦，好困。\n    如何呢？其实这周还是有点拖延，哦不对不对，这周一直在做事，主要是做这个网页花了我两三天，希望你看到会喜欢，此时此刻已经完成的大差不差了，但是访问的话还要连外网，可能到这就结束了？也可能我会再去试试看还有什么招不，昨天看了个教学，还蛮难的，有点劝退。\n    这个网站什么时候给你看我还没想好呢，是圣诞节？还是元旦？我原本是打算圣诞节给你的，再加上一些装饰，你看多有节日气氛啊，但是呢，去年跨年没和你一起，你表示过很多次的遗憾，这个礼物🎁我觉得还算用心吧，也是我手搓做了好久的。好吧！要不还是当作圣诞礼物吧！去年是手搓做了一个圣诞小树🎄，今年是一个圣诞网页🛜，也是不错吧！\n    好吧好吧，其实我现在并不知道写些什么内容，你可以把这里当作我的随笔，我的日记，我想对你说的话，我想对自己说的话，这里是全世界只有我们两个知道，只有我们两个来过的地方。所以内容可能会有些乱，希望你不要介意~\n    爱你~我要继续做组会了！！",
        "date": "2025-11-24",
        "images": [],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1763987064887-6h6dfw7r3",
        "title": "下雨啦🌧",
        "content": "笑一笑🥰跳一跳💃🏻\n快乐女孩没烦恼\n下雨了洗个澡🌦\n没有什么大不了",
        "date": "2025-11-24",
        "mediaUrl": "images/1_4_1.jpg",
        "images": [
          "images/1_4_1.jpg",
          "images/1_4_2.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1763987861591-1ksjl8nck",
        "title": "天晴啦🌞",
        "content": "笑一笑😄跳一跳🕺🏽\n快乐女孩乐逍遥\n天晴了空气中🌈\n都是成长的味道",
        "date": "2025-11-24",
        "mediaUrl": "images/1_5_1.jpg",
        "images": [
          "images/1_5_1.jpg",
          "images/1_5_2.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1764144958207-pbwihc4as",
        "title": "怒了💢💢💢",
        "content": "    今天看电视剧的时候，你说想我，你蛮伤心的。你说我很久没有认真写日记，还说我们一路走来丢了很多东西。我说没有丢，只是在换，你只说了三个字“换回来”，随即撤回了，好吧，我还蛮伤心的，或许你更喜欢以前的我。\n    我已写上，我已心碎💔\n    其实我在这里给你写日记，哼哼，我开发的地方哦，牛不牛，居然说我不写日记，哼哼，我在记仇。好吧并不会，其实我是爱你的，其实你也舍不得。学习！！！",
        "date": "2025-11-26",
        "images": [],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1764491634901-detbddgoy",
        "title": "你不参加国考吗",
        "content": "    今天是11月最后一天喽，时间过得真快。\n\t现在好多情绪交织在一起呀，又开心又烦，还有好多事要做，窗外喜鹊一直叫呢，太阳也透过窗帘缝照在我的脸上，并不觉得刺眼，想出去走走。\n\t今天已是国考，听说资格审查过的人数和国考岗位招人的人数的比例是98:1，好牛的国考人，考上真的是百里挑一了，果然公务员还是有过人之处。但是此时此刻，国考貌似还剩下4分钟就结束啦，真替他们感到开心，至少刚考完的他们应该是蛮开心的，虽然一周后还有省考。\n\t什么时候这种日子才能结束呢？这种日子结束后会是什么样的日子呢？是不是我想的太多做的太少了，我刷个厕所我都要想好多天，我想在网上买橡胶手套，买口罩，买专门的刷子，买洁厕灵，但是迟迟没有买，所以就迟迟没有刷。其实呢，压根不需要这些，只是去楼下超市买一瓶6块钱的洁厕灵便可以完成这件事，从购入到清洁完也仅需半小时。好吧，恐怕是我想的太多，但又没实际去做，你也经常鼓励我，我是畏首畏尾的，疑窦丛生的，但是又什么事情都想不明白。\n\t太菜太菜，如何呢？今天阳光真好啊，落日余晖好温柔，不晒但还是暖，再过两天我就去找你啦，希望天气还是这般好，我们是出去走走呢还是房间里待着呢？都好都好。",
        "date": "2025-11-30",
        "images": [],
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "bgm/%E5%BF%AB%E4%B9%90%E5%A5%B3%E5%AD%A9.mp3"
  },
  {
    "id": "c-1763882830286-0.9762468187284853",
    "title": "第二章！春天来啦",
    "heroTitle": "你来到我的城市🚄",
    "heroSubtitle": "喝一杯星巴克☕，\n赠送一次名刀机会",
    "weather": "sunny",
    "decorations": [],
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
    "bgmUrl": "bgm/%E5%8F%88%E6%98%AF%E8%89%B3%E9%98%B3%E5%A4%A9.mp3"
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
  film: '🎥',
  camera: '📸',
  train: '🚆',
  ticket: '🎫',
  tree: '🌳',
  temple: '🛕'
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
  film: '电影',
  camera: 'CCD',
  train: '火车',
  ticket: '车票',
  tree: '树',
  temple: '寺庙'
};

// Helper array for the UI loop
export const AVAILABLE_DECORATIONS: DecorationType[] = [
  'santa', 'tree', 'snowman', 'sock', 'gift', 'bell', 
  'cat', 'dog', 'star', 'moon', 'rainbow', 'flower', 
  'lantern', 'firecracker', 'umbrella', 'milk', 'flash', 
  'beatheart', 'popcorn','film'
];
