const COMMENT_REPO = "bayareamadcow/poker";
const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const suits = [
  { symbol: "\u2660", name: "spade", red: false },
  { symbol: "\u2665", name: "heart", red: true },
  { symbol: "\u2666", name: "diamond", red: true },
  { symbol: "\u2663", name: "club", red: false },
];
const rankValue = Object.fromEntries(ranks.map((rank, index) => [rank, 14 - index]));
const seatLayouts = {
  6: [
    { x: 50, y: 87, align: "center" },
    { x: 82, y: 67, align: "right" },
    { x: 72, y: 13, align: "center" },
    { x: 50, y: 8, align: "center" },
    { x: 28, y: 13, align: "center" },
    { x: 18, y: 67, align: "left" },
  ],
  8: [
    { x: 50, y: 87, align: "center" },
    { x: 78, y: 79, align: "right" },
    { x: 88, y: 54, align: "right" },
    { x: 76, y: 12, align: "center" },
    { x: 50, y: 7, align: "center" },
    { x: 24, y: 12, align: "center" },
    { x: 12, y: 54, align: "left" },
    { x: 22, y: 79, align: "left" },
  ],
};

const tableConfigs = {
  6: {
    label: "6-max",
    positions: ["UTG", "HJ", "CO", "BTN", "SB", "BB"],
    candidates: {
      open: ["UTG", "HJ", "CO", "BTN", "SB"],
      vsRaise: ["HJ", "CO", "BTN", "SB", "BB"],
      vs3bet: ["UTG", "HJ", "CO", "BTN", "SB"],
      flopVsCbet: ["HJ", "CO", "BTN", "SB", "BB"],
    },
  },
  8: {
    label: "8-max",
    positions: ["UTG", "UTG+1", "LJ", "HJ", "CO", "BTN", "SB", "BB"],
    candidates: {
      open: ["UTG", "UTG+1", "LJ", "HJ", "CO", "BTN", "SB"],
      vsRaise: ["UTG+1", "LJ", "HJ", "CO", "BTN", "SB", "BB"],
      vs3bet: ["UTG", "UTG+1", "LJ", "HJ", "CO", "BTN", "SB"],
      flopVsCbet: ["UTG+1", "LJ", "HJ", "CO", "BTN", "SB", "BB"],
    },
  },
};

const stackPresets = [8, 10, 12, 15, 20, 30, 40, 60, 80];
const spots = [
  { id: "open", labelKey: "spot.open" },
  { id: "vsRaise", labelKey: "spot.vsRaise" },
  { id: "vs3bet", labelKey: "spot.vs3bet" },
  { id: "flopVsCbet", labelKey: "spot.flopVsCbet" },
];

const blindBattleSpots = new Set(["vsRaise", "flopVsCbet"]);

const gameModes = {
  mtt: {
    label: "MTT Bubble",
    minStack: 3,
    maxStack: 45,
    defaultStack: 18,
    presets: [3, 5, 8, 12, 16, 20, 30, 40],
    brand: "MTT bubble trainer",
  },
  cash: {
    label: "Cash Deep",
    minStack: 40,
    maxStack: 200,
    defaultStack: 100,
    presets: [40, 60, 80, 100, 150, 200],
    brand: "cash deep-stack trainer",
  },
};

const tableThemes = [
  { id: "emerald", label: "Emerald", accent: "#1d7a52" },
  { id: "midnight", label: "Midnight", accent: "#31507b" },
  { id: "royal", label: "Royal", accent: "#6b2f4a" },
  { id: "sand", label: "Sand", accent: "#9b7b45" },
];

const avatarStyles = [
  { hood: "#f5eee2", face: "#e7b87f", blush: "#d97a6a", accent: "#1fb36b", eye: "#111414", variant: "fuzzy" },
  { hood: "#22252a", face: "#d7d0c5", blush: "#9d615c", accent: "#7dc8ff", eye: "#0a0b0d", variant: "shadow" },
  { hood: "#b95c49", face: "#f2d0a7", blush: "#d27877", accent: "#f0c64d", eye: "#15110f", variant: "sunny" },
  { hood: "#6f8fd6", face: "#ead8c2", blush: "#c96f90", accent: "#f4f4f4", eye: "#10151f", variant: "blue" },
  { hood: "#7f5aa6", face: "#e0c0a3", blush: "#d88aac", accent: "#9ee2bd", eye: "#17111d", variant: "violet" },
  { hood: "#d9b45d", face: "#f0d8b8", blush: "#c97958", accent: "#3a3a32", eye: "#10100c", variant: "gold" },
  { hood: "#40765b", face: "#dcc1a5", blush: "#b96a65", accent: "#b8e0c8", eye: "#101512", variant: "moss" },
  { hood: "#d8d9df", face: "#caa17e", blush: "#bb6e70", accent: "#151515", eye: "#161616", variant: "pale" },
];

const i18n = {
  en: {
    "nav.trainer": "Trainer",
    "nav.range": "Range",
    "nav.odds": "Odds",
    "nav.notes": "Notes",
    "nav.comments": "Comments",
    "label.table": "Table",
    "label.mode": "Mode",
    "label.felt": "Felt",
    "label.heroStack": "Hero Stack",
    "label.position": "Position",
    "label.spot": "Spot",
    "label.hand": "Hand",
    "label.highCard": "High card",
    "label.lowCard": "Low card",
    "label.shape": "Shape",
    "label.questionMix": "Question Mix",
    "label.potSize": "Pot size",
    "label.callSize": "Call size",
    "label.cleanOuts": "Clean outs",
    "metric.breakEven": "Break-even equity",
    "metric.equity": "Estimated equity",
    "button.useHand": "Use This Hand",
    "button.randomSpot": "Random Spot",
    "button.sameSpot": "New Hand Same Spot",
    "button.shuffle": "Shuffle",
    "button.playOut": "Run It",
    "button.turnRiver": "Turn + River",
    "button.oneCard": "One card",
    "button.leaveFeedback": "Leave Feedback",
    "button.readComments": "Read Saved Comments",
    "score.accuracy": "Accuracy",
    "score.streak": "Streak",
    "score.hands": "Hands",
    "panel.solverLine": "Solver Line",
    "panel.matrix": "169-Hand Matrix",
    "panel.currentCombo": "Current Combo",
    "panel.oddsLab": "Pot Odds Lab",
    "panel.rule24": "Rule of 2 / 4",
    "panel.feedback": "Feedback Wall",
    "panel.savedGithub": "Saved in GitHub",
    "comments.note": "People can leave comments here with a GitHub login. If the inline thread does not load, use the GitHub buttons and you can read everything later in the repo.",
    "result.waiting": "Choose an action, then compare it with the tournament recommendation.",
    "spot.open": "Open First In",
    "spot.vsRaise": "Facing Raise",
    "spot.vs3bet": "Facing 3-bet",
    "spot.flopVsCbet": "Flop vs C-bet",
    "mode.mtt": "MTT Bubble",
    "mode.cash": "Cash Deep",
    "theme.emerald": "Emerald",
    "theme.midnight": "Midnight",
    "theme.royal": "Royal",
    "theme.sand": "Sand",
    "action.fold": "Fold",
    "action.call": "Call",
    "action.raise": "Raise",
    "action.jam": "Jam",
    "action.3bet": "3-bet",
    "action.4bet": "4-bet",
    "action.check": "Check",
    "action.bet": "Bet",
    "action.threebet": "3-bet / 4-bet",
    "action.mixed": "Mixed",
    "table.totalPot": "Total Pot",
    "table.toCall": "To call",
    "table.unopened": "Unopened",
    "table.board": "Board",
    "table.flop": "Flop",
    "table.turn": "Turn",
    "table.river": "River",
    "table.heroToAct": "Hero to act",
    "table.folded": "Folded",
    "table.stillIn": "Still in",
    "table.blind": "blind",
    "table.open": "Open",
    "table.bet": "Bet",
    "table.opened": "Opened",
    "table.allIn": "All-in",
    "table.allInCall": "All-in call",
    "table.chopPot": "Chop pot",
    "table.won": "Won",
    "runout.street": "Street by street",
    "runout.showdown": "All-in reveal",
    "runout.cueStreet": "Run only the next street, answer the decision, then continue to turn or river.",
    "runout.cueShowdown": "Use this when the money is already in. It reveals a likely opponent hand and runs to the river.",
    "runout.adviceLabel": "Recommended next step",
    "runout.quizLabel": "Street decision",
    "runout.villainLine": "Villain line",
    "runout.question": "What should Hero do?",
    "runout.correct": "Good choice",
    "runout.review": "Review this spot",
    "runout.correctLine": "Best line",
    "runout.mixedLine": "Mixed line",
    "runout.checkedToHero": "Checked to Hero",
    "runout.showdownLabel": "All-in showdown",
    "runout.noMoreAction": "No more betting decision: the money is in. Read the shown hands, then review whether the all-in line was correct before the runout.",
    "runout.foldedAdvice": "If you chose Fold, the hand ends here. Use this runout only as review: do not chase future cards after a correct fold.",
    "button.dealFlop": "Deal Flop",
    "button.dealTurn": "Deal Turn",
    "button.dealRiver": "Deal River",
    "button.showdown": "Showdown",
    "odds.good": "Good call",
    "odds.thin": "Thin call",
    "odds.bad": "Not enough equity",
    "line.on": "On line",
    "line.off": "Off line",
    "line.selected": "Selected",
    "line.main": "Main line",
    "line.mix": "mix",
    "line.prefers": "The model prefers",
    "suited": "Suited",
    "offsuit": "Offsuit",
  },
  zh: {
    "nav.trainer": "训练",
    "nav.range": "范围",
    "nav.odds": "赔率",
    "nav.notes": "笔记",
    "nav.comments": "留言",
    "label.table": "桌型",
    "label.mode": "模式",
    "label.felt": "桌布",
    "label.heroStack": "我的筹码",
    "label.position": "位置",
    "label.spot": "题型",
    "label.hand": "手牌",
    "label.highCard": "大牌",
    "label.lowCard": "小牌",
    "label.shape": "花色",
    "label.questionMix": "练习",
    "label.potSize": "底池",
    "label.callSize": "跟注额",
    "label.cleanOuts": "干净 outs",
    "metric.breakEven": "盈亏平衡权益",
    "metric.equity": "估算权益",
    "button.useHand": "用这手牌",
    "button.randomSpot": "随机题",
    "button.sameSpot": "同局换手牌",
    "button.shuffle": "换题",
    "button.playOut": "跑牌",
    "button.turnRiver": "转牌+河牌",
    "button.oneCard": "一张牌",
    "button.leaveFeedback": "留下反馈",
    "button.readComments": "查看留言",
    "score.accuracy": "准确率",
    "score.streak": "连对",
    "score.hands": "手数",
    "panel.solverLine": "建议线路",
    "panel.matrix": "169 手牌矩阵",
    "panel.currentCombo": "当前手牌",
    "panel.oddsLab": "底池赔率",
    "panel.rule24": "2/4 法则",
    "panel.feedback": "反馈墙",
    "panel.savedGithub": "保存在 GitHub",
    "comments.note": "别人可以用 GitHub 登录留言。如果内嵌留言没加载，用 GitHub 按钮也能保存，之后你可以回仓库慢慢看。",
    "result.waiting": "先做决定，再对照锦标赛建议。",
    "spot.open": "无人入池开池",
    "spot.vsRaise": "面对加注",
    "spot.vs3bet": "面对 3-bet",
    "spot.flopVsCbet": "翻牌面对 c-bet",
    "mode.mtt": "锦标赛钱圈",
    "mode.cash": "现金深筹",
    "theme.emerald": "翡翠",
    "theme.midnight": "午夜",
    "theme.royal": "皇家",
    "theme.sand": "沙色",
    "action.fold": "弃牌",
    "action.call": "跟注",
    "action.raise": "加注",
    "action.jam": "全下",
    "action.3bet": "3-bet",
    "action.4bet": "4-bet",
    "action.check": "过牌",
    "action.bet": "下注",
    "action.threebet": "3-bet / 4-bet",
    "action.mixed": "混合",
    "table.totalPot": "总底池",
    "table.toCall": "跟注",
    "table.unopened": "无人入池",
    "table.board": "公共牌",
    "table.flop": "翻牌",
    "table.turn": "转牌",
    "table.river": "河牌",
    "table.heroToAct": "轮到我行动",
    "table.folded": "已弃牌",
    "table.stillIn": "还在池里",
    "table.blind": "盲注",
    "table.open": "开池",
    "table.bet": "下注",
    "table.opened": "已开池",
    "table.allIn": "全下",
    "table.allInCall": "跟全下",
    "table.chopPot": "平分底池",
    "table.won": "赢下",
    "runout.street": "一街一街",
    "runout.showdown": "全下摊牌",
    "runout.cueStreet": "每次只发下一街，先回答这一街怎么打，再继续到转牌或河牌。",
    "runout.cueShowdown": "钱已经打进去时使用，会翻出一个合理对手手牌并跑到河牌。",
    "runout.adviceLabel": "下一步建议",
    "runout.quizLabel": "街牌决策",
    "runout.villainLine": "对手线路",
    "runout.question": "Hero 应该怎么打？",
    "runout.correct": "选择正确",
    "runout.review": "复盘这个点",
    "runout.correctLine": "最佳线路",
    "runout.mixedLine": "混合线路",
    "runout.checkedToHero": "对手过牌到你",
    "runout.showdownLabel": "全下摊牌",
    "runout.noMoreAction": "钱已经进去了，后面没有下注决定。重点复盘：全下之前这条线是不是正确。",
    "runout.foldedAdvice": "如果你选择弃牌，这手牌已经结束。这个 runout 只能用来复盘，不应该因为后面发中牌就否定正确弃牌。",
    "button.dealFlop": "发翻牌",
    "button.dealTurn": "发转牌",
    "button.dealRiver": "发河牌",
    "button.showdown": "摊牌",
    "odds.good": "可以跟",
    "odds.thin": "边缘跟注",
    "odds.bad": "权益不够",
    "line.on": "在线路内",
    "line.off": "偏离线路",
    "line.selected": "已选择",
    "line.main": "主线",
    "line.mix": "混合",
    "line.prefers": "模型建议",
    "suited": "同花",
    "offsuit": "不同花",
  },
};

const runoutModes = [
  { id: "street", labelKey: "runout.street" },
  { id: "showdown", labelKey: "runout.showdown" },
];

const realisticPositionWeights = {
  6: {
    open: { UTG: 5, HJ: 12, CO: 24, BTN: 38, SB: 21 },
    vsRaise: { HJ: 4, CO: 9, BTN: 16, SB: 19, BB: 52 },
    vs3bet: { UTG: 5, HJ: 12, CO: 23, BTN: 41, SB: 19 },
    flopVsCbet: { HJ: 5, CO: 9, BTN: 12, SB: 19, BB: 55 },
  },
  8: {
    open: { UTG: 3, "UTG+1": 4, LJ: 7, HJ: 11, CO: 22, BTN: 36, SB: 17 },
    vsRaise: { "UTG+1": 2, LJ: 3, HJ: 5, CO: 8, BTN: 14, SB: 18, BB: 50 },
    vs3bet: { UTG: 3, "UTG+1": 4, LJ: 7, HJ: 12, CO: 22, BTN: 37, SB: 15 },
    flopVsCbet: { "UTG+1": 2, LJ: 3, HJ: 4, CO: 8, BTN: 12, SB: 18, BB: 53 },
  },
};

