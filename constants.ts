
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
    "title": "第二章：春天来啦！",
    "heroTitle": "你来到我的城市🚄",
    "heroSubtitle": "喝一杯星巴克☕️\n赠送一把名刀司命🗡\n抵御一次防御塔攻击🗼",
    "weather": "sunny",
    "decorations": [
      {
        "id": "deco-1764493312387-qyk8u",
        "type": "temple",
        "x": 80.1255230125523,
        "y": 59.84848484848485,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493321302-a5ql8",
        "type": "camera",
        "x": 76.56903765690377,
        "y": 79.11255411255411,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493321667-iex52",
        "type": "camera",
        "x": 90.5857740585774,
        "y": 65.6926406926407,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493337789-ekgen",
        "type": "train",
        "x": 22.384937238493723,
        "y": 37.01298701298701,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493340223-tbwq7",
        "type": "train",
        "x": 79.39330543933055,
        "y": 30.627705627705627,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493343271-a541v",
        "type": "ticket",
        "x": 24.006276150627613,
        "y": 61.36363636363637,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493343520-fgx6i",
        "type": "ticket",
        "x": 91.47489539748955,
        "y": 37.44588744588744,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493344229-ypzxn",
        "type": "ticket",
        "x": 11.872384937238493,
        "y": 30.844155844155846,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493354062-0c79f",
        "type": "tree",
        "x": 7.426778242677824,
        "y": 88.96103896103897,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493358084-8n6du",
        "type": "tree",
        "x": 11.92468619246862,
        "y": 88.96103896103897,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493368084-wkoll",
        "type": "camera",
        "x": 13.07531380753138,
        "y": 55.41125541125541,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493382723-3z59k",
        "type": "cat",
        "x": 10.847164958278999,
        "y": 72.18736587110288,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493383387-gebhd",
        "type": "dog",
        "x": 15.167364016736402,
        "y": 72.72727272727273,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493400424-l8ayz",
        "type": "tree",
        "x": 16.265690376569037,
        "y": 88.74458874458875,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493406964-48cu9",
        "type": "tree",
        "x": 20.135983263598327,
        "y": 88.52813852813853,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493427784-37069",
        "type": "beatheart",
        "x": 74.7907949790795,
        "y": 45.67099567099567,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493433171-d12vi",
        "type": "flower",
        "x": 87.76150627615063,
        "y": 84.4155844155844,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1764493434503-5gzrl",
        "type": "flower",
        "x": 85.61715481171548,
        "y": 17.64069264069264,
        "scale": 1,
        "visible": true
      }
    ],
    "posts": [
      {
        "id": "p-1763889385023-xl8g1w2sw",
        "title": "杭州东站欢迎您❤️",
        "content": "如此可爱的小女子一枚啊",
        "date": "2025-12-18",
        "mediaUrl": "/images/pic1.jpg",
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767788006864-snmobzw5s",
        "title": "小苗小旺和可乐",
        "content": "郑州的冬天好冷啊\n不过现在还能记得小屋的样子和味道\n还能记得下楼的时候冷的感觉\n冷的好深刻、好清晰\n不过冷的好幸福",
        "date": "2025-12-01",
        "mediaUrl": "images/2_2_1.jpg",
        "images": [
          "images/2_2_1.jpg",
          "images/2_2_2.jpg",
          "images/2_2_3.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767788722251-f5271sr0i",
        "title": "郑州郑州我们喜欢你",
        "content": "发现对郑州已全是好印象\n姐姐在郑州当时你也在郑州\n接地气、物价低\n最重要的是承载了太多我俩的回忆",
        "date": "2025-12-04",
        "mediaUrl": "images/2_3_1.jpg",
        "images": [
          "images/2_3_1.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767788809336-ky50pm0cw",
        "title": "纳尼(ÒωÓױ)！如此萌物竟有两只！😱",
        "content": "有点磕他俩了🤔",
        "date": "2025-12-10",
        "mediaUrl": "images/2_4_1.jpg",
        "images": [
          "images/2_4_1.jpg",
          "images/2_4_2.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767789415793-1hxqu0t7a",
        "title": "青城山下赵喵喵",
        "content": "偶然发现这些照片当时属于是随手一拍（虽然现在看也是属于随手一拍哈），但是再翻看的时候感觉很有活人感，虽然背景很多人，但是好像他们都是NPC，我俩是主角！如此可爱的两个人呀😊我永远爱你宝宝",
        "date": "2025-12-19",
        "mediaUrl": "images/2_6_1.jpg",
        "images": [
          "images/2_6_1.jpg",
          "images/2_6_2.jpg",
          "images/2_6_3.jpg",
          "images/2_6_4.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767798323793-o3aqy8xd0",
        "title": "小鱼老师！",
        "content": "∠(°ゝ°)到！！！",
        "date": "2025-12-21",
        "mediaUrl": "images/2_8_1.jpg",
        "images": [
          "images/2_8_1.jpg",
          "images/2_8_2.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767798634403-pp8z5ce78",
        "title": "夜骑西湖🚴",
        "content": "是第一次也是印象最深的一次\n好开心的一晚\n只是最后没有看到日出有点可惜啦\n不过这也使得我们第二次去夜骑！（不对是夜走）\n第二天还在开组会的办公室补了觉\n我会一辈子记得！",
        "date": "2025-12-22",
        "mediaUrl": "images/2_9_1.jpg",
        "images": [
          "images/2_9_1.jpg",
          "images/2_9_2.jpg",
          "images/2_9_3.jpg",
          "images/2_9_4.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767800006663-z3uayzdf9",
        "title": "ShangHai",
        "content": "虽然上海是巨巨巨巨大的一座城市\n但还是很幸运在这座城市的某个角落和苗苗一起\n度过了非常多快乐的时光\n张江站的十字路口有好多小摊\n西瓜摊、淀粉肠摊、烧烤摊、卤味摊\n最喜欢夏天的西瓜摊了，每次路过我们都要买半个西瓜\n西瓜就是夏天，夏天就是西瓜\n后来西瓜摊不见了夏天也就不见了\n我们在大晚上经常会一起出门\n还是夏天的夜晚比较喜人，我们吃过好多次烧烤，拍过好几次照，喂过好几次小猫\n在夏天，我们和星星一起，都不睡觉\n后来，我找到实习啦\n第一个月狠狠赚了150块，all in买花了\n真的很喜欢每次苗苗开地铁来接我的样子\n她真的好有女人味儿，爱了\n然后哦，我们还在上海吃过好几次六合酥山店\n真不错啊，就是老板有点邋遢，像乞丐\n还有一个人留着小胡子，感觉坏坏的",
        "date": "2025-12-23",
        "mediaUrl": "images/2_10_1.jpg",
        "images": [
          "images/2_10_1.jpg",
          "images/2_10_2.jpg",
          "images/2_10_3.jpg",
          "images/2_10_4.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767800984246-qv8ptzr7q",
        "title": "西瓜摊再也没有来过了",
        "content": "暑假就要接近尾声了\n我们一起去了苏州，苏州的妆造真不错\n虽然我最最喜欢的还是你和我在公车上的样子\n火腿肠现在也不知道在哪里打劫路人，也有可能是在行侠仗义啦\n在杭州大莲花，和苗苗一起看了我人生中第一场演唱会\n是陶喆的喂！太开心的一天\n看完演唱会后，我们又转战景德镇啦\n江西菜真的好好好好好好吃\n感觉这个暑假，我可能一生都会想念这个暑假了\n有太多日子，太多件事值得我记住一辈子了\n宝宝，我永远爱你\n可能\n一辆银灰色小车会在明年某个夜晚的蝉鸣中\n再次开到十字路口，带来一整车的夏天🍉",
        "date": "2025-12-24",
        "mediaUrl": "images/2_11_1.jpg",
        "images": [
          "images/2_11_1.jpg",
          "images/2_11_2.jpg",
          "images/2_11_3.jpg",
          "images/2_11_4.jpg",
          "images/2_11_5.jpg",
          "images/2_11_6.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767802473450-kd03cvc8m",
        "title": "日子开始变得丰富多彩啦🌈",
        "content": "🌈🌈🌈",
        "date": "2025-12-20",
        "mediaUrl": "images/2_7_1.jpg",
        "images": [
          "images/2_7_1.jpg",
          "images/2_7_2.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "bgm/%E5%8F%88%E6%98%AF%E8%89%B3%E9%98%B3%E5%A4%A9.mp3"
  },
  {
    "id": "c-1763889537549-0.7878904477871393",
    "title": "第三章：圣诞快乐🎄",
    "heroTitle": "我住的城市从不下雪❄️",
    "heroSubtitle": "你好吗merry merry Christmas\n想和你有更好的生活",
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
        "id": "d3",
        "type": "snowman",
        "x": 7.552083333333333,
        "y": 71.11111111111111,
        "scale": 1.5,
        "visible": true
      },
      {
        "id": "deco-1767802820624-nodal",
        "type": "bell",
        "x": 79.94791666666666,
        "y": 29.31216931216931,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802821322-vd9me",
        "type": "bell",
        "x": 24.635416666666668,
        "y": 74.28571428571429,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802833633-auf2n",
        "type": "gift",
        "x": 78.95833333333333,
        "y": 52.59259259259259,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802833900-zmydn",
        "type": "gift",
        "x": 6.09375,
        "y": 44.44444444444444,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802834513-ahtul",
        "type": "sock",
        "x": 91.51041666666667,
        "y": 77.77777777777779,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802834670-6av78",
        "type": "sock",
        "x": 90.88541666666666,
        "y": 21.48148148148148,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802836218-pcy5z",
        "type": "bigtree",
        "x": 80.36458333333333,
        "y": 75.66137566137566,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802836378-nohv2",
        "type": "bigtree",
        "x": 17.916666666666668,
        "y": 47.40740740740741,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802836497-wo4tl",
        "type": "bigtree",
        "x": 93.54166666666667,
        "y": 48.783068783068785,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802837167-pedal",
        "type": "bigtree",
        "x": 18.697916666666668,
        "y": 90.05291005291005,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802886657-wbbzn",
        "type": "snowman",
        "x": 86.5625,
        "y": 46.24338624338624,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767802887162-wngh9",
        "type": "snowman",
        "x": 24.635416666666668,
        "y": 32.06349206349206,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767841241347-sl01f",
        "type": "santa",
        "x": 75.0380108026526,
        "y": 15,
        "scale": 1,
        "visible": true
      }
    ],
    "posts": [
      {
        "id": "p-1766818314747-kseo9ftwy",
        "title": "假如生活欺骗了你",
        "content": "宝宝，今晚回来你很难过\n因为老太婆同事的事情你跟我哭了一场\n好可怜的苗苗\n心疼你宝宝\n可能你现在看到的时候已经没有难受的感觉啦\n不过我想起来一首诗\n这次想起来再读\n比第一次在课本中学到的时候更有感触\n一切都是瞬息，一切都将会过去\n快乐的日子将会来临宝宝\n爱你",
        "date": "2025-12-26",
        "mediaUrl": "images/iflie.jpg",
        "images": [
          "images/iflie.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767841450733-g93og8hal",
        "title": "圣诞快乐🎉",
        "content": "圣诞快乐宝宝，嘻嘻，其实最开始是圣诞礼物的\n我的脑子并不清晰啊，整天东想西想\n再加上行动力不强，我这个小生真是绝了啊\n如何呢？中国人不过洋节\n懂的转！",
        "date": "2025-12-25",
        "mediaUrl": "images/wujing.jpg",
        "images": [
          "images/wujing.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767876451887-i3mjlw3w7",
        "title": "杭州东站🚂",
        "content": "杭州东站貌似已经成了我俩去过最多次的地方了\n你来找我的时候你会去\n我去找你的时候我会去\n早已成为接头据点",
        "date": "2025-12-27",
        "mediaUrl": "images/3_1.jpg",
        "images": [
          "images/3_1.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767876684373-7avigypct",
        "title": "生日快乐🎉",
        "content": "是哪位小公主在过生日呀\n被朋友围住的感觉一定很幸福吧\n（虽然这张我在角落）\n希望你在今年的每一天都像这天一样开心哦",
        "date": "2025-12-28",
        "mediaUrl": "images/3_2.jpg",
        "images": [
          "images/3_2.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767876919535-m8to8e587",
        "title": "西湖的水真西啊",
        "content": "西湖好大，承载了好多人的回忆\n我们俩坐在湖边的每一秒钟似乎\n都是无限开心和放松的\n这一次也弥补了上一次的遗憾啦\n不过还真是不能通宵啊\n真困啊（这样看陈理解这个神人真神啊）\n好吧！\n我们和苏轼同担！大家都喜欢西湖！",
        "date": "2025-12-31",
        "mediaUrl": "images/3_3_1.jpg",
        "images": [
          "images/3_3_1.jpg",
          "images/3_3_2.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767877380889-nzglffmqo",
        "title": "新年快乐！",
        "content": "今天跨年，也太开心！\n鲜切吊龙涮火锅也太好吃了\n我要做一辈子赵苗苗和肥姨妈和鲜切吊龙的狗！",
        "date": "2026-01-01",
        "mediaUrl": "images/3_4.jpg",
        "images": [
          "images/3_4.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767877469213-p24o4wj0j",
        "title": "这谁家小孩👧",
        "content": "这谁家小孩啊\n真可爱\n宝宝我好想抱抱你\n揉揉你\n搂搂你\n和你一起打\n王者荣耀！",
        "date": "2026-01-03",
        "mediaUrl": "images/3_5.jpg",
        "images": [
          "images/3_5.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      },
      {
        "id": "p-1767877776188-512lk4hku",
        "title": "风吹落最后一片叶🍂",
        "content": "111",
        "date": "2026-01-08",
        "mediaUrl": "images/3_6_1.jpg",
        "images": [
          "images/3_6_1.jpg",
          "images/3_6_2.jpg"
        ],
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "bgm/%E5%88%9D%E9%9B%AA.mp3"
  },
  {
    "id": "c-1767838308832-0.575099296845854",
    "title": "不止500天！",
    "heroTitle": "我将永远爱你",
    "heroSubtitle": "喵喵汪汪forever🐶🐱\n",
    "weather": "starry",
    "decorations": [
      {
        "id": "deco-1767840799872-oqjr7",
        "type": "one",
        "x": 74.84375,
        "y": 47.83068783068783,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840806544-3m4a2",
        "type": "zero",
        "x": 78.80208333333333,
        "y": 47.83068783068783,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840812796-oseau",
        "type": "cake",
        "x": 21.354166666666664,
        "y": 63.597883597883595,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840814176-g18bq",
        "type": "cake",
        "x": 74.79166666666667,
        "y": 39.15343915343915,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840819617-ftbnw",
        "type": "five",
        "x": 8.645833333333334,
        "y": 64.12698412698413,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840823187-d6x7n",
        "type": "zero",
        "x": 86.61458333333333,
        "y": 47.83068783068783,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840823446-3qdei",
        "type": "zero",
        "x": 82.76041666666667,
        "y": 47.83068783068783,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840823970-g5rox",
        "type": "zero",
        "x": 16.614583333333332,
        "y": 64.12698412698413,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840824231-ek64d",
        "type": "zero",
        "x": 12.552083333333334,
        "y": 64.12698412698413,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840831151-j0b8b",
        "type": "beatheart",
        "x": 8.489583333333334,
        "y": 54.074074074074076,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840833011-xs7do",
        "type": "beatheart",
        "x": 91.25,
        "y": 39.89417989417989,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840880083-tjit1",
        "type": "cat",
        "x": 16.71875,
        "y": 54.285714285714285,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840880690-b71ny",
        "type": "dog",
        "x": 12.864583333333332,
        "y": 54.4973544973545,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840882762-2dg82",
        "type": "star",
        "x": 80.57291666666667,
        "y": 67.61904761904762,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840883257-0n1wn",
        "type": "star",
        "x": 7.187499999999999,
        "y": 84.97354497354497,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840883613-i3i66",
        "type": "star",
        "x": 87.86458333333333,
        "y": 24.656084656084655,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840884307-kj7q9",
        "type": "star",
        "x": 17.5,
        "y": 29.417989417989414,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840906340-786kn",
        "type": "dog",
        "x": 84.58333333333333,
        "y": 38.835978835978835,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840911493-1g22w",
        "type": "cat",
        "x": 80.57291666666667,
        "y": 38.41269841269842,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840961812-swo58",
        "type": "gift",
        "x": 25.208333333333332,
        "y": 87.5132275132275,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767840962360-pxluh",
        "type": "gift",
        "x": 93.125,
        "y": 68.04232804232804,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767841018996-ba15h",
        "type": "star",
        "x": 80.3125,
        "y": 87.3015873015873,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767841019970-i7kkg",
        "type": "moon",
        "x": 7.03125,
        "y": 20,
        "scale": 1,
        "visible": true
      },
      {
        "id": "deco-1767841021543-bu66o",
        "type": "moon",
        "x": 78.85416666666667,
        "y": 17.037037037037038,
        "scale": 1,
        "visible": true
      }
    ],
    "posts": [
      {
        "id": "p-1767838881245-pvwwudrd3",
        "title": "500🎂",
        "content": "         今天是我们在一起的第500天🎉🎉🎉\n         像我说的那样，500天听起来好久，但是过起来很快\n         像你说的那样，500天好短，过起来好长\n         你真可爱宝宝，昨晚听了你用歌曲对我们一起度过的季节进行了年度总结\n         我也要总结一下🤔但是我的记性不太好，所以总结的可能不那么尽善尽美\n         那还说啥了，总结就完事了\n         首先在我们相识的那个春天，我几乎每天过的都是坐公交去图书馆学习的日子，还挺美好，但是前途一片雾蒙蒙（这种现象到此时此刻也并没有好转哈😓），当时在公车上最喜欢听的就是陶喆的《二十二》，在演唱会上听到陶喆在唱这首歌的时候，脑海里全都是关于这段日子的记忆。说远了，但是关于我们俩的那个春天，如果让我配上BGM，那我肯定要配周杰伦的《浪漫手机》啦，感觉此乃绝配，很推荐你去听听！\n         然后时间来到了我们“真正”认识的那个夏天，关于这个夏天我最大的印象就是热，好热啊，感觉自己一直在出汗，不知道为什么自己那时候还天天喜欢穿那件“上白下蓝”的“上白”，是真的真的真的不太透气！要是给这段时间配首BGM呢，emm，让我想想，那就是《恋爱ing》吧！\n         接下来就开始异地恋了，可恶(〃＞皿＜)我觉得自己还算是适应能力强的人，但是这个b学上的我确实很难适应。寝室窗前，生长着一棵高大的合欢树。打电话的时候我就是在这棵树下坐着，一边聊天一边摆弄着飘落在地上的合欢花。我仿佛在楼下坐了几个月，杭州的秋冬没有特别明显的交界，也似乎没有特别明显的变化，去年的秋冬我就用一首歌来概括，那就是魏如萱的《我在纽约打电话给你》。\n         随即到了第二年的春天，对春天我印象最深的事情就是我们一起去西湖玩，你做了妆造，穿了红绿色的古装，拍出了好多好看的照片，有你的也有我的，现在回看都还觉得活力满满。玩了一天后我们晚上还吃了西湖醋鱼，并没有传说中的那么难吃嘛。西湖真美啊，承载了好多我俩的回忆，如果给春天配上BGM的话，我想我也会选容祖儿的《没关系》。\n         今年夏天，很开心是完完全全和你一起度过的。以一顿很久以前羊肉串作为开场，我先是当了一周的家庭煮夫，买菜、收拾、投简历。后面我们俩就一起上下班，每天一起在地铁上分别，又在地铁上重逢。每天都好累，每天都好充实，这是一种没有后顾之忧的充实，是一种很踏实的充实，好幸福。历经三个月的相处，我们的关系也更进一步，没有太多的争吵，多了很多的理解。以陶喆的演唱会作为收尾，当陶喆从舞台中央缓缓下降直至消失的时候，我就知道我的夏天也该结束了。如果给夏天配首BGM的话，我会选择《流沙》，这是我在那段时间听的最多的歌，也是我最喜欢的歌，这段时间也是我最喜欢的时间。夏天也像流沙。\n         写到这里我好像发现不是杭州的秋天和冬天的界限不明晰，而是我对时间的判断不明晰。对我来说可能春夏秋冬不是最明显的节点，开学放假才是。如果秋天选一首BGM的话，那就选《我有点焦虑》吧，这个学期感觉压力陡增，我们的见面在这个学期受到的约束明显变强了。而冬天呢，我感觉最近才进入冬天，冬天好冷。不过和你在一起就好暖，好舒服，好好吃。我要选首温暖的歌，那就是你刚刚听到的《初雪》吧！\n         今日已经500天啦，有人想和我过1000天吗？想的举手🙌\n         宝宝，和你在一起我真的觉得很幸运，超级喜欢你，我最最最最最爱你\n         感觉你是可爱的、聪明的、美丽的、有趣的\n         日子不是和谁过都一样的，很喜欢和你在一起时的感觉\n         希望我们能永永远远在一起\n         希望我们能早早结束异地恋\n         希望我能快快有更大的能力\n         希望你永远健康、平安、快乐\n         爱你宝宝❤️",
        "date": "2026-01-08",
        "images": [],
        "mediaType": "image",
        "likes": 0
      }
    ],
    "bgmUrl": "bgm/%E6%83%85%E6%AD%8C.mp3"
  }
];

// Expanded asset list with bigger/complex emojis
export const DECORATION_ASSETS: Record<DecorationType, string> = {
  santa: '🎅🦌🛷', // Santa with reindeer and sleigh
  bigtree: '🎄',
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
  temple: '🛕',
  five: '5⃣',
  zero: '0⃣',
  cake: '🎂',
  one: '1⃣'
};

export const DECORATION_NAMES: Record<DecorationType, string> = {
  santa: '飞天圣诞老人',
  bigtree: '大圣诞树',
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
  temple: '寺庙',
  five: '5',
  zero: '0',
  cake: '蛋糕',
  one: '1'
};

// Helper array for the UI loop
export const AVAILABLE_DECORATIONS: DecorationType[] = [
  'santa', 'bigtree', 'snowman', 'sock', 'gift', 'bell', 
  'cat', 'dog', 'star', 'moon', 'rainbow', 'flower', 
  'lantern', 'firecracker', 'umbrella', 'milk', 'flash', 
  'beatheart', 'popcorn','film','camera', 'train', 'ticket',
  'tree', 'temple', 'five', 'zero', 'cake', 'one'
];
