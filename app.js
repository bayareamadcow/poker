const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const suits = [
  { symbol: "♠", name: "spade", red: false },
  { symbol: "♥", name: "heart", red: true },
  { symbol: "♦", name: "diamond", red: true },
  { symbol: "♣", name: "club", red: false },
];
const rankValue = Object.fromEntries(ranks.map((rank, index) => [rank, 14 - index]));

const positions = ["UTG", "HJ", "CO", "BTN", "SB", "BB"];
const spots = [
  { id: "open", label: "首次入池", actions: ["Fold", "Raise"] },
  { id: "vsRaise", label: "面对加注", actions: ["Fold", "Call", "3-bet"] },
  { id: "vs3bet", label: "面对 3-bet", actions: ["Fold", "Call", "4-bet"] },
];

const rangeText = {
  open: {
    UTG: "66+ ATs+ KQs QJs JTs AQo+",
    HJ: "55+ A9s+ KTs+ QTs+ JTs T9s 98s AJo+ KQo",
    CO: "44+ A2s+ K9s+ Q9s+ J9s+ T8s+ 98s 87s 76s ATo+ KJo+ QJo",
    BTN: "22+ A2s+ K5s+ Q8s+ J8s+ T8s+ 97s 86s 75s 65s A7o+ KTo+ QTo+ JTo",
    SB: "22+ A2s+ K7s+ Q9s+ J9s+ T8s+ 98s 87s 76s 65s A8o+ KTo+ QTo+ JTo",
    BB: "22+ A2s+ K8s+ Q9s+ J9s+ T9s 98s 87s 76s A9o+ KJo+ QJo",
  },
  threeBet: {
    UTG: "QQ+ AKs AKo",
    HJ: "JJ+ AQs+ AKo A5s A4s",
    CO: "TT+ AJs+ KQs AQo+ A5s A4s",
    BTN: "99+ ATs+ KQs AJo+ KQo A5s A4s A3s KJs QJs",
    SB: "TT+ AQs+ AKo A5s A4s KQs",
    BB: "JJ+ AQs+ AKo A5s A4s KQs",
  },
  callRaise: {
    UTG: "JJ TT AQs AJs KQs",
    HJ: "TT 99 AQs AJs KQs AQo",
    CO: "99 88 ATs+ KJs+ QJs JTs T9s AQo AJo KQo",
    BTN: "88+ A9s+ KTs+ QTs+ JTs T9s 98s 87s ATo+ KJo+ QJo",
    SB: "99 88 AQs AJs KQs AQo",
    BB: "22+ A2s+ K9s+ Q9s+ J9s+ T8s+ 98s 87s 76s 65s ATo+ KTo+ QTo+ JTo",
  },
  fourBet: {
    UTG: "QQ+ AKs AKo",
    HJ: "QQ+ AKs AKo A5s",
    CO: "JJ+ AKs AKo AQs A5s A4s",
    BTN: "TT+ AQs+ AKo A5s A4s KQs",
    SB: "JJ+ AKs AKo AQs A5s",
    BB: "JJ+ AKs AKo AQs A5s",
  },
  call3bet: {
    UTG: "JJ TT AQs AJs KQs AQo",
    HJ: "JJ TT 99 AQs AJs KQs AQo KQo",
    CO: "TT 99 88 AQs AJs ATs KQs KJs QJs JTs AQo KQo",
    BTN: "99 88 77 AQs AJs ATs KQs KJs QJs JTs T9s AQo AJo KQo",
    SB: "TT 99 AQs AJs KQs AQo",
    BB: "TT 99 88 AQs AJs KQs QJs JTs T9s 98s AQo KQo",
  },
};

const notes = [
  {
    title: "位置先行",
    body: "越靠后可以打开更多边缘牌；越靠前需要更少的反向隐含赔率和更强的高张质量。",
  },
  {
    title: "同花 A 的价值",
    body: "A5s/A4s 经常被放进 3-bet 或 4-bet 混合范围，因为它们有阻断牌、顺子潜力和较好的弃牌收益。",
  },
  {
    title: "BB 防守更宽",
    body: "大盲已经投入盲注，跟注价格更好，所以很多同花连张、小对子和高张弱踢脚可以继续。",
  },
  {
    title: "不要只看牌面强度",
    body: "KJo 在后位可以开池，但面对强 3-bet 常常很难实现权益；位置和主动权会改变答案。",
  },
  {
    title: "频率不是情绪",
    body: "混合动作意味着长期按比例执行；短期里可以用随机数、秒针或固定花色来保持稳定。",
  },
  {
    title: "赔率先过线",
    body: "听牌跟注前先比较估算胜率和需要胜率；有位置、隐含赔率和弃牌收益时再给边缘牌加分。",
  },
];