const rangeText = {
  6: {
    open: {
      UTG: "66+ ATs+ KQs QJs JTs AQo+",
      HJ: "55+ A9s+ KTs+ QTs+ JTs T9s 98s AJo+ KQo",
      CO: "44+ A2s+ K9s+ Q9s+ J9s+ T8s+ 98s 87s 76s ATo+ KJo+ QJo",
      BTN: "22+ A2s+ K5s+ Q8s+ J8s+ T8s+ 97s 86s 75s 65s A7o+ KTo+ QTo+ JTo",
      SB: "22+ A2s+ K7s+ Q9s+ J9s+ T8s+ 98s 87s 76s 65s A8o+ KTo+ QTo+ JTo",
      BB: "22+ A2s+ K8s+ Q9s+ J9s+ T9s 98s 87s 76s A9o+ KJo+ QJo",
    },
    threeBet: {
      HJ: "JJ+ AQs+ AKo A5s A4s",
      CO: "TT+ AJs+ KQs AQo+ A5s A4s",
      BTN: "99+ ATs+ KQs AJo+ KQo A5s A4s A3s KJs QJs",
      SB: "TT+ AQs+ AKo A5s A4s KQs",
      BB: "JJ+ AQs+ AKo A5s A4s KQs",
      UTG: "QQ+ AKs AKo",
    },
    callRaise: {
      HJ: "TT 99 AQs AJs KQs AQo",
      CO: "99 88 ATs+ KJs+ QJs JTs T9s AQo AJo KQo",
      BTN: "88+ A9s+ KTs+ QTs+ JTs T9s 98s 87s ATo+ KJo+ QJo",
      SB: "99 88 AQs AJs KQs AQo",
      BB: "22+ A2s+ K9s+ Q9s+ J9s+ T8s+ 98s 87s 76s 65s ATo+ KTo+ QTo+ JTo",
      UTG: "JJ TT AQs AJs KQs",
    },
    fourBet: {
      UTG: "QQ+ AKs AKo",
      HJ: "QQ+ AKs AKo A5s",
      CO: "JJ+ AKs AKo AQs A5s A4s",
      BTN: "TT+ AQs+ AKo A5s A4s KQs",
      SB: "JJ+ AKs AKo AQs A5s",
    },
    call3bet: {
      UTG: "JJ TT AQs AJs KQs AQo",
      HJ: "JJ TT 99 AQs AJs KQs AQo KQo",
      CO: "TT 99 88 AQs AJs ATs KQs KJs QJs JTs AQo KQo",
      BTN: "99 88 77 AQs AJs ATs KQs KJs QJs JTs T9s AQo AJo KQo",
      SB: "TT 99 AQs AJs KQs AQo",
      BB: "TT 99 88 AQs AJs KQs QJs JTs T9s 98s AQo KQo",
    },
  },
  8: {
    open: {
      UTG: "77+ AJs+ KQs AQo+",
      "UTG+1": "66+ ATs+ KJs+ QJs JTs AQo+",
      LJ: "55+ A9s+ KTs+ QTs+ JTs T9s 98s AJo+ KQo",
      HJ: "44+ A7s+ K9s+ Q9s+ J9s+ T8s+ 98s 87s ATo+ KJo+ QJo",
      CO: "33+ A2s+ K8s+ Q8s+ J8s+ T8s+ 97s 86s 76s 65s A9o+ KTo+ QTo+ JTo",
      BTN: "22+ A2s+ K5s+ Q7s+ J7s+ T7s+ 96s+ 86s+ 75s+ 64s+ A7o+ K9o+ Q9o+ J9o+ T9o",
      SB: "22+ A2s+ K6s+ Q8s+ J8s+ T8s+ 97s+ 86s+ 75s+ 65s A8o+ KTo+ QTo+ JTo",
      BB: "22+ A2s+ K8s+ Q9s+ J9s+ T9s 98s 87s 76s A9o+ KJo+ QJo",
    },
    threeBet: {
      "UTG+1": "QQ+ AKs AKo A5s",
      LJ: "JJ+ AQs+ AKo A5s A4s KQs",
      HJ: "TT+ AJs+ KQs AQo+ A5s A4s",
      CO: "99+ ATs+ KQs AJo+ KQo A5s A4s A3s KJs",
      BTN: "88+ A9s+ KTs+ QJs AQo+ ATo KQo A5s A4s A3s KJs QTs",
      SB: "TT+ AQs+ AKo A5s A4s KQs",
      BB: "99+ AJs+ KQs AQo+ A5s A4s KJs QJs",
      UTG: "QQ+ AKs AKo",
    },
    callRaise: {
      "UTG+1": "JJ TT AQs AJs KQs AQo",
      LJ: "TT 99 AQs AJs KQs AQo KQo",
      HJ: "99 88 ATs+ KJs+ QJs JTs AQo AJo KQo",
      CO: "88 77 A9s+ KTs+ QTs+ JTs T9s 98s ATo+ KJo+ QJo",
      BTN: "77+ A7s+ KTs+ QTs+ JTs T9s 98s 87s A9o+ KTo+ QTo+ JTo",
      SB: "99 88 AQs AJs KQs AQo",
      BB: "22+ A2s+ K8s+ Q8s+ J8s+ T8s+ 98s 87s 76s 65s A9o+ KTo+ QTo+ JTo",
      UTG: "JJ TT AQs AJs KQs",
    },
    fourBet: {
      UTG: "QQ+ AKs AKo",
      "UTG+1": "QQ+ AKs AKo A5s",
      LJ: "JJ+ AKs AKo AQs A5s A4s",
      HJ: "JJ+ AKs AKo AQs A5s A4s",
      CO: "TT+ AQs+ AKo A5s A4s KQs",
      BTN: "TT+ AQs+ AKo A5s A4s KQs",
      SB: "JJ+ AKs AKo AQs A5s",
    },
    call3bet: {
      UTG: "JJ TT AQs AJs KQs AQo",
      "UTG+1": "JJ TT 99 AQs AJs KQs AQo KQo",
      LJ: "TT 99 88 AQs AJs ATs KQs KJs QJs AQo KQo",
      HJ: "TT 99 88 AQs AJs ATs KQs KJs QJs JTs AQo KQo",
      CO: "99 88 77 AQs AJs ATs KQs KJs QJs JTs T9s AQo AJo KQo",
      BTN: "88 77 66 AQs AJs ATs KQs KJs QJs JTs T9s 98s AQo AJo KQo KJo",
      SB: "TT 99 AQs AJs KQs AQo",
      BB: "TT 99 88 AQs AJs KQs QJs JTs T9s 98s AQo KQo",
    },
  },
};

const notes = [
  {
    title: "Short-stack reality",
    body: "From 5BB to 15BB, many tournament spots become jam-heavy. The right answer is often about fold equity and stack preservation, not raw card beauty.",
  },
  {
    title: "Late-position steals",
    body: "At 12BB to 25BB, CO, BTN, and SB gain pressure value. Hands that were folds deep can become profitable opens or jams once antes and payout pressure exist.",
  },
  {
    title: "Flat less when shallow",
    body: "As stacks shrink, weak calls lose value quickly. Facing a raise, you usually want a cleaner split between fold, call with clear equity realization, and jam with pressure.",
  },
  {
    title: "8-max starts tighter",
    body: "More players behind means more hands to get through. Early-position opens in 8-max should be clearly tighter than late-position opens in 6-max.",
  },
  {
    title: "Use the matrix",
    body: "If a combo flips between two actions, treat that as a frequency problem. Use the matrix to see whether a hand is a pure continue, a pure fold, or a tournament mix.",
  },
  {
    title: "Why no call",
    body: "Open-first-in spots do not show call because nobody has entered the pot yet. Call appears once you face an open, a 3-bet, or a flop c-bet.",
  },
];

const allHands = buildHands();
const ranges = buildRanges(rangeText);

const state = {
  lang: localStorage.getItem("pokerSolverLang") || "zh",
  view: "trainer",
  gameMode: "mtt",
  tableTheme: "emerald",
  tableSize: 8,
  stackBb: 18,
  position: "HJ",
  spot: "open",
  context: null,
  seatStacks: {},
  seatAvatars: {},
  current: makeHand("A", "J", true),
  selectedKey: "AJs",
  chosenAction: null,
  answered: false,
  correct: 0,
  played: 0,
  streak: 0,
  streetMode: "two",
  runoutMode: "street",
  runout: null,
  forcedOpener: null,
};

const el = {
  brandContext: document.querySelector("#brandContext"),
  felt: document.querySelector(".felt"),
  languageButtons: document.querySelector("#languageButtons"),
  tableSizeButtons: document.querySelector("#tableSizeButtons"),
  gameModeButtons: document.querySelector("#gameModeButtons"),
  themeButtons: document.querySelector("#themeButtons"),
  stackSize: document.querySelector("#stackSize"),
  stackSizeValue: document.querySelector("#stackSizeValue"),
  stackBandLabel: document.querySelector("#stackBandLabel"),
  stackPresetButtons: document.querySelector("#stackPresetButtons"),
  positionButtons: document.querySelector("#positionButtons"),
  spotButtons: document.querySelector("#spotButtons"),
  rankOne: document.querySelector("#rankOne"),
  rankTwo: document.querySelector("#rankTwo"),
  suitedness: document.querySelector("#suitedness"),
  usePickedHand: document.querySelector("#usePickedHand"),
  randomSpot: document.querySelector("#randomSpot"),
  sameContextHand: document.querySelector("#sameContextHand"),
  dealerChip: document.querySelector(".dealer-chip"),
  potBadge: document.querySelector("#potBadge"),
  scenarioText: document.querySelector("#scenarioText"),
  scenarioMeta: document.querySelector("#scenarioMeta"),
  tableSeats: document.querySelector("#tableSeats"),
  boardWrap: document.querySelector("#boardWrap"),
  boardLabel: document.querySelector("#boardLabel"),
  boardCards: document.querySelector("#boardCards"),
  contextStrip: document.querySelector("#contextStrip"),
  heroHand: document.querySelector("#heroHand"),
  holeCards: document.querySelector("#holeCards"),
  actionButtons: document.querySelector("#actionButtons"),
  resultBox: document.querySelector("#resultBox"),
  frequencyBars: document.querySelector("#frequencyBars"),
  explainBox: document.querySelector("#explainBox"),
  runoutModeButtons: document.querySelector("#runoutModeButtons"),
  playOutHand: document.querySelector("#playOutHand"),
  runoutBox: document.querySelector("#runoutBox"),
  nextHand: document.querySelector("#nextHand"),
  accuracy: document.querySelector("#accuracy"),
  streak: document.querySelector("#streak"),
  handsPlayed: document.querySelector("#handsPlayed"),
  rangeMatrix: document.querySelector("#rangeMatrix"),
  rangeContext: document.querySelector("#rangeContext"),
  selectedHandDetail: document.querySelector("#selectedHandDetail"),
  potSize: document.querySelector("#potSize"),
  callSize: document.querySelector("#callSize"),
  outs: document.querySelector("#outs"),
  potSizeValue: document.querySelector("#potSizeValue"),
  callSizeValue: document.querySelector("#callSizeValue"),
  outsValue: document.querySelector("#outsValue"),
  breakEven: document.querySelector("#breakEven"),
  equity: document.querySelector("#equity"),
  equityNeedle: document.querySelector("#equityNeedle"),
  oddsDecision: document.querySelector("#oddsDecision"),
  notesGrid: document.querySelector("#notesGrid"),
  commentsEmbed: document.querySelector("#commentsEmbed"),
};

init();

function t(key) {
  return i18n[state.lang]?.[key] || i18n.en[key] || key;
}

function actionLabel(action) {
  const key = {
    Fold: "action.fold",
    Call: "action.call",
    Raise: "action.raise",
    Jam: "action.jam",
    "3-bet": "action.3bet",
    "4-bet": "action.4bet",
    Check: "action.check",
    Bet: "action.bet",
  }[action];
  return key ? t(key) : action;
}

function spotLabel(spotId) {
  return t(spots.find((spot) => spot.id === spotId)?.labelKey || spotId);
}

function gameModeLabel(modeId) {
  return t(`mode.${modeId}`);
}

function themeLabel(themeId) {
  return t(`theme.${themeId}`);
}

function init() {
  renderRankPickers();
  renderNotes();
  bindEvents();
  randomTournamentSpot({ fullRandom: true, preserveScore: true });
}

function bindEvents() {
  el.languageButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      localStorage.setItem("pokerSolverLang", state.lang);
      render();
    });
  });

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
      document.querySelector(`#${state.view}View`).classList.add("is-active");
      if (state.view === "comments") {
        ensureCommentsEmbed();
      }
      renderRange();
    });
  });

  el.stackSize.addEventListener("input", () => {
    state.stackBb = Number(el.stackSize.value);
    normalizeState();
    state.runout = null;
    rebuildContext();
    state.chosenAction = null;
    state.answered = false;
    render();
  });

  el.usePickedHand.addEventListener("click", () => {
    const first = el.rankOne.value;
    const second = el.rankTwo.value;
    const suited = first !== second && el.suitedness.value === "s";
    state.current = makeHand(first, second, suited);
    state.selectedKey = state.current.key;
    rebuildContext(state.current);
    state.chosenAction = null;
    state.answered = false;
    render();
  });

  el.randomSpot.addEventListener("click", () => randomTournamentSpot({ fullRandom: true }));
  el.sameContextHand.addEventListener("click", () => randomTournamentSpot({ fullRandom: false }));
  el.nextHand.addEventListener("click", () => randomTournamentSpot({ fullRandom: true }));
  el.playOutHand.addEventListener("click", playOutCurrentHand);

  [el.potSize, el.callSize, el.outs].forEach((input) => {
    input.addEventListener("input", renderOdds);
  });

  document.querySelectorAll("[data-street]").forEach((button) => {
    button.addEventListener("click", () => {
      state.streetMode = button.dataset.street;
      document.querySelectorAll("[data-street]").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      renderOdds();
    });
  });
}

function render() {
  normalizeState();
  renderStaticText();
  renderControls();
  syncPickers();
  renderTrainer();
  renderRange();
  renderOdds();
  renderNotes();
  renderScore();
}

function renderStaticText() {
  document.documentElement.lang = state.lang === "zh" ? "zh-Hans" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  el.languageButtons.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });
  el.suitedness.querySelector('[value="s"]').textContent = t("suited");
  el.suitedness.querySelector('[value="o"]').textContent = t("offsuit");
}

function renderControls() {
  const tableButtons = [6, 8]
    .map(
      (size) => `
        <button type="button" data-table="${size}" class="${state.tableSize === size ? "is-active" : ""}">
          ${tableConfigs[size].label}
        </button>
      `,
    )
    .join("");
  el.tableSizeButtons.innerHTML = tableButtons;
  el.tableSizeButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.tableSize = Number(button.dataset.table);
      state.forcedOpener = null;
      state.context = null;
      state.runout = null;
      normalizeState();
      rebuildContext();
      state.chosenAction = null;
      state.answered = false;
      render();
    });
  });

  el.gameModeButtons.innerHTML = Object.entries(gameModes)
    .map(
      ([modeId]) => `
        <button type="button" data-mode="${modeId}" class="${state.gameMode === modeId ? "is-active" : ""}">
          ${gameModeLabel(modeId)}
        </button>
      `,
    )
    .join("");
  el.gameModeButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.gameMode = button.dataset.mode;
      const mode = gameModes[state.gameMode];
      state.stackBb = mode.defaultStack;
      state.context = null;
      state.runout = null;
      rebuildContext();
      state.chosenAction = null;
      state.answered = false;
      render();
    });
  });

  el.themeButtons.innerHTML = tableThemes
    .map(
      (theme) => `
        <button type="button" class="theme-chip ${state.tableTheme === theme.id ? "is-active" : ""}" data-theme="${theme.id}">
          <span style="--theme-accent:${theme.accent}"></span>${themeLabel(theme.id)}
        </button>
      `,
    )
    .join("");
  el.themeButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.tableTheme = button.dataset.theme;
      render();
    });
  });

  const candidates = getCandidatePositions(state.spot, state.tableSize);
  el.positionButtons.innerHTML = getActivePositions(state.tableSize)
    .map((position) => {
      const active = state.position === position ? "is-active" : "";
      const disabled = candidates.includes(position) ? "" : "is-disabled";
      return `<button type="button" data-position="${position}" class="${active} ${disabled}" ${candidates.includes(position) ? "" : "disabled"}>${position}</button>`;
    })
    .join("");
  el.positionButtons.querySelectorAll("button:not([disabled])").forEach((button) => {
    button.addEventListener("click", () => {
      state.position = button.dataset.position;
      state.forcedOpener = null;
      state.context = null;
      state.runout = null;
      rebuildContext();
      state.chosenAction = null;
      state.answered = false;
      render();
    });
  });

  el.spotButtons.innerHTML = spots
    .map((spot) => `<button type="button" data-spot="${spot.id}" class="${state.spot === spot.id ? "is-active" : ""}">${spotLabel(spot.id)}</button>`)
    .join("");
  el.spotButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.spot = button.dataset.spot;
      state.forcedOpener = null;
      state.context = null;
      state.runout = null;
      normalizeState();
      rebuildContext();
      state.chosenAction = null;
      state.answered = false;
      render();
    });
  });

  const mode = gameModes[state.gameMode];
  el.stackSize.min = String(mode.minStack);
  el.stackSize.max = String(mode.maxStack);
  el.stackSize.value = String(state.stackBb);
  el.stackSizeValue.textContent = `${state.stackBb}BB`;
  el.stackBandLabel.textContent = stackBandLabel(state.stackBb);
  el.stackPresetButtons.innerHTML = mode.presets
    .map(
      (stack) => `
        <button type="button" data-stack="${stack}" class="preset-chip ${stack === state.stackBb ? "is-active" : ""}">
          ${stack}BB
        </button>
      `,
    )
    .join("");
  el.stackPresetButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.stackBb = Number(button.dataset.stack);
      state.runout = null;
      rebuildContext();
      state.chosenAction = null;
      state.answered = false;
      render();
    });
  });

  const brandMode = state.lang === "zh" ? gameModeLabel(state.gameMode) : mode.brand;
  el.brandContext.textContent = `${tableConfigs[state.tableSize].label} ${brandMode} · Hero ${state.stackBb}BB`;
}

