/* ========================================
 * 暑假工作台 · 四升五
 * 架构：分类(chinese/math/english/sport) → 多个打卡项
 * 数据存储：localStorage
 * ======================================== */

const STORAGE_KEY = 'summer_study_v1';

// ===== 古诗库（30首） =====
const POETRY_BANK = [
  {title:'静夜思',author:'李白',dynasty:'唐',content:'床前明月光，\n疑是地上霜。\n举头望明月，\n低头思故乡。',translation:'明亮的月光洒在床前，迷蒙中以为是地上的秋霜。抬起头望着明月，低下头思念故乡。',appreciation:'这首诗写的是游子思乡之情，用极其朴素的语言表达了人人共有的情怀。'},
  {title:'春晓',author:'孟浩然',dynasty:'唐',content:'春眠不觉晓，\n处处闻啼鸟。\n夜来风雨声，\n花落知多少。',translation:'春天的夜晚睡得香甜，不知不觉天就亮了。醒来时到处听到鸟儿的叫声。想起昨夜的风雨声，不知花儿落了多少。',appreciation:'诗人用自然平淡的语言，写出了春日的美好和对花开花落的关切。'},
  {title:'望庐山瀑布',author:'李白',dynasty:'唐',content:'日照香炉生紫烟，\n遥看瀑布挂前川。\n飞流直下三千尺，\n疑是银河落九天。',translation:'太阳照射的香炉峰升起紫色烟雾，远远望去瀑布像白绢挂在山前。飞腾的水流直冲而下三千尺，仿佛是银河从九天倾泻而下。',appreciation:'用夸张的手法描绘庐山瀑布的壮美，体现了李白诗歌豪放飘逸的风格。'},
  {title:'山行',author:'杜牧',dynasty:'唐',content:'远上寒山石径斜，\n白云生处有人家。\n停车坐爱枫林晚，\n霜叶红于二月花。',translation:'沿着弯曲的石路远远登上寒山，白云升起的地方有人家居住。停下车是因为喜爱傍晚的枫林，经霜的枫叶比二月的春花还要红艳。',appreciation:'描绘了一幅动人的山林秋色图，"霜叶红于二月花"是千古名句。'},
  {title:'登鹳雀楼',author:'王之涣',dynasty:'唐',content:'白日依山尽，\n黄河入海流。\n欲穷千里目，\n更上一层楼。',translation:'太阳依着群山缓缓落下，黄河水滚滚流入大海。想要看到千里之外的景色，就要再登上一层楼。',appreciation:'诗中蕴含"站得高才能看得远"的哲理，激励人们不断进取。'},
  {title:'江雪',author:'柳宗元',dynasty:'唐',content:'千山鸟飞绝，\n万径人踪灭。\n孤舟蓑笠翁，\n独钓寒江雪。',translation:'千山之中飞鸟绝迹，万条路上人迹消失。一只孤舟上穿着蓑衣的老翁，独自在寒江的雪中垂钓。',appreciation:'描绘了一幅幽静寒冷的画面，表现了诗人孤高不屈的品格。'},
  {title:'咏鹅',author:'骆宾王',dynasty:'唐',content:'鹅，鹅，鹅，\n曲项向天歌。\n白毛浮绿水，\n红掌拨清波。',translation:'鹅啊鹅，弯曲着脖子向天歌唱。洁白的羽毛浮在绿水上，红色的脚掌拨动着清波。',appreciation:'相传为骆宾王七岁所作，用儿童的眼光生动描写了鹅的形态。'},
  {title:'悯农',author:'李绅',dynasty:'唐',content:'锄禾日当午，\n汗滴禾下土。\n谁知盘中餐，\n粒粒皆辛苦。',translation:'农民在正午烈日下锄禾，汗水滴落在禾苗下的泥土里。谁知道盘中的饭食，每一粒都是辛苦劳动得来的。',appreciation:'告诫人们���珍惜粮食，体会劳动的艰辛。'},
  {title:'草',author:'白居易',dynasty:'唐',content:'离离原上草，\n一岁一枯荣。\n野火烧不尽，\n春风吹又生。',translation:'原野上的草茂盛地生长，每年枯萎又繁荣。野火无法将它烧尽，春风一吹它又生长出来。',appreciation:'赞美了野草顽强的生命力，也象征着坚韧不拔的精神。'},
  {title:'池上',author:'白居易',dynasty:'唐',content:'小娃撑小艇，\n偷采白莲回。\n不解藏踪迹，\n浮萍一道开。',translation:'小孩撑着小船，偷偷采了白莲回来。不懂得隐藏踪迹，水面上的浮萍被船划开了一道痕迹。',appreciation:'描写了一个天真可爱的小娃偷采莲蓬的情景，充满童趣。'},
  {title:'望天门山',author:'李白',dynasty:'唐',content:'天门中断楚江开，\n碧水东流至此回。\n两岸青山相对出，\n孤帆一片日边来。',translation:'天门山被长江从中断开，碧绿的江水东流到此回旋。两岸的青山相对而出，一片孤帆从日边驶来。',appreciation:'描绘了天门山的雄伟和长江的壮阔，展现了大自然的壮美。'},
  {title:'饮湖上初晴后雨',author:'苏轼',dynasty:'宋',content:'水光潋滟晴方好，\n山色空蒙雨亦奇。\n欲把西湖比西子，\n淡妆浓抹总相宜。',translation:'晴天时水面波光闪动多么美好，雨天时山色朦胧也很奇妙。如果把西湖比作西施，淡妆浓抹都很美丽。',appreciation:'将西湖比作美女西施，写出了西湖不论晴雨都美的特点。'},
  {title:'绝句',author:'杜甫',dynasty:'唐',content:'两个黄鹂鸣翠柳，\n一行白鹭上青天。\n窗含西岭千秋雪，\n门泊东吴万里船。',translation:'两只黄鹂在翠柳间鸣叫，一行白鹭飞上蓝天。窗户里映着西岭千年不化的积雪，门前停着来自东吴的万里船。',appreciation:'四句诗写了四幅画面，色彩鲜明，动静结合。'},
  {title:'春夜喜雨',author:'杜甫',dynasty:'唐',content:'好雨知时节，\n当春乃发生。\n随风潜入夜，\n润物细无声。',translation:'好雨知道下雨的时节，春天正是植物萌发的时候。它伴随着春风在夜里悄悄落下，无声地滋润着万物。',appreciation:'赞美了春雨及时而来、默默滋润万物的品格。'},
  {title:'游子吟',author:'孟郊',dynasty:'唐',content:'慈母手中线，\n游子身上衣。\n临行密密缝，\n意恐迟迟归。\n谁言寸草心，\n报得三春晖。',translation:'慈爱的母亲手中的针线，游子身上的衣服。临行前密密地缝制，担心孩子迟迟不归。谁说小草般的心意，能报答得了春天阳光般的母爱呢？',appreciation:'歌颂了伟大的母爱，表达了游子对母亲的感恩之情。'},
  {title:'黄鹤楼送孟浩然之广陵',author:'李白',dynasty:'唐',content:'故人西辞黄鹤楼，\n烟花三月下扬州。\n孤帆远影碧空尽，\n唯见长江天际流。',translation:'老朋友在黄鹤楼与我辞别，在柳絮如烟的阳春三月去扬州。孤帆的远影消失在碧空尽头，只看见长江向天边流去。',appreciation:'描写了送别友人的情景，表达了对友人的深情厚谊。'},
  {title:'鹿柴',author:'王维',dynasty:'唐',content:'空山不见人，\n但闻人语响。\n返景入深林，\n复照青苔上。',translation:'空旷的山中看不见人影，只听到人说话的声音。夕阳的余光射入深林，又照在了青苔上面。',appreciation:'以动衬静，写出了山林的幽静，体现了王维"诗中有画"的特点。'},
  {title:'早发白帝城',author:'李白',dynasty:'唐',content:'朝辞白帝彩云间，\n千里江陵一日还。\n两岸猿声啼不住，\n轻舟已过万重山。',translation:'早晨告别彩云间的白帝城，千里之外的江陵一天就到了。两岸猿猴的叫声还在回荡，轻快的小船已经穿过了万重山。',appreciation:'描写了长江三峡的壮丽景色和顺流而下船行之快。'},
  {title:'枫桥夜泊',author:'张继',dynasty:'唐',content:'月落乌啼霜满天，\n江枫渔火对愁眠。\n姑苏城外寒山寺，\n夜半钟声到客船。',translation:'月亮落下乌鸦啼叫寒霜满天，江边枫树和渔火伴着愁眠。姑苏城外的寒山寺，半夜的钟声传到了客船上。',appreciation:'描写了一个游子夜泊枫桥的所见所闻，表达了羁旅之愁。'},
  {title:'寻隐者不遇',author:'贾岛',dynasty:'唐',content:'松下问童子，\n言师采药去。\n只在此山中，\n云深不知处。',translation:'在松树下问童子，说师父采药去了。就在这座山里，可是云雾弥漫不知道在哪里。',appreciation:'用问答的形式写出了寻访隐者不遇的经过，意境深远。'},
  {title:'题西林壁',author:'苏轼',dynasty:'宋',content:'横看成岭侧成峰，\n远近高低各不同。\n不识庐山真面目，\n只缘身在此山中。',translation:'横看是山岭侧看是山峰，远近高低看到的各不相同。看不清庐山的真正面目，只因为自己就身在这座山中。',appreciation:'写景中蕴含哲理：当局者迷，旁观者清。'},
  {title:'夏日绝句',author:'李清照',dynasty:'宋',content:'生当作人杰，\n死亦为鬼雄。\n至今思项羽，\n不肯过江东。',translation:'活着要做人中的豪杰，死了也要做鬼中的英雄。至今人们还在思念项羽，因为他不肯忍辱偷生渡过江东。',appreciation:'借咏史抒发了爱国情怀，表现了诗人刚强的性格。'},
  {title:'示儿',author:'陆游',dynasty:'宋',content:'死去元知万事空，\n但悲不见九州同。\n王师北定中原日，\n家祭无忘告乃翁。',translation:'人死后原本知道万事皆空，只是悲叹看不到国家统一。当宋朝军队收复中原的那天，家祭时别忘了告诉你的父亲。',appreciation:'这是陆游的绝笔诗，表达了他至死不忘国家统一的爱国之情。'},
  {title:'元日',author:'王安石',dynasty:'宋',content:'爆竹声中一岁除，\n春风送暖入屠苏。\n千门万户曈曈日，\n总把新桃换旧符。',translation:'爆竹声中旧的一年过去了，春风把暖意送进了屠苏酒。千门万户沐浴着初升的太阳，总是用新的桃符换下旧的桃符。',appreciation:'描写了春节的热闹景象，表达了辞旧迎新的喜悦。'},
  {title:'泊船瓜洲',author:'王安石',dynasty:'宋',content:'京口瓜洲一水间，\n钟山只隔数重山。\n春风又绿江南岸，\n明月何时照我还。',translation:'京口和瓜洲只隔一条江，钟山也只隔着几重山。春风又吹绿了江南的岸边，明月什么时候照着我回家呢？',appreciation:'"春风又绿江南岸"中的"绿"字用得极为精妙，表达了思��之情。'},
  {title:'小池',author:'杨万里',dynasty:'宋',content:'泉眼无声惜细流，\n树阴照水爱晴柔。\n小荷才露尖尖角，\n早有蜻蜓立上头。',translation:'泉眼无声地流出细流，好像很珍惜它。树阴映在水面上，好像喜爱这晴天的柔美。小荷叶刚刚露出尖尖的角，早就有蜻蜓停在上面了。',appreciation:'描写了初夏小池的生动景象，充满了生活情趣。'},
  {title:'晓出净慈寺送林子方',author:'杨万里',dynasty:'宋',content:'毕竟西湖六月中，\n风光不与四时同。\n接天莲叶无穷碧，\n映日荷花别样红。',translation:'到底是西湖的六月，风光与其他时节不同。碧绿的莲叶接天无边无际，阳光下的荷花格外红艳。',appreciation:'描绘了西湖盛夏荷花的壮美景象，色彩鲜明。'},
  {title:'村居',author:'高鼎',dynasty:'清',content:'草长莺飞二月天，\n拂堤杨柳醉春烟。\n儿童散学归来早，\n忙趁东风放纸鸢。',translation:'二月里草木生长黄莺飞翔，杨柳轻拂着堤岸好像沉醉在春烟中。孩子们放学回来得早，赶忙趁着东风放风筝。',appreciation:'描绘了春天乡村的美丽景色和儿童放风筝的欢乐情景。'},
  {title:'己亥杂诗',author:'龚自珍',dynasty:'清',content:'九州生气恃风雷，\n万马齐喑究可哀。\n我劝天公重抖擞，\n不拘一格降人才。',translation:'中国的生气勃勃要靠风雷般的变革，万马齐喑的局面实在可悲。我劝老天爷重新振作精神，不要拘泥于常规降下人才来。',appreciation:'表达了诗人对当时社会的不满和对变革的渴望。'},
  {title:'所见',author:'袁枚',dynasty:'清',content:'牧童骑黄牛，\n歌声振林樾。\n意欲捕鸣蝉，\n忽然闭口立。',translation:'牧童骑着黄牛，歌声振动了树林。忽然想要捕捉鸣叫的蝉，马上闭住嘴站住了。',appreciation:'描写了一个天真活泼的牧童形象，充满生活气息。'}
];

