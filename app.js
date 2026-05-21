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
    { x: 50, y: 88, align: "center" },
    { x: 78, y: 68, align: "right" },
    { x: 73, y: 27, align: "right" },
    { x: 50, y: 16, align: "center" },
    { x: 27, y: 27, align: "left" },
    { x: 22, y: 68, align: "left" },
  ],
  8: [
    { x: 50, y: 88, align: "center" },
    { x: 78, y: 68, align: "right" },
    { x: 84, y: 47, align: "right" },
    { x: 68, y: 18, align: "center" },
    { x: 50, y: 13, align: "center" },
    { x: 32, y: 18, align: "center" },
    { x: 16, y: 47, align: "left" },
    { x: 22, y: 68, align: "left" },
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
  { id: "open", label: "Open First In" },
  { id: "vsRaise", label: "Facing Raise" },
  { id: "vs3bet", label: "Facing 3-bet" },
  { id: "flopVsCbet", label: "Flop vs C-bet" },
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
  view: "trainer",
  gameMode: "mtt",
  tableTheme: "emerald",
  tableSize: 8,
  stackBb: 18,
  position: "HJ",
  spot: "open",
  context: null,
  seatStacks: {},
  current: makeHand("A", "J", true),
  selectedKey: "AJs",
  answered: false,
  correct: 0,
  played: 0,
  streak: 0,
  streetMode: "two",
  runout: null,
  forcedOpener: null,
};

const el = {
  brandContext: document.querySelector("#brandContext"),
  felt: document.querySelector(".felt"),
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

function init() {
  renderRankPickers();
  renderNotes();
  bindEvents();
  randomTournamentSpot({ fullRandom: true, preserveScore: true });
}

function bindEvents() {
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
  renderControls();
  syncPickers();
  renderTrainer();
  renderRange();
  renderOdds();
  renderScore();
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
      state.answered = false;
      render();
    });
  });

  el.gameModeButtons.innerHTML = Object.entries(gameModes)
    .map(
      ([modeId, mode]) => `
        <button type="button" data-mode="${modeId}" class="${state.gameMode === modeId ? "is-active" : ""}">
          ${mode.label}
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
      state.answered = false;
      render();
    });
  });

  el.themeButtons.innerHTML = tableThemes
    .map(
      (theme) => `
        <button type="button" class="theme-chip ${state.tableTheme === theme.id ? "is-active" : ""}" data-theme="${theme.id}">
          <span style="--theme-accent:${theme.accent}"></span>${theme.label}
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
      state.answered = false;
      render();
    });
  });

  el.spotButtons.innerHTML = spots
    .map((spot) => `<button type="button" data-spot="${spot.id}" class="${state.spot === spot.id ? "is-active" : ""}">${spot.label}</button>`)
    .join("");
  el.spotButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.spot = button.dataset.spot;
      state.forcedOpener = null;
      state.context = null;
      state.runout = null;
      normalizeState();
      rebuildContext();
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
      state.answered = false;
      render();
    });
  });

  el.brandContext.textContent = `${tableConfigs[state.tableSize].label} ${mode.brand} · hero ${state.stackBb}BB`;
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
  const lateFlag = isLatePosition(state.position, state.tableSize) ? "Late-position pressure" : "Earlier seat discipline";
  const actionNote = trainerActionNote(state.spot, context, actions);

  el.scenarioText.textContent = `${gameModes[state.gameMode].label} · ${tableConfigs[state.tableSize].label} · ${state.position} · ${spot.label}`;
  el.scenarioMeta.innerHTML = `
    <span class="pill ghost">${stackBandLabel(state.stackBb)}</span>
    <span class="pill ghost">${lateFlag}</span>
    <span class="pill ghost">${actionNote}</span>
  `;
  renderTableScene(context);
  el.contextStrip.innerHTML = buildContextStrip(context);
  el.heroHand.textContent = state.current.key;
  el.holeCards.innerHTML = "";
  el.actionButtons.innerHTML = actions
    .map((action) => `<button class="action-button ${actionClass(action)}" type="button" data-action="${action}">${action}</button>`)
    .join("");
  el.actionButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => chooseAction(button.dataset.action, rec));
  });

  if (!state.answered) {
    el.resultBox.innerHTML = "<p>Choose an action, then compare it with the tournament recommendation.</p>";
    el.frequencyBars.innerHTML = renderBars(hiddenProfile(actions));
    el.explainBox.innerHTML = `<p>${spotHint(state.spot, context)}</p>`;
    renderRunoutBox(context, rec);
    return;
  }

  renderRecommendation(rec);
  renderRunoutBox(context, rec);
}

