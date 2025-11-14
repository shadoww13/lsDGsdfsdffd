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
  const timeGrid = document.getElementById("timeGrid");
  const newSignalBtn = document.getElementById("newSignalBtn");
  const prevPage = document.getElementById("prevPage");
  const nextPage = document.getElementById("nextPage");
  const pageIndicator = document.getElementById("pageIndicator");

  const loadingSection = document.getElementById("loadingSection");
  const progressCircle = document.getElementById("progressCircle");
  const progressStep = document.getElementById("progressStep");
  const actionPlaceholder = document.getElementById("actionPlaceholder");
  const indicatorsPlaceholder = document.getElementById("indicatorsPlaceholder");
  const signalResult = document.getElementById("signalResult");
  const signalPair = document.getElementById("signalPair");
  const signalType = document.getElementById("signalType");
  const signalTime = document.getElementById("signalTime");
  const signalAction = document.getElementById("signalAction");
  const signalInfo = document.getElementById("signalInfo");
  const signalDetails = document.getElementById("signalDetails");
  const signalIndicators = document.getElementById("signalIndicators");

  const pages = { home: homePage, pair: pairPage, time: timePage, signal: signalPage };

  let history = ["home"];
  let selectedPair = null;
  let selectedTime = null;
  let selectedType = "OTC";
  let timers = [];
  let currentMode = "otc";
  let selectedCategory = null;
  let categoryList = null;
  let selectedPairData = null;

  const pagination = {
    otc: { currentPage: 0 },
    stock: { currentPage: 0 }
  };

  const getCategoryList = (category) => {
    return PAIRS_CONFIG.categories[category] || { otc: [], stock: [] };
  };

  const clearTimers = () => { timers.forEach(t => clearTimeout(t)); timers = []; };

  const show = (id) => {
    clearTimers();
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[id].classList.remove("hidden");
    if (history.at(-1) !== id) history.push(id);

    if (id === "signal") {
      const pair = selectedPair || "USD/EUR";
      let leftFlag = "", rightFlag = "";

      if (selectedPairData) {
        const isStock = selectedPairData.isStock || selectedPairData.label.includes("Apple") || selectedPairData.label.includes("Cisco");
        if (!isStock) {
          leftFlag = selectedPairData.flag1 && selectedPairData.flag1 !== "xx" 
            ? (selectedPairData.flag1 === "btc" ? "Bitcoin" : `<span class="fi fi-${selectedPairData.flag1}"></span>`) 
            : "";
          rightFlag = selectedPairData.flag2 && selectedPairData.flag2 !== "xx" 
            ? (selectedPairData.flag2 === "btc" ? "Bitcoin" : `<span class="fi fi-${selectedPairData.flag2}"></span>`) 
            : "";
        }
      }

      signalPair.innerHTML = `
        <div class="pair-left">${leftFlag}</div>
        <div class="pair-label">${pair}</div>
        <div class="pair-right">${rightFlag}</div>
      `;
      signalType.textContent = selectedType || "OTC";
      signalTime.textContent = selectedTime || "1m";
      loadSignal();
    }

    if (id === "pair") {
      otcBtn.style.display = categoryList.otc.length > 0 ? "" : "none";
      stockBtn.style.display = categoryList.stock.length > 0 ? "" : "none";
      if (categoryList.otc.length > 0) {
        currentMode = "otc";
        otcBtn.classList.add("active");
        stockBtn.classList.remove("active");
      } else if (categoryList.stock.length > 0) {
        currentMode = "stock";
        stockBtn.classList.add("active");
        otcBtn.classList.remove("active");
      }
      renderPairs(currentMode);
    }
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

  // === МЕНЮ ===
  menuGrid.innerHTML = PAIRS_CONFIG.menu.map(m =>
    `<div class="menu-card" id="${m.id}">
       <div>
         <div style="font-weight:700;font-size:16px">${m.title}</div>
         ${m.sub ? `<div style="font-size:12px;color:var(--muted);margin-top:6px">${m.sub}</div>` : ""}
       </div>
     </div>`).join("");

  PAIRS_CONFIG.menu.forEach(m => {
    const el = document.getElementById(m.id);
    if (el) el.addEventListener("click", () => {
      selectedCategory = "currencies";
      categoryList = getCategoryList(selectedCategory);
      pagination.otc.currentPage = 0;
      pagination.stock.currentPage = 0;
      show("pair");
    });
  });

  // === ПОПУЛЯРНЫЕ ПАРЫ ===
  const popularPairs = PAIRS_CONFIG.popularPairs;

  pairsList.innerHTML = popularPairs.map(p => {
    const isStock = p.isStock || false;
    const displayLabel = p.displayLabel || p.label;
    const leftFlag = isStock ? "" : (p.flag1 && p.flag1 !== "xx" ? `<span class="fi fi-${p.flag1}"></span>` : "");
    const rightFlag = isStock ? "" : (p.flag2 && p.flag2 !== "xx" ? `<span class="fi fi-${p.flag2}"></span>` : "");
    return `
      <li class="pair">
        <div class="pair-left">${leftFlag}</div>
        <div class="pair-label">${displayLabel}</div>
        <div class="pair-right">${rightFlag}<span class="otc-badge">OTC</span></div>
      </li>
    `;
  }).join("");

  pairsList.querySelectorAll(".pair").forEach((el, i) => {
    el.addEventListener("click", () => {
      const pairData = popularPairs[i];
      selectedPair = pairData.displayLabel || pairData.label;
      selectedPairData = pairData;
      show("time");
    });
  });

  // === РЕНДЕР ПАР В КАТЕГОРИЯХ ===
  const renderPairs = (mode) => {
    let list = categoryList[mode] || [];
    const pageSize = 10;
    let state = pagination[mode];
    if (state.currentPage < 0) state.currentPage = 0;
    const totalPages = Math.ceil(list.length / pageSize);
    if (state.currentPage >= totalPages) state.currentPage = totalPages - 1 >= 0 ? totalPages - 1 : 0;
    const start = state.currentPage * pageSize;
    const end = start + pageSize;
    const pageList = list.slice(start, end);
    const isCurrency = selectedCategory === "currencies";
    pairGrid.innerHTML = pageList.map((p, i) => {
      let labelContent = p.label;
      const upperMode = mode.toUpperCase();
      if (labelContent.endsWith(' ' + upperMode)) {
        labelContent = labelContent.slice(0, - (upperMode.length + 1));
      }
      const leftContent = isCurrency ? (p.flag1 === "btc" ? "Bitcoin" : (p.flag1 && p.flag1 !== "xx" ? `<span class="fi fi-${p.flag1}"></span>` : "")) : '';
      const rightContent = isCurrency ? (p.flag2 === "btc" ? "Bitcoin" : (p.flag2 && p.flag2 !== "xx" ? `<span class="fi fi-${p.flag2}"></span>` : "")) : (p.label.split('/')[1] || "");
      return `
      <div class="pair" style="${i % 2 === 0 ? 'grid-column: 1' : 'grid-column: 2'}">
        <div class="pair-left">${leftContent}</div>
        <div class="pair-label">${labelContent}</div>
        <div class="pair-right">${rightContent}</div>
      </div>
    `;
    }).join("");
    pairGrid.querySelectorAll(".pair").forEach(c => {
      c.addEventListener("click", () => {
        const label = c.querySelector(".pair-label").textContent.trim();
        selectedPair = label + (label.includes('/') ? '' : ` ${mode.toUpperCase()}`);
        const fullList = categoryList[mode];
        const pairObj = fullList.find(p => p.label.includes(label));
        selectedPairData = pairObj || { flag1: "xx", flag2: "xx" };
        selectedType = mode.toUpperCase();
        show("time");
      });
    });
    prevPage.disabled = state.currentPage === 0;
    nextPage.disabled = state.currentPage === totalPages - 1 || totalPages <= 1;
    pageIndicator.textContent = `${state.currentPage + 1} / ${totalPages}`;
  };

  otcBtn.addEventListener("click", () => {
    if (categoryList.otc.length === 0) return;
    otcBtn.classList.add("active");
    stockBtn.classList.remove("active");
    currentMode = "otc";
    renderPairs("otc");
  });

  stockBtn.addEventListener("click", () => {
    if (categoryList.stock.length === 0) return;
    stockBtn.classList.add("active");
    otcBtn.classList.remove("active");
    currentMode = "stock";
    renderPairs("stock");
  });

  prevPage.addEventListener("click", () => {
    const state = pagination[currentMode];
    if (state.currentPage > 0) {
      state.currentPage--;
      renderPairs(currentMode);
    }
  });

  nextPage.addEventListener("click", () => {
    const state = pagination[currentMode];
    if (state.currentPage < Math.ceil((categoryList[currentMode] || []).length / 10) - 1) {
      state.currentPage++;
      renderPairs(currentMode);
    }
  });

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
    signalResult.classList.add("hidden");
    actionPlaceholder.classList.remove("hidden");
    signalDetails.classList.remove("hidden");
    indicatorsPlaceholder.classList.remove("hidden");
    signalIndicators.classList.add("hidden");
    loadingSection.classList.remove("hidden");
    progressCircle.classList.add("hidden");
    progressStep.textContent = PAIRS_CONFIG.loadingSteps[0];
    PAIRS_CONFIG.loadingSteps.forEach((step, i) => {
      const timer = setTimeout(() => {
        progressStep.textContent = step;
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
    progressCircle.classList.remove("hidden");
    signalResult.classList.remove("hidden");
    actionPlaceholder.classList.add("hidden");
    indicatorsPlaceholder.classList.add("hidden");
    signalIndicators.classList.remove("hidden");

    const action = Math.random() > 0.5 ? "BUY" : "SELL";
    const percentage = Math.floor(Math.random() * 26) + 70;

    signalAction.textContent = action;
    signalAction.className = `signal-action ${action.toLowerCase()}`;

    progressStep.textContent = "Probability of successful development:";
    document.querySelector('.progress-text').textContent = `${percentage}%`;
    document.querySelector('.progress-circle').style.setProperty('--progress', `${percentage}%`);

    const indicators = action === "BUY" ? PAIRS_CONFIG.buyIndicators : PAIRS_CONFIG.sellIndicators;
    const chosen = indicators.slice().sort(() => 0.5 - Math.random()).slice(0, 3);
    signalInfo.innerHTML = `<ul>${chosen.map(i => `<li>${i.toUpperCase()}</li>`).join("")}</ul>`;
  };

  show("home");
});