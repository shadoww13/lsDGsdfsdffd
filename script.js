document.addEventListener("DOMContentLoaded", () => {
  // Telegram WebApp ready (if available)
  try { Telegram?.WebApp?.ready?.(); } catch (e) { /* ignore */ }

  // адаптивная высота (важно для Telegram WebApp)
  const setAppHeight = () => {
    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  setAppHeight();
  window.addEventListener("resize", setAppHeight);
  window.addEventListener("orientationchange", setAppHeight);

  // DOM elements
  const homePage = document.getElementById("homePage");
  const pairPage = document.getElementById("pairPage");
  const timePage = document.getElementById("timePage");
  const signalPage = document.getElementById("signalPage");

  const menuGrid = document.getElementById("menuGrid");
  const pairsList = document.getElementById("pairsList");

  const pairGrid = document.getElementById("pairGrid");
  const otcBtn = document.getElementById("otcBtn");
  const stockBtn = document.getElementById("stockBtn");

  const timeGrid = document.getElementById("timeGrid");
  const newSignalBtn = document.getElementById("newSignalBtn");

  const loadingSection = document.getElementById("loadingSection");
  const signalResult = document.getElementById("signalResult");
  const signalPair = document.getElementById("signalPair");
  const signalTime = document.getElementById("signalTime");
  const signalArrow = document.getElementById("signalArrow");
  const signalAction = document.getElementById("signalAction");
  const signalInfo = document.getElementById("signalInfo");

  // pages map
  const pages = { home: homePage, pair: pairPage, time: timePage, signal: signalPage };

  // state
  let history = ["home"];
  let selectedPair = null;
  let selectedTime = null;
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
    } else {
      show("home");
    }
  };

  // attach back buttons (all .back-btn)
  document.querySelectorAll(".back-btn").forEach(b => {
    b.addEventListener("click", back);
  });

  // build menu
  menuGrid.innerHTML = PAIRS_CONFIG.menu.map(m =>
    `<div class="menu-card" id="${m.id}">
       <div>
         <div style="font-weight:700">${m.title}</div>
         ${m.sub ? `<div style="font-size:12px;color:var(--muted);margin-top:6px">${m.sub}</div>` : ""}
       </div>
     </div>`).join("");

  // attach menu item actions (open pair page)
  PAIRS_CONFIG.menu.forEach(m => {
    const el = document.getElementById(m.id);
    if (el) el.addEventListener("click", () => show("pair"));
  });

  // build popular pairs
  pairsList.innerHTML = PAIRS_CONFIG.popularPairs.map(p => `
    <li class="pair">
      <div class="pair-left">${p.flag1 === "btc" ? "₿" : `<span class="flag flag-icon flag-icon-${p.flag1}"></span>`}</div>
      <div class="pair-label">${p.label}</div>
      <div class="pair-right">${p.flag2 === "btc" ? "₿" : `<span class="flag flag-icon flag-icon-${p.flag2}"></span>`}<span style="margin-left:8px;color:var(--danger);">🔥</span></div>
    </li>
  `).join("");

  // attach click on popular pairs -> go to time page
  pairsList.querySelectorAll(".pair").forEach((el, i) => {
    el.addEventListener("click", () => {
      selectedPair = PAIRS_CONFIG.popularPairs[i].label;
      show("time");
    });
  });

  // function to render pair grid (OTC / STOCK)
  const renderPairs = (mode) => {
    const list = mode === "otc" ? PAIRS_CONFIG.otcPairs : PAIRS_CONFIG.stockPairs;
    pairGrid.innerHTML = list.map(p => `<div class="pair-card">${p.label}</div>`).join("");
    pairGrid.querySelectorAll(".pair-card").forEach(c => {
      c.addEventListener("click", () => {
        selectedPair = c.textContent.trim();
        show("time");
      });
    });
  };

  // OTC / STOCK buttons on PAIR page
  if (otcBtn && stockBtn) {
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
  }

  // initial pairs render
  renderPairs("otc");

  // build time cards
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

  // new signal
  if (newSignalBtn) newSignalBtn.addEventListener("click", () => loadSignal());

  // loading/signal flow
  const loadSignal = () => {
    clearTimers();
    if (loadingSection) loadingSection.classList.remove("hidden");
    if (signalResult) signalResult.classList.add("hidden");
    const text = loadingSection ? loadingSection.querySelector(".loading-text") : null;
    PAIRS_CONFIG.loadingSteps.forEach((step, i) => {
      const timer = setTimeout(() => {
        if (text) text.textContent = step;
        // after last step — show result shortly after
        if (i === PAIRS_CONFIG.loadingSteps.length - 1) {
          timers.push(setTimeout(showSignal, 700));
        }
      }, i * 1000 + 200);
      timers.push(timer);
    });
  };

  const showSignal = () => {
    clearTimers();
    if (loadingSection) loadingSection.classList.add("hidden");
    if (signalResult) signalResult.classList.remove("hidden");

    const pair = selectedPair || PAIRS_CONFIG.popularPairs[Math.floor(Math.random() * PAIRS_CONFIG.popularPairs.length)].label;
    const time = selectedTime || PAIRS_CONFIG.times[Math.floor(Math.random() * PAIRS_CONFIG.times.length)].time;
    const action = Math.random() > 0.5 ? "BUY" : "SELL";
    const arrow = action === "BUY" ? "↗" : "↘";

    if (signalPair) signalPair.textContent = pair;
    if (signalTime) signalTime.textContent = time;
    if (signalArrow) {
      signalArrow.textContent = arrow;
      signalArrow.className = `signal-arrow ${action === "BUY" ? "up" : "down"}`;
    }
    if (signalAction) {
      signalAction.textContent = action;
      signalAction.className = `signal-action ${action === "BUY" ? "buy" : "sell"}`;
    }

    const indicators = action === "BUY" ? PAIRS_CONFIG.buyIndicators : PAIRS_CONFIG.sellIndicators;
    if (signalInfo) {
      const chosen = indicators.slice().sort(() => 0.5 - Math.random()).slice(0, 3);
      signalInfo.innerHTML = "<ul>" + chosen.map(i => `<li>${i}</li>`).join("") + "</ul>";
    }
  };

  // Open initial page
  show("home");
});