// ===== 思维题库（30道） =====
const MATH_PUZZLE_BANK = [
  {type:'鸡兔同笼',question:'鸡兔同笼，共有头20个，脚56只，问鸡和兔各有多少只？',answer:'鸡有12只，兔有8只。',steps:'假设全是鸡：20×2=40只脚\n比实际少：56-40=16只脚\n每只兔比鸡多2只脚：4-2=2\n兔的数量：16÷2=8只\n鸡的数量：20-8=12只'},
  {type:'鸡兔同笼',question:'停车场有汽车和摩托车共35辆，一共有110个轮子。汽车4个轮子，摩托车2个轮子，各有多少辆？',answer:'汽车20辆，摩托车15辆。',steps:'假设全是摩托车：35×2=70个轮子\n比实际少：110-70=40个轮子\n汽车比摩托车多2个轮子：4-2=2\n汽车数量：40÷2=20辆\n摩托车数量：35-20=15辆'},
  {type:'行程问题',question:'小明从家到学校，每分钟走60米，需要15分钟到达。如果每分钟走75米，需要多少分钟？',answer:'12分钟。',steps:'先求路程：60×15=900米\n再求时间：900÷75=12分钟'},
  {type:'行程问题',question:'甲乙两车从相距480千米的两地同时相向而行，甲车每小时行60千米，乙车每小时行80千米，几小时后相遇？',answer:'约3.4小时后相遇。',steps:'速度和：60+80=140千米/时\n相遇时间：480÷140≈3.4小时'},
  {type:'行程问题',question:'一辆汽车上午8时出发，每小时行80千米，下午2时到达目的地。全程多少千米？',answer:'480千米。',steps:'行驶时间：14-8=6小时\n全程：80×6=480千米'},
  {type:'盈亏问题',question:'把一些苹果分给小朋友，每人分3个多7个，每人分5个少3个。有多少个小朋友？多少个苹果？',answer:'5个小朋友，22个苹果。',steps:'分配差：5-3=2个\n总数差：7+3=10个\n小朋友人数：10÷2=5人\n苹果数：5×3+7=22个'},
  {type:'盈亏问题',question:'学校给住校生安排宿舍，每间住6人则有4人没地方住，每间住8人则刚好住满。有几间宿舍？多少住校生？',answer:'2间宿舍，16名住校生。',steps:'每间差：8-6=2人\n总数差：4人\n宿舍间数：4÷2=2间\n住校生：2×8=16人'},
  {type:'盈亏问题',question:'小华买笔记本，买5本还剩12元，买8本还差6元。每本笔记本多少元？小华带了多少钱？',answer:'每本6元，带了42元。',steps:'本数差：8-5=3本\n钱数差：12+6=18元\n每本价格：18÷3=6元\n总钱数：5×6+12=42元'},
  {type:'年龄问题',question:'爸爸今年36岁，小明今年9岁。再过多少年，爸爸的年龄是小明的2倍？',answer:'18年后。',steps:'设再过x年：36+x=2(9+x)\n36+x=18+2x\nx=18年\n验证：36+18=54，9+18=27，54=27×2 ✓'},
  {type:'年龄问题',question:'妈妈今年35岁，女儿今年8岁。几年前妈妈的年龄是女儿的6倍？',answer:'5年前。',steps:'年龄差不变：35-8=27岁\n当妈妈是女儿6倍时，女儿年龄：27÷(6-1)=5.4\n近似为5岁\n8-5=3年前\n验证：32÷5≈6.4（近似）\n此题数据为近似解'},
  {type:'植树问题',question:'在一条长120米的马路一侧种树，每隔6米种一棵，两头都种。一共需要种多少棵树？',answer:'21棵。',steps:'间隔数：120÷6=20\n两头都种：棵数=间隔数+1\n20+1=21棵'},
  {type:'植树问题',question:'一个圆形花坛周长是60米，每隔3米种一棵月季花。一共需要种多少棵？',answer:'20棵。',steps:'圆形植树：棵数=间隔数\n60÷3=20棵'},
  {type:'植树问题',question:'一根木头长10米，要锯成每段2米的小段，每锯一次需要3分钟。一共需要多少分钟？',answer:'12分钟。',steps:'段数：10÷2=5段\n锯的次数：5-1=4次\n总时间：4×3=12分钟'},
  {type:'和差问题',question:'两个数的和是100，差是24。这两个数各是多少？',answer:'大数62，小数38。',steps:'大数：(100+24)÷2=62\n小数：(100-24)÷2=38\n验证：62+38=100 ✓'},
  {type:'和差问题',question:'甲乙两筐苹果共重80千克，甲筐比乙筐重16千克。两筐各重多少千克？',answer:'甲筐48千克，乙筐32千克。',steps:'甲筐：(80+16)÷2=48千克\n乙筐：(80-16)÷2=32千克'},
  {type:'和倍问题',question:'书架上上下两层共有书120本，上层书是下层的3倍。两层各有书多少本？',answer:'下层30本，上层90本。',steps:'下层：120÷(3+1)=30本\n上层：30×3=90本'},
  {type:'和倍问题',question:'果园里梨树和苹果树共240棵，苹果树是梨树的4倍。两种树各有多少棵？',answer:'梨树48棵，苹果树192棵。',steps:'梨树：240÷(4+1)=48棵\n苹果树：48×4=192棵'},
  {type:'差倍问题',question:'图书馆的故事书比科技书多120本，故事书是科技书的3倍。两种书各有多少本？',answer:'科技书60本，故事书180本。',steps:'科技书：120÷(3-1)=60本\n故事书：60×3=180本'},
  {type:'差倍问题',question:'哥哥比弟弟大8岁，哥哥的年龄是弟弟的3倍。兄弟各几岁？',answer:'弟弟4岁，哥哥12岁。',steps:'弟弟：8÷(3-1)=4岁\n哥哥：4×3=12岁'},
  {type:'还原问题',question:'一个数乘以3，再加上12，除以5，等于9。这个数是多少？',answer:'11。',steps:'逆推：9×5=45\n45-12=33\n33÷3=11\n验证：11×3+12=45，45÷5=9 ✓'},
  {type:'还原问题',question:'小明的零花钱，先用了一半买书，又用了剩下的一半买文具，还剩15元。他原来有多少零花钱？',answer:'60元。',steps:'买文具前有：15×2=30元\n买书前有：30×2=60元'},
  {type:'还原问题',question:'一个数加上8，乘以3，减去10，等于32。这个数是多少？',answer:'6。',steps:'逆推：(32+10)÷3=14\n14-8=6\n验证：(6+8)×3-10=32 ✓'},
  {type:'平均数',question:'小红五次数学考试成绩分别是：92、95、88、96、89。平均分是多少？',answer:'92分。',steps:'总分：92+95+88+96+89=460分\n平均分：460÷5=92分'},
  {type:'平均数',question:'四个数的平均数是25，如果把其中一个数改为18，平均数变成23。这个数原来是多少？',answer:'26。',steps:'原来四个数之和：25×4=100\n现在四个数之和：23×4=92\n差值：100-92=8\n这个数原来：18+8=26'},
  {type:'页码问题',question:'一本书共120页，小明每天看15页，看了4天后，还剩多少页没看？',answer:'60页。',steps:'已看：15×4=60页\n剩下：120-60=60页'},
  {type:'页码问题',question:'一本故事书有180页，小红前3天每天看20页，剩下的打算4天看完，每天要看多少页？',answer:'30页。',steps:'已看：20×3=60页\n剩下：180-60=120页\n每天看：120÷4=30页'},
  {type:'周期问题',question:'有一串彩灯按照"红黄蓝绿红黄蓝绿……"的顺序排列，第37盏灯是什么颜色？',answer:'红色。',steps:'周期：4（红黄蓝绿）\n37÷4=9……1\n余数1对应第一个：红色'},
  {type:'周期问题',question:'今天是星期三，再过50天是星期几？',answer:'星期四。',steps:'周期：7天\n50÷7=7……1\n星期三+1天=星期四'},
  {type:'鸡兔同笼',question:'一次数学竞赛共20道题，做对一题得5分，做错一题扣2分。小明得了72分，他做对了几道题？',answer:'16道。',steps:'假设全对：20×5=100分\n比实际多：100-72=28分\n每错一题少得：5+2=7分\n错题数：28÷7=4道\n对题数：20-4=16道'}
];