function renderRankPickers() {
  const options = ranks.map((rank) => `<option value="${rank}">${rank}</option>`).join("");
  el.rankOne.innerHTML = options;
  el.rankTwo.innerHTML = options;
  el.rankOne.addEventListener("change", syncSuitedAvailability);
  el.rankTwo.addEventListener("change", syncSuitedAvailability);
}

function syncPickers() {
  const parsed = parseHandKey(state.current.key);
  el.rankOne.value = parsed.high;
  el.rankTwo.value = parsed.low;
  el.suitedness.value = parsed.suited ? "s" : "o";
  syncSuitedAvailability();
}

function syncSuitedAvailability() {
  const isPair = el.rankOne.value === el.rankTwo.value;
  el.suitedness.disabled = isPair;
  if (isPair) {
    el.suitedness.value = "o";
  }
}

function renderTrainer() {
  const spot = spotById(state.spot);
  const context = state.context || buildSpotContext(state.position, state.spot, state.tableSize, state.stackBb, state.current);
  const rec = recommend(state.current.key, state.position, state.spot, state.tableSize, state.stackBb, context);
  const actions = getSpotActions(state.spot, state.stackBb);
  const lateFlag = isLatePosition(state.position, state.tableSize) ? (state.lang === "zh" ? "后位压力" : "Late pressure") : (state.lang === "zh" ? "前位纪律" : "Early discipline");
  const actionNote = trainerActionNote(state.spot, context, actions);

  el.scenarioText.textContent = `${gameModeLabel(state.gameMode)} · ${tableConfigs[state.tableSize].label} · ${state.position} · ${spotLabel(spot.id)}`;
  el.scenarioMeta.innerHTML = `
    <span class="pill ghost">${compactStackBandLabel(state.stackBb)}</span>
    <span class="pill ghost">${lateFlag}</span>
    <span class="pill ghost">${actionNote}</span>
  `;
  renderTableScene(context);
  el.contextStrip.innerHTML = buildContextStrip(context);
  el.heroHand.textContent = state.current.key;
  el.holeCards.innerHTML = "";
  el.actionButtons.innerHTML = actions
    .map((action) => `<button class="action-button ${actionClass(action)}" type="button" data-action="${action}">${actionLabel(action)}</button>`)
    .join("");
  el.actionButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => chooseAction(button.dataset.action, rec));
  });

  if (!state.answered) {
    el.resultBox.innerHTML = `<p>${t("result.waiting")}</p>`;
    el.frequencyBars.innerHTML = renderBars(hiddenProfile(actions));
    el.explainBox.innerHTML = `<p>${spotHint(state.spot, context)}</p>`;
    renderRunoutModes();
    renderRunoutBox(context, rec);
    return;
  }

  renderRecommendation(rec, state.chosenAction);
  renderRunoutModes();
  renderRunoutBox(context, rec);
}

function trainerActionNote(spot, context, actions) {
  if (spot === "open") return state.lang === "zh" ? "无人池不跟注" : "No call unopened";
  if (!actions.includes("Call")) return state.lang === "zh" ? "全下或弃牌" : "Jam or fold";
  if (spot === "flopVsCbet") return `${formatBb(context.betSize)} c-bet`;
  return state.lang === "zh" ? "可以跟注" : "Call available";
}

function spotHint(spot, context) {
  if (spot === "open") {
    if (state.lang === "zh") {
      return "无人入池时没有 Call 选项，因为前面没人下注。面对 open、3-bet 或翻牌 c-bet 时，Call 会出现。";
    }
    return "Open spots do not show Call because nobody has entered the pot yet. Once you face an open, a 3-bet, or a flop c-bet, Call comes back into the action row.";
  }

  if (spot === "flopVsCbet") {
    if (state.lang === "zh") {
      return `你翻前跟注，翻牌是 ${boardText(context.board)}，对手在 ${formatBb(context.potBeforeBet)} 底池里 c-bet ${formatBb(context.betSize)}。用对子强度、听牌、位置来决定弃牌、跟注还是加注。`;
    }
    return `You called preflop, the flop is ${boardText(context.board)}, and the opener fires ${formatBb(context.betSize)} into ${formatBb(context.potBeforeBet)}. Use pair strength, draws, and position to decide between fold, call, and raise.`;
  }

  if ((spot === "vsRaise" || spot === "vs3bet") && !getSpotActions(state.spot, state.stackBb).includes("Call")) {
    if (state.lang === "zh") {
      return `${state.stackBb}BB 这种短筹分支主要是全下或弃牌，所以 Call 会消失。训练器在逼近真实锦标赛短筹反应。`;
    }
    return `At ${state.stackBb}BB this branch is intentionally jam-or-fold. That is why Call disappears even though you are facing action. The trainer is pushing the shorter-stack tournament response instead of a flatting line.`;
  }

  if (state.lang === "zh") {
    return "锦标赛题目会结合桌型、筹码深度、位置和压力。重点看谁开池、下注多大、你需要投入多少继续。";
  }
  return "Tournament spots mix table size, stack depth, position, and pressure. Look at who opened, how big they made it, and how much you must continue for.";
}

function renderTableScene(context) {
  el.felt.dataset.theme = state.tableTheme;
  el.tableSeats.innerHTML = buildSeatMarkup(context);
  const displayBoard = state.runout?.board || context.board || [];
  const streetLine = state.runout?.quiz?.line || null;
  const displayPot = state.runout?.showdown?.potBb || streetLine?.potAfterBb || context.potBb || 0;
  const potNote = state.runout?.showdown
    ? showdownResultText(state.runout.showdown)
    : streetLine?.action === "Bet"
      ? `${t("table.toCall")} ${formatBb(streetLine.betBb)}`
      : streetLine?.action === "Check"
        ? t("runout.checkedToHero")
        : context.toCallBb
      ? `${t("table.toCall")} ${formatBb(context.toCallBb)}`
      : t("table.unopened");
  el.potBadge.innerHTML = `
    <span>${t("table.totalPot")}</span>
    <strong>${formatBb(displayPot)}</strong>
    <em>${potNote}</em>
  `;
  positionDealerChip();
  const hasBoard = Array.isArray(displayBoard) && displayBoard.length > 0;
  el.boardWrap.classList.toggle("is-hidden", !hasBoard);
  if (!hasBoard) {
    el.boardLabel.textContent = "";
    el.boardCards.innerHTML = "";
    return;
  }

  el.boardLabel.textContent = displayBoard.length >= 5
    ? t("table.board")
    : displayBoard.length === 4
      ? t("table.turn")
      : t("table.flop");
  el.boardCards.innerHTML = displayBoard.map((card) => renderCard(card, "board-card")).join("");
}

function chooseAction(action, rec) {
  if (state.answered) {
    state.chosenAction = action;
    state.runout = null;
    renderRecommendation(rec, action);
    renderRunoutBox(state.context || buildSpotContext(state.position, state.spot, state.tableSize, state.stackBb, state.current), rec);
    return;
  }
  const isCorrect = action === rec.primary || action === rec.secondary;
  state.chosenAction = action;
  state.runout = null;
  state.played += 1;
  state.correct += isCorrect ? 1 : 0;
  state.streak = isCorrect ? state.streak + 1 : 0;
  state.answered = true;
  renderScore();
  renderRecommendation(rec, action);
}

function renderRecommendation(rec, chosen = null) {
  const picked = chosen ? actionLabel(chosen) : t("line.selected");
  const isCorrect = !chosen || chosen === rec.primary || chosen === rec.secondary;
  const tone = isCorrect ? t("line.on") : t("line.off");
  el.resultBox.innerHTML = `
    <strong>${tone} · ${picked}</strong>
    <p>${t("line.main")}: ${actionLabel(rec.primary)}${rec.secondary ? ` / ${t("line.mix")}: ${actionLabel(rec.secondary)}` : ""}. ${t("line.prefers")} ${actionLabel(rec.primary)} ${rec.primaryFreq}%.</p>
  `;
  el.frequencyBars.innerHTML = renderBars(rec.profile);
  el.explainBox.innerHTML = `<p>${localizedRecNote(rec, state.context)}</p>`;
}

function playOutCurrentHand() {
  const context = state.context || buildSpotContext(state.position, state.spot, state.tableSize, state.stackBb, state.current);
  const rec = recommend(state.current.key, state.position, state.spot, state.tableSize, state.stackBb, context);
  const chosenAction = state.chosenAction || rec.primary;

  if (state.runout?.quiz && !state.runout.quiz.chosen) {
    state.runout.advice = {
      tone: "draw",
      title: state.lang === "zh" ? "先回答这一街" : "Answer this street first",
      body: state.lang === "zh"
        ? "先选择这一街该怎么打，再继续发下一张牌。训练重点是做决定，不是直接看结果。"
        : "Choose the action for this street before dealing the next card. The training goal is the decision, not just the runout.",
    };
    render();
    return;
  }

  if (state.runout?.quiz?.chosen === "Fold") {
    state.runout.advice = {
      tone: "fold",
      title: actionLabel("Fold"),
      body: t("runout.foldedAdvice"),
    };
    render();
    return;
  }

  if (chosenAction === "Fold" && state.runoutMode !== "showdown") {
    const board = state.runout?.board?.length ? [...state.runout.board] : Array.isArray(context.board) ? [...context.board] : [];
    const outcome = assessRunout(state.current.cards, board);
    state.runout = {
      mode: "street",
      flop: board.slice(0, 3),
      turn: board[3],
      river: board[4],
      board,
      outcome,
      showdown: null,
      quiz: null,
      advice: buildRunoutAdvice(context, rec, chosenAction, board, outcome, null),
    };
    render();
    return;
  }

  const seedBoard = state.runout?.board?.length
    ? [...state.runout.board]
    : Array.isArray(context.board)
      ? [...context.board]
      : [];
  const revealShowdown = state.runoutMode === "showdown" || shouldOpenShowdown(chosenAction, rec) || seedBoard.length >= 5;

  if (revealShowdown) {
    state.runout = buildShowdownRunout(context, rec, chosenAction, seedBoard);
    render();
    return;
  }

  const runoutBoard = drawNextStreetBoard(seedBoard);
  const outcome = assessRunout(state.current.cards, runoutBoard);
  const priorPot = resolveRunoutPotAfterHero(state.runout?.quiz) || estimateRunoutPot(context, chosenAction);
  const quiz = buildStreetQuiz(context, rec, chosenAction, runoutBoard, priorPot);
  const advice = buildRunoutAdvice(context, rec, chosenAction, runoutBoard, outcome, null, quiz);

  state.runout = {
    mode: "street",
    flop: runoutBoard.slice(0, 3),
    turn: runoutBoard[3],
    river: runoutBoard[4],
    board: runoutBoard,
    outcome,
    showdown: null,
    quiz,
    advice,
  };
  render();
}

function resolveRunoutPotAfterHero(quiz) {
  if (!quiz?.chosen) return 0;
  const line = quiz.line;
  if (quiz.chosen === "Fold") return 0;
  if (line.action === "Check") {
    if (quiz.chosen === "Bet") {
      const betBb = roundBb(Math.max(1, line.potBeforeBb * 0.55));
      return roundBb(line.potBeforeBb + betBb);
    }
    return line.potBeforeBb;
  }

  if (quiz.chosen === "Raise") {
    const raiseToBb = roundBb(line.betBb * 2.6);
    return roundBb(line.potBeforeBb + line.betBb + raiseToBb);
  }

  if (quiz.chosen === "Call") {
    return roundBb(line.potBeforeBb + line.betBb * 2);
  }

  return line.potAfterBb;
}

function buildShowdownRunout(context, rec, chosenAction, seedBoard = []) {
  const startingBoard = seedBoard.length ? [...seedBoard] : Array.isArray(context.board) ? [...context.board] : [];
  const showdownVillain = pickShowdownVillain(context);
  const villainCards = drawVillainCards(showdownVillain, context, [...state.current.cards, ...startingBoard]);
  const board = fillBoardToRiver(startingBoard, [...state.current.cards, ...villainCards]);
  const outcome = assessRunout(state.current.cards, board);
  const showdown = buildShowdownResult(context, showdownVillain, villainCards, board);

  return {
    mode: "showdown",
    flop: board.slice(0, 3),
    turn: board[3],
    river: board[4],
    board,
    outcome,
    showdown,
    quiz: null,
    advice: buildRunoutAdvice(context, rec, chosenAction, board, outcome, showdown),
  };
}

function drawNextStreetBoard(seedBoard = []) {
  const targetCount = seedBoard.length < 3 ? 3 : Math.min(5, seedBoard.length + 1);
  const excluded = [...state.current.cards, ...seedBoard];
  return [...seedBoard, ...drawRandomCards(Math.max(0, targetCount - seedBoard.length), excluded)];
}

function fillBoardToRiver(seedBoard = [], extraExcluded = []) {
  const excluded = [...state.current.cards, ...extraExcluded, ...seedBoard];
  return [...seedBoard, ...drawRandomCards(Math.max(0, 5 - seedBoard.length), excluded)];
}

function estimateRunoutPot(context, chosenAction) {
  if (context.spot === "flopVsCbet") {
    if (chosenAction === "Call") return roundBb((context.potBeforeBet || 0) + (context.betSize || 0) * 2);
    if (chosenAction === "Raise") return roundBb((context.potBeforeBet || 0) + (context.betSize || 0) * 3);
    return context.potBb || context.potBeforeBet || 2.5;
  }

  if (chosenAction === "Call") return roundBb((context.potBb || 0) + (context.toCallBb || 0));
  if (["Raise", "3-bet", "4-bet"].includes(chosenAction)) {
    const pressure = Math.max(context.toCallBb || 0, context.openSize || 2.2, context.threeBetSize || 0);
    return roundBb((context.potBb || 0) + pressure);
  }
  return context.potBb || 2.5;
}

function renderRunoutModes() {
  el.runoutModeButtons.innerHTML = runoutModes
    .map(
      (mode) => `
        <button type="button" data-runout="${mode.id}" class="${state.runoutMode === mode.id ? "is-active" : ""}">
          ${t(mode.labelKey)}
        </button>
      `,
    )
    .join("");

  el.runoutModeButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.runoutMode = button.dataset.runout;
      state.runout = null;
      render();
    });
  });
}

function renderRunoutBox(context, rec) {
  updatePlayOutButtonText(context);

  if (!state.runout) {
    const cue = state.runoutMode === "showdown" ? t("runout.cueShowdown") : t("runout.cueStreet");
    el.runoutBox.innerHTML = `<p>${cue}</p>`;
    return;
  }

  el.runoutBox.innerHTML = `
    <div class="runout-board">
      ${renderRunoutStreet("table.flop", state.runout.flop)}
      ${state.runout.turn ? renderRunoutStreet("table.turn", [state.runout.turn]) : ""}
      ${state.runout.river ? renderRunoutStreet("table.river", [state.runout.river]) : ""}
    </div>
    <strong>${runoutOutcomeTitle(state.runout.outcome)}</strong>
    ${state.runout.showdown ? renderShowdownSummary(state.runout.showdown) : ""}
    ${state.runout.quiz ? renderStreetQuiz(state.runout.quiz) : ""}
    ${renderRunoutAdvice(state.runout.advice)}
    <p>${renderRunoutSummaryText(rec)}</p>
  `;
  bindStreetQuizActions();
}

