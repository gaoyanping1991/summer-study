/* ========================================
 * 叶书瑶越来越棒 · 四升五
 * 架构：分类(chinese/math/english/sport) → 多个打卡项
 * 数据存储：localStorage
 * ======================================== */

const STORAGE_KEY = 'summer_study_v1';

// ===== 古诗库（30首） =====
// ===== 五年级上册必背内容库（古诗+日积月累+课文段落） =====
const RECITE_BANK = [
  // ===== 古诗词 =====
  {title:'示儿',author:'陆游',dynasty:'宋',type:'古诗',content:'死去元知万事空，\n但悲不见九州同。\n王师北定中原日，\n家祭无忘告乃翁。',translation:'人死后原本知道万事皆空，只是悲叹看不到国家统一。当宋朝军队收复中原的那天，家祭时别忘了告诉你的父亲。',appreciation:'这是陆游的绝笔诗，表达了他至死不忘国家统一的爱国之情。"元知"不要写成"原知"，"九州"不要写成"九洲"。'},
  {title:'题临安邸',author:'林升',dynasty:'宋',type:'古诗',content:'山外青山楼外楼，\n西湖歌舞几时休？\n暖风熏得游人醉，\n直把杭州作汴州。',translation:'山外有青山楼外有楼，西湖的歌舞什么时候才能停止？暖风把游人熏得醉醺醺的，简直把杭州当成了汴州。',appreciation:'讽刺南宋权贵沉迷享乐、忘记国耻。"熏"不要写成"醺"，"汴州"不要写成"卞州"。'},
  {title:'己亥杂诗',author:'龚自珍',dynasty:'清',type:'古诗',content:'九州生气恃风雷，\n万马齐喑究可哀。\n我劝天公重抖擞，\n不拘一格降人才。',translation:'中国的生机勃勃需要风雷般的变革，万马齐喑的局面实在可悲。我劝老天爷重新振作，不拘一格降下人才。',appreciation:'表达了对社会变革的渴望。"恃"读shì，"喑"读yīn，不要写成"暗"。"抖擞"不要写成"斗搜"。'},
  {title:'山居秋暝',author:'王维',dynasty:'唐',type:'古诗',content:'空山新雨后，\n天气晚来秋。\n明月松间照，\n清泉石上流。\n竹喧归浣女，\n莲动下渔舟。\n随意春芳歇，\n王孙自可留。',translation:'空山刚下过雨，傍晚的天气已有秋意。明月透过松林照下，清泉在石上流淌。竹林喧闹是洗衣女归来，莲花摇动是渔船下水。任凭春花凋谢，王孙自可留在此山。',appreciation:'王维山水诗代表作，动静结合。"暝"读míng，傍晚。"浣"读huàn，洗衣。"歇"不要写成"竭"。'},
  {title:'枫桥夜泊',author:'张继',dynasty:'唐',type:'古诗',content:'月落乌啼霜满天，\n江枫渔火对愁眠。\n姑苏城外寒山寺，\n夜半钟声到客船。',translation:'��亮落下乌鸦啼叫寒霜满天，江边枫树和渔火伴着愁眠。姑苏城外的寒山寺，半夜的钟声传到了客船上。',appreciation:'羁旅思乡的名篇。"乌"不要写成"鸟"，"姑苏"是苏州古称。'},
  {title:'长相思',author:'纳兰性德',dynasty:'清',type:'词',content:'山一程，水一程，身向榆关那畔行，夜深千帐灯。\n风一更，雪一更，聒碎乡心梦不成，故园无此声。',translation:'翻过一座座山，渡过一条条河，向着山海关那边行进，深夜中千座帐篷灯火通明。风刮一阵，雪下一阵，嘈杂声搅碎了思乡之心，家乡没有这种声音。',appreciation:'清代词人纳兰性德描写行军途中的思乡之情。"榆关"即山海关。"聒"读guō，不要写成"刮"。'},
  {title:'渔歌子',author:'张志和',dynasty:'唐',type:'词',content:'西塞山前白鹭飞，\n桃花流水鳜鱼肥。\n青箬笠，绿蓑衣，\n斜风细雨不须归。',translation:'西塞山前白鹭飞翔，桃花盛开江水涨，鳜鱼正肥美。头戴青斗笠，身披绿蓑衣，斜风细雨中不必归去。',appreciation:'日积月累篇目。描写渔人自在生活。"鳜"读guì，不要写成"桂"。"箬"读ruò。'},
  {title:'蝉',author:'虞世南',dynasty:'唐',type:'古诗',content:'垂緌饮清露，\n流响出疏桐。\n居高声自远，\n非是藉秋风。',translation:'蝉垂下触须饮着清露，鸣声从稀疏的梧桐树中传出。身居高处声音自然传得远，不是凭借秋风的力量。',appreciation:'日积月累篇目。借蝉喻人，品德高尚的人不需要外在凭借。"緌"读ruí。'},
  {title:'乞巧',author:'林杰',dynasty:'唐',type:'古诗',content:'七夕今宵看碧霄，\n牵牛织女渡河桥。\n家家乞巧望秋月，\n穿尽红丝几万条。',translation:'七夕之夜仰望碧蓝的天空，牛郎织女渡过银河相会。家家户户对着秋月乞求巧手，穿完了千万条红丝线。',appreciation:'日积月累篇目。描写七夕乞巧的民间习俗。"霄"不要写成"宵"（第一句的"宵"才是夜晚）。'},
  {title:'观书有感（其一）',author:'朱熹',dynasty:'宋',type:'古诗',content:'半亩方塘一鉴开，\n天光云影共徘徊。\n问渠那得清如许？\n为有源头活水来。',translation:'半亩方形池塘像一面镜子打开，天光和云影在水中一起徘徊。问它为什么这样清澈？因为有源头的活水不断流来。',appreciation:'日积月累篇目。以池塘为喻，说明不断学习新知识的重要性。"鉴"指镜子。"渠"指它（池塘）。'},
  {title:'观书有感（其二）',author:'朱熹',dynasty:'宋',type:'古诗',content:'昨夜江边春水生，\n艨艟巨舰一毛轻。\n向来枉费推移力，\n此日中流自在行。',translation:'昨夜江边春水涨起，大战船像羽毛一样轻。以前白费了推移的力气，今天在江中可以自由航行。',appreciation:'以行船为喻，说明积累到一定程度自然水到渠成。"艨艟"读méngchōng，古代战船。'},

  // ===== 日积月累（名言名句） =====
  {title:'读书名言',author:'',dynasty:'',type:'日积月累',content:'一日无书，百事荒芜。 ——陈寿\n读书破万卷，下笔如有神。 ——杜甫\n书犹药也，善读之可以医愚。 ——刘向',translation:'一天不读书，什么事都做不好。读了很多书后，写文章就像有神助。书就像药一样，善于读书可以医治愚昧。',appreciation:'第一单元日积月累。三条关于读书的名言，分别出自陈寿、杜甫、刘向。'},
  {title:'勤俭名言',author:'',dynasty:'',type:'日积月累',content:'克勤于邦，克俭于家。 ——《尚书》\n居安思危，戒奢以俭。 ——魏征\n由俭入奢易，由奢入俭难。 ——司马光',translation:'在国家大事上要勤奋，在家庭生活中要节俭。在安定的时候要想到危险，戒除奢侈保持节俭。从节俭到奢侈很容易，从奢侈回到节俭很难。',appreciation:'第四单元日积月累。关于勤俭节约的三条名言。'},
  {title:'惜时名言',author:'',dynasty:'',type:'日积月累',content:'不饱食以终日，不弃功于寸阴。 ——葛洪\n盛年不重来，一日难再晨。及时当勉励，岁月不待人。 ——陶渊明\n莫等闲，白了少年头，空悲切。 ——岳飞',translation:'不要整天吃饱了无所事事，不要浪费一寸光阴。壮年不会重来，一天不会有两个早晨。应当及时勉励自己，岁月不等人。不要虚度光阴，等头发白了才空自悲伤。',appreciation:'第七单元日积月累。关于珍惜时间的三条名言。"莫等闲"出自岳飞《满江红》。'},

  // ===== 课文必背段落 =====
  {title:'白鹭（节选）',author:'郭沫若',dynasty:'',type:'课文',content:'在清水田里，时有一只两只白鹭站着钓鱼，整个的田便成了一幅嵌在琉璃框里的画面。田的大小好像是有心人为白鹭设计出的镜匣。\n\n晴天的清晨，每每看见它孤独地站立于小树的绝顶，看来像是不安稳，而它却很悠然。这是别的鸟很难表现的一种嗜好。人们说它是在望哨，可它真是在望哨吗？\n\n黄昏的空中偶见白鹭的低飞，更是乡居生活中的一种恩惠。那是清澄的形象化，而且具有了生命了。',translation:'重点背诵第6-8自然段：描写白鹭在清水田钓鱼、小树顶瞭望、黄昏低飞三个画面，展现白鹭的美。',appreciation:'郭沫若的散文名篇。运用比喻手法，将白鹭比作"精巧的诗"。"琉璃框"比喻清澈的水田。注意"瞭望""恩惠"的写法。'},
  {title:'落花生（节选）',author:'许地山',dynasty:'',type:'课文',content:'父亲说："花生的好处很多，有一样最可贵：它的果实埋在地里，不像桃子、石榴、苹果那样，把鲜红嫩绿的果实高高地挂在枝头上，使人一见就生爱慕之心。你们看它矮矮地长在地上，等到成熟了，也不能立刻分辨出来它有没有果实，必须挖起来才知道。"\n\n我们都说是，母亲也点点头。\n\n父亲接下去说："所以你们要像花生，它虽然不好看，可是很有用。"\n\n我说："那么，人要做有用的人，不要做只讲体面，而对别人没有好处的人。"',translation:'重点背诵第10-13自然段。父亲用花生做比喻，教育孩子做人要做有用的人，不要只追求外表好看。',appreciation:'借物喻人的写作手法。花生朴实无华却有用，启发我们做人也应如此。"爱慕"的"慕"下部是"小"+"⺗"（心字底变形），不要写错。'},
  {title:'少年中国说（节选）',author:'梁启超',dynasty:'',type:'课文',content:'故今日之责任，不在他人，而全在我少年。少年智则国智，少年富则国富；少年强则国强，少年独立则国独立；少年自由则国自由；少年进步则国进步；少年胜于欧洲则国胜于欧洲；少年雄于地球则国雄于地球。\n\n红日初升，其道大光。河出伏流，一泻汪洋。潜龙腾渊，鳞爪飞扬。乳虎啸谷，百兽震惶。鹰隼试翼，风尘翕张。奇花初胎，矞矞皇皇。干将发硎，有作其芒。天戴其苍，地履其黄。纵有千古，横有八荒。前途似海，来日方长。\n\n美哉，我少年中国，与天不老！壮哉，我中国少年，与国无疆！',translation:'所以今天的责任不在别人，全在我们少年。少年智慧国家就智慧，少年富强国家就富强……多么美好啊，我少年中国与天不老！多么壮丽啊，我中国少年与国家一样万寿无疆！',appreciation:'梁启超的经典名篇。运用排比、比喻手法，气势磅礴。"隼"读sǔn，"翕"读xī，"矞"读yù，"硎"读xíng。'},
  {title:'四季之美（节选）',author:'清少纳言',dynasty:'',type:'课文',content:'春天最美是黎明。东方一点儿一点儿泛着鱼肚色的天空，染上微微的红晕，飘着红紫红紫的彩云。\n\n夏天最美是夜晚。明亮的月夜固然美，漆黑漆黑的暗夜，也有无数的萤火虫翩翩飞舞。即使是蒙蒙细雨的夜晚，也有一只两只萤火虫，闪着朦胧的微光在飞行，这情景着实迷人。',translation:'春天最美的是黎明，东方天空泛起鱼肚白，染上红晕。夏天最美的是夜晚，萤火虫在暗夜中翩翩飞舞，着实迷人。',appreciation:'日本作家清少纳言的散文。细腻的观察力和优美的描写。"红晕"的"晕"读yùn。"着实"读zhuóshí。'},
  {title:'古人谈读书',author:'朱熹等',dynasty:'',type:'课文',content:'余尝谓读书有三到，谓心到、眼到、口到。心不在此，则眼不看仔细，心眼既不专一，却只漫浪诵读，决不能记，记亦不能久也。三到之中，心到最急。心既到矣，眼口岂不到乎？',translation:'我曾经说读书有三到，就是心到、眼到、口到。心不在这里，眼睛就看不仔细。心和眼不专一，只是随便朗读，一定记不住，记住了也不能持久。三到之中，心到最重要。心到了，眼和口怎么会不到呢？',appreciation:'朱熹论读书方法。强调读书要专心致志。"漫浪"指随意、不认真。"岂"表示反问，相当于"怎么"。'}
];