const allHands = buildHands();
const ranges = buildRanges(rangeText);

const state = {
  view: "trainer",
  position: "BTN",
  spot: "open",
  current: makeHand("A", "K", true),
  selectedKey: "AKs",
  answered: false,
  correct: 0,
  played: 0,
  streak: 0,
  streetMode: "two",
};

const el = {
  positionButtons: document.querySelector("#positionButtons"),
  spotButtons: document.querySelector("#spotButtons"),
  rankOne: document.querySelector("#rankOne"),
  rankTwo: document.querySelector("#rankTwo"),
  suitedness: document.querySelector("#suitedness"),
  usePickedHand: document.querySelector("#usePickedHand"),
  scenarioText: document.querySelector("#scenarioText"),
  heroHand: document.querySelector("#heroHand"),
  holeCards: document.querySelector("#holeCards"),
  actionButtons: document.querySelector("#actionButtons"),
  resultBox: document.querySelector("#resultBox"),
  frequencyBars: document.querySelector("#frequencyBars"),
  explainBox: document.querySelector("#explainBox"),
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
};

init();

function init() {
  renderSelectors();
  renderRankPickers();
  renderNotes();
  bindEvents();
  render();
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      document.querySelectorAll(".view").forEach((view) => view.classList.remove("is-active"));
      document.querySelector(`#${state.view}View`).classList.add("is-active");
      renderRange();
    });
  });

  el.usePickedHand.addEventListener("click", () => {
    const first = el.rankOne.value;
    const second = el.rankTwo.value;
    const suited = first !== second && el.suitedness.value === "s";
    state.current = makeHand(first, second, suited);
    state.selectedKey = state.current.key;
    state.answered = false;
    render();
  });

  el.nextHand.addEventListener("click", dealRandomHand);

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

function renderSelectors() {
  el.positionButtons.innerHTML = positions
    .map((position) => `<button type="button" data-position="${position}">${position}</button>`)
    .join("");
  el.positionButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.position = button.dataset.position;
      state.answered = false;
      render();
    });
  });

  el.spotButtons.innerHTML = spots
    .map((spot) => `<button type="button" data-spot="${spot.id}">${spot.label}</button>`)
    .join("");
  el.spotButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.spot = button.dataset.spot;
      state.answered = false;
      render();
    });
  });
}

function renderRankPickers() {
  const options = ranks.map((rank) => `<option value="${rank}">${rank}</option>`).join("");
  el.rankOne.innerHTML = options;
  el.rankTwo.innerHTML = options;
  el.rankOne.value = "A";
  el.rankTwo.value = "K";
  el.rankOne.addEventListener("change", syncSuitedAvailability);
  el.rankTwo.addEventListener("change", syncSuitedAvailability);
  syncSuitedAvailability();
}

function render() {
  syncActiveControls();
  syncPickers();
  renderTrainer();
  renderRange();
  renderOdds();
  renderScore();
}

function syncActiveControls() {
  el.positionButtons.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.position === state.position);
  });
  el.spotButtons.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.spot === state.spot);
  });
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
  const spot = spots.find((item) => item.id === state.spot);
  const rec = recommend(state.current.key, state.position, state.spot);
  el.scenarioText.textContent = `${state.position} · ${spot.label}`;
  el.heroHand.textContent = state.current.key;
  el.holeCards.innerHTML = state.current.cards.map(renderCard).join("");
  el.actionButtons.innerHTML = spot.actions
    .map((action) => `<button class="action-button ${actionClass(action)}" type="button" data-action="${action}">${action}</button>`)
    .join("");
  el.actionButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => chooseAction(button.dataset.action, rec));
  });

  if (!state.answered) {
    el.resultBox.innerHTML = "<p>先选择动作，再看频率和理由。</p>";
    el.frequencyBars.innerHTML = renderBars(hiddenProfile(spot.actions));
    el.explainBox.innerHTML = "<p>范围矩阵会随位置和局面同步更新。</p>";
    return;
  }

  renderRecommendation(rec);
}

function chooseAction(action, rec) {
  if (state.answered) {
    renderRecommendation(rec, action);
    return;
  }
  const isCorrect = action === rec.primary || action === rec.secondary;
  state.played += 1;
  state.correct += isCorrect ? 1 : 0;
  state.streak = isCorrect ? state.streak + 1 : 0;
  state.answered = true;
  renderScore();
  renderRecommendation(rec, action);
}