function renderRunoutSummaryText(rec) {
  if (state.runout?.quiz) {
    const quiz = state.runout.quiz;
    return `${runoutOutcomeBody(state.runout.outcome)} ${
      state.lang === "zh"
        ? `这一街主线是 ${actionLabel(quiz.primary)}${quiz.secondary ? `，低频混合 ${actionLabel(quiz.secondary)}` : ""}。`
        : `The street line starts with ${actionLabel(quiz.primary)}${quiz.secondary ? `, mixed with ${actionLabel(quiz.secondary)}` : ""}.`
    }`;
  }

  return `${runoutOutcomeBody(state.runout.outcome)} ${
    state.lang === "zh"
      ? `翻前/当前建议从 ${actionLabel(rec.primary)} 开始${rec.secondary ? `，可混合 ${actionLabel(rec.secondary)}` : ""}。`
      : `Current recommendation starts with ${actionLabel(rec.primary)}${rec.secondary ? `, mixed with ${actionLabel(rec.secondary)}` : ""}.`
  }`;
}

function updatePlayOutButtonText(context) {
  if (state.runout?.quiz && !state.runout.quiz.chosen) {
    el.playOutHand.textContent = state.lang === "zh" ? "先选行动" : "Answer First";
    return;
  }

  if (state.runout?.quiz?.chosen === "Fold") {
    el.playOutHand.textContent = state.lang === "zh" ? "手牌结束" : "Hand Ends";
    return;
  }

  if (state.runoutMode === "showdown") {
    el.playOutHand.textContent = t("button.showdown");
    return;
  }

  const visibleCount = state.runout?.board?.length || context.board?.length || 0;
  if (visibleCount < 3) {
    el.playOutHand.textContent = t("button.dealFlop");
  } else if (visibleCount < 4) {
    el.playOutHand.textContent = t("button.dealTurn");
  } else if (visibleCount < 5) {
    el.playOutHand.textContent = t("button.dealRiver");
  } else {
    el.playOutHand.textContent = t("button.showdown");
  }
}

function renderRunoutStreet(labelKey, cards) {
  if (!cards?.length) return "";
  return `<span>${t(labelKey)} ${boardText(cards)}</span>`;
}

function buildStreetQuiz(context, rec, chosenAction, board, priorPotBb) {
  const line = buildVillainStreetLine(context, chosenAction, board, priorPotBb);
  const decision = recommendStreetDecision(board, line, rec);
  return {
    street: streetNameFromBoard(board),
    line,
    actions: line.action === "Bet" ? ["Fold", "Call", "Raise"] : ["Check", "Bet"],
    chosen: null,
    ...decision,
  };
}

function buildVillainStreetLine(context, chosenAction, board, priorPotBb) {
  const street = streetNameFromBoard(board);
  const villainPosition = context.threeBettorPosition || context.openerPosition || pickShowdownVillain(context);
  const texture = analyzeFlopHand(state.current.cards, board);
  const score = scoreSevenCards([...state.current.cards, ...board]);
  const streetCard = board[board.length - 1];
  const scareCard = ["A", "K", "Q"].includes(streetCard?.rank);
  const boardWet = texture.flushDraw || texture.openEnded || texture.gutshot || texture.boardPaired;
  const heroLooksStrong = score.rank >= 2 || texture.monster || texture.topPairTopKicker;
  const villainWasAggressor = Boolean(context.threeBettorPosition || context.openerPosition) && chosenAction !== "Raise";
  let betFrequency = villainWasAggressor ? 58 : 36;

  if (street === "flop" && context.spot === "flopVsCbet") betFrequency = 76;
  if (scareCard) betFrequency += 10;
  if (boardWet) betFrequency -= 8;
  if (heroLooksStrong) betFrequency -= 12;
  if (street === "river" && score.rank === 0) betFrequency += 8;

  const willBet = Math.random() * 100 < Math.max(18, Math.min(82, betFrequency));
  const potBeforeBb = roundBb(Math.max(1.5, priorPotBb || context.potBb || 2.5));

  if (!willBet) {
    return {
      street,
      villainPosition,
      action: "Check",
      potBeforeBb,
      potAfterBb: potBeforeBb,
      intent: heroLooksStrong ? "pot-control" : "range-check",
    };
  }

  const sizeFraction = weightedChoice([
    { value: 0.33, weight: street === "flop" ? 44 : 30 },
    { value: 0.5, weight: 34 },
    { value: 0.75, weight: street === "river" ? 28 : 18 },
  ]);
  const betBb = roundBb(Math.max(1, potBeforeBb * sizeFraction));
  const intent = heroLooksStrong
    ? "thin-value"
    : scareCard || (street === "river" && score.rank === 0)
      ? "bluff"
      : "range-bet";

  return {
    street,
    villainPosition,
    action: "Bet",
    betBb,
    potBeforeBb,
    potAfterBb: roundBb(potBeforeBb + betBb),
    intent,
  };
}

function recommendStreetDecision(board, line, rec) {
  const texture = analyzeFlopHand(state.current.cards, board);
  const score = scoreSevenCards([...state.current.cards, ...board]);
  const river = board.length >= 5;
  const betFraction = line.betBb ? line.betBb / Math.max(1, line.potBeforeBb) : 0;
  let primary = "Check";
  let secondary = "";
  let primaryFreq = 100;

  if (line.action === "Check") {
    if (score.rank >= 2 || texture.monster || texture.overpair || texture.topPairTopKicker) {
      primary = "Bet";
      secondary = score.rank === 1 ? "Check" : "";
      primaryFreq = secondary ? 72 : 100;
    } else if (!river && (texture.flushDraw || texture.openEnded || texture.gutshot || texture.twoOvercards)) {
      primary = "Bet";
      secondary = "Check";
      primaryFreq = texture.flushDraw || texture.openEnded ? 58 : 38;
    } else {
      primary = "Check";
      primaryFreq = 100;
    }
  } else if (score.rank >= 3 || texture.monster || (!river && texture.comboDraw)) {
    primary = "Raise";
    secondary = "Call";
    primaryFreq = score.rank >= 3 || texture.monster ? 64 : 46;
  } else if (score.rank >= 1 || texture.topPair || texture.secondPair || texture.underPair) {
    primary = betFraction <= 0.55 || texture.topPairTopKicker ? "Call" : "Fold";
    secondary = primary === "Call" && betFraction >= 0.65 ? "Fold" : "";
    primaryFreq = secondary ? 62 : 100;
  } else if (!river && (texture.flushDraw || texture.openEnded || texture.gutshot || texture.twoOvercards)) {
    primary = betFraction <= 0.65 ? "Call" : "Fold";
    secondary = texture.comboDraw && primary === "Call" ? "Raise" : "";
    primaryFreq = secondary ? 74 : 100;
  } else {
    primary = rec.primary === "Raise" && line.intent === "bluff" ? "Raise" : "Fold";
    secondary = "";
    primaryFreq = 100;
  }

  return {
    primary,
    secondary,
    primaryFreq,
    acceptedActions: [primary, secondary].filter(Boolean),
    note: streetDecisionNote(primary, secondary, line, score, texture, river),
  };
}

function streetDecisionNote(primary, secondary, line, score, texture, river) {
  if (state.lang === "zh") {
    if (primary === "Bet") return secondary ? "这里可以下注施压，也保留一部分过牌控池。听牌或中等强度牌不要自动打太大。" : "你的牌有足够价值或权益，应该主动下注拿价值/保护。";
    if (primary === "Check") return river ? "到河牌没有足够价值下注，优先过牌摊牌或放弃诈唬。" : "这条街权益不够清楚，先过牌控制底池，等下一张牌再判断。";
    if (primary === "Raise") return "你的牌足够强，或有强听牌，可以对下注加压。加注不是乱来，是用价值和 fold equity 一起赚钱。";
    if (primary === "Call") return line.betBb && line.betBb / Math.max(1, line.potBeforeBb) > 0.6 ? "面对偏大下注可以跟，但频率要收紧；这里不是舒服跟，是按范围和赔率继续。" : "跟注能保留对手诈唬和差牌，避免把中等价值牌打得过大。";
    return "这手牌面对下注没有足够摊牌价值或听牌权益，应该弃牌。";
  }

  if (primary === "Bet") return secondary ? "Bet this at frequency, while checking some medium-strength hands for pot control." : "You have enough value or equity to bet for value/protection.";
  if (primary === "Check") return river ? "On the river this does not have enough value to bet; check and realize showdown or give up." : "Equity is not clear enough, so control the pot and reassess next street.";
  if (primary === "Raise") return "This is strong enough, or has enough draw equity, to apply pressure versus the bet.";
  if (primary === "Call") return "Calling keeps bluffs and worse hands in while avoiding overplaying medium value.";
  return "This hand lacks enough showdown value or draw equity versus the bet.";
}

function renderStreetQuiz(quiz) {
  const chosen = quiz.chosen;
  const isCorrect = chosen && quiz.acceptedActions.includes(chosen);
  const lineText = renderVillainLine(quiz.line);
  const result = chosen
    ? `<p class="street-result ${isCorrect ? "correct" : "miss"}">${isCorrect ? t("runout.correct") : t("runout.review")}: ${t("runout.correctLine")} ${actionLabel(quiz.primary)}${quiz.secondary ? ` / ${t("runout.mixedLine")} ${actionLabel(quiz.secondary)} ${100 - quiz.primaryFreq}%` : ""}.</p>`
    : "";

  return `
    <div class="street-quiz">
      <span>${t("runout.quizLabel")} · ${streetDisplayName(quiz.street)}</span>
      <strong>${lineText}</strong>
      <p>${t("runout.question")}</p>
      <div class="street-actions">
        ${quiz.actions
          .map((action) => `<button type="button" data-street-action="${action}" class="${chosen === action ? "is-picked" : ""} ${quiz.acceptedActions.includes(action) ? "is-answer" : ""}">${actionLabel(action)}</button>`)
          .join("")}
      </div>
      ${result}
      ${chosen ? `<p>${quiz.note}</p>` : ""}
    </div>
  `;
}

function renderVillainLine(line) {
  if (line.action === "Check") {
    return state.lang === "zh"
      ? `${line.villainPosition} ${actionLabel("Check")}，底池 ${formatBb(line.potBeforeBb)}`
      : `${line.villainPosition} checks, pot ${formatBb(line.potBeforeBb)}`;
  }

  return state.lang === "zh"
    ? `${line.villainPosition} ${actionLabel("Bet")} ${formatBb(line.betBb)} / 底池 ${formatBb(line.potBeforeBb)}`
    : `${line.villainPosition} bets ${formatBb(line.betBb)} into ${formatBb(line.potBeforeBb)}`;
}

function bindStreetQuizActions() {
  el.runoutBox.querySelectorAll("[data-street-action]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!state.runout?.quiz) return;
      state.runout.quiz.chosen = button.dataset.streetAction;
      render();
    });
  });
}

function streetNameFromBoard(board) {
  if (board.length >= 5) return "river";
  if (board.length >= 4) return "turn";
  return "flop";
}

function streetDisplayName(street) {
  return {
    flop: t("table.flop"),
    turn: t("table.turn"),
    river: t("table.river"),
  }[street] || street;
}

function buildRunoutAdvice(context, rec, chosenAction, board, outcome, showdown, quiz = null) {
  if (showdown) {
    return {
      tone: "showdown",
      title: state.lang === "zh" ? "复盘全下前的决定" : "Review the all-in decision",
      body: t("runout.noMoreAction"),
    };
  }

  if (chosenAction === "Fold") {
    return {
      tone: "fold",
      title: actionLabel("Fold"),
      body: t("runout.foldedAdvice"),
    };
  }

  if (quiz && !quiz.chosen) {
    return {
      tone: "draw",
      title: t("runout.villainLine"),
      body: quiz.line.action === "Bet"
        ? (state.lang === "zh"
            ? `对手这条街下注 ${formatBb(quiz.line.betBb)}，可能是 ${villainIntentText(quiz.line.intent)}。先按底池赔率、牌力和 blocker 做决定。`
            : `Villain bets ${formatBb(quiz.line.betBb)} here, often as ${villainIntentText(quiz.line.intent)}. Decide by price, hand class, and blockers.`)
        : t("runout.checkedToHero"),
    };
  }

  const score = scoreSevenCards([...state.current.cards, ...board]);
  const streetDone = board.length >= 5;
  const texture = board.length >= 3 ? analyzeFlopHand(state.current.cards, board) : {};

  if (score.rank >= 4 || texture.monster) {
    return {
      tone: "value",
      title: state.lang === "zh" ? "价值下注 / 可以跟全下" : "Value bet / call off",
      body: state.lang === "zh"
        ? "你现在是很强的成牌。真实局里优先下注拿价值，被加注时通常继续，不要因为怕牌面就过度慢打。"
        : "You now have a very strong made hand. In practice, bet for value and continue versus most raises instead of over-slowplaying.",
    };
  }

  if (score.rank >= 2 || texture.topPairTopKicker || texture.overpair) {
    return {
      tone: "value",
      title: state.lang === "zh" ? "下注拿价值，小心大压力" : "Bet for value, respect big pressure",
      body: state.lang === "zh"
        ? "两对、超对或强顶对可以继续拿价值。面对小下注可以跟，面对大额全下要重新看对手范围和 SPR。"
        : "Two pair, overpairs, and strong top pair can keep taking value. Call smaller bets, but re-check ranges and SPR versus a large shove.",
    };
  }

  if (score.rank === 1 || texture.topPair || texture.secondPair || texture.underPair) {
    return {
      tone: "control",
      title: state.lang === "zh" ? "控池：过牌/跟小注" : "Pot control: check/call small",
      body: state.lang === "zh"
        ? "一对牌通常不是自动打光。可以跟合理小注，面对大尺码压力要愿意弃牌。"
        : "One-pair hands are not automatic stack-offs. Continue versus reasonable small bets, but be ready to fold to heavy pressure.",
    };
  }

  if (!streetDone && (texture.flushDraw || texture.openEnded || texture.gutshot || texture.twoOvercards || texture.lightContinue)) {
    return {
      tone: "draw",
      title: state.lang === "zh" ? "看赔率继续，部分半诈唬" : "Continue by price, mix semi-bluffs",
      body: state.lang === "zh"
        ? "你有听牌或高张权益。跟注要看底池赔率；有 fold equity 和好 blocker 时可以混合加注。"
        : "You have draw or overcard equity. Call when the price is right; mix raises when fold equity and blockers are good.",
    };
  }

  return {
    tone: "fold",
    title: state.lang === "zh" ? "过牌/弃牌，少做无权益诈唬" : "Check/fold, avoid low-equity bluffs",
    body: state.lang === "zh"
      ? "这条 runout 没有给你足够摊牌价值或听牌。真实局里多选择放弃，只在 blocker 很好时低频诈唬。"
      : "This runout did not give enough showdown or draw value. In real play, give up often and bluff only at low frequency with good blockers.",
  };
}

function villainIntentText(intent) {
  if (state.lang === "zh") {
    return {
      bluff: "诈唬压力",
      "thin-value": "薄价值下注",
      "range-bet": "范围下注",
      "pot-control": "控池",
      "range-check": "范围过牌",
    }[intent] || "混合线路";
  }

  return {
    bluff: "bluff pressure",
    "thin-value": "thin value",
    "range-bet": "a range bet",
    "pot-control": "pot control",
    "range-check": "a range check",
  }[intent] || "a mixed line";
}

function renderRunoutAdvice(advice) {
  if (!advice) return "";
  return `
    <div class="next-advice ${advice.tone}">
      <span>${t("runout.adviceLabel")}</span>
      <strong>${advice.title}</strong>
      <p>${advice.body}</p>
    </div>
  `;
}

function runoutOutcomeTitle(outcome) {
  if (state.lang !== "zh") return outcome.title;
  return {
    "Strong runout": "强牌 runout",
    "Showdown path": "可以摊牌的路径",
    "Equity but not made": "有权益但未成牌",
    "Give-up branch": "放弃分支",
  }[outcome.title] || outcome.title;
}