function getDailyRecite() {
  const today = todayStr();
  const seed = parseInt(today.split('-').join(''));
  return RECITE_BANK[Math.abs(seed * 7 + seed % 3) % RECITE_BANK.length];
}
function getDailyPuzzle() {
  const seed = parseInt(todayStr().split('-').join(''));
  return MATH_PUZZLE_BANK[Math.abs(seed * 11 + seed % 5) % MATH_PUZZLE_BANK.length];
}
function getDailyLifeMath() {
  const seed = parseInt(todayStr().split('-').join(''));
  return LIFE_MATH_BANK[Math.abs(seed * 13 + seed % 7) % LIFE_MATH_BANK.length];
}
function getDailyFunMath() {
  const seed = parseInt(todayStr().split('-').join(''));
  return FUN_MATH_BANK[Math.abs(seed * 17 + seed % 11) % FUN_MATH_BANK.length];
}
function getDailyWords() {
  const seed = parseInt(todayStr().split('-').join(''));
  const result = []; const used = new Set();
  for (let i = 0; i < 5; i++) {
    const idx = Math.abs((seed + i * 7 + i * i) % WORD_BANK.length);
    if (!used.has(idx)) { result.push(WORD_BANK[idx]); used.add(idx); }
  }
  let j = 0;
  while (result.length < 5 && j < WORD_BANK.length) {
    if (!used.has(j)) { result.push(WORD_BANK[j]); used.add(j); }
    j++;
  }
  return result.slice(0, 5);
}
function speakWord(word) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US'; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