function renderRecommendation(rec, chosen = null) {
  const picked = chosen || "已选择";
  const isCorrect = !chosen || chosen === rec.primary || chosen === rec.secondary;
  const tone = isCorrect ? "不错" : "偏离";
  el.resultBox.innerHTML = `
    <strong>${tone} · ${picked}</strong>
    <p>主线：${rec.primary}${rec.secondary ? ` / 混合：${rec.secondary}` : ""}。频率模型建议 ${rec.primary} ${rec.primaryFreq}%。</p>
  `;
  el.frequencyBars.innerHTML = renderBars(rec.profile);
  el.explainBox.innerHTML = `<p>${rec.note}</p>`;
}

function renderBars(profile) {
  return profile
    .map(
      (item) => `
        <div class="bar-row">
          <span>${item.action}</span>
          <div class="bar-track"><div class="bar-fill ${actionClass(item.action)} ${item.mix ? "mix" : ""}" style="--value:${item.freq}%"></div></div>
          <span>${item.freq}%</span>
        </div>
      `,
    )
    .join("");
}

function hiddenProfile(actions) {
  return actions.map((action) => ({ action, freq: action === "Fold" ? 34 : 33 }));
}

function renderRange() {
  const spot = spots.find((item) => item.id === state.spot);
  el.rangeContext.textContent = `${state.position} / ${spot.label}`;
  el.rangeMatrix.innerHTML = allHands
    .map((hand) => {
      const rec = recommend(hand.key, state.position, state.spot);
      const className = cellClass(rec);
      const selected = hand.key === state.selectedKey ? " is-selected" : "";
      return `<button type="button" class="${className}${selected}" data-hand="${hand.key}" aria-label="${hand.key} ${rec.primary}">${hand.key}</button>`;
    })
    .join("");
  el.rangeMatrix.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedKey = button.dataset.hand;
      state.current = handFromKey(state.selectedKey);
      state.answered = false;
      render();
    });
  });
  renderSelectedHand();
}