function runoutOutcomeBody(outcome) {
  if (state.lang !== "zh") return outcome.body;
  return {
    "Strong runout": "你的牌在这个牌面提升成强成牌。复盘重点是怎样下注拿价值，以及不要过度慢打。",
    "Showdown path": "你有一对或类似摊牌价值，但下注尺度很关键。这类牌常常是控池继续，而不是自动打光。",
    "Equity but not made": "这条 runout 给你一些权益或高张价值，但不是干净成牌。重点看底池赔率和未来 fold equity。",
    "Give-up branch": "这条 runout 没帮到足够多。实战里通常过牌摊牌、面对压力弃牌，或只用好 blocker 做低频诈唬。",
  }[outcome.title] || outcome.body;
}

function localizedRecNote(rec, context) {
  if (state.lang !== "zh") return rec.note;
  if (rec.primary === "Fold") {
    return "这手牌低于当前局面的继续范围。现实训练里要先守住位置、筹码深度和底池赔率，不要因为牌面好看就硬跟。";
  }
  if (rec.primary === "Jam") {
    return "短筹时全下能最大化 fold equity，也避免翻后 SPR 太尴尬。只要这手牌在全下范围里，就直接施压。";
  }
  if (rec.primary === "Call") {
    return context?.spot === "flopVsCbet"
      ? "这手牌有足够摊牌价值或听牌权益。跟注可以保留对手弱牌，同时避免把中等强度牌打得太大。"
      : "这手牌有足够原始权益和实现率，可以跟注继续。筹码更浅时才更偏向全下。";
  }
  if (rec.primary === "Raise" || rec.primary === "3-bet" || rec.primary === "4-bet") {
    return "这手牌适合主动施压。加注能拿主动权、隔离范围，并让对手的边缘牌付出代价。";
  }
  return rec.note;
}

function boardLabelText(label) {
  if (label === "Flop") return t("table.flop");
  if (label === "Turn") return t("table.turn");
  if (label === "River") return t("table.river");
  return label;
}

function shouldOpenShowdown(action, rec) {
  if (action === "Fold") return false;
  return action === "Jam" || (!state.chosenAction && rec.primary === "Jam");
}

function pickShowdownVillain(context) {
  if (context.threeBettorPosition) return context.threeBettorPosition;
  if (context.openerPosition) return context.openerPosition;

  const positions = getActivePositions(state.tableSize);
  const heroIndex = positions.indexOf(state.position);
  const candidates = positions.filter((position, index) => {
    if (position === state.position) return false;
    return blindPosted(position) > 0 || index > heroIndex;
  });
  const fallback = positions.filter((position) => position !== state.position);
  const pool = (candidates.length ? candidates : fallback).map((position) => ({
    value: position,
    weight: blindPosted(position) > 0 ? 5 : Math.max(1, positionLeverage(position, state.tableSize) - heroIndex + 1),
  }));

  return weightedChoice(pool);
}

function drawVillainCards(position, context, excludedCards) {
  const key = pickVillainHandKey(position, context);
  return cardsFromKeyExcluding(key, excludedCards) || drawRandomCards(2, excludedCards);
}

function pickVillainHandKey(position, context) {
  const byTable = ranges[state.tableSize];
  let source = byTable.open[position] || new Set();
  if (context.spot === "open") source = byTable.callRaise[position] || source;
  if (context.spot === "vs3bet") source = byTable.threeBet[position] || source;
  if (context.spot === "flopVsCbet") source = byTable.open[position] || source;

  const pool = allHands
    .map((hand) => {
      const strength = handStrength(hand.key);
      const inRange = source.has(hand.key);
      const premiumFallback = strength >= 78;
      return {
        value: hand.key,
        weight: inRange ? 30 + Math.round(strength / 6) : premiumFallback ? Math.round((strength - 70) / 3) : 0,
      };
    })
    .filter((entry) => entry.weight > 0);

  return weightedChoice(pool.length ? pool : allHands.map((hand) => ({ value: hand.key, weight: Math.max(1, Math.round(handStrength(hand.key) / 20)) })));
}

function buildShowdownResult(context, villainPosition, villainCards, board) {
  const heroScore = scoreSevenCards([...state.current.cards, ...board]);
  const villainScore = scoreSevenCards([...villainCards, ...board]);
  const compare = compareScores(heroScore, villainScore);
  const villainStack = getSeatStack(villainPosition);
  const allInBb = roundBb(Math.min(state.stackBb, villainStack));
  const potBb = roundBb((context.potBb || 0) + allInBb * 2);
  const resultText = compare > 0 ? "Hero wins" : compare < 0 ? `${villainPosition} wins` : "Chop pot";

  return {
    villainPosition,
    villainCards,
    allInBb,
    potBb,
    resultText,
    winner: compare > 0 ? "hero" : compare < 0 ? "villain" : "chop",
    heroHandName: heroScore.name,
    villainHandName: villainScore.name,
  };
}

function showdownResultText(showdown) {
  if (state.lang !== "zh") return showdown.resultText;
  if (showdown.winner === "hero") return "Hero 赢下";
  if (showdown.winner === "villain") return `${showdown.villainPosition} 赢下`;
  return t("table.chopPot");
}

function renderShowdownSummary(showdown) {
  const villainCards = showdown.villainCards.map((card) => `${card.rank}${card.suit.symbol}`).join(" ");
  return `
    <div class="showdown-summary">
      <span>${t("runout.showdownLabel")}</span>
      <strong>${showdownResultText(showdown)} · ${formatBb(showdown.potBb)}</strong>
      <p>${state.lang === "zh" ? `Hero ${handNameText(showdown.heroHandName)}；${showdown.villainPosition} 摊出 ${villainCards}，牌型是 ${handNameText(showdown.villainHandName)}。` : `Hero ${showdown.heroHandName}; ${showdown.villainPosition} shows ${villainCards} for ${showdown.villainHandName}.`}</p>
    </div>
  `;
}

function handNameText(name) {
  if (state.lang !== "zh") return name;
  return {
    "straight flush": "同花顺",
    "four of a kind": "四条",
    "full house": "葫芦",
    flush: "同花",
    straight: "顺子",
    "three of a kind": "三条",
    "two pair": "两对",
    "one pair": "一对",
    "high card": "高牌",
  }[name] || name;
}

function cardsFromKeyExcluding(key, excludedCards) {
  const parsed = parseHandKey(key);
  const blocked = new Set(excludedCards.map(cardId));
  const candidates = [];

  if (parsed.high === parsed.low) {
    suits.forEach((firstSuit, firstIndex) => {
      suits.slice(firstIndex + 1).forEach((secondSuit) => {
        candidates.push([
          { rank: parsed.high, suit: firstSuit },
          { rank: parsed.low, suit: secondSuit },
        ]);
      });
    });
  } else if (parsed.suited) {
    suits.forEach((suit) => {
      candidates.push([
        { rank: parsed.high, suit },
        { rank: parsed.low, suit },
      ]);
    });
  } else {
    suits.forEach((firstSuit) => {
      suits.forEach((secondSuit) => {
        if (firstSuit.name !== secondSuit.name) {
          candidates.push([
            { rank: parsed.high, suit: firstSuit },
            { rank: parsed.low, suit: secondSuit },
          ]);
        }
      });
    });
  }

  const available = candidates.filter((cards) => cards.every((card) => !blocked.has(cardId(card))));
  if (!available.length) return null;
  return available[randomInt(0, available.length - 1)];
}

function scoreSevenCards(cards) {
  const values = cards.map((card) => rankValue[card.rank]).sort((a, b) => b - a);
  const counts = new Map();
  const suitsByName = new Map();

  cards.forEach((card) => {
    const value = rankValue[card.rank];
    counts.set(value, (counts.get(value) || 0) + 1);
    if (!suitsByName.has(card.suit.name)) suitsByName.set(card.suit.name, []);
    suitsByName.get(card.suit.name).push(value);
  });

  const groups = [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count || b.value - a.value);
  const flushValues = [...suitsByName.values()].find((items) => items.length >= 5)?.sort((a, b) => b - a) || [];
  const straightFlushHigh = flushValues.length ? straightHigh(flushValues) : 0;
  if (straightFlushHigh) return handScore(8, [straightFlushHigh], "straight flush");

  const quads = groups.find((group) => group.count === 4);
  if (quads) {
    const kicker = values.find((value) => value !== quads.value);
    return handScore(7, [quads.value, kicker], "four of a kind");
  }

  const trips = groups.filter((group) => group.count === 3);
  const pairs = groups.filter((group) => group.count === 2);
  if (trips.length && (pairs.length || trips.length > 1)) {
    const pairValue = pairs[0]?.value || trips[1].value;
    return handScore(6, [trips[0].value, pairValue], "full house");
  }

  if (flushValues.length) return handScore(5, flushValues.slice(0, 5), "flush");

  const straight = straightHigh(values);
  if (straight) return handScore(4, [straight], "straight");

  if (trips.length) {
    const kickers = values.filter((value) => value !== trips[0].value).slice(0, 2);
    return handScore(3, [trips[0].value, ...kickers], "three of a kind");
  }

  if (pairs.length >= 2) {
    const topPairs = pairs.slice(0, 2).map((pair) => pair.value);
    const kicker = values.find((value) => !topPairs.includes(value));
    return handScore(2, [...topPairs, kicker], "two pair");
  }

  if (pairs.length === 1) {
    const kickers = values.filter((value) => value !== pairs[0].value).slice(0, 3);
    return handScore(1, [pairs[0].value, ...kickers], "one pair");
  }

  return handScore(0, values.slice(0, 5), "high card");
}

function handScore(rank, kickers, name) {
  return { rank, kickers, name };
}

function straightHigh(values) {
  const unique = [...new Set(values)];
  if (unique.includes(14)) unique.push(1);
  for (let high = 14; high >= 5; high -= 1) {
    const sequence = [high, high - 1, high - 2, high - 3, high - 4];
    if (sequence.every((value) => unique.includes(value))) return high;
  }
  return 0;
}

function compareScores(first, second) {
  if (first.rank !== second.rank) return first.rank - second.rank;
  const max = Math.max(first.kickers.length, second.kickers.length);
  for (let index = 0; index < max; index += 1) {
    const diff = (first.kickers[index] || 0) - (second.kickers[index] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function renderBars(profile) {
  return profile
    .map(
      (item) => `
        <div class="bar-row">
          <span>${actionLabel(item.action)}</span>
          <div class="bar-track"><div class="bar-fill ${actionClass(item.action)} ${item.mix ? "mix" : ""}" style="--value:${item.freq}%"></div></div>
          <span>${item.freq}%</span>
        </div>
      `,
    )
    .join("");
}

function hiddenProfile(actions) {
  const even = Math.floor(100 / actions.length);
  let remaining = 100;
  return actions.map((action, index) => {
    const freq = index === actions.length - 1 ? remaining : even;
    remaining -= freq;
    return { action, freq };
  });
}

function renderRange() {
  const spot = spotById(state.spot);
  const context = state.context || buildSpotContext(state.position, state.spot, state.tableSize, state.stackBb, state.current);
  el.rangeContext.textContent = `${tableConfigs[state.tableSize].label} / ${state.stackBb}BB / ${state.position} / ${spotLabel(spot.id)}`;
  el.rangeMatrix.innerHTML = allHands
    .map((hand) => {
      const rec = recommend(hand.key, state.position, state.spot, state.tableSize, state.stackBb, context);
      const className = cellClass(rec);
      const selected = hand.key === state.selectedKey ? " is-selected" : "";
      return `<button type="button" class="${className}${selected}" data-hand="${hand.key}" aria-label="${hand.key} ${actionLabel(rec.primary)}">${hand.key}</button>`;
    })
    .join("");
  el.rangeMatrix.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedKey = button.dataset.hand;
      state.current = handFromKey(state.selectedKey);
      if (state.spot === "flopVsCbet" && state.context?.board && cardsOverlap(state.current.cards, state.context.board)) {
        rebuildContext(state.current);
      }
      state.chosenAction = null;
      state.answered = false;
      render();
    });
  });
  renderSelectedHand();
}

function renderSelectedHand() {
  const context = state.context || buildSpotContext(state.position, state.spot, state.tableSize, state.stackBb, state.current);
  const rec = recommend(state.selectedKey, state.position, state.spot, state.tableSize, state.stackBb, context);
  el.selectedHandDetail.innerHTML = `
    <strong>${state.selectedKey}</strong>
    <span>${tableConfigs[state.tableSize].label} · ${state.stackBb}BB · ${state.position}</span>
    <span>${context.summary}</span>
    ${context.board ? `<span>${t("table.board")} ${boardText(context.board)}</span>` : ""}
    <p>${actionLabel(rec.primary)}${rec.secondary ? `, ${t("line.mix")} ${actionLabel(rec.secondary)}` : ""}. ${localizedRecNote(rec, context)}</p>
  `;
}

function renderOdds() {
  const pot = Number(el.potSize.value);
  const call = Number(el.callSize.value);
  const outs = Number(el.outs.value);
  const breakEven = call / (pot + call);
  const rawEquity = state.streetMode === "two" ? outs * 4 : outs * 2;
  const equity = Math.min(rawEquity, 95) / 100;
  const edge = equity - breakEven;

  el.potSizeValue.textContent = `${pot}BB`;
  el.callSizeValue.textContent = `${call}BB`;
  el.outsValue.textContent = `${outs}`;
  el.breakEven.textContent = formatPct(breakEven);
  el.equity.textContent = formatPct(equity);
  el.equityNeedle.style.setProperty("--needle", `${Math.max(0, Math.min(100, equity * 100))}%`);

  el.oddsDecision.classList.remove("warning", "bad");
  if (edge >= 0.06) {
    el.oddsDecision.textContent = t("odds.good");
  } else if (edge >= 0) {
    el.oddsDecision.textContent = t("odds.thin");
    el.oddsDecision.classList.add("warning");
  } else {
    el.oddsDecision.textContent = t("odds.bad");
    el.oddsDecision.classList.add("bad");
  }
}

function renderNotes() {
  el.notesGrid.innerHTML = notes
    .map(
      (note) => `
        <article>
          <h2>${noteTitle(note)}</h2>
          <p>${noteBody(note)}</p>
        </article>
      `,
    )
    .join("");
}

function noteTitle(note) {
  if (state.lang !== "zh") return note.title;
  return {
    "Short-stack reality": "短筹现实",
    "Late-position steals": "后位偷盲",
    "Flat less when shallow": "短筹少平跟",
    "8-max starts tighter": "8人桌前位更紧",
    "Use the matrix": "用矩阵看频率",
    "Why no call": "为什么没有 Call",
  }[note.title] || note.title;
}

function noteBody(note) {
  if (state.lang !== "zh") return note.body;
  return {
    "Short-stack reality": "5BB 到 15BB 很多锦标赛局面会变成全下为主。正确答案常常来自 fold equity 和保留筹码，而不是手牌看起来漂不漂亮。",
    "Late-position steals": "12BB 到 25BB 时，CO、BTN、SB 的压力价值更高。深筹弃牌的手，在有 ante 和奖金压力时可能变成可开池或可全下。",
    "Flat less when shallow": "筹码越短，弱平跟越容易亏。面对加注时，通常要更清楚地区分弃牌、可实现权益的跟注，以及用全下施压。",
    "8-max starts tighter": "身后人更多，前位开池必须更紧。8人桌前位范围明显不能按6人桌后位来打。",
    "Use the matrix": "如果一手牌在两个动作之间混合，就当成频率题来看。矩阵能帮你区分纯继续、纯弃牌和混合频率。",
    "Why no call": "无人入池开池时没有 Call，因为没人先下注。面对 open、3-bet 或翻牌 c-bet 时，Call 会出现。",
  }[note.title] || note.body;
}

function renderScore() {
  const accuracy = state.played ? Math.round((state.correct / state.played) * 100) : 0;
  el.accuracy.textContent = `${accuracy}%`;
  el.streak.textContent = state.streak;
  el.handsPlayed.textContent = state.played;
}

function pickRealisticSpotSetup(spot, tableSize) {
  if (blindBattleSpots.has(spot) && Math.random() < 0.48) {
    const battle = weightedChoice([
      { value: { heroPosition: "BB", openerPosition: "BTN" }, weight: 55 },
      { value: { heroPosition: "BB", openerPosition: "SB" }, weight: 32 },
      { value: { heroPosition: "SB", openerPosition: "BTN" }, weight: 13 },
    ]);
    if (getCandidatePositions(spot, tableSize).includes(battle.heroPosition)) {
      return battle;
    }
  }

  return {
    heroPosition: pickRealisticHeroPosition(spot, tableSize),
    openerPosition: null,
  };
}