// ===== 默认数据 =====
const DEFAULT_DATA = {
  habits: {
    chinese: [
      {id:'poetry',name:'每日背诵',icon:'📜',type:'recite',stars:3,note:'每天背诵五上必背内容',records:[]},
      {id:'reading_comp',name:'每日阅读',icon:'🎙️',type:'record',stars:2,note:'朗读一篇短文并录音，录音完即打卡成功',records:[]},
    ],
    math: [
      {id:'calculation',name:'计算练习',icon:'📸',type:'photo',stars:2,note:'拍照当日的计算练习上传，上传成功即打卡',records:[]},
      {id:'puzzle',name:'思维拓展题',icon:'🧩',type:'puzzle',stars:3,note:'每天1道浅奥思维题',records:[]},
      {id:'life_math',name:'生活中的数学',icon:'🏠',type:'life_math',stars:2,note:'购物算折扣、测量面积等',records:[]},
      {id:'fun_math',name:'趣味数学',icon:'🎮',type:'fun_math',stars:2,note:'24点、数独、数学谜题',records:[]}
    ],
    english: [
      {id:'words',name:'背单词+跟读',icon:'🔤',type:'words',stars:3,note:'每天5个单词+课文跟读',records:[]}
    ],
    sport: [
      {id:'jump_rope',name:'跳绳',icon:'🏃',type:'timer',timer:30,stars:2,note:'跳绳30分钟',records:[]}
    ],
    habits_good: [
      {id:'clean_room',name:'整理房间',icon:'🛏️',type:'photo',stars:2,note:'拍照上传整理后的房间，打卡',records:[]},
      {id:'housework',name:'帮助家务',icon:'🧹',type:'photo',stars:2,note:'拍照上传做家务的照片，打卡',records:[]}
    ]
  },
  rewards: [
    {id:'r1',icon:'🍦',name:'吃冰淇淋',cost:15},
    {id:'r2',icon:'📺',name:'看电视30分钟',cost:20},
    {id:'r3',icon:'📚',name:'购物奖励',cost:50},
    {id:'r4',icon:'🎮',name:'自由玩耍1小时',cost:30},
    {id:'r5',icon:'🎢',name:'去游乐园',cost:100}
  ],
  rewardHistory: [],
  totalStars: 0
};

// ===== 数据管理 =====
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const data = JSON.parse(raw);
    if (!data.habits) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    return data;
  } catch(e) { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}
function saveData() { localStorage.setItem(STORAGE_KEY, JSON.stringify(appData)); }
let appData = loadData();

// ===== 日期工具 =====
function todayStr() { return formatDate(new Date()); }
function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function formatDateDisplay(s) { const p=s.split('-'); return `${parseInt(p[1])}月${parseInt(p[2])}日`; }
function getTodayDisplay() {
  const days=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  const d=new Date(); return `${d.getMonth()+1}月${d.getDate()}日 ${days[d.getDay()]}`;
}

