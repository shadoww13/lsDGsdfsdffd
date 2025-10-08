document.addEventListener("DOMContentLoaded", () => {
  try { Telegram?.WebApp?.ready?.(); } catch (e) {}

  const homePage = document.getElementById("homePage");
  const pairPage = document.getElementById("pairPage");
  const timePage = document.getElementById("timePage");
  const signalPage = document.getElementById("signalPage");

  const menuGrid = document.getElementById("menuGrid");
  const pairsList = document.getElementById("pairsList");
  const pairGrid = document.getElementById("pairGrid");
  const otcBtn = document.getElementById("otcBtn");
  const stockBtn = document.getElementById("stockBtn");
  const otcBtnTime = document.getElementById("otcBtnTime");
  const stockBtnTime = document.getElementById("stockBtnTime");
  const timeGrid = document.getElementById("timeGrid");
  const newSignalBtn = document.getElementById("newSignalBtn");

  const loadingSection = document.getElementById("loadingSection");
  const signalResult = document.getElementById("signalResult");
  const signalPair = document.getElementById("signalPair");
  const signalType = document.getElementById("signalType");
  const signalTime = document.getElementById("signalTime");
  const signalArrow = document.getElementById("signalArrow");
  const signalAction = document.getElementById("signalAction");
  const signalInfo = document.getElementById("signalInfo");

  const pages = { home: homePage, pair: pairPage, time: timePage, signal: signalPage };

  let history = ["home"];
  let selectedPair = null;
  let selectedTime = null;
  let selectedType = "OTC";
  let timers = [];

  const clearTimers = () => { timers.forEach(t => clearTimeout(t)); timers = []; };

  const show = (id) => {
    clearTimers();
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[id].classList.remove("hidden");
    if (history.at(-1) !== id) history.push(id);
    if (id === "signal") loadSignal();
  };

  const back = () => {
    clearTimers();
    if (history.length > 1) {
      history.pop();
      const prev = history.at(-1);
      show(prev);
    } else show("home");
  };

  document.querySelectorAll(".back-btn").forEach(b => b.addEventListener("click", back));

  menuGrid.innerHTML = PAIRS_CONFIG.menu.map(m =>
    `<div class="menu-card" id="${m.id}">
       <div>
         <div style="font-weight:700">${m.title}</div>
         ${m.sub ? `<div style="font-size:12px;color:var(--muted);margin-top:6px">${m.sub}</div>` : ""}
       </div>
     </div>`).join("");

  PAIRS_CONFIG.menu.forEach(m => {
    const el = document.getElementById(m.id);
    if (el) el.addEventListener("click", () => show("pair"));
  });

  pairsList.innerHTML = PAIRS_CONFIG.popularPairs.map(p => `
    <li class="pair">
      <div class="pair-left">${p.flag1 === "btc" ? "₿" : `<span class="flag flag-icon flag-icon-${p.flag1}"></span>`}</div>
      <div class="pair-label">${p.label}</div>
      <div class="pair-right">${p.flag2 === "btc" ? "₿" : `<span class="flag flag-icon flag-icon-${p.flag2}"></span>`}<span class="otc-badge">OTC</span></div>
    </li>
  `).join("");

  pairsList.querySelectorAll(".pair").forEach((el, i) => {
    el.addEventListener("click", () => {
      selectedPair = PAIRS_CONFIG.popularPairs[i].label;
      show("time");
    });
  });

  const renderPairs = (mode) => {
    const list = mode === "otc" ? PAIRS_CONFIG.otcPairs : PAIRS_CONFIG.stockPairs;
    pairGrid.innerHTML = list.map(p => `<div class="pair-card">${p.label}</div>`).join("");
    pairGrid.querySelectorAll(".pair-card").forEach(c => {
      c.addEventListener("click", () => {
        selectedPair = c.textContent.trim();
        selectedType = mode.toUpperCase();
        show("time");
      });
    });
  };

  otcBtn.addEventListener("click", () => {
    otcBtn.classList.add("active");
    stockBtn.classList.remove("active");
    renderPairs("otc");
  });
  stockBtn.addEventListener("click", () => {
    stockBtn.classList.add("active");
    otcBtn.classList.remove("active");
    renderPairs("stock");
  });

  otcBtnTime.addEventListener("click", () => {
    otcBtnTime.classList.add("active");
    stockBtnTime.classList.remove("active");
    selectedType = "OTC";
  });
  stockBtnTime.addEventListener("click", () => {
    stockBtnTime.classList.add("active");
    otcBtnTime.classList.remove("active");
    selectedType = "STOCK";
  });

  renderPairs("otc");

  timeGrid.innerHTML = PAIRS_CONFIG.times.map(t => `
    <div class="time-card" data-time="${t.time}">
      <div class="time-top"><span class="time-emoji">${t.emoji}</span><strong>${t.time}</strong></div>
      <div class="time-sub">${t.sub}</div>
    </div>
  `).join("");

  timeGrid.querySelectorAll(".time-card").forEach(b => {
    b.addEventListener("click", () => {
      selectedTime = b.dataset.time;
      show("signal");
    });
  });

  if (newSignalBtn) newSignalBtn.addEventListener("click", () => loadSignal());

  const loadSignal = () => {
    clearTimers();
    loadingSection.classList.remove("hidden");
    signalResult.classList.add("hidden");
    const text = loadingSection.querySelector(".loading-text");
    PAIRS_CONFIG.loadingSteps.forEach((step, i) => {
      const timer = setTimeout(() => {
        text.textContent = step;
        if (i === PAIRS_CONFIG.loadingSteps.length - 1) {
          timers.push(setTimeout(showSignal, 700));
        }
      }, i * 1000 + 200);
      timers.push(timer);
    });
  };

  const showSignal = () => {
    clearTimers();
    loadingSection.classList.add("hidden");
    signalResult.classList.remove("hidden");

    const pair = selectedPair || "USD/EUR";
    const time = selectedTime || "1m";
    const type = selectedType || "OTC";
    const action = Math.random() > 0.5 ? "BUY" : "SELL";
    const arrow = action === "BUY" ? "↗" : "↘";

    signalPair.textContent = pair;
    signalType.textContent = type;
    signalTime.textContent = time;
    signalArrow.textContent = arrow;
    signalArrow.className = `signal-arrow ${action === "BUY" ? "up" : "down"}`;
    signalAction.textContent = action;
    signalAction.className = `signal-action ${action === "BUY" ? "buy" : "sell"}`;

    const indicators = action === "BUY" ? PAIRS_CONFIG.buyIndicators : PAIRS_CONFIG.sellIndicators;
    const chosen = indicators.slice().sort(() => 0.5 - Math.random()).slice(0, 3);
    signalInfo.innerHTML = chosen.map(i => `<div>${i}</div>`).join("");
  };

  show("home");
});