function trainerActionNote(spot, context, actions) {
  if (spot === "open") return "No call in unopened pot";
  if (!actions.includes("Call")) return `${state.stackBb}BB is jam-or-fold here`;
  if (spot === "flopVsCbet") return `Facing ${formatBb(context.betSize)} c-bet`;
  return "Call unlocks once you face action";
}

function spotHint(spot, context) {
  if (spot === "open") {
    return "Open spots do not show Call because nobody has entered the pot yet. Once you face an open, a 3-bet, or a flop c-bet, Call comes back into the action row.";
  }

  if (spot === "flopVsCbet") {
    return `You called preflop, the flop is ${boardText(context.board)}, and the opener fires ${formatBb(context.betSize)} into ${formatBb(context.potBeforeBet)}. Use pair strength, draws, and position to decide between fold, call, and raise.`;
  }

  if ((spot === "vsRaise" || spot === "vs3bet") && !getSpotActions(state.spot, state.stackBb).includes("Call")) {
    return `At ${state.stackBb}BB this branch is intentionally jam-or-fold. That is why Call disappears even though you are facing action. The trainer is pushing the shorter-stack tournament response instead of a flatting line.`;
  }

  return "Tournament spots mix table size, stack depth, position, and pressure. Look at who opened, how big they made it, and how much you must continue for.";
}

function renderTableScene(context) {
  el.felt.dataset.theme = state.tableTheme;
  el.tableSeats.innerHTML = buildSeatMarkup(context);
  el.potBadge.innerHTML = `
    <span>Total Pot</span>
    <strong>${formatBb(context.potBb || 0)}</strong>
    <em>${context.toCallBb ? `To call ${formatBb(context.toCallBb)}` : "Unopened"}</em>
  `;
  positionDealerChip();
  const hasBoard = Array.isArray(context.board) && context.board.length > 0;
  el.boardWrap.classList.toggle("is-hidden", !hasBoard);
  if (!hasBoard) {
    el.boardLabel.textContent = "";
    el.boardCards.innerHTML = "";
    return;
  }

  el.boardLabel.textContent = context.boardLabel || "Flop";
  el.boardCards.innerHTML = context.board.map((card) => renderCard(card, "board-card")).join("");
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
  const picked = chosen || "Selected";
  const isCorrect = !chosen || chosen === rec.primary || chosen === rec.secondary;
  const tone = isCorrect ? "On line" : "Off line";
  el.resultBox.innerHTML = `
    <strong>${tone} · ${picked}</strong>
    <p>Main line: ${rec.primary}${rec.secondary ? ` / mix: ${rec.secondary}` : ""}. The model prefers ${rec.primary} ${rec.primaryFreq}% of the time.</p>
  `;
  el.frequencyBars.innerHTML = renderBars(rec.profile);
  el.explainBox.innerHTML = `<p>${rec.note}</p>`;
}

function playOutCurrentHand() {
  const context = state.context || buildSpotContext(state.position, state.spot, state.tableSize, state.stackBb, state.current);
  const startingBoard = Array.isArray(context.board) ? [...context.board] : drawRandomCards(3, state.current.cards);
  const excluded = [...state.current.cards, ...startingBoard];
  const remainingBoard = drawRandomCards(Math.max(0, 5 - startingBoard.length), excluded);
  const fullBoard = [...startingBoard, ...remainingBoard];
  const outcome = assessRunout(state.current.cards, fullBoard);

  state.runout = {
    flop: fullBoard.slice(0, 3),
    turn: fullBoard[3],
    river: fullBoard[4],
    board: fullBoard,
    outcome,
  };
  render();
}

