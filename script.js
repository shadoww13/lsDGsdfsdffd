document.addEventListener("DOMContentLoaded", () => {
  Telegram.WebApp && Telegram.WebApp.ready();

  const clickSound = document.getElementById("clickSound");
  function playClick() {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  }

  const pages = {
    home: document.getElementById("homePage"),
    pair: document.getElementById("pairPage"),
    time: document.getElementById("timePage"),
    signal: document.getElementById("signalPage")
  };

  let historyStack = ["home"];
  let selectedPair = null;
  let selectedTime = null;

  let stepTimeouts = [];

  function clearStepTimeouts() {
    if (stepTimeouts && stepTimeouts.length) {
      stepTimeouts.forEach(t => clearTimeout(t));
    }
    stepTimeouts = [];
  }

  function showPage(id) {
    clearStepTimeouts();
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[id].classList.remove("hidden");
    historyStack.push(id);
    if (id === "signal") startSignalLoading();
  }

  function goBack() {
    playClick();
    clearStepTimeouts();
    if (historyStack.length > 1) {
      historyStack.pop();
      const prev = historyStack.pop();
      showPage(prev);
    } else {
      showPage("home");
    }
  }

  ["btn1","btn2","btn3","btn4"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", () => {
      playClick();
      showPage("pair");
    });
  });

  document.querySelectorAll(".back-btn").forEach(btn => btn.addEventListener("click", goBack));

  const pairs = [
    { flag1: "us", flag2: "eu", label: "USD/EUR" },
    { flag1: "gb", flag2: "us", label: "GBP/USD" },
    { flag1: "jp", flag2: "us", label: "USD/JPY" },
    { flag1: "ca", flag2: "us", label: "CAD/USD" },
    { flag1: "au", flag2: "us", label: "AUD/USD" },
    { flag1: "btc", flag2: "us", label: "BTC/USD" }
  ];

  const pairsList = document.getElementById("pairsList");
  function renderPopularPairs() {
    pairsList.innerHTML = "";
    pairs.forEach(pair => {
      const li = document.createElement("li");
      li.className = "pair";
      const flag1 = pair.flag1 === "btc" ? "₿" : `<span class="flag fi fi-${pair.flag1}"></span>`;
      const flag2 = pair.flag2 === "btc" ? "₿" : `<span class="flag fi fi-${pair.flag2}"></span>`;
      li.innerHTML = `${flag1}<span>${pair.label}</span>${flag2}<span class="fire">🔥</span>`;
      li.addEventListener("click", () => {
        playClick();
        selectedPair = pair.label;
        showPage("time");
      });
      pairsList.appendChild(li);
    });
  }
  renderPopularPairs();

  const pairGrid = document.getElementById("pairGrid");
  const otcBtn = document.getElementById("otcBtn");
  const stockBtn = document.getElementById("stockBtn");

  const otcPairs = Array.from({ length: 12 }, (_, i) => `OTC Pair ${i+1}`);
  const stockPairs = Array.from({ length: 12 }, (_, i) => `STOCK Pair ${i+1}`);

  function renderPairs(mode) {
    pairGrid.innerHTML = "";
    const list = mode === "otc" ? otcPairs : stockPairs;
    list.forEach(p => {
      const div = document.createElement("div");
      div.className = "pair-card";
      div.textContent = p;
      div.addEventListener("click", () => {
        playClick();
        selectedPair = p;
        showPage("time");
      });
      pairGrid.appendChild(div);
    });
  }

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

  renderPairs("otc");

  document.querySelectorAll(".time-card").forEach(btn => {
    btn.addEventListener("click", () => {
      playClick();
      selectedTime = btn.getAttribute("data-time") || null;
      showPage("signal");
    });
  });

  const newSignalBtn = document.getElementById("newSignalBtn");
  if (newSignalBtn) {
    newSignalBtn.addEventListener("click", () => {
      playClick();
      startSignalLoading();
    });
  }

  function startSignalLoading() {
    clearStepTimeouts();

    const loadingSection = document.getElementById("loadingSection");
    const signalResult = document.getElementById("signalResult");
    const loadingText = document.querySelector(".loading-text");

    if (!loadingSection || !loadingText || !signalResult) return;

    loadingSection.classList.remove("hidden");
    signalResult.classList.add("hidden");

    const steps = [
      "Connecting to TradingView...",
      "Fetching indicators...",
      "Analyzing..."
    ];

    steps.forEach((text, i) => {
      const t = setTimeout(() => {
        loadingText.textContent = text;
        if (i === steps.length - 1) {
          const finishTimeout = setTimeout(() => {
            showSignal();
          }, 700);
          stepTimeouts.push(finishTimeout);
        }
      }, i * 1400);
      stepTimeouts.push(t);
    });
  }

  function showSignal() {
    clearStepTimeouts();

    const loadingSection = document.getElementById("loadingSection");
    const signalResult = document.getElementById("signalResult");

    if (!loadingSection || !signalResult) return;

    loadingSection.classList.add("hidden");
    signalResult.classList.remove("hidden");

    const fallbackPairs = ["EUR/USD", "GBP/USD", "USD/JPY", "BTC/USD"];
    const pairToShow = selectedPair || fallbackPairs[Math.floor(Math.random() * fallbackPairs.length)];
    const timeToShow = selectedTime || "1m";
    const action = Math.random() > 0.5 ? "BUY" : "SELL";
    const arrow = action === "BUY" ? "↗" : "↘";

    const signalPairEl = document.getElementById("signalPair");
    const signalTimeEl = document.getElementById("signalTime");
    const signalArrowEl = document.getElementById("signalArrow");
    const signalActionEl = document.getElementById("signalAction");
    const signalInfoEl = document.getElementById("signalInfo");

    if (signalPairEl) signalPairEl.textContent = pairToShow;
    if (signalTimeEl) signalTimeEl.textContent = timeToShow;
    if (signalArrowEl) {
      signalArrowEl.textContent = arrow;
      signalArrowEl.className = "signal-arrow " + (action === "BUY" ? "up" : "down");
    }
    if (signalActionEl) {
      signalActionEl.textContent = action;
      signalActionEl.className = "signal-action " + (action === "BUY" ? "buy" : "sell");
    }

    const indicators = [
      "RSI shows momentum",
      "MACD confirms direction",
      "Volume supports trend",
      "Bollinger Bands tightening",
      "Stochastic Oscillator active",
      "Moving Averages crossing",
      "Support/Resistance levels tested"
    ];

    if (signalInfoEl) {
      signalInfoEl.innerHTML = "<b>Based on indicators:</b><ul></ul>";
      const ul = signalInfoEl.querySelector("ul");
      const shuffled = indicators.sort(() => 0.5 - Math.random());
      shuffled.slice(0, 3 + Math.floor(Math.random() * 3)).forEach(i => {
        const li = document.createElement("li");
        li.textContent = i;
        ul.appendChild(li);
      });
    }
  }

  showPage("home");
});
