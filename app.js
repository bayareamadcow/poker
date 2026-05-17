const COMMENT_REPO = "bayareamadcow/poker";
const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const suits = [
  { symbol: "\u2660", name: "spade", red: false },
  { symbol: "\u2665", name: "heart", red: true },
  { symbol: "\u2666", name: "diamond", red: true },
  { symbol: "\u2663", name: "club", red: false },
];
const rankValue = Object.fromEntries(ranks.map((rank, index) => [rank, 14 - index]));

const tableConfigs = {
  6: {
    label: "6-max",
    positions: ["UTG", "HJ", "CO", "BTN", "SB", "BB"],
    candidates: {
      open: ["UTG", "HJ", "CO", "BTN", "SB"],
      vsRaise: ["HJ", "CO", "BTN", "SB", "BB"],
      vs3bet: ["UTG", "HJ", "CO", "BTN", "SB"],
    },
  },
  8: {
    label: "8-max",
    positions: ["UTG", "UTG+1", "LJ", "HJ", "CO", "BTN", "SB", "BB"],
    candidates: {
      open: ["UTG", "UTG+1", "LJ", "HJ", "CO", "BTN", "SB"],
      vsRaise: ["UTG+1", "LJ", "HJ", "CO", "BTN", "SB", "BB"],
      vs3bet: ["UTG", "UTG+1", "LJ", "HJ", "CO", "BTN", "SB"],
    },
  },
};

const stackPresets = [8, 10, 12, 15, 20, 30, 40, 60, 80];
const spots = [
  { id: "open", label: "Open First In" },
  { id: "vsRaise", label: "Facing Raise" },
  { id: "vs3bet", label: "Facing 3-bet" },
];

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
    title: "Feedback wall",
    body: "The comments page stores feedback in GitHub so you can read it later from any device, even after people visit the public Pages link.",
  },
];

const allHands = buildHands();
const ranges = buildRanges(rangeText);

const state = {
  view: "trainer",
  tableSize: 8,
  stackBb: 25,
  position: "HJ",
  spot: "open",
  current: makeHand("A", "J", true),
  selectedKey: "AJs",
  answered: false,
  correct: 0,
  played: 0,
  streak: 0,
  streetMode: "two",
};