function pickRealisticHeroPosition(spot, tableSize) {
  const weights = realisticPositionWeights[tableSize]?.[spot] || {};
  const candidates = getCandidatePositions(spot, tableSize);
  return weightedChoice(
    candidates.map((position) => ({
      value: position,
      weight: weights[position] || 1,
    })),
  );
}

function randomTournamentSpot({ fullRandom = true, preserveScore = false } = {}) {
  if (fullRandom) {
    state.stackBb = randomTournamentStack();
    state.spot = weightedChoice([
      { value: "open", weight: 32 },
      { value: "vsRaise", weight: 36 },
      { value: "vs3bet", weight: 10 },
      { value: "flopVsCbet", weight: 22 },
    ]);
    const setup = pickRealisticSpotSetup(state.spot, state.tableSize);
    state.position = setup.heroPosition;
    state.forcedOpener = setup.openerPosition || null;
    state.context = null;
  }

  normalizeState();
  state.current = handFromKey(pickTrainingHand(state.position, state.spot, state.tableSize, state.stackBb, state.selectedKey));
  if (!fullRandom && state.spot === "flopVsCbet" && state.context?.board) {
    let guard = 0;
    while (cardsOverlap(state.current.cards, state.context.board) && guard < 12) {
      state.current = handFromKey(pickTrainingHand(state.position, state.spot, state.tableSize, state.stackBb, state.current.key));
      guard += 1;
    }
  }
  state.selectedKey = state.current.key;
  if (fullRandom || !state.context) {
    rebuildContext(state.current);
  }
  state.forcedOpener = state.context?.openerPosition || state.forcedOpener;
  state.runout = null;
  state.chosenAction = null;
  state.answered = false;
  if (!preserveScore) {
    renderScore();
  }
  render();
}

function pickTrainingHand(position, spot, tableSize, stackBb, previous = "") {
  const pool = allHands.map((hand) => {
    const rec = recommend(hand.key, position, spot, tableSize, stackBb);
    const strength = handStrength(hand.key);
    const weight = trainingWeight(rec, strength, hand.key, spot, stackBb, position, tableSize);
    return { value: hand.key, weight };
  });

  let pick = weightedChoice(pool);
  if (pick === previous) {
    pick = weightedChoice(pool);
  }
  return pick;
}

function trainingWeight(rec, strength, key, spot, stackBb, position, tableSize) {
  const traits = inspectHand(key);
  const earlySeat = positionLeverage(position, tableSize) <= (tableSize === 8 ? 3 : 1);
  const offsuitTrash = !traits.isPair && !traits.suited && strength < 62 && !traits.isBroadway;
  let weight = 1;

  if (rec.primary !== "Fold") weight += 12;
  if (rec.secondary) weight += 5;
  if (strength >= 58 && strength <= 84) weight += 4;
  if (traits.isPair || traits.hasAce) weight += 1;
  if (spot !== "open" && stackBb <= 20 && rec.primary === "Jam") weight += 5;
  if (stackBb <= 12 && spot === "open" && rec.primary !== "Fold") weight += 3;
  if (spot === "open" && earlySeat && offsuitTrash) weight = Math.max(1, Math.floor(weight * 0.08));
  if (spot === "open" && ["CO", "BTN", "SB"].includes(position) && rec.primary !== "Fold") weight += 8;
  if ((position === "BB" || state.context?.isBlindBattle) && spot !== "open" && rec.primary === "Call") weight += 10;

  return weight;
}

function getSpotActions(spotId, stackBb) {
  if (spotId === "flopVsCbet") {
    return ["Fold", "Call", "Raise"];
  }

  if (state.gameMode === "cash") {
    if (spotId === "open") return ["Fold", "Raise"];
    if (spotId === "vsRaise") return ["Fold", "Call", "3-bet"];
    return ["Fold", "Call", "4-bet"];
  }

  if (spotId === "open") {
    if (stackBb <= 11) return ["Fold", "Jam"];
    if (stackBb <= 20) return ["Fold", "Raise", "Jam"];
    return ["Fold", "Raise"];
  }

  if (spotId === "vsRaise") {
    const blindDefense = state.position === "BB" || state.context?.isBlindBattle || state.forcedOpener === "SB" || state.forcedOpener === "BTN";
    if (stackBb <= 8 && !blindDefense) return ["Fold", "Jam"];
    if (stackBb <= 11 && !blindDefense) return ["Fold", "Jam"];
    if (stackBb <= 11 && blindDefense) return ["Fold", "Call", "Jam"];
    if (stackBb <= 20) return ["Fold", "Call", "Jam"];
    return ["Fold", "Call", "3-bet"];
  }

  if (stackBb <= 16) return ["Fold", "Jam"];
  if (stackBb <= 25) return ["Fold", "Call", "Jam"];
  return ["Fold", "Call", "4-bet"];
}

function recommend(key, position, spot, tableSize, stackBb, context = null) {
  const actions = getSpotActions(spot, stackBb);
  const traits = inspectHand(key);
  const strength = handStrength(key);
  const openSet = ranges[tableSize].open[position] || new Set();
  const threeBetSet = ranges[tableSize].threeBet[position] || new Set();
  const callRaiseSet = ranges[tableSize].callRaise[position] || new Set();
  const fourBetSet = ranges[tableSize].fourBet[position] || new Set();
  const call3betSet = ranges[tableSize].call3bet[position] || new Set();
  const positionLift = positionLeverage(position, tableSize);

  if (spot === "flopVsCbet") {
    return recommendFlopVsCbet(key, actions, context);
  }

  if (spot === "open") {
    const cutoff = openThreshold(position, tableSize) + shallowOpenPenalty(stackBb, position, tableSize);
    const lateStealSeat = ["CO", "BTN", "SB"].includes(position);
    const dominatedOffsuit = !traits.isPair && !traits.suited && !traits.isBroadway && !(traits.hasAce && traits.lowValue >= 10);
    const playable = openSet.has(key) || (lateStealSeat && !dominatedOffsuit && strength + positionLift * 2 >= cutoff);
    if (!playable) {
      return foldRec(actions, "This combo sits below the realistic tournament opening line for this seat. Early and middle positions should not drift into weak offsuit opens.");
    }

    const marginal = !openSet.has(key) || strength < cutoff + 4;
    const jamCandidate =
      actions.includes("Jam") &&
      (strength >= cutoff + 8 ||
        (stackBb <= 15 && isLatePosition(position, tableSize) && (traits.hasAce || traits.isPair || traits.isSuitedConnector)) ||
        (stackBb <= 11 && traits.isPair));

    if (jamCandidate && !actions.includes("Raise")) {
      return actionRec(actions, "Jam", "", 100, "At this stack depth the spot is effectively jam or fold. The combo is strong enough to realize fold equity right now.");
    }

    if (jamCandidate) {
      return actionRec(
        actions,
        "Jam",
        "Raise",
        58,
        "Tournament stacks create a push-or-small-raise mix here. This hand benefits from fold equity and avoids tough postflop SPR spots.",
      );
    }

    return actionRec(
      actions,
      "Raise",
      marginal ? "Fold" : "",
      marginal ? 66 : 100,
      marginal
        ? "This is a lower-edge open. It still plays well enough to enter the pot, but it sits near the bottom of the tournament opening range."
        : "This combo belongs in the opening line and keeps the initiative in a stack depth where pressure matters.",
    );
  }

  if (spot === "vsRaise") {
    const jamCandidate =
      actions.includes("Jam") &&
      (threeBetSet.has(key) ||
        (callRaiseSet.has(key) && stackBb <= 15 && (traits.isPair || traits.hasAce && traits.lowValue >= 10)) ||
        (stackBb <= 11 && strength >= 72));

    const blindDefense = position === "BB" || context?.isBlindBattle;
    const callCandidate =
      actions.includes("Call") &&
      (callRaiseSet.has(key) ||
        (blindDefense && stackBb >= 9 && isBlindDefenseHand(key, context?.openerPosition || "", tableSize)) ||
        (stackBb >= 18 && traits.isSuited && traits.highValue >= 12) ||
        (position === "BB" && stackBb >= 12 && strength >= 52));

    if (jamCandidate && !actions.includes("Call")) {
      return actionRec(actions, "Jam", "", 100, "Shallow tournament stacks convert the aggressive continue into a re-jam. That keeps your line simple and maximizes fold equity.");
    }

    if (jamCandidate) {
      return actionRec(
        actions,
        "Jam",
        callCandidate ? "Call" : "Fold",
        callCandidate ? 63 : 78,
        callCandidate
          ? "This hand is strong enough to continue and often prefers a re-jam at this stack depth. Calling remains part of the mix when realization is clean."
          : "This is a profitable re-jam candidate. You deny equity, pressure weaker opens, and avoid awkward shallow postflop play.",
      );
    }

    if (callCandidate) {
      return actionRec(
        actions,
        "Call",
        stackBb >= 18 && threeBetSet.has(key) ? (actions.includes("Jam") ? "Jam" : "3-bet") : "",
        stackBb >= 18 && threeBetSet.has(key) ? 72 : 100,
        "The hand has enough raw equity and playability to continue, but it does not need to force the pot unless stack pressure or blockers push it upward.",
      );
    }

    return foldRec(actions, "Facing an open, this combo falls short once stack leverage and realization are priced in.");
  }

  const jamCandidate =
    actions.includes("Jam") &&
    (fourBetSet.has(key) ||
      (call3betSet.has(key) && stackBb <= 18 && (traits.isPair && traits.pairValue >= 9 || traits.hasAce && traits.lowValue >= 11)) ||
      strength >= 83);

  const callCandidate =
    actions.includes("Call") &&
    (call3betSet.has(key) ||
      (stackBb >= 22 && traits.isSuited && traits.isBroadway) ||
      (position === "BTN" && stackBb >= 20 && strength >= 66));

  if (jamCandidate && !actions.includes("Call")) {
    return actionRec(actions, "Jam", "", 100, "Once stacks are short enough, premium continues versus a 3-bet become direct jams rather than small 4-bets.");
  }

  if (jamCandidate) {
    return actionRec(
      actions,
      "Jam",
      callCandidate ? "Call" : "Fold",
      callCandidate ? 60 : 82,
      callCandidate
        ? "This combo sits in the value-heavy continue region. Tournament pressure pulls part of the range into a jam while cleaner realizes can still flat."
        : "The strongest continue at this stack depth is to jam. That captures fold equity and avoids playing a capped shallow stack postflop.",
    );
  }

  if (callCandidate) {
    return actionRec(
      actions,
      "Call",
      "",
      100,
      "This hand still realizes enough equity versus a 3-bet, especially when stack depth lets you see flops without needing to force an all-in.",
    );
  }

  return foldRec(actions, "Versus a 3-bet, this combo is not strong enough to continue once tournament stack pressure is factored in.");
}

function recommendFlopVsCbet(key, actions, context = null) {
  const spotContext = context?.board ? context : state.context?.spot === "flopVsCbet" ? state.context : null;
  if (!spotContext?.board) {
    const strength = handStrength(key);
    if (strength >= 86) return actionRec(actions, "Raise", "Call", 56, "Strong made hands and premium draws want to continue aggressively on many flops.");
    if (strength >= 66) return actionRec(actions, "Call", "", 100, "Middle-strength hands continue comfortably once there is a flop and a c-bet to respond to.");
    return foldRec(actions, "Without enough pair value, draw value, or clean overcards, this combo lets go versus the flop c-bet.");
  }

  const heroCards = key === state.current.key ? state.current.cards : cardsFromKeyForBoard(key, spotContext.board);
  const flop = analyzeFlopHand(heroCards, spotContext.board);
  const smallBet = spotContext.betFraction <= 0.34;

  if (flop.monster || flop.comboRaise || (flop.overpair && !flop.boardPaired)) {
    return actionRec(
      actions,
      "Raise",
      "Call",
      flop.monster ? 68 : 55,
      flop.monster
        ? "You connected hard enough with this flop to build the pot now. Raising captures value while still protecting against turn cards."
        : "This is strong enough to mix between call and raise. The hand benefits from denying equity and keeping pressure on the c-bettor.",
    );
  }

  if (flop.strongContinue) {
    return actionRec(
      actions,
      "Call",
      flop.canRaiseMix ? "Raise" : "",
      flop.canRaiseMix ? 72 : 100,
      "This hand has enough showdown value or draw equity to continue. Calling keeps weaker hands in while avoiding overplaying the medium-strength part of range.",
    );
  }

  if (smallBet && flop.lightContinue) {
    return actionRec(
      actions,
      "Call",
      "Fold",
      58,
      "The sizing is small enough that overcards, gutshots, and backdoor equity can continue some of the time, especially when you will realize turns in position.",
    );
  }

  return foldRec(actions, "This misses too hard against the flop c-bet. Without pair value, a real draw, or enough future equity, the clean tournament response is to fold.");
}

function analyzeFlopHand(heroCards, board) {
  const heroValues = heroCards.map((card) => rankValue[card.rank]).sort((a, b) => b - a);
  const boardValues = board.map((card) => rankValue[card.rank]).sort((a, b) => b - a);
  const combined = [...heroCards, ...board];
  const combinedValues = combined.map((card) => rankValue[card.rank]);
  const counts = new Map();
  const boardCounts = new Map();

  combinedValues.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  boardValues.forEach((value) => boardCounts.set(value, (boardCounts.get(value) || 0) + 1));

  const heroMatches = heroValues.filter((value) => boardValues.includes(value));
  const matchedRanks = [...new Set(heroMatches)];
  const pocketPair = heroValues[0] === heroValues[1];
  const topBoard = boardValues[0];
  const secondBoard = boardValues[1];
  const bottomBoard = boardValues[2];
  const boardPaired = new Set(boardValues).size < boardValues.length;

  const madeStraightProfile = detectStraightProfile(combinedValues);
  const heroSuitCounts = new Map();
  const suitCounts = new Map();
  combined.forEach((card) => suitCounts.set(card.suit.name, (suitCounts.get(card.suit.name) || 0) + 1));
  heroCards.forEach((card) => heroSuitCounts.set(card.suit.name, (heroSuitCounts.get(card.suit.name) || 0) + 1));

  let flushDraw = false;
  let nutFlushDraw = false;
  let backdoorFlush = false;
  for (const [suitName, total] of suitCounts.entries()) {
    const heroSuit = heroSuitCounts.get(suitName) || 0;
    if (!heroSuit) continue;
    if (total >= 4) {
      flushDraw = true;
      if (heroCards.some((card) => card.suit.name === suitName && card.rank === "A")) {
        nutFlushDraw = true;
      }
    } else if (total === 3) {
      backdoorFlush = true;
    }
  }

  const set = pocketPair && boardValues.includes(heroValues[0]);
  const trips = !pocketPair && matchedRanks.some((value) => counts.get(value) >= 3);
  const twoPair = !pocketPair && matchedRanks.length >= 2;
  const overpair = pocketPair && heroValues[0] > topBoard && !set;
  const topPair = matchedRanks.includes(topBoard);
  const secondPair = !topPair && matchedRanks.includes(secondBoard);
  const underPair = pocketPair && heroValues[0] < topBoard && heroValues[0] > bottomBoard;
  const topPairTopKicker = topPair && heroValues.includes(14);
  const madeStraight = madeStraightProfile.madeStraight;
  const openEnded = !madeStraight && madeStraightProfile.openEnded;
  const gutshot = !madeStraight && madeStraightProfile.gutshot;
  const twoOvercards = !pocketPair && heroValues[0] > topBoard && heroValues[1] > topBoard;
  const oneOvercard = !pocketPair && heroValues.some((value) => value > topBoard);
  const comboDraw = flushDraw && (openEnded || gutshot);
  const monster = set || trips || twoPair || madeStraight;
  const comboRaise = comboDraw || (topPair && flushDraw) || (topPair && openEnded) || nutFlushDraw;
  const strongContinue =
    overpair ||
    topPair ||
    secondPair ||
    underPair ||
    monster ||
    flushDraw ||
    openEnded ||
    comboDraw ||
    nutFlushDraw;
  const lightContinue = gutshot || twoOvercards || (oneOvercard && backdoorFlush);

  return {
    boardPaired,
    overpair,
    topPair,
    topPairTopKicker,
    secondPair,
    underPair,
    flushDraw,
    nutFlushDraw,
    backdoorFlush,
    openEnded,
    gutshot,
    comboDraw,
    comboRaise,
    strongContinue: strongContinue || topPairTopKicker,
    canRaiseMix: comboRaise || (topPairTopKicker && !boardPaired),
    lightContinue,
    monster,
  };
}