function isCheckedToday(h) { return h.records.some(r=>r.date===todayStr()); }
function getAllHabits() {
  const r=[];
  for(let k in appData.habits){appData.habits[k].forEach(h=>r.push({...h,catKey:k}));}
  return r;
}
function getCatTodayDone(ck) { return appData.habits[ck].filter(h=>isCheckedToday(h)).length; }
function getMonthDays(y,m) { return new Date(y,m+1,0).getDate(); }

function calcStreak(records) {
  if (!records||!records.length) return 0;
  const dates=new Set(records.map(r=>r.date));
  let s=0; const d=new Date();
  if (!dates.has(formatDate(d))) d.setDate(d.getDate()-1);
  while (dates.has(formatDate(d))) { s++; d.setDate(d.getDate()-1); }
  return s;
}
function calcTotalStreak() {
  const habits=getAllHabits(); if(!habits.length) return 0;
  const allD=habits.map(h=>new Set(h.records.map(r=>r.date)));
  let s=0; const d=new Date();
  if(!habits.every(h=>h.records.some(r=>r.date===todayStr()))) d.setDate(d.getDate()-1);
  while(true){const ds=formatDate(d);if(allD.every(dt=>dt.has(ds))){s++;d.setDate(d.getDate()-1);}else break;}
  return s;
}

// ===== Toast & Modal =====
function showToast(msg,icon='✅') {
  const t=document.getElementById('toast');
  t.innerHTML=`<span class="toast-icon">${icon}</span>${msg}`;
  t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2000);
}
function openModal(title,body) {
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalBody').innerHTML=body;
  document.getElementById('modalOverlay').classList.add('show');
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('show'); }

// ===== 星星动画 =====
function flyStar(x,y,count) {
  for(let i=0;i<count;i++){
    setTimeout(()=>{
      const s=document.createElement('div');
      s.className='star-fly'; s.textContent='⭐';
      s.style.left=(x+Math.random()*40-20)+'px';
      s.style.top=y+'px';
      document.body.appendChild(s);
      setTimeout(()=>s.remove(),1000);
    },i*150);
  }
}

// ===== 页面状态 =====
let currentPage='home';

function openDrawer() { document.getElementById('drawerOverlay').classList.add('show'); document.getElementById('drawer').classList.add('show'); }
function closeDrawer() { document.getElementById('drawerOverlay').classList.remove('show'); document.getElementById('drawer').classList.remove('show'); }

function renderNav() {
  const dNav=document.getElementById('drawerNav');
  const catNames={chinese:'📚 语文',math:'🔢 数学',english:'📝 英语',sport:'🏃 运动',habits_good:'🌟 好习惯'};
  let html=`<button class="drawer-item ${currentPage==='home'?'active':''}" onclick="renderPage('home');closeDrawer();"><span class="drawer-icon">🏠</span> 首页</button><div class="drawer-section">分类</div>`;
  for(let k in appData.habits){
    const done=getCatTodayDone(k);
    const total=appData.habits[k].length;
    html+=`<button class="drawer-item ${currentPage==='cat_'+k?'active':''}" onclick="renderPage('cat_${k}');closeDrawer();"><span class="drawer-icon">${catNames[k].split(' ')[0]}</span> ${catNames[k].split(' ')[1]}<span class="drawer-badge">${done}/${total}</span></button>`;
  }
  html+=`<div class="drawer-divider"></div><button class="drawer-item ${currentPage==='stats'?'active':''}" onclick="renderPage('stats');closeDrawer();"><span class="drawer-icon">📊</span> 统计</button><button class="drawer-item ${currentPage==='rewards'?'active':''}" onclick="renderPage('rewards');closeDrawer();"><span class="drawer-icon">🎁</span> 奖励商店</button>`;
  dNav.innerHTML=html;
  document.getElementById('drawerStreak').textContent=calcTotalStreak();

  const bTab=document.getElementById('bottomTab');
  const tabItems=[
    {key:'home',icon:'🏠',label:'首页'},
    {key:'cat_chinese',icon:'📚',label:'语文'},
    {key:'cat_math',icon:'🔢',label:'数学'},
    {key:'cat_english',icon:'📝',label:'英语'},
    {key:'cat_sport',icon:'🏃',label:'运动'},
    {key:'cat_habits_good',icon:'🌟',label:'好习惯'},
    {key:'rewards',icon:'🎁',label:'奖励'}
  ];
  let bHtml='';
  tabItems.forEach(t=>{
    bHtml+=`<button class="tab-item ${currentPage===t.key?'active':''}" onclick="renderPage('${t.key}')"><span class="tab-icon">${t.icon}</span><span class="tab-label">${t.label}</span></button>`;
  });
  bTab.innerHTML=bHtml;
}

function renderPage(page) {
  currentPage=page;
  renderNav();
  const main=document.getElementById('mainContent');
  if(page==='home'){main.innerHTML=renderHome();}
  else if(page.startsWith('cat_')){main.innerHTML=renderCategory(page.replace('cat_',''));}
  else if(page==='stats'){main.innerHTML=renderStats();}
  else if(page==='rewards'){main.innerHTML=renderRewards();}
  main.scrollTop=0;
  document.getElementById('totalStars').textContent=appData.totalStars;
}