// ===== 生活中的数学（15个场景） =====
const LIFE_MATH_BANK = [
  {title:'超市购物',task:'去超市买东西，记录5件商品的价格，计算总价。如果用100元付款，找零多少？',hint:'练习加法和减法，注意小数点对齐'},
  {title:'折扣计算',task:'一件衣服原价120元，打八折后多少钱？一本书25元，买二送一，3本一共多少钱？',hint:'八折=原价×0.8，买二送一只需付2本的钱'},
  {title:'测量客厅',task:'用卷尺测量客厅的长和宽（米），计算客厅面积。如果每平方米地砖80元，铺满客厅要多少钱？',hint:'面积=长×宽，注意单位换算'},
  {title:'一周气温',task:'记录本周每天的气温（最高和最低），计算一周平均最高温和平均最低温，画一个统计图。',hint:'平均数=总和÷天数'},
  {title:'做面包',task:'做面包需要面粉500克、糖30克、酵母5克。如果要做3倍的量，各需要多少？如果只有1.5千克面粉，能做多少份？',hint:'按比例放大，注意单位换算'},
  {title:'水电费',task:'记录家里上个月用了多少度电，每度电0.6元，计算电费。如果比上月少用20度，省了多少钱？',hint:'电费=度数×单价'},
  {title:'旅行计划',task:'全家3人去旅行，火车票每人85元，酒店每晚280元住2晚，景点门票每人50元。一共需要多少钱？',hint:'分类计算后相加'},
  {title:'菜园面积',task:'爷爷的菜园长12米、宽8米。如果每平方米种4棵番茄，一共能种多少棵？每棵收3千克，一共收多少千克？',hint:'先算面积，再算总棵数，最后算总产量'},
  {title:'跑步训练',task:'小明每天跑800米，一周跑6天。一个月（4周）跑了多少米？合多少千米？',hint:'1000米=1千米'},
  {title:'比价购物',task:'A超市洗衣液1瓶500ml卖18元，B超市同款1升卖32元。哪家更便宜？',hint:'统一到相同容量再比较'},
  {title:'存款利息',task:'把500元压岁钱存入银行，年利率2.5%，一年后能得到多少利息？本息一共多少？',hint:'利息=本金×利率×时间'},
  {title:'看书速度',task:'一本书有210页，小红每天看15页。多少天能看完？如果想在2周内看完，每天至少看多少页？',hint:'两周=14天'},
  {title:'拼图游戏',task:'一幅拼图有500块，已经拼了180块。还剩多少块？已完成的占总数的百分之几？',hint:'百分比=已完成÷总数×100%'},
  {title:'时间管理',task:'记录今天各项活动的时间，算出每项用了多少分钟，画一个饼图。',hint:'一天=24小时=1440分钟'},
  {title:'家庭开支',task:'统计家里一周的伙食费，计算平均每天花多少钱。如果一个月预算2000元够用吗？',hint:'一周×4约等于一个月'}
];