const el = {
  brandContext: document.querySelector("#brandContext"),
  tableSizeButtons: document.querySelector("#tableSizeButtons"),
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
  scenarioText: document.querySelector("#scenarioText"),
  scenarioMeta: document.querySelector("#scenarioMeta"),
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
    state.answered = false;
    render();
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

  el.randomSpot.addEventListener("click", () => randomTournamentSpot({ fullRandom: true }));
  el.sameContextHand.addEventListener("click", () => randomTournamentSpot({ fullRandom: false }));
  el.nextHand.addEventListener("click", () => randomTournamentSpot({ fullRandom: true }));

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
      normalizeState();
      state.answered = false;
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
      normalizeState();
      state.answered = false;
      render();
    });
  });

  el.stackSize.value = String(state.stackBb);
  el.stackSizeValue.textContent = `${state.stackBb}BB`;
  el.stackBandLabel.textContent = stackBandLabel(state.stackBb);
  el.stackPresetButtons.innerHTML = stackPresets
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
      state.answered = false;
      render();
    });
  });

  el.brandContext.textContent = `${tableConfigs[state.tableSize].label} tournament trainer · ${state.stackBb}BB`;
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
  const rec = recommend(state.current.key, state.position, state.spot, state.tableSize, state.stackBb);
  const actions = getSpotActions(state.spot, state.stackBb);
  const lateFlag = isLatePosition(state.position, state.tableSize) ? "Late-position pressure" : "Earlier seat discipline";

  el.scenarioText.textContent = `${tableConfigs[state.tableSize].label} · ${state.stackBb}BB · ${state.position} · ${spot.label}`;
  el.scenarioMeta.innerHTML = `
    <span class="pill ghost">${stackBandLabel(state.stackBb)}</span>
    <span class="pill ghost">${lateFlag}</span>
  `;
  el.heroHand.textContent = state.current.key;
  el.holeCards.innerHTML = state.current.cards.map(renderCard).join("");
  el.actionButtons.innerHTML = actions
    .map((action) => `<button class="action-button ${actionClass(action)}" type="button" data-action="${action}">${action}</button>`)
    .join("");
  el.actionButtons.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => chooseAction(button.dataset.action, rec));
  });

  if (!state.answered) {
    el.resultBox.innerHTML = "<p>Choose an action, then compare it with the tournament recommendation.</p>";
    el.frequencyBars.innerHTML = renderBars(hiddenProfile(actions));
    el.explainBox.innerHTML = "<p>Random MTT mode now mixes table size, stack depth, position, and more realistic short-stack action choices.</p>";
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
  el.rangeContext.textContent = `${tableConfigs[state.tableSize].label} / ${state.stackBb}BB / ${state.position} / ${spot.label}`;
  el.rangeMatrix.innerHTML = allHands
    .map((hand) => {
      const rec = recommend(hand.key, state.position, state.spot, state.tableSize, state.stackBb);
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
  const rec = recommend(state.selectedKey, state.position, state.spot, state.tableSize, state.stackBb);
  el.selectedHandDetail.innerHTML = `
    <strong>${state.selectedKey}</strong>
    <span>${tableConfigs[state.tableSize].label} · ${state.stackBb}BB · ${state.position}</span>
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

function randomTournamentSpot({ fullRandom = true, preserveScore = false } = {}) {
  if (fullRandom) {
    state.tableSize = weightedChoice([
      { value: 6, weight: 43 },
      { value: 8, weight: 57 },
    ]);
    state.stackBb = randomTournamentStack();
    state.spot = weightedChoice([
      { value: "open", weight: 46 },
      { value: "vsRaise", weight: 36 },
      { value: "vs3bet", weight: 18 },
    ]);
    state.position = weightedChoice(
      getCandidatePositions(state.spot, state.tableSize).map((position, index, list) => ({
        value: position,
        weight: 10 + Math.max(index, list.length - index - 1) * 3,
      })),
    );
  }

  normalizeState();
  state.current = handFromKey(pickTrainingHand(state.position, state.spot, state.tableSize, state.stackBb, state.selectedKey));
  state.selectedKey = state.current.key;
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
    const weight = trainingWeight(rec, strength, hand.key, spot, stackBb);
    return { value: hand.key, weight };
  });

  let pick = weightedChoice(pool);
  if (pick === previous) {
    pick = weightedChoice(pool);
  }
  return pick;
}

function trainingWeight(rec, strength, key, spot, stackBb) {
  const traits = inspectHand(key);
  let weight = 1;

  if (rec.primary !== "Fold") weight += 9;
  if (rec.secondary) weight += 5;
  if (strength >= 58 && strength <= 84) weight += 4;
  if (traits.isPair || traits.hasAce) weight += 1;
  if (spot !== "open" && stackBb <= 20 && rec.primary === "Jam") weight += 5;
  if (stackBb <= 12 && spot === "open" && rec.primary !== "Fold") weight += 3;

  return weight;
}

function getSpotActions(spotId, stackBb) {
  if (spotId === "open") {
    if (stackBb <= 11) return ["Fold", "Jam"];
    if (stackBb <= 20) return ["Fold", "Raise", "Jam"];
    return ["Fold", "Raise"];
  }

  if (spotId === "vsRaise") {
    if (stackBb <= 11) return ["Fold", "Jam"];
    if (stackBb <= 20) return ["Fold", "Call", "Jam"];
    return ["Fold", "Call", "3-bet"];
  }

  if (stackBb <= 16) return ["Fold", "Jam"];
  if (stackBb <= 25) return ["Fold", "Call", "Jam"];
  return ["Fold", "Call", "4-bet"];
}

function recommend(key, position, spot, tableSize, stackBb) {
  const actions = getSpotActions(spot, stackBb);
  const traits = inspectHand(key);
  const strength = handStrength(key);
  const openSet = ranges[tableSize].open[position] || new Set();
  const threeBetSet = ranges[tableSize].threeBet[position] || new Set();
  const callRaiseSet = ranges[tableSize].callRaise[position] || new Set();
  const fourBetSet = ranges[tableSize].fourBet[position] || new Set();
  const call3betSet = ranges[tableSize].call3bet[position] || new Set();
  const positionLift = positionLeverage(position, tableSize);

  if (spot === "open") {
    const cutoff = openThreshold(position, tableSize) + shallowOpenPenalty(stackBb, position, tableSize);
    const playable = openSet.has(key) || strength + positionLift * 2 >= cutoff;
    if (!playable) {
      return foldRec(actions, "This combo sits below the tournament opening line for this seat and stack. Passing now protects future spots.");
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

    const callCandidate =
      actions.includes("Call") &&
      (callRaiseSet.has(key) ||
        (stackBb >= 18 && traits.isSuited && traits.highValue >= 12) ||
        (position === "BB" && stackBb >= 14 && strength >= 55));

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
  state.stackBb = Math.max(5, Math.min(80, Number(state.stackBb) || 25));
  const candidates = getCandidatePositions(state.spot, state.tableSize);
  if (!candidates.includes(state.position)) {
    state.position = candidates[Math.floor(candidates.length / 2)];
  }
}

function getActivePositions(tableSize) {
  return tableConfigs[tableSize].positions;
}

function getCandidatePositions(spot, tableSize) {
  return tableConfigs[tableSize].candidates[spot];
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
  if (stackBb <= 10) return "Push / fold stack";
  if (stackBb <= 20) return "Short stack";
  if (stackBb <= 40) return "Middle stack";
  return "Deep tournament stack";
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
  const band = weightedChoice([
    { value: [5, 10], weight: 17 },
    { value: [11, 15], weight: 17 },
    { value: [16, 25], weight: 24 },
    { value: [26, 40], weight: 21 },
    { value: [41, 80], weight: 21 },
  ]);

  return randomInt(band[0], band[1]);
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

function formatPct(value) {
  return `${(value * 100).toFixed(1)}%`;
}