function renderRunoutBox(context, rec) {
  if (!state.runout) {
    const cue = context.board ? "Run the turn and river from this flop." : "Run one possible flop, turn, and river after your preflop decision.";
    el.runoutBox.innerHTML = `<p>${cue}</p>`;
    return;
  }

  const turnText = state.runout.turn ? `${state.runout.turn.rank}${state.runout.turn.suit.symbol}` : "";
  const riverText = state.runout.river ? `${state.runout.river.rank}${state.runout.river.suit.symbol}` : "";
  el.runoutBox.innerHTML = `
    <div class="runout-board">
      <span>Flop ${boardText(state.runout.flop)}</span>
      <span>Turn ${turnText}</span>
      <span>River ${riverText}</span>
    </div>
    <strong>${state.runout.outcome.title}</strong>
    <p>${state.runout.outcome.body} Current recommendation starts with ${rec.primary}${rec.secondary ? `, mixed with ${rec.secondary}` : ""}.</p>
  `;
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
  el.rangeContext.textContent = `${tableConfigs[state.tableSize].label} / ${state.stackBb}BB / ${state.position} / ${spot.label}`;
  el.rangeMatrix.innerHTML = allHands
    .map((hand) => {
      const rec = recommend(hand.key, state.position, state.spot, state.tableSize, state.stackBb, context);
      const className = cellClass(rec);
      const selected = hand.key === state.selectedKey ? " is-selected" : "";
      return `<button type="button" class="${className}${selected}" data-hand="${hand.key}" aria-label="${hand.key} ${rec.primary}">${hand.key}</button>`;
    })
    .join("");
  el.rangeMatrix.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedKey = button.dataset.hand;
      state.current = handFromKey(state.selectedKey);
      if (state.spot === "flopVsCbet" && state.context?.board && cardsOverlap(state.current.cards, state.context.board)) {
        rebuildContext(state.current);
      }
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
    ${context.board ? `<span>Board ${boardText(context.board)}</span>` : ""}
    <p>${rec.primary}${rec.secondary ? `, mix ${rec.secondary}` : ""}. ${rec.note}</p>
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
    el.oddsDecision.textContent = "Good call";
  } else if (edge >= 0) {
    el.oddsDecision.textContent = "Thin call";
    el.oddsDecision.classList.add("warning");
  } else {
    el.oddsDecision.textContent = "Not enough equity";
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
      return `
        <div class="seat ${seatState.tone} ${stackClass(stack)} ${isHero ? "hero" : ""} align-${seat.align}" style="--seat-x:${seat.x}%; --seat-y:${seat.y}%;">
          <div class="seat-label">${position}</div>
          <div class="seat-stack">${formatStack(stack)}</div>
          <div class="seat-action">${seatState.status}</div>
          ${isHero ? `<div class="seat-hole-cards">${state.current.cards.map((card) => renderCard(card, "seat-card")).join("")}</div>` : ""}
          ${seatState.showCards ? `<div class="mini-cards">${renderCardBack()}${renderCardBack()}</div>` : ""}
        </div>
      `;
    })
    .join("");
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
  el.dealerChip.style.left = `${seat.x}%`;
  el.dealerChip.style.top = `${seat.y}%`;
}

function describeSeat(position, context) {
  const posted = blindPosted(position);
  if (position === state.position) {
    if (context.spot === "vs3bet") return { status: `Opened ${formatBb(context.openSize)}`, tone: "hero" };
    if (context.spot === "flopVsCbet") return { status: "Hero to act", tone: "hero" };
    return { status: "Hero to act", tone: "hero" };
  }

  if (context.spot === "vsRaise" && position === context.openerPosition) {
    return { status: `Open ${formatBb(context.openSize)}`, tone: "aggressor", showCards: true };
  }

  if (context.spot === "vs3bet" && position === context.threeBettorPosition) {
    return { status: `3-bet ${formatBb(context.threeBetSize)}`, tone: "aggressor", showCards: true };
  }

  if (context.spot === "flopVsCbet" && position === context.openerPosition) {
    return { status: `Bet ${formatBb(context.betSize)}`, tone: "aggressor", showCards: true };
  }

  if (posted > 0) {
    return { status: `${position} ${formatBb(posted)}`, tone: "blind" };
  }

  return { status: "Waiting", tone: "idle" };
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
          <span>${line.label}</span>
          <strong>${line.value}</strong>
        </div>
      `,
    )
    .join("");
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