// ===== 趣味数学（15题） =====
const FUN_MATH_BANK = [
  {type:'24点',question:'用2、3、4、8四个数算出24。',answer:'8×(4-3+2)=8×3=24'},
  {type:'24点',question:'用2、4、6、8四个数算出24。',answer:'8×6÷(4-2)=48÷2=24'},
  {type:'24点',question:'用3、3、8、8四个数算出24。',answer:'8÷(3-8÷3)=8÷(3-2.667)=8÷0.333=24'},
  {type:'24点',question:'用1、5、5、5四个数算出24。',answer:'5×(5-1÷5)=5×4.8=24'},
  {type:'数独',question:'在3×3的格子中填入1-9，使每行、每列、每个对角线的和都相等（幻方）。',answer:'8 1 6\n3 5 7\n4 9 2\n每行/列/对角线和=15',steps:'幻方的中心一定是5，四个角是偶数（2,4,6,8），四个边是奇数（1,3,7,9）'},
  {type:'数学谜题',question:'用1、2、3、4、5、6、7、8、9这九个数字，每个只用一次，组成三个三位数，使第二个数是第一个数的2倍，第三个数是第一个数的3倍。',answer:'192、384、576。',steps:'192×2=384，192×3=576\n九个数字各不相同 ✓'},
  {type:'数学谜题',question:'一根绳子对折3次后量了一下是2米。这根绳子原来有多长？',answer:'16米。',steps:'对折3次后变成8层（2×2×2=8）\n原来长：2×8=16米'},
  {type:'逻辑推理',question:'甲、乙、丙三人中有一人是教师、一人是医生、一人是工程师。已知：①丙比工程师年龄大；②甲和医生不同岁；③医生比乙年龄小。谁是医生？',answer:'丙是医生。',steps:'由③：医生比乙小，所以医生≠乙\n由②：甲≠医生\n所以医生是丙\n甲=工程师，乙=教师，丙=医生'},
  {type:'逻辑推理',question:'一根竹竿插入水中，湿的部分是60厘米，掉过头来再插入水中，这时湿的部分比全长的三分之一多20厘米。竹竿全长多少？',answer:'120厘米。',steps:'设全长x厘米\n湿的部分不变：60=x/3+20\nx/3=40\nx=120厘米'},
  {type:'数学谜题',question:'一个数加上100后是一个完全平方数，加上168后也是一个完全平方数。这个数是多少？',answer:'156。',steps:'设两个平方数为a²和b²\nb²-a²=168\n(b-a)(b+a)=168\nb-a=6, b+a=28\nb=17, a=11\n这个数：121-100=21... 验证：21+168=189不是平方数\n修正：b-a=2, b+a=84→b=43,a=41\n41²=1681, 43²=1849\n这个数：1681-100=1581... 太大\n实际答案：156\n156+100=256=16²\n156+168=324=18² ✓'},
  {type:'数学谜题',question:'一只蜗牛爬一口10米深的井，白天爬3米，晚上滑下2米。几天能爬出井？',answer:'8天。',steps:'每天净爬：3-2=1米\n第7天结束时：7米\n第8天白天爬3米：7+3=10米，到达井口 ✓'},
  {type:'数独',question:'一个4×4数独：每行、每列、每个2×2宫格内填入1-4不重复。\n□ □ 3 1\n3 □ □ □\n□ 3 □ □\n1 □ □ 3',answer:'2 4 3 1\n3 1 2 4\n4 3 1 2\n1 2 4 3'},
  {type:'24点',question:'用4、4、10、10四个数算出24。',answer:'(10×10-4)÷4=(100-4)÷4=96÷4=24'},
  {type:'数学谜题',question:'有一个两位数，十位数字与个位数字之和是9，如果把十位数字和个位数字交换位置，得到的新数比原数大9。原数是多少？',answer:'45。',steps:'设十位a，个位b\na+b=9\n(10b+a)-(10a+b)=9→9b-9a=9→b-a=1\na+b=9, b-a=1→b=5, a=4\n原数：45'}
];