function renderSelectedHand() {
  const rec = recommend(state.selectedKey, state.position, state.spot);
  el.selectedHandDetail.innerHTML = `
    <strong>${state.selectedKey}</strong>
    <span>${state.position} · ${spots.find((spot) => spot.id === state.spot).label}</span>
    <p>${rec.primary}${rec.secondary ? `，混合 ${rec.secondary}` : ""}。${rec.note}</p>
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
    el.oddsDecision.textContent = "可跟注";
  } else if (edge >= 0) {
    el.oddsDecision.textContent = "边缘跟注";
    el.oddsDecision.classList.add("warning");
  } else {
    el.oddsDecision.textContent = "赔率不够";
    el.oddsDecision.classList.add("bad");
  }
}

function renderNotes() {
  el.notesGrid.innerHTML = notes
    .map(
      (note) => `
        <article>
          <h2>${note.title}</h2>
          <p>${note.body}</p>
        </article>
      `,
    )
    .join("");
}

function renderScore() {
  const accuracy = state.played ? Math.round((state.correct / state.played) * 100) : 0;
  el.accuracy.textContent = `${accuracy}%`;
  el.streak.textContent = state.streak;
  el.handsPlayed.textContent = state.played;
}

function dealRandomHand() {
  const deckRanks = ranks.flatMap((rank) => suits.map((suit) => ({ rank, suit })));
  const firstIndex = Math.floor(Math.random() * deckRanks.length);
  const first = deckRanks.splice(firstIndex, 1)[0];
  const second = deckRanks[Math.floor(Math.random() * deckRanks.length)];
  state.current = cardsToHand(first, second);
  state.selectedKey = state.current.key;
  state.answered = false;
  render();
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
  const firstSuit = suits[Math.floor(Math.random() * suits.length)];
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

function renderCard(card) {
  const colorClass = card.suit.red ? "red" : "";
  return `
    <div class="playing-card ${colorClass}">
      <div class="card-corner"><span>${card.rank}</span><span>${card.suit.symbol}</span></div>
      <div class="card-center">${card.suit.symbol}</div>
      <div class="card-corner card-bottom"><span>${card.rank}</span><span>${card.suit.symbol}</span></div>
    </div>
  `;
}

function recommend(key, position, spot) {
  if (spot === "open") {
    const openSet = ranges.open[position];
    const inOpen = openSet.has(key);
    if (!inOpen) {
      return foldRec(key, "这手牌在当前位置的首开范围外，弃牌能避免被后位高频压制。");
    }
    const strength = handStrength(key);
    const isMarginal = strength < openThreshold(position) + 8;
    return {
      primary: "Raise",
      secondary: isMarginal ? "Fold" : "",
      primaryFreq: isMarginal ? 68 : 100,
      profile: [
        { action: "Raise", freq: isMarginal ? 68 : 100 },
        { action: "Fold", freq: isMarginal ? 32 : 0, mix: isMarginal },
      ],
      note: isMarginal
        ? "这是范围底部，适合低频开池；桌上如果 3-bet 很多，可以直接收紧。"
        : "这手牌有足够的高张质量、坚果潜力或对子价值，适合保持主动权。",
    };
  }

  if (spot === "vsRaise") {
    if (ranges.threeBet[position].has(key)) {
      const bluff = handStrength(key) < 76;
      return {
        primary: "3-bet",
        secondary: bluff ? "Fold" : "Call",
        primaryFreq: bluff ? 55 : 82,
        profile: [
          { action: "3-bet", freq: bluff ? 55 : 82 },
          { action: bluff ? "Fold" : "Call", freq: bluff ? 45 : 18, mix: true },
          { action: bluff ? "Call" : "Fold", freq: 0 },
        ],
        note: bluff
          ? "低 A 同花类手牌靠阻断牌和弃牌收益赚钱，适合低频再加注而不是自动跟注。"
          : "这手牌对开池范围有明显权益优势，3-bet 能建立主动权并隔离较弱继续范围。",
      };
    }
    if (ranges.callRaise[position].has(key)) {
      return {
        primary: "Call",
        secondary: "",
        primaryFreq: 100,
        profile: [
          { action: "Call", freq: 100 },
          { action: "3-bet", freq: 0 },
          { action: "Fold", freq: 0 },
        ],
        note: "这手牌跟注能实现权益，但做大底池时常被更强继续范围压制。",
      };
    }
    return foldRec(key, "面对加注时，这手牌的权益实现和反向隐含赔率都不理想。", "3-bet");
  }

  if (ranges.fourBet[position].has(key)) {
    const mixed = ["A5s", "A4s", "KQs"].includes(key);
    return {
      primary: "4-bet",
      secondary: mixed ? "Call" : "",
      primaryFreq: mixed ? 52 : 86,
      profile: [
        { action: "4-bet", freq: mixed ? 52 : 86 },
        { action: "Call", freq: mixed ? 48 : 14, mix: mixed },
        { action: "Fold", freq: 0 },
      ],
      note: mixed
        ? "带阻断牌的同花牌可以混合 4-bet；对手偏紧时更适合跟注或弃牌。"
        : "强价值牌面对 3-bet 仍能继续加压，避免让对手用宽范围便宜看翻牌。",
    };
  }
  if (ranges.call3bet[position].has(key)) {
    return {
      primary: "Call",
      secondary: "",
      primaryFreq: 100,
      profile: [
        { action: "Call", freq: 100 },
        { action: "4-bet", freq: 0 },
        { action: "Fold", freq: 0 },
      ],
      note: "这手牌可以跟注 3-bet，但翻牌后需要关注位置、SPR 和是否击中坚果听牌。",
    };
  }
  return foldRec(key, "面对 3-bet 时，继续范围要明显收紧；这手牌通常无法稳定实现权益。", "4-bet");
}

function foldRec(key, note, aggressive = "Raise") {
  return {
    primary: "Fold",
    secondary: "",
    primaryFreq: 100,
    profile: [
      { action: "Fold", freq: 100 },
      { action: "Call", freq: 0 },
      { action: aggressive, freq: 0 },
    ],
    note,
  };
}

function cellClass(rec) {
  if (rec.primary === "Fold") return "fold";
  if (rec.secondary) return "mix";
  return actionClass(rec.primary);
}

function actionClass(action) {
  return {
    "3-bet": "threebet",
    "4-bet": "fourbet",
  }[action] || action.toLowerCase().replace("-", "");
}

function buildRanges(source) {
  return Object.fromEntries(
    Object.entries(source).map(([group, byPosition]) => [
      group,
      Object.fromEntries(Object.entries(byPosition).map(([position, text]) => [position, expandRange(text)])),
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

function handStrength(key) {
  const parsed = parseHandKey(key);
  const high = rankValue[parsed.high];
  const low = rankValue[parsed.low];
  if (parsed.high === parsed.low) return 58 + high * 3.3;
  const gap = high - low - 1;
  const suitedBonus = parsed.suited ? 9 : 0;
  const connectorBonus = Math.max(0, 8 - gap * 2.2);
  const broadwayBonus = high >= 11 && low >= 10 ? 7 : 0;
  const aceWheelBonus = parsed.high === "A" && low <= 5 && parsed.suited ? 5 : 0;
  return high * 3.7 + low * 1.45 + suitedBonus + connectorBonus + broadwayBonus + aceWheelBonus;
}

function openThreshold(position) {
  return {
    UTG: 76,
    HJ: 71,
    CO: 65,
    BTN: 58,
    SB: 61,
    BB: 64,
  }[position];
}

function formatPct(value) {
  return `${(value * 100).toFixed(1)}%`;
}