function assessRunout(heroCards, board) {
  const made = analyzeFlopHand(heroCards, board);
  if (made.monster) {
    return {
      title: "Strong runout",
      body: "Your hand improves into a very strong made hand on this board. In real review, this is where value betting and not slowplaying too much becomes the main idea.",
    };
  }

  if (made.overpair || made.topPairTopKicker || made.topPair) {
    return {
      title: "Showdown path",
      body: "You arrive with a pair that can often continue to showdown, but the exact sizing matters. This is a common one-pair tournament spot rather than an automatic stack-off.",
    };
  }

  if (made.flushDraw || made.openEnded || made.gutshot || made.lightContinue) {
    return {
      title: "Equity but not made",
      body: "The runout leaves you with draw or overcard equity rather than a clean made hand. This is the kind of branch where pot odds and future fold equity matter more than the hand name.",
    };
  }

  return {
    title: "Give-up branch",
    body: "This runout does not help enough. In practice this is where the hand often checks down, folds to pressure, or becomes a low-frequency bluff only with good blockers.",
  };
}

function detectStraightProfile(values) {
  const set = new Set(values);
  if (set.has(14)) set.add(1);

  let madeStraight = false;
  let openEnded = false;
  let gutshot = false;
  for (let start = 1; start <= 10; start += 1) {
    const sequence = [start, start + 1, start + 2, start + 3, start + 4];
    const present = sequence.filter((value) => set.has(value));
    if (present.length === 5) {
      madeStraight = true;
      continue;
    }
    if (present.length !== 4) continue;
    const missing = sequence.find((value) => !set.has(value));
    if (missing === start || missing === start + 4) {
      openEnded = true;
    } else {
      gutshot = true;
    }
  }

  return { madeStraight, openEnded, gutshot };
}

function isBlindDefenseHand(key, openerPosition, tableSize) {
  const traits = inspectHand(key);
  const lateOpen = ["CO", "BTN", "SB"].includes(openerPosition) || positionLeverage(openerPosition, tableSize) >= tableConfigs[tableSize].positions.length - 3;

  if (!lateOpen) {
    return traits.isPair || traits.hasAce || traits.isBroadway || (traits.isSuited && traits.highValue >= 11);
  }

  if (traits.isPair || traits.hasAce || traits.isBroadway) return true;
  if (traits.isSuited && traits.highValue >= 9) return true;
  if (traits.isConnector && traits.highValue >= 7) return true;
  if (traits.suited && traits.gap <= 2 && traits.highValue >= 8) return true;
  return openerPosition === "SB" && handStrength(key) >= 48;
}

function isBlindBattle(heroPosition, openerPosition) {
  return (heroPosition === "BB" && ["SB", "BTN"].includes(openerPosition)) || (heroPosition === "SB" && openerPosition === "BTN");
}

function buildSeatMarkup(context) {
  const positions = getActivePositions(state.tableSize);
  const heroIndex = positions.indexOf(state.position);
  return positions
    .map((position, index) => {
      const relativeIndex = (index - heroIndex + positions.length) % positions.length;
      const seat = seatLayouts[state.tableSize][relativeIndex];
      const seatState = describeSeat(position, context);
      const stack = getSeatStack(position);
      const isHero = position === state.position;
      const visibleCards = seatState.revealedCards || null;
      return `
        <div class="seat seat-${relativeIndex} ${seatState.tone} ${stackClass(stack)} ${seatState.folded ? "folded" : "live"} ${isHero ? "hero" : ""} align-${seat.align}" style="--seat-x:${seat.x}%; --seat-y:${seat.y}%;">
          <div class="seat-main">
            ${renderAvatar(position, seatState, isHero)}
            <div class="seat-copy">
              <div class="seat-label">${position}</div>
              <div class="seat-stack">${formatStack(stack)}</div>
              <div class="seat-action">${seatState.status}</div>
            </div>
          </div>
          ${seatState.betBb ? renderBetStack(seatState.betBb) : ""}
          ${isHero ? `<div class="seat-hole-cards">${state.current.cards.map((card) => renderCard(card, "seat-card")).join("")}</div>` : ""}
          ${visibleCards ? `<div class="mini-cards revealed">${visibleCards.map((card) => renderCard(card, "seat-card")).join("")}</div>` : ""}
          ${!visibleCards && seatState.showCards ? `<div class="mini-cards">${renderCardBack()}${renderCardBack()}</div>` : ""}
        </div>
      `;
    })
    .join("");
}

function renderAvatar(position, seatState, isHero) {
  const avatar = getSeatAvatar(position);
  return `
    <div class="avatar ${avatar.variant} ${seatState.folded ? "is-folded" : ""} ${isHero ? "is-hero" : ""}" style="--avatar-hood:${avatar.hood}; --avatar-face:${avatar.face}; --avatar-blush:${avatar.blush}; --avatar-accent:${avatar.accent}; --avatar-eye:${avatar.eye};" aria-hidden="true">
      <span class="avatar-ear left"></span>
      <span class="avatar-ear right"></span>
      <span class="avatar-face">
        <i class="avatar-eye left"></i>
        <i class="avatar-eye right"></i>
        <i class="avatar-mouth"></i>
        <i class="avatar-tooth"></i>
      </span>
    </div>
  `;
}

function renderBetStack(amount) {
  return `
    <div class="bet-stack" aria-label="Bet ${formatBb(amount)}">
      <i></i><i></i><i></i>
      <span>${formatBb(amount)}</span>
    </div>
  `;
}

function buildSeatStacks(context) {
  const positions = getActivePositions(state.tableSize);
  const stacks = {};
  const villain = context.threeBettorPosition || context.openerPosition || context.villainPosition || "";
  const chipLeader = weightedChoice(
    positions
      .filter((position) => position !== state.position)
      .map((position) => ({ value: position, weight: position === villain ? 3 : 1 })),
  );

  positions.forEach((position) => {
    if (position === state.position) {
      stacks[position] = state.stackBb;
      return;
    }

    if (state.gameMode === "cash") {
      stacks[position] = randomCashStack(position === villain);
      return;
    }

    stacks[position] = randomMttStack(position === chipLeader, position === villain);
  });

  return stacks;
}

function buildSeatAvatars() {
  return Object.fromEntries(
    getActivePositions(state.tableSize).map((position) => [
      position,
      avatarStyles[randomInt(0, avatarStyles.length - 1)],
    ]),
  );
}

function getSeatAvatar(position) {
  return state.seatAvatars[position] || avatarStyles[0];
}

function randomMttStack(isChipLeader, isVillain) {
  if (isChipLeader) return randomInt(30, 45);
  const band = weightedChoice([
    { value: [3, 7], weight: 26 },
    { value: [8, 14], weight: 32 },
    { value: [15, 24], weight: isVillain ? 30 : 24 },
    { value: [25, 36], weight: isVillain ? 18 : 10 },
  ]);
  return randomInt(band[0], band[1]);
}

function randomCashStack(isVillain) {
  const band = weightedChoice([
    { value: [60, 90], weight: isVillain ? 12 : 18 },
    { value: [91, 130], weight: 42 },
    { value: [131, 200], weight: 32 },
    { value: [201, 260], weight: 8 },
  ]);
  return randomInt(band[0], band[1]);
}

function getSeatStack(position) {
  return state.seatStacks[position] || (position === state.position ? state.stackBb : randomMttStack(false, false));
}

function formatStack(stack) {
  return `${Math.round(stack)}BB`;
}

function stackClass(stack) {
  if (state.gameMode === "cash") return stack >= 140 ? "big-stack" : stack <= 70 ? "short-stack" : "mid-stack";
  if (stack <= 8) return "short-stack";
  if (stack >= 30) return "big-stack";
  return "mid-stack";
}

function positionDealerChip() {
  const positions = getActivePositions(state.tableSize);
  const heroIndex = positions.indexOf(state.position);
  const buttonIndex = positions.indexOf("BTN");
  const relativeIndex = (buttonIndex - heroIndex + positions.length) % positions.length;
  const seat = seatLayouts[state.tableSize][relativeIndex];
  const dealerX = seat.x + (50 - seat.x) * 0.72;
  const dealerY = seat.y + (50 - seat.y) * 0.72;
  el.dealerChip.style.left = `${dealerX}%`;
  el.dealerChip.style.top = `${dealerY}%`;
}

function describeSeat(position, context) {
  const posted = blindPosted(position);
  const actedBeforeHero = positionLeverage(position, state.tableSize) < positionLeverage(state.position, state.tableSize);
  const showdown = state.runout?.showdown || null;

  if (showdown) {
    if (position === state.position) {
      const won = showdown.winner === "hero";
      const status = showdown.winner === "chop" ? t("table.chopPot") : won ? `${t("table.won")} ${formatBb(showdown.potBb)}` : t("table.allIn");
      return { status, tone: won ? "hero winner" : "hero", betBb: showdown.allInBb };
    }

    if (position === showdown.villainPosition) {
      const won = showdown.winner === "villain";
      const status = showdown.winner === "chop" ? t("table.chopPot") : won ? `${t("table.won")} ${formatBb(showdown.potBb)}` : t("table.allInCall");
      return {
        status,
        tone: won ? "aggressor winner" : "aggressor",
        showCards: true,
        revealedCards: showdown.villainCards,
        betBb: showdown.allInBb,
      };
    }

    if (posted > 0) {
      return { status: t("table.folded"), tone: "folded", folded: true, betBb: posted };
    }

    return { status: t("table.folded"), tone: "folded", folded: true };
  }

  const streetQuiz = state.runout?.quiz || null;
  if (streetQuiz) {
    if (position === state.position) {
      const chosen = streetQuiz.chosen;
      const committed = chosen && streetQuiz.line.action === "Bet" && ["Call", "Raise"].includes(chosen);
      const heroBet = chosen === "Raise" ? roundBb(streetQuiz.line.betBb * 2.6) : committed ? streetQuiz.line.betBb : 0;
      return {
        status: chosen ? actionLabel(chosen) : t("table.heroToAct"),
        tone: "hero",
        betBb: heroBet,
      };
    }

    if (position === streetQuiz.line.villainPosition) {
      const status = streetQuiz.line.action === "Bet"
        ? `${t("table.bet")} ${formatBb(streetQuiz.line.betBb)}`
        : actionLabel("Check");
      return {
        status,
        tone: streetQuiz.line.action === "Bet" ? "aggressor" : "idle",
        showCards: true,
        betBb: streetQuiz.line.action === "Bet" ? streetQuiz.line.betBb : 0,
      };
    }

    if (posted > 0) {
      return { status: t("table.folded"), tone: "folded", folded: true, betBb: posted };
    }

    return { status: t("table.folded"), tone: "folded", folded: true };
  }

  if (position === state.position) {
    if (context.spot === "vs3bet") return { status: `${t("table.opened")} ${formatBb(context.openSize)}`, tone: "hero", betBb: context.openSize };
    if (context.spot === "flopVsCbet") return { status: t("table.heroToAct"), tone: "hero" };
    return { status: t("table.heroToAct"), tone: "hero", betBb: posted || 0 };
  }

  if (context.spot === "open") {
    if (actedBeforeHero && posted === 0) {
      return { status: t("table.folded"), tone: "folded", folded: true };
    }
    if (posted > 0) {
      return { status: `${position} ${t("table.blind")}`, tone: "blind", showCards: true, betBb: posted };
    }
    return { status: t("table.stillIn"), tone: "idle", showCards: true };
  }

  if (context.spot === "vsRaise" && position === context.openerPosition) {
    return { status: `${t("table.open")} ${formatBb(context.openSize)}`, tone: "aggressor", showCards: true, betBb: context.openSize };
  }

  if (context.spot === "vs3bet" && position === context.threeBettorPosition) {
    return { status: `3-bet ${formatBb(context.threeBetSize)}`, tone: "aggressor", showCards: true, betBb: context.threeBetSize };
  }

  if (context.spot === "flopVsCbet" && position === context.openerPosition) {
    return { status: `${t("table.bet")} ${formatBb(context.betSize)}`, tone: "aggressor", showCards: true, betBb: context.betSize };
  }

  if (posted > 0) {
    return { status: t("table.folded"), tone: "folded", folded: true, betBb: posted };
  }

  return { status: t("table.folded"), tone: "folded", folded: true };
}

function renderCardBack() {
  return '<span class="card-back" aria-hidden="true"></span>';
}

function drawRandomCards(count, excludedCards = []) {
  const blocked = new Set(excludedCards.map(cardId));
  const deck = [];

  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      const card = { rank, suit };
      if (!blocked.has(cardId(card))) {
        deck.push(card);
      }
    });
  });

  const picks = [];
  for (let index = 0; index < count && deck.length; index += 1) {
    const pickIndex = randomInt(0, deck.length - 1);
    picks.push(deck[pickIndex]);
    deck.splice(pickIndex, 1);
  }
  return picks;
}

function cardsFromKeyForBoard(key, board) {
  const parsed = parseHandKey(key);
  const blocked = new Set(board.map(cardId));
  const suitsByBoard = [...new Set(board.map((card) => card.suit.name))];
  const preferredSuit = suitsByBoard[0] || suits[0].name;

  if (parsed.high === parsed.low) {
    const pairCards = suits
      .map((suit) => ({ rank: parsed.high, suit }))
      .filter((card) => !blocked.has(cardId(card)))
      .slice(0, 2);
    if (pairCards.length === 2) return pairCards;
  }

  if (parsed.suited) {
    const suitOrder = [preferredSuit, ...suits.map((suit) => suit.name).filter((name) => name !== preferredSuit)];
    for (const suitName of suitOrder) {
      const suit = suits.find((entry) => entry.name === suitName);
      const first = { rank: parsed.high, suit };
      const second = { rank: parsed.low, suit };
      if (!blocked.has(cardId(first)) && !blocked.has(cardId(second))) {
        return [first, second];
      }
    }
  }

  if (!parsed.suited) {
    const firstOptions = suits.map((suit) => ({ rank: parsed.high, suit })).filter((card) => !blocked.has(cardId(card)));
    const secondOptions = suits.map((suit) => ({ rank: parsed.low, suit })).filter((card) => !blocked.has(cardId(card)));
    for (const firstOption of firstOptions) {
      const secondOption = secondOptions.find((card) => card.suit.name !== firstOption.suit.name);
      if (secondOption) return [firstOption, secondOption];
    }
  }

  const first = suits
    .map((suit) => ({ rank: parsed.high, suit }))
    .find((card) => !blocked.has(cardId(card)));
  const second = suits
    .map((suit) => ({ rank: parsed.low, suit }))
    .find((card) => !blocked.has(cardId(card)) && (parsed.suited || suitId(card.suit) !== suitId(first?.suit)));

  if (first && second) return [first, second];
  return makeHand(parsed.high, parsed.low, parsed.suited).cards;
}

function cardsOverlap(firstCards, secondCards) {
  const blocked = new Set(firstCards.map(cardId));
  return secondCards.some((card) => blocked.has(cardId(card)));
}

function boardText(board) {
  return board.map((card) => `${card.rank}${card.suit.symbol}`).join(" ");
}

function cardId(card) {
  return `${card.rank}${card.suit.name}`;
}

function suitId(suit) {
  return suit?.name || "";
}

function actionRec(actions, primary, secondary, primaryFreq, note) {
  const distribution = {};

  actions.forEach((action) => {
    distribution[action] = 0;
  });

  if (secondary) {
    distribution[primary] = primaryFreq;
    distribution[secondary] = 100 - primaryFreq;
  } else {
    distribution[primary] = 100;
  }

  return {
    primary,
    secondary,
    primaryFreq,
    profile: actions.map((action) => ({
      action,
      freq: distribution[action] || 0,
      mix: Boolean(secondary) && action === secondary,
    })),
    note,
  };
}

function foldRec(actions, note) {
  const profile = actions.map((action) => ({
    action,
    freq: action === "Fold" ? 100 : 0,
    mix: false,
  }));

  return {
    primary: "Fold",
    secondary: "",
    primaryFreq: 100,
    profile,
    note,
  };
}