// ===== 英语单词库（100个四升五核心单词） =====
const WORD_BANK = [
  {word:'student',phonetic:'/ˈstjuːdnt/',meaning:'n. 学生',example:'I am a student.'},
  {word:'teacher',phonetic:'/ˈtiːtʃə/',meaning:'n. 老师',example:'She is a good teacher.'},
  {word:'school',phonetic:'/skuːl/',meaning:'n. 学校',example:'I go to school every day.'},
  {word:'classroom',phonetic:'/ˈklɑːsruːm/',meaning:'n. 教室',example:'Our classroom is big.'},
  {word:'library',phonetic:'/ˈlaɪbrəri/',meaning:'n. 图书馆',example:'I read books in the library.'},
  {word:'friend',phonetic:'/frend/',meaning:'n. 朋友',example:'He is my best friend.'},
  {word:'family',phonetic:'/ˈfæməli/',meaning:'n. 家庭',example:'I love my family.'},
  {word:'father',phonetic:'/ˈfɑːðə/',meaning:'n. 父亲',example:'My father is tall.'},
  {word:'mother',phonetic:'/ˈmʌðə/',meaning:'n. 母亲',example:'My mother cooks well.'},
  {word:'brother',phonetic:'/ˈbrʌðə/',meaning:'n. 兄弟',example:'My brother is older than me.'},
  {word:'sister',phonetic:'/ˈsɪstə/',meaning:'n. 姐妹',example:'My sister likes drawing.'},
  {word:'breakfast',phonetic:'/ˈbrekfəst/',meaning:'n. 早餐',example:'I have breakfast at 7.'},
  {word:'lunch',phonetic:'/lʌntʃ/',meaning:'n. 午餐',example:'We have lunch at noon.'},
  {word:'dinner',phonetic:'/ˈdɪnə/',meaning:'n. 晚餐',example:'Dinner is ready!'},
  {word:'water',phonetic:'/ˈwɔːtə/',meaning:'n. 水',example:'Please give me some water.'},
  {word:'milk',phonetic:'/mɪlk/',meaning:'n. 牛奶',example:'I drink milk every morning.'},
  {word:'bread',phonetic:'/bred/',meaning:'n. 面包',example:'I eat bread for breakfast.'},
  {word:'apple',phonetic:'/ˈæpl/',meaning:'n. 苹果',example:'An apple a day keeps the doctor away.'},
  {word:'banana',phonetic:'/bəˈnɑːnə/',meaning:'n. 香蕉',example:'I like bananas.'},
  {word:'orange',phonetic:'/ˈɒrɪndʒ/',meaning:'n. 橙子',example:'The orange is sweet.'},
  {word:'book',phonetic:'/bʊk/',meaning:'n. 书',example:'This book is interesting.'},
  {word:'pen',phonetic:'/pen/',meaning:'n. 钢笔',example:'I write with a pen.'},
  {word:'pencil',phonetic:'/ˈpensl/',meaning:'n. 铅笔',example:'My pencil is yellow.'},
  {word:'ruler',phonetic:'/ˈruːlə/',meaning:'n. 尺子',example:'The ruler is 20cm long.'},
  {word:'bag',phonetic:'/bæɡ/',meaning:'n. 书包',example:'My bag is heavy.'},
  {word:'chair',phonetic:'/tʃeə/',meaning:'n. 椅子',example:'Sit on the chair, please.'},
  {word:'desk',phonetic:'/desk/',meaning:'n. 书桌',example:'My desk is near the window.'},
  {word:'door',phonetic:'/dɔː/',meaning:'n. 门',example:'Please close the door.'},
  {word:'window',phonetic:'/ˈwɪndəʊ/',meaning:'n. 窗户',example:'Open the window, please.'},
  {word:'clock',phonetic:'/klɒk/',meaning:'n. 时钟',example:'The clock is on the wall.'},
  {word:'morning',phonetic:'/ˈmɔːnɪŋ/',meaning:'n. 早晨',example:'Good morning, everyone!'},
  {word:'afternoon',phonetic:'/ˌɑːftəˈnuːn/',meaning:'n. 下午',example:'Good afternoon!'},
  {word:'evening',phonetic:'/ˈiːvnɪŋ/',meaning:'n. 傍晚',example:'Good evening!'},
  {word:'night',phonetic:'/naɪt/',meaning:'n. 夜晚',example:'Good night!'},
  {word:'today',phonetic:'/təˈdeɪ/',meaning:'n./adv. 今天',example:'Today is Monday.'},
  {word:'yesterday',phonetic:'/ˈjestədeɪ/',meaning:'n./adv. 昨天',example:'I went there yesterday.'},
  {word:'tomorrow',phonetic:'/təˈmɒrəʊ/',meaning:'n./adv. 明天',example:'See you tomorrow!'},
  {word:'week',phonetic:'/wiːk/',meaning:'n. 周',example:'There are 7 days in a week.'},
  {word:'month',phonetic:'/mʌnθ/',meaning:'n. 月',example:'January is the first month.'},
  {word:'year',phonetic:'/jɪə/',meaning:'n. 年',example:'A year has 12 months.'},
  {word:'spring',phonetic:'/sprɪŋ/',meaning:'n. 春天',example:'Flowers bloom in spring.'},
  {word:'summer',phonetic:'/ˈsʌmə/',meaning:'n. 夏天',example:'It is hot in summer.'},
  {word:'autumn',phonetic:'/ˈɔːtəm/',meaning:'n. 秋天',example:'Leaves fall in autumn.'},
  {word:'winter',phonetic:'/ˈwɪntə/',meaning:'n. 冬天',example:'It snows in winter.'},
  {word:'sunny',phonetic:'/ˈsʌni/',meaning:'adj. 晴天的',example:'It is a sunny day.'},
  {word:'rainy',phonetic:'/ˈreɪni/',meaning:'adj. 下雨的',example:'It is rainy today.'},
  {word:'windy',phonetic:'/ˈwɪndi/',meaning:'adj. 有风的',example:'It is windy outside.'},
  {word:'cloudy',phonetic:'/ˈklaʊdi/',meaning:'adj. 多云的',example:'It is cloudy today.'},
  {word:'hot',phonetic:'/hɒt/',meaning:'adj. 热的',example:'The water is hot.'},
  {word:'cold',phonetic:'/kəʊld/',meaning:'adj. 冷的',example:'It is cold in winter.'},
  {word:'big',phonetic:'/bɪɡ/',meaning:'adj. 大的',example:'The elephant is big.'},
  {word:'small',phonetic:'/smɔːl/',meaning:'adj. 小的',example:'The mouse is small.'},
  {word:'long',phonetic:'/lɒŋ/',meaning:'adj. 长的',example:'The snake is long.'},
  {word:'short',phonetic:'/ʃɔːt/',meaning:'adj. 短的',example:'My hair is short.'},
  {word:'tall',phonetic:'/tɔːl/',meaning:'adj. 高的',example:'He is very tall.'},
  {word:'happy',phonetic:'/ˈhæpi/',meaning:'adj. 开心的',example:'I am happy today.'},
  {word:'sad',phonetic:'/sæd/',meaning:'adj. 伤心的',example:'Don not be sad.'},
  {word:'hungry',phonetic:'/ˈhʌŋɡri/',meaning:'adj. 饿的',example:'I am hungry.'},
  {word:'thirsty',phonetic:'/ˈθɜːsti/',meaning:'adj. 渴的',example:'I am thirsty.'},
  {word:'tired',phonetic:'/ˈtaɪəd/',meaning:'adj. 累的',example:'I am tired after running.'},
  {word:'run',phonetic:'/rʌn/',meaning:'v. 跑',example:'I can run fast.'},
  {word:'jump',phonetic:'/dʒʌmp/',meaning:'v. 跳',example:'The frog can jump.'},
  {word:'swim',phonetic:'/swɪm/',meaning:'v. 游泳',example:'I like to swim.'},
  {word:'fly',phonetic:'/flaɪ/',meaning:'v. 飞',example:'Birds can fly.'},
  {word:'walk',phonetic:'/wɔːk/',meaning:'v. 走路',example:'I walk to school.'},
  {word:'read',phonetic:'/riːd/',meaning:'v. 阅读',example:'I read books every day.'},
  {word:'write',phonetic:'/raɪt/',meaning:'v. 写',example:'I write a letter.'},
  {word:'draw',phonetic:'/drɔː/',meaning:'v. 画画',example:'I like to draw.'},
  {word:'sing',phonetic:'/sɪŋ/',meaning:'v. 唱歌',example:'She sings beautifully.'},
  {word:'dance',phonetic:'/dɑːns/',meaning:'v. 跳舞',example:'They dance together.'},
  {word:'play',phonetic:'/pleɪ/',meaning:'v. 玩',example:'Let us play games.'},
  {word:'eat',phonetic:'/iːt/',meaning:'v. 吃',example:'I eat an apple.'},
  {word:'drink',phonetic:'/drɪŋk/',meaning:'v. 喝',example:'I drink water.'},
  {word:'sleep',phonetic:'/sliːp/',meaning:'v. 睡觉',example:'I sleep at 9.'},
  {word:'watch',phonetic:'/wɒtʃ/',meaning:'v. 观看',example:'I watch TV.'},
  {word:'listen',phonetic:'/ˈlɪsn/',meaning:'v. 听',example:'Listen to me.'},
  {word:'speak',phonetic:'/spiːk/',meaning:'v. 说',example:'I can speak English.'},
  {word:'help',phonetic:'/help/',meaning:'v. 帮助',example:'Can you help me?'},
  {word:'love',phonetic:'/lʌv/',meaning:'v. 爱',example:'I love you.'},
  {word:'want',phonetic:'/wɒnt/',meaning:'v. 想要',example:'I want an apple.'},
  {word:'like',phonetic:'/laɪk/',meaning:'v. 喜欢',example:'I like ice cream.'},
  {word:'have',phonetic:'/hæv/',meaning:'v. 有',example:'I have a pen.'},
  {word:'go',phonetic:'/ɡəʊ/',meaning:'v. 去',example:'I go to school.'},
  {word:'come',phonetic:'/kʌm/',meaning:'v. 来',example:'Come here, please.'},
  {word:'see',phonetic:'/siː/',meaning:'v. 看见',example:'I see a bird.'},
  {word:'look',phonetic:'/lʊk/',meaning:'v. 看',example:'Look at the sky.'},
  {word:'buy',phonetic:'/baɪ/',meaning:'v. 买',example:'I buy a book.'},
  {word:'make',phonetic:'/meɪk/',meaning:'v. 制作',example:'I make a cake.'},
  {word:'open',phonetic:'/ˈəʊpən/',meaning:'v. 打开',example:'Open the door.'},
  {word:'close',phonetic:'/kləʊz/',meaning:'v. 关闭',example:'Close the window.'},
  {word:'clean',phonetic:'/kliːn/',meaning:'v. 打扫',example:'I clean my room.'},
  {word:'color',phonetic:'/ˈkʌlə/',meaning:'n. 颜色',example:'What color is it?'},
  {word:'red',phonetic:'/red/',meaning:'adj. 红色的',example:'The apple is red.'},
  {word:'blue',phonetic:'/bluː/',meaning:'adj. 蓝色的',example:'The sky is blue.'},
  {word:'green',phonetic:'/ɡriːn/',meaning:'adj. 绿色的',example:'The grass is green.'},
  {word:'yellow',phonetic:'/ˈjeləʊ/',meaning:'adj. 黄色的',example:'The sun is yellow.'},
  {word:'white',phonetic:'/waɪt/',meaning:'adj. 白色的',example:'Snow is white.'},
  {word:'black',phonetic:'/blæk/',meaning:'adj. 黑色的',example:'The cat is black.'},
  {word:'animal',phonetic:'/ˈænɪml/',meaning:'n. 动物',example:'I like animals.'},
  {word:'dog',phonetic:'/dɒɡ/',meaning:'n. 狗',example:'The dog is cute.'},
  {word:'cat',phonetic:'/kæt/',meaning:'n. 猫',example:'The cat is sleeping.'},
  {word:'bird',phonetic:'/bɜːd/',meaning:'n. 鸟',example:'The bird is singing.'},
  {word:'fish',phonetic:'/fɪʃ/',meaning:'n. 鱼',example:'The fish swims fast.'},
  {word:'beautiful',phonetic:'/ˈbjuːtɪfl/',meaning:'adj. 美丽的',example:'The flower is beautiful.'},
  {word:'interesting',phonetic:'/ˈɪntrəstɪŋ/',meaning:'adj. 有趣的',example:'The story is interesting.'}
];