// ===== 首页 =====
function renderHome() {
  const habits=getAllHabits();
  const doneCount=habits.filter(h=>isCheckedToday(h)).length;
  const total=habits.length;
  const progress=total>0?Math.round(doneCount/total*100):0;
  const circumference=2*Math.PI*50;
  const dashOffset=circumference*(1-progress/100);
  const todayStars=habits.filter(h=>isCheckedToday(h)).reduce((s,h)=>s+(h.stars||1),0);
  const allDone=doneCount===total;

  let cardsHTML='';
  const catNames={chinese:'📚 语文',math:'🔢 数学',english:'📝 英语',sport:'🏃 运动',habits_good:'🌟 好习惯'};
  for(let k in appData.habits){
    const cat=appData.habits[k];
    const done=getCatTodayDone(k);
    cardsHTML+=`<div class="card" style="padding:14px 16px;"><div class="cat-header">${catNames[k]}<span class="cat-progress">${done}/${cat.length}</span></div>`;
    cat.forEach(h=>{
      const done=isCheckedToday(h);
      let meta='';
      if(h.type==='recite'){meta=getDailyRecite().title;}
      else if(h.type==='puzzle'){meta=getDailyPuzzle().type;}
      else if(h.type==='life_math'){meta=getDailyLifeMath().title;}
      else if(h.type==='fun_math'){meta=getDailyFunMath().type;}
      else if(h.type==='words'){meta='每天5个新单词';}
      else meta=h.note||'';
      cardsHTML+=`<div class="habit-card ${done?'done':''}" onclick="openHabitDetail('${k}','${h.id}')"><div class="habit-icon cat-${k==='english'?'english':(k==='sport'?'sport':(k==='habits_good'?'habits_good':k))}">${h.icon}</div><div class="habit-info"><div class="habit-name">${h.name}</div><div class="habit-meta">${meta}</div></div><div class="habit-status ${done?'done':''}">${done?'✓':''}</div>${done?'':`<div class="habit-star">+${h.stars||1}⭐</div>`}</div>`;
    });
    cardsHTML+='</div>';
  }

  // 当月日历
  let calHTML=renderHomeCalendar();

  return `<div class="hero-card">
    <div class="hero-date">${getTodayDisplay()}</div>
    ${calHTML}
    <div class="hero-stars-row">
      <div class="hero-star-item"><div class="hero-star-num">${todayStars}</div><div class="hero-star-label">今日星星</div></div>
      <div class="hero-star-item"><div class="hero-star-num">${appData.totalStars}</div><div class="hero-star-label">累计星星</div></div>
      <div class="hero-star-item"><div class="hero-star-num">${calcTotalStreak()}</div><div class="hero-star-label">全勤天数</div></div>
    </div>
    ${allDone&&doneCount>0?'<div style="margin-top:12px;font-size:16px;position:relative;z-index:1;">🎉 今天全部完成啦！太棒了！</div>':''}
  </div>${cardsHTML}`;
}