function ensureCommentsEmbed() {
  if (el.commentsEmbed.dataset.loaded === "true") {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.async = true;
  script.crossOrigin = "anonymous";
  script.setAttribute("repo", COMMENT_REPO);
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("theme", "github-light");
  el.commentsEmbed.appendChild(script);
  el.commentsEmbed.dataset.loaded = "true";
}

function normalizeState() {
  const mode = gameModes[state.gameMode];
  state.stackBb = Math.max(mode.minStack, Math.min(mode.maxStack, Number(state.stackBb) || mode.defaultStack));
  const candidates = getCandidatePositions(state.spot, state.tableSize);
  if (!candidates.includes(state.position)) {
    state.position = candidates[Math.floor(candidates.length / 2)];
  }
}

function rebuildContext(heroHand = state.current) {
  state.context = buildSpotContext(state.position, state.spot, state.tableSize, state.stackBb, heroHand, state.forcedOpener);
  state.seatStacks = buildSeatStacks(state.context);
  state.seatAvatars = buildSeatAvatars();
}

function getActivePositions(tableSize) {
  return tableConfigs[tableSize].positions;
}

function getCandidatePositions(spot, tableSize) {
  return tableConfigs[tableSize].candidates[spot];
}

function buildSpotContext(heroPosition, spot, tableSize, stackBb, heroHand = state.current, forcedOpener = null) {
  const positions = getActivePositions(tableSize);
  const heroIndex = positions.indexOf(heroPosition);
  const basePot = 2.5;
  const openSize = chooseOpenSizeBb(heroPosition, stackBb);

  if (spot === "open") {
    const posted = blindPosted(heroPosition);
    const potBeforeHero = basePot;
    const potAfterOpen = basePot + (openSize - posted);
    return {
      heroPosition,
      spot,
      openSize,
      potBb: roundBb(potAfterOpen),
      toCallBb: 0,
      summary: `Unopened pot ${formatBb(potBeforeHero)} · Open to ${formatBb(openSize)}`,
      lines: [
        { label: "Pot", value: formatBb(potBeforeHero) },
        { label: "Action", value: `Open ${formatBb(openSize)}` },
        { label: "After open", value: formatBb(potAfterOpen) },
      ],
    };
  }

  if (spot === "vsRaise") {
    const openerCandidates = positions.slice(0, heroIndex).filter((position) => position !== "BB");
    const openerPosition = forcedOpener && openerCandidates.includes(forcedOpener)
      ? forcedOpener
      : openerCandidates.length
        ? openerCandidates[randomInt(0, openerCandidates.length - 1)]
        : positions[0];
    const openerPosted = blindPosted(openerPosition);
    const heroPosted = blindPosted(heroPosition);
    const potBb = roundBb(basePot + (openSize - openerPosted));
    const toCallBb = roundBb(openSize - heroPosted);
    return {
      heroPosition,
      openerPosition,
      spot,
      openSize,
      potBb,
      toCallBb,
      isBlindBattle: isBlindBattle(heroPosition, openerPosition),
      summary: `${openerPosition} opens ${formatBb(openSize)} · Pot ${formatBb(potBb)} · Call ${formatBb(toCallBb)}`,
      lines: [
        { label: "Open", value: `${openerPosition} ${formatBb(openSize)}` },
        { label: "Pot", value: formatBb(potBb) },
        { label: "To call", value: formatBb(toCallBb) },
      ],
    };
  }

  if (spot === "flopVsCbet") {
    const openerCandidates = positions.slice(0, heroIndex).filter((position) => position !== "BB");
    const openerPosition = forcedOpener && openerCandidates.includes(forcedOpener)
      ? forcedOpener
      : openerCandidates.length
        ? openerCandidates[randomInt(0, openerCandidates.length - 1)]
        : positions[0];
    const openerPosted = blindPosted(openerPosition);
    const heroPosted = blindPosted(heroPosition);
    const preflopPotBb = roundBb(basePot + (openSize - openerPosted) + (openSize - heroPosted));
    const board = drawRandomCards(3, heroHand?.cards || []);
    const betFraction = weightedChoice([
      { value: 0.33, weight: 48 },
      { value: 0.5, weight: 34 },
      { value: 0.66, weight: 18 },
    ]);
    const betSize = roundBb(Math.max(1, preflopPotBb * betFraction));
    const potBb = roundBb(preflopPotBb + betSize);
    return {
      heroPosition,
      openerPosition,
      villainPosition: openerPosition,
      spot,
      street: "flop",
      openSize,
      board,
      boardLabel: "Flop",
      betFraction,
      betSize,
      potBeforeBet: preflopPotBb,
      potBb,
      toCallBb: betSize,
      isBlindBattle: isBlindBattle(heroPosition, openerPosition),
      summary: `${openerPosition} opens ${formatBb(openSize)} 路 Hero calls 路 Flop ${boardText(board)} 路 Bet ${formatBb(betSize)}`,
      lines: [
        { label: "Preflop", value: `${openerPosition} open / Hero call` },
        { label: "Flop", value: boardText(board) },
        { label: "Bet", value: formatBb(betSize) },
        { label: "To call", value: formatBb(betSize) },
      ],
    };
  }

  const openerPosition = heroPosition;
  const threeBettorCandidates = positions.slice(heroIndex + 1).filter((position) => position !== "BB" || heroPosition !== "SB");
  const threeBettorPosition = threeBettorCandidates.length
    ? threeBettorCandidates[randomInt(0, threeBettorCandidates.length - 1)]
    : positions[Math.min(heroIndex + 1, positions.length - 1)];
  const threeBetSize = chooseThreeBetSizeBb(openSize, openerPosition, threeBettorPosition, tableSize, stackBb);
  const openerPosted = blindPosted(openerPosition);
  const aggressorPosted = blindPosted(threeBettorPosition);
  const potAfterOpen = basePot + (openSize - openerPosted);
  const potBb = roundBb(potAfterOpen + (threeBetSize - aggressorPosted));
  const toCallBb = roundBb(threeBetSize - openSize);

  return {
    heroPosition,
    openerPosition,
    threeBettorPosition,
    spot,
    openSize,
    threeBetSize,
    potBb,
    toCallBb,
    summary: `${threeBettorPosition} 3-bets ${formatBb(threeBetSize)} · Pot ${formatBb(potBb)} · Call ${formatBb(toCallBb)}`,
    lines: [
      { label: "Open", value: `${heroPosition} ${formatBb(openSize)}` },
      { label: "3-bet", value: `${threeBettorPosition} ${formatBb(threeBetSize)}` },
      { label: "To call", value: formatBb(toCallBb) },
    ],
  };
}

function chooseOpenSizeBb(position, stackBb) {
  if (position === "SB") {
    if (stackBb <= 10) return 2;
    if (stackBb <= 25) return 2.3;
    return 2.5;
  }

  if (stackBb <= 10) return 2;
  if (stackBb <= 20) return 2.1;
  if (stackBb <= 40) return 2.2;
  return 2.3;
}

function chooseThreeBetSizeBb(openSize, openerPosition, aggressorPosition, tableSize, stackBb) {
  const inPosition = positionLeverage(aggressorPosition, tableSize) > positionLeverage(openerPosition, tableSize);
  const multiplier = stackBb <= 18 ? (inPosition ? 2.5 : 3) : inPosition ? 2.8 : 3.4;
  return roundBb(Math.min(stackBb, Math.max(openSize * multiplier, openSize + 3)));
}

function blindPosted(position) {
  if (position === "SB") return 0.5;
  if (position === "BB") return 1;
  return 0;
}

function buildContextStrip(context) {
  return context.lines
    .map(
      (line) => `
        <div class="context-chip">
          <span>${contextLineLabel(line.label)}</span>
          <strong>${line.value}</strong>
        </div>
      `,
    )
    .join("");
}

function contextLineLabel(label) {
  if (state.lang !== "zh") return label;
  return {
    Pot: "底池",
    Action: "行动",
    "After open": "开池后",
    Open: "开池",
    "To call": "跟注",
    Preflop: "翻前",
    Flop: "翻牌",
    Bet: "下注",
    "3-bet": "3-bet",
  }[label] || label;
}

function spotById(spotId) {
  return spots.find((spot) => spot.id === spotId);
}

function positionLeverage(position, tableSize) {
  const positions = getActivePositions(tableSize);
  return positions.indexOf(position);
}

function isLatePosition(position, tableSize) {
  const positions = getActivePositions(tableSize);
  return positions.indexOf(position) >= positions.length - 3;
}

function stackBandLabel(stackBb) {
  if (state.gameMode === "cash") {
    if (stackBb <= 70) return "Short cash stack";
    if (stackBb <= 130) return "100BB cash zone";
    return "Deep cash stack";
  }
  if (stackBb <= 10) return "Push / fold stack";
  if (stackBb <= 20) return "Short stack";
  if (stackBb <= 32) return "Average MTT stack";
  return "Chip-leader stack";
}

function compactStackBandLabel(stackBb) {
  if (state.gameMode === "cash") {
    if (stackBb <= 70) return "Short cash";
    if (stackBb <= 130) return "100BB cash";
    return "Deep cash";
  }
  if (stackBb <= 10) return "Push/fold";
  if (stackBb <= 20) return "Short stack";
  if (stackBb <= 32) return "Average stack";
  return "Chip lead";
}

function shallowOpenPenalty(stackBb, position, tableSize) {
  if (stackBb > 40) return -2;
  if (stackBb > 20) return 0;

  const lateBonus = isLatePosition(position, tableSize) ? -5 : 4;
  if (stackBb <= 10) return 10 + lateBonus;
  if (stackBb <= 15) return 7 + lateBonus;
  return 3 + lateBonus;
}

function openThreshold(position, tableSize) {
  const thresholds = {
    6: {
      UTG: 76,
      HJ: 71,
      CO: 65,
      BTN: 58,
      SB: 61,
      BB: 64,
    },
    8: {
      UTG: 79,
      "UTG+1": 75,
      LJ: 70,
      HJ: 65,
      CO: 60,
      BTN: 54,
      SB: 58,
      BB: 62,
    },
  };

  return thresholds[tableSize][position];
}

function randomTournamentStack() {
  if (state.gameMode === "cash") {
    const band = weightedChoice([
      { value: [60, 90], weight: 22 },
      { value: [91, 130], weight: 44 },
      { value: [131, 200], weight: 34 },
    ]);
    return randomInt(band[0], band[1]);
  }

  const band = weightedChoice([
    { value: [3, 6], weight: 18 },
    { value: [7, 12], weight: 28 },
    { value: [13, 20], weight: 28 },
    { value: [21, 32], weight: 18 },
    { value: [33, 42], weight: 8 },
  ]);

  return randomInt(band[0], band[1]);
}

function renderCard(card, extraClass = "") {
  const colorClass = card.suit.red ? "red" : "";
  return `
    <div class="playing-card ${colorClass} ${extraClass}">
      <div class="card-corner"><span>${card.rank}</span><span>${card.suit.symbol}</span></div>
      <div class="card-center">${card.suit.symbol}</div>
      <div class="card-corner card-bottom"><span>${card.rank}</span><span>${card.suit.symbol}</span></div>
    </div>
  `;
}

function cardsToHand(first, second) {
  const ordered = [first, second].sort((a, b) => rankValue[b.rank] - rankValue[a.rank]);
  const suited = ordered[0].suit.name === ordered[1].suit.name;
  return {
    key: makeHandKey(ordered[0].rank, ordered[1].rank, suited),
    cards: ordered,
  };
}

function makeHand(first, second, suited) {
  const ordered = [first, second].sort((a, b) => rankValue[b] - rankValue[a]);
  const sameRank = ordered[0] === ordered[1];
  const firstSuit = suits[randomInt(0, suits.length - 1)];
  const secondSuit = sameRank
    ? suits.find((suit) => suit.name !== firstSuit.name)
    : suited
      ? firstSuit
      : suits.find((suit) => suit.name !== firstSuit.name && suit.red !== firstSuit.red) || suits[1];

  return {
    key: makeHandKey(ordered[0], ordered[1], !sameRank && suited),
    cards: [
      { rank: ordered[0], suit: firstSuit },
      { rank: ordered[1], suit: secondSuit },
    ],
  };
}

function handFromKey(key) {
  const parsed = parseHandKey(key);
  return makeHand(parsed.high, parsed.low, parsed.suited);
}

function makeHandKey(first, second, suited) {
  if (first === second) return `${first}${second}`;
  return `${first}${second}${suited ? "s" : "o"}`;
}

function parseHandKey(key) {
  return {
    high: key[0],
    low: key[1],
    suited: key[2] === "s",
  };
}

function inspectHand(key) {
  const parsed = parseHandKey(key);
  const highValue = rankValue[parsed.high];
  const lowValue = rankValue[parsed.low];
  const isPair = parsed.high === parsed.low;
  const gap = isPair ? 0 : highValue - lowValue - 1;

  return {
    ...parsed,
    highValue,
    lowValue,
    isPair,
    pairValue: isPair ? highValue : 0,
    hasAce: parsed.high === "A",
    isBroadway: highValue >= 10 && lowValue >= 10,
    isWheelAce: parsed.high === "A" && lowValue <= 5,
    isConnector: !isPair && gap === 0,
    isSuitedConnector: parsed.suited && !isPair && gap <= 1,
    gap,
  };
}

function handStrength(key) {
  const traits = inspectHand(key);
  if (traits.isPair) return 58 + traits.highValue * 3.3;

  const suitedBonus = traits.suited ? 9 : 0;
  const connectorBonus = Math.max(0, 8 - traits.gap * 2.2);
  const broadwayBonus = traits.isBroadway ? 7 : 0;
  const aceWheelBonus = traits.isWheelAce && traits.suited ? 5 : 0;

  return traits.highValue * 3.7 + traits.lowValue * 1.45 + suitedBonus + connectorBonus + broadwayBonus + aceWheelBonus;
}

function actionClass(action) {
  return {
    Jam: "jam",
    Raise: "raise",
    Call: "call",
    Fold: "fold",
    Check: "check",
    Bet: "raise",
    "3-bet": "threebet",
    "4-bet": "threebet",
  }[action] || action.toLowerCase();
}

function cellClass(rec) {
  if (rec.primary === "Fold") return "fold";
  if (rec.secondary) return "mix";
  return actionClass(rec.primary);
}

function buildRanges(source) {
  return Object.fromEntries(
    Object.entries(source).map(([tableSize, groups]) => [
      tableSize,
      Object.fromEntries(
        Object.entries(groups).map(([group, byPosition]) => [
          group,
          Object.fromEntries(Object.entries(byPosition).map(([position, text]) => [position, expandRange(text)])),
        ]),
      ),
    ]),
  );
}

function expandRange(text) {
  const set = new Set();
  text.split(/\s+/).forEach((token) => {
    if (!token) return;
    const plus = token.endsWith("+");
    const core = plus ? token.slice(0, -1) : token;

    if (core.length === 2 && core[0] === core[1]) {
      const start = rankValue[core[0]];
      ranks.forEach((rank) => {
        if (rankValue[rank] >= start) set.add(`${rank}${rank}`);
      });
      return;
    }

    if (core.length === 3) {
      const [high, low, suitedness] = core;
      if (!plus) {
        set.add(`${high}${low}${suitedness}`);
        return;
      }

      ranks.forEach((candidate) => {
        if (rankValue[candidate] < rankValue[high] && rankValue[candidate] >= rankValue[low]) {
          set.add(`${high}${candidate}${suitedness}`);
        }
      });
    }
  });

  return set;
}

function buildHands() {
  return ranks.flatMap((rowRank, row) =>
    ranks.map((colRank, col) => {
      if (row === col) return { key: `${rowRank}${colRank}` };
      if (row < col) return { key: `${rowRank}${colRank}s` };
      return { key: `${colRank}${rowRank}o` };
    }),
  );
}

function weightedChoice(entries) {
  const total = entries.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;

  for (const entry of entries) {
    roll -= entry.weight;
    if (roll <= 0) {
      return entry.value;
    }
  }

  return entries[entries.length - 1].value;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roundBb(value) {
  return Math.round(value * 10) / 10;
}

function formatBb(value) {
  return `${roundBb(value).toFixed(1)}BB`;
}

function formatPct(value) {
  return `${(value * 100).toFixed(1)}%`;
}