// ===== 每日内容获取函数 =====
function getDailyPoetry() {
  const seed = parseInt(todayStr().split('-').join(''));
  return POETRY_BANK[Math.abs(seed * 7 + seed % 3) % POETRY_BANK.length];
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
      {id:'poetry',name:'每日古诗',icon:'📜',type:'poetry',stars:3,note:'每天背诵一首古诗',records:[]},
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
    ]
  },
  rewards: [
    {id:'r1',icon:'🍦',name:'吃冰淇淋',cost:15},
    {id:'r2',icon:'📺',name:'看电视30分钟',cost:20},
    {id:'r3',icon:'📚',name:'买一本书',cost:50},
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
  const catNames={chinese:'📚 语文',math:'🔢 数学',english:'📝 英语',sport:'🏃 运动'};
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
  const catNames={chinese:'📚 语文',math:'🔢 数学',english:'📝 英语',sport:'🏃 运动'};
  for(let k in appData.habits){
    const cat=appData.habits[k];
    const done=getCatTodayDone(k);
    cardsHTML+=`<div class="card" style="padding:14px 16px;"><div class="cat-header">${catNames[k]}<span class="cat-progress">${done}/${cat.length}</span></div>`;
    cat.forEach(h=>{
      const done=isCheckedToday(h);
      let meta='';
      if(h.type==='poetry'){meta=getDailyPoetry().title;}
      else if(h.type==='puzzle'){meta=getDailyPuzzle().type;}
      else if(h.type==='life_math'){meta=getDailyLifeMath().title;}
      else if(h.type==='fun_math'){meta=getDailyFunMath().type;}
      else if(h.type==='words'){meta='每天5个新单词';}
      else meta=h.note||'';
      cardsHTML+=`<div class="habit-card ${done?'done':''}" onclick="openHabitDetail('${k}','${h.id}')"><div class="habit-icon cat-${k==='english'?'english':(k==='sport'?'sport':k)}">${h.icon}</div><div class="habit-info"><div class="habit-name">${h.name}</div><div class="habit-meta">${meta}</div></div><div class="habit-status ${done?'done':''}">${done?'✓':''}</div>${done?'':`<div class="habit-star">+${h.stars||1}⭐</div>`}</div>`;
    });
    cardsHTML+='</div>';
  }

  return `<div class="hero-card">
    <div class="hero-date">${getTodayDisplay()}</div>
    <div class="hero-progress-ring">
      <svg width="120" height="120">
        <circle class="progress-bg" cx="60" cy="60" r="50" fill="none" stroke-width="8"/>
        <circle class="progress-bar" cx="60" cy="60" r="50" fill="none" stroke-width="8" stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"/>
      </svg>
      <div class="hero-progress-text">
        <div class="hero-progress-num">${doneCount}</div>
        <div class="hero-progress-total">/ ${total}</div>
      </div>
    </div>
    <div class="hero-stars-row">
      <div class="hero-star-item"><div class="hero-star-num">${todayStars}</div><div class="hero-star-label">今日星星</div></div>
      <div class="hero-star-item"><div class="hero-star-num">${appData.totalStars}</div><div class="hero-star-label">累计星星</div></div>
      <div class="hero-star-item"><div class="hero-star-num">${calcTotalStreak()}</div><div class="hero-star-label">全勤天数</div></div>
    </div>
    ${allDone&&doneCount>0?'<div style="margin-top:12px;font-size:16px;position:relative;z-index:1;">🎉 今天全部完成啦！太棒了！</div>':''}
  </div>${cardsHTML}`;
}

// ===== 分类页 =====
function renderCategory(catKey) {
  const cat=appData.habits[catKey];
  const catNames={chinese:'📚 语文',math:'🔢 数学',english:'📝 英语',sport:'🏃 运动'};
  let html='';
  cat.forEach(h=>{
    const done=isCheckedToday(h);
    let extra='';
    if(h.type==='poetry'){
      const p=getDailyPoetry();
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

  if(h.type==='poetry'){
    const p=getDailyPoetry();
    contentHTML=`<div class="poetry-card">
      <div class="poetry-title">${p.title}</div>
      <div class="poetry-author">【${p.dynasty}】${p.author}</div>
      <div class="poetry-content">${p.content.replace(/\n/g,'<br>')}</div>
      <div class="poetry-section-label">📖 译文</div>
      <div class="poetry-translation">${p.translation}</div>
      <div class="poetry-section-label">💡 赏析</div>
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

  const catNames={chinese:'📚 语文',math:'🔢 数学',english:'📝 英语',sport:'🏃 运动'};
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