// ===== 首页月历 =====
function renderHomeCalendar() {
  const now=new Date(); const y=now.getFullYear(),m=now.getMonth();
  const dim=getMonthDays(y,m); const fd=new Date(y,m,1).getDay()||7;
  const today=todayStr();
  const habits=getAllHabits();
  // 收集所有打卡日期
  const allDates={};
  habits.forEach(h=>{
    h.records.forEach(r=>{allDates[r.date]=(allDates[r.date]||0)+1;});
  });
  const maxCount=Math.max(1,...Object.values(allDates));
  const wh=['一','二','三','四','五','六','日'];
  let h='<div class="home-calendar">';
  h+='<div class="home-cal-header">'+wh.map(d=>`<span>${d}</span>`).join('')+'</div>';
  h+='<div class="home-cal-grid">';
  for(let i=1;i<fd;i++) h+='<div class="home-cal-day empty"></div>';
  for(let d=1;d<=dim;d++){
    const ds=`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const count=allDates[ds]||0;
    const intensity=count>0?Math.min(1,0.3+(count/maxCount)*0.7):0;
    let cls='home-cal-day';
    if(count>0) cls+=' has-checkin';
    if(ds===today) cls+=' today';
    const bg=count>0?`rgba(126,217,87,${intensity})`:'rgba(255,255,255,0.15)';
    h+=`<div class="${cls}" style="background:${bg}"><span>${d}</span></div>`;
  }
  h+='</div></div>';
  return h;
}

// ===== 分类页 =====
function renderCategory(catKey) {
  const cat=appData.habits[catKey];
  const catNames={chinese:'📚 语文',math:'🔢 数学',english:'📝 英语',sport:'🏃 运动',habits_good:'🌟 好习惯'};
  let html='';
  cat.forEach(h=>{
    const done=isCheckedToday(h);
    let extra='';
    if(h.type==='recite'){
      const p=getDailyRecite();
      extra=`<div style="font-size:12px;color:var(--text-light);margin-top:4px;">今日：${p.title} · ${p.author}</div>`;
    } else if(h.type==='puzzle'){
      const pz=getDailyPuzzle();
      extra=`<div style="font-size:12px;color:var(--text-light);margin-top:4px;">今日：${pz.type}</div>`;
    } else if(h.type==='life_math'){
      const lm=getDailyLifeMath();
      extra=`<div style="font-size:12px;color:var(--text-light);margin-top:4px;">今日：${lm.title}</div>`;
    } else if(h.type==='fun_math'){
      const fm=getDailyFunMath();
      extra=`<div style="font-size:12px;color:var(--text-light);margin-top:4px;">今日：${fm.type}</div>`;
    }
    html+=`<div class="habit-card ${done?'done':''}" onclick="openHabitDetail('${catKey}','${h.id}')"><div class="habit-icon cat-${catKey==='english_sport'?'english':catKey}">${h.icon}</div><div class="habit-info"><div class="habit-name">${h.name}</div><div class="habit-meta">${h.note||''}</div>${extra}</div><div class="habit-status ${done?'done':''}">${done?'✓':''}</div></div>`;
  });
  return `<div class="card"><div class="card-title">${catNames[catKey]}</div><div class="card-subtitle">共${cat.length}项 · 今天完成${getCatTodayDone(catKey)}项</div>${html}</div>`;
}

// ===== 详情页 =====
function openHabitDetail(catKey,habitId) {
  const h=appData.habits[catKey].find(h=>h.id===habitId); if(!h) return;
  const done=isCheckedToday(h);
  const streak=calcStreak(h.records);
  // 记录当前打开的打卡项（用于录音打卡等需要跨步骤提交的场景）
  pendingRecordCat=catKey; pendingRecordId=habitId;

  let contentHTML='';

  if(h.type==='recite'){
    const p=getDailyRecite();
    const typeLabel=p.type||'古诗';
    const typeColor=p.type==='课文'?'var(--primary)':(p.type==='日积月累'?'var(--star)':'var(--accent)');
    const authorLine=p.author?`【${p.dynasty||''}】${p.author}`:'';
    contentHTML=`<div class="poetry-card">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="display:inline-block;background:${typeColor};color:#fff;font-size:11px;font-weight:600;padding:2px 10px;border-radius:10px;">${typeLabel}</span>
      </div>
      <div class="poetry-title">${p.title}</div>
      ${authorLine?`<div class="poetry-author">${authorLine}</div>`:''}
      <div class="poetry-content">${p.content.replace(/\\n/g,'<br>')}</div>
      <div class="poetry-section-label">📖 译文/说明</div>
      <div class="poetry-translation">${p.translation}</div>
      <div class="poetry-section-label">💡 重点提示</div>
      <div class="poetry-translation">${p.appreciation}</div>
    </div>`;
  } else if(h.type==='puzzle'){
    const pz=getDailyPuzzle();
    contentHTML=`<div class="puzzle-card">
      <div class="puzzle-type">${pz.type}</div>
      <div class="puzzle-question">${pz.question}</div>
      <button class="puzzle-answer-toggle" onclick="document.getElementById('puzzleAns').classList.toggle('show')">查看答案</button>
      <div class="puzzle-answer" id="puzzleAns">
        <div class="puzzle-answer-text"><b>答案：</b>${pz.answer}</div>
        <div class="puzzle-steps"><b>解题步骤：</b>\n${pz.steps}</div>
      </div>
    </div>`;
  } else if(h.type==='life_math'){
    const lm=getDailyLifeMath();
    contentHTML=`<div class="puzzle-card">
      <div class="puzzle-type">🏠 ${lm.title}</div>
      <div class="puzzle-question">${lm.task}</div>
      <div style="font-size:13px;color:var(--text-secondary);background:rgba(74,144,217,0.06);padding:10px;border-radius:10px;margin-top:8px;">💡 提示：${lm.hint}</div>
    </div>`;
  } else if(h.type==='fun_math'){
    const fm=getDailyFunMath();
    contentHTML=`<div class="puzzle-card">
      <div class="puzzle-type">🎮 ${fm.type}</div>
      <div class="puzzle-question">${fm.question}</div>
      <button class="puzzle-answer-toggle" onclick="document.getElementById('funAns').classList.toggle('show')">查看答案</button>
      <div class="puzzle-answer" id="funAns">
        <div class="puzzle-answer-text"><b>答案：</b>${fm.answer}</div>
        ${fm.steps?`<div class="puzzle-steps"><b>解析：</b>\n${fm.steps}</div>`:''}
      </div>
    </div>`;
  } else if(h.type==='words'){
    const words=getDailyWords();
    contentHTML=`<div style="font-size:14px;font-weight:600;margin-bottom:10px;">📌 今日5个单词</div>`;
    words.forEach((w,i)=>{
      contentHTML+=`<div class="word-card"><div class="word-num">${i+1}.</div><div class="word-content"><div class="word-spelling">${w.word}</div><div class="word-detail">${w.phonetic} ${w.meaning}<br><span style="color:var(--text-light);">${w.example}</span></div></div><button class="word-speak" onclick="speakWord('${w.word}')">🔊</button></div>`;
    });
  } else if(h.type==='timer'){
    contentHTML=`<div style="text-align:center;padding:20px;"><div style="font-size:48px;margin-bottom:8px;">⏱️</div><div style="font-size:16px;color:var(--text-secondary);">建议时长：${h.timer}分钟</div></div>`;
  } else if(h.type==='record'){
    contentHTML=`<div style="text-align:center;padding:20px 0;">
      <div style="font-size:56px;margin-bottom:12px;">🎙️</div>
      <div style="font-size:15px;color:var(--text-secondary);margin-bottom:16px;">朗读完成后点击下方按钮录音</div>
      <button id="recordBtn" class="checkin-btn" style="background:linear-gradient(135deg,#FF5252,#E53935);box-shadow:0 4px 0 #C62828;" onclick="startRecording()">🔴 开始录音</button>
      <div id="recordingStatus" style="display:none;margin-top:14px;padding:12px;background:rgba(255,82,82,0.08);border-radius:12px;">
        <div style="color:#FF5252;font-weight:600;">🔴 正在录音中...</div>
        <div id="recordTimer" style="font-size:28px;font-weight:800;color:#FF5252;margin:8px 0;">00:00</div>
        <button class="checkin-btn" style="background:linear-gradient(135deg,#4A90D9,#2E6FB5);box-shadow:0 4px 0 #1A5A9E;" onclick="stopRecording()">⏹️ 停止录音并打卡</button>
      </div>
      <audio id="recordAudio" style="display:none;"></audio>
    </div>`;
  } else if(h.type==='photo'){
    contentHTML=`<div style="text-align:center;padding:20px 0;">
      <div style="font-size:56px;margin-bottom:12px;">📸</div>
      <div style="font-size:15px;color:var(--text-secondary);margin-bottom:16px;">拍照上传当日的计算练习</div>
      <input type="file" id="photoInput" accept="image/*" capture="environment" style="display:none;" onchange="handlePhotoUpload()">
      <button class="checkin-btn" style="background:linear-gradient(135deg,#4A90D9,#2E6FB5);box-shadow:0 4px 0 #1A5A9E;" onclick="document.getElementById('photoInput').click()">📷 拍照上传</button>
      <div id="photoPreview" style="display:none;margin-top:14px;">
        <img id="photoImg" style="max-width:100%;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
        <div style="margin-top:10px;color:var(--accent);font-weight:600;">✅ 上传成功！</div>
        <button class="checkin-btn" style="background:linear-gradient(135deg,var(--accent),var(--accent-dark));box-shadow:0 4px 0 var(--accent-dark);" onclick="submitPhotoCheckin()">✅ 打卡成功</button>
      </div>
    </div>`;
  } else {
    contentHTML=`<div style="font-size:14px;color:var(--text-secondary);padding:10px 0;">${h.note||''}</div>`;
  }

  // 统计
  let statsHTML=`<div style="display:flex;justify-content:space-around;margin-bottom:16px;padding-bottom:12px;border-bottom:1px dashed var(--border);"><div style="text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--primary);">${streak}</div><div style="font-size:11px;color:var(--text-secondary);">连续天数</div></div><div style="text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--primary);">${h.records.length}</div><div style="font-size:11px;color:var(--text-secondary);">累计次数</div></div><div style="text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--star);">${h.stars}⭐</div><div style="font-size:11px;color:var(--text-secondary);">每次奖励</div></div></div>`;

  const btnHTML=done
    ? `<button class="checkin-btn done">✓ 今日已完成</button>`
    : (h.type==='record' ? '' : `<button class="checkin-btn" onclick="doCheckin('${catKey}','${habitId}',event)">✓ 完成打卡（+${h.stars}⭐）</button>`);

  openModal(`${h.icon} ${h.name}`, statsHTML + contentHTML + btnHTML);
}

// ===== 录音功能 =====
let mediaRecorder=null,recordChunks=[],recordTimer=null,recordSeconds=0;

function startRecording() {
  navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
    mediaRecorder=new MediaRecorder(stream);
    recordChunks=[];
    mediaRecorder.ondataavailable=e=>recordChunks.push(e.data);
    mediaRecorder.onstop=()=>{
      const blob=new Blob(recordChunks,{type:'audio/webm'});
      const url=URL.createObjectURL(blob);
      const audio=document.getElementById('recordAudio');
      audio.src=url; audio.style.display='block';
      document.getElementById('recordingStatus').innerHTML=`<div style="color:var(--accent);font-weight:600;">✅ 录音完成！</div><div style="margin-top:8px;font-size:13px;color:var(--text-secondary);">时长 ${formatRecordTime(recordSeconds)}</div><button class="checkin-btn" style="background:linear-gradient(135deg,var(--accent),var(--accent-dark));box-shadow:0 4px 0 var(--accent-dark);" onclick="submitRecordCheckin()">✅ 打卡成功</button>`;
      stream.getTracks().forEach(t=>t.stop());
    };
    mediaRecorder.start();
    document.getElementById('recordBtn').style.display='none';
    document.getElementById('recordingStatus').style.display='block';
    recordSeconds=0;
    document.getElementById('recordTimer').textContent='00:00';
    recordTimer=setInterval(()=>{
      recordSeconds++;
      document.getElementById('recordTimer').textContent=formatRecordTime(recordSeconds);
    },1000);
  }).catch(()=>{
    showToast('无法访问麦克风，请检查权限','⚠️');
  });
}

function stopRecording() {
  if(mediaRecorder&&mediaRecorder.state==='recording'){
    mediaRecorder.stop(); clearInterval(recordTimer);
  }
}

function formatRecordTime(s){
  const m=Math.floor(s/60),sec=s%60;
  return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');
}

let pendingRecordCat=null,pendingRecordId=null;

function submitRecordCheckin() {
  if(pendingRecordCat&&pendingRecordId){
    doCheckin(pendingRecordCat,pendingRecordId);
    pendingRecordCat=null;pendingRecordId=null;
  }
}

// ===== 拍照功能 =====
function handlePhotoUpload() {
  const file=document.getElementById('photoInput').files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=function(e){
    document.getElementById('photoImg').src=e.target.result;
    document.getElementById('photoPreview').style.display='block';
  };
  reader.readAsDataURL(file);
}

function submitPhotoCheckin() {
  if(pendingRecordCat&&pendingRecordId){
    doCheckin(pendingRecordCat,pendingRecordId);
    pendingRecordCat=null;pendingRecordId=null;
  }
}

// ===== 打卡操作 =====
function doCheckin(catKey,habitId,e) {
  const h=appData.habits[catKey].find(h=>h.id===habitId);
  if(isCheckedToday(h)){showToast('今天已经打卡啦！','😊');return;}
  const r={date:todayStr()};
  if(h.type==='words'){r.words=getDailyWords().map(w=>w.word);}
  if(h.type==='timer'){r.minutes=h.timer;}
  h.records.push(r);
  appData.totalStars+=(h.stars||1);
  // 检查全勤
  const allHabits=getAllHabits();
  const allDone=allHabits.every(hb=>isCheckedToday(hb));
  let bonus='';
  if(allDone){
    appData.totalStars+=5;
    bonus=' + 全勤奖励5⭐';
  }
  saveData();
  if(e){flyStar(e.clientX,e.clientY,h.stars||1);}
  showToast(`打卡成功！+${h.stars}⭐${bonus}（累计${appData.totalStars}⭐）`,'🎉');
  document.getElementById('totalStars').textContent=appData.totalStars;
  openHabitDetail(catKey,habitId);
  renderNav();
}

// ===== 奖励页 =====
function renderRewards() {
  let rewardsHTML='';
  appData.rewards.forEach(r=>{
    const canAfford=appData.totalStars>=r.cost;
    rewardsHTML+=`<div class="reward-card"><div class="reward-icon">${r.icon}</div><div class="reward-info"><div class="reward-name">${r.name}</div><div class="reward-cost">${r.cost} ⭐</div></div><button class="reward-btn ${canAfford?'':'disabled'}" ${canAfford?`onclick="redeemReward('${r.id}')"`:'disabled'}>${canAfford?'兑换':'星星不足'}</button></div>`;
  });

  let historyHTML='';
  if(appData.rewardHistory.length){
    const recent=appData.rewardHistory.slice(-5).reverse();
    historyHTML='<div class="card"><div class="card-title">📋 兑换记录</div><ul class="history-list">';
    recent.forEach(r=>{
      historyHTML+=`<li class="history-item"><div class="history-date">${formatDateDisplay(r.date)}</div><div class="history-detail">${r.icon} ${r.name}</div><div class="history-value">-${r.cost}⭐</div></li>`;
    });
    historyHTML+='</ul></div>';
  }

  return `<div class="stars-display"><div class="stars-big">${appData.totalStars} ⭐</div><div class="stars-label">我的星星</div></div>
  <div class="card"><div class="card-title">🎁 奖励商店</div>${rewardsHTML}<button class="checkin-btn" style="background:linear-gradient(135deg,var(--accent),var(--accent-dark));box-shadow:0 4px 0 var(--accent-dark);margin-top:14px;" onclick="openAddReward()">➕ 添加自定义奖励</button></div>
  ${historyHTML}`;
}

function redeemReward(rewardId) {
  const r=appData.rewards.find(r=>r.id===rewardId); if(!r) return;
  if(appData.totalStars<r.cost){showToast('星星不够哦，继续加油！','💪');return;}
  openModal('🎁 确认兑换',`<div style="text-align:center;padding:20px 0;"><div style="font-size:48px;margin-bottom:12px;">${r.icon}</div><div style="font-size:18px;font-weight:700;margin-bottom:8px;">${r.name}</div><div style="font-size:15px;color:var(--star);">消耗 ${r.cost} ⭐</div><div style="font-size:13px;color:var(--text-secondary);margin-top:8px;">兑换后剩余 ${appData.totalStars-r.cost} ⭐</div></div><button class="checkin-btn" onclick="confirmRedeem('${rewardId}')">确认兑换</button><button class="checkin-btn" style="background:var(--text-light);box-shadow:none;margin-top:8px;" onclick="closeModal()">取消</button>`);
}
function confirmRedeem(rewardId) {
  const r=appData.rewards.find(r=>r.id===rewardId);
  appData.totalStars-=r.cost;
  appData.rewardHistory.push({date:todayStr(),rewardId:r.id,name:r.name,icon:r.icon,cost:r.cost});
  saveData(); closeModal();
  showToast(`兑换成功！${r.icon} ${r.name}`,'🎁');
  renderPage('rewards'); renderNav();
}

function openAddReward() {
  openModal('➕ 添加奖励',`
    <div class="form-group"><label class="form-label">奖励名称</label><input type="text" class="form-input" id="newRewardName" placeholder="如：去吃肯德基"></div>
    <div class="form-group"><label class="form-label">图标（emoji）</label><input type="text" class="form-input" id="newRewardIcon" value="🎁" maxlength="4"></div>
    <div class="form-group"><label class="form-label">需要星星数</label><input type="number" class="form-input" id="newRewardCost" placeholder="如 30" min="1" value="30"></div>
    <button class="checkin-btn" onclick="addReward()">添加</button>
  `);
}
function addReward() {
  const name=document.getElementById('newRewardName').value.trim();
  const icon=document.getElementById('newRewardIcon').value.trim()||'🎁';
  const cost=parseInt(document.getElementById('newRewardCost').value)||30;
  if(!name){showToast('请输入奖励名称','⚠️');return;}
  appData.rewards.push({id:'r_'+Date.now(),icon,name,cost});
  saveData(); closeModal(); showToast('奖励已添加','✅');
  renderPage('rewards');
}

// ===== 统计页 =====
function renderStats() {
  const habits=getAllHabits();
  const total=habits.length;
  const totalDone=habits.filter(h=>isCheckedToday(h)).length;
  const totalRecords=habits.reduce((s,h)=>s+h.records.length,0);
  const totalStreak=calcTotalStreak();

  // 本周完成率
  const now=new Date();
  let weekDone=0,weekTotal=0;
  for(let i=0;i<7;i++){
    const d=new Date(now); d.setDate(d.getDate()-i);
    const ds=formatDate(d);
    habits.forEach(h=>{
      weekTotal++;
      if(h.records.some(r=>r.date===ds)) weekDone++;
    });
  }
  const weekRate=weekTotal>0?Math.round(weekDone/weekTotal*100):0;

  const catNames={chinese:'📚 语文',math:'🔢 数学',english:'📝 英语',sport:'🏃 运动',habits_good:'🌟 好习惯'};
  let catHTML='';
  for(let k in appData.habits){
    const cat=appData.habits[k];
    catHTML+=`<div class="card"><div class="card-title">${catNames[k]}</div>`;
    cat.forEach(h=>{
      const streak=calcStreak(h.records);
      catHTML+=`<div class="goal-row"><span class="goal-label">${h.icon} ${h.name}</span><span class="goal-value">${streak}天 · ${h.records.length}次</span></div>`;
    });
    catHTML+='</div>';
  }

  return `<div class="card"><div class="card-title">📊 总览</div><div class="stat-grid">
    <div class="stat-item"><div class="stat-value">${totalStreak}</div><div class="stat-label">全勤天数</div></div>
    <div class="stat-item"><div class="stat-value">${weekRate}%</div><div class="stat-label">本周完成率</div></div>
    <div class="stat-item"><div class="stat-value">${totalDone}/${total}</div><div class="stat-label">今日完成</div></div>
    <div class="stat-item"><div class="stat-value">${totalRecords}</div><div class="stat-label">累计打卡</div></div>
  </div></div>${catHTML}`;
}

// ===== 事件绑定 =====
document.getElementById('menuBtn').addEventListener('click', openDrawer);
document.getElementById('drawerClose').addEventListener('click', closeDrawer);
document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click',e=>{if(e.target.id==='modalOverlay')closeModal();});

// ===== 初始化 =====
renderPage('home');
