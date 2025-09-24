// script.js
document.addEventListener("DOMContentLoaded", () => {
  try { Telegram.WebApp.ready(); } catch(e){}

  const clickSound = document.getElementById("clickSound");
  function playClick() {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  }

  /* --- State --- */
  let selectedPairName = null;
  let selectedTime = null;

  /* --- Популярные пары --- */
  const pairs = [
    { flag1: "us", code1: "USD", code2: "EUR", flag2: "eu" },
    { flag1: "gb", code1: "GBP", code2: "USD", flag2: "us" },
    { flag1: "jp", code1: "JPY", code2: "USD", flag2: "us" },
    { flag1: "ch", code1: "CHF", code2: "USD", flag2: "us" },
    { flag1: "ca", code1: "CAD", code2: "USD", flag2: "us" },
    { flag1: "au", code1: "AUD", code2: "USD", flag2: "us" },
    { flag1: "btc", code1: "BTC", code2: "USD", flag2: "us" },
  ];

  const pairsList = document.getElementById("pairsList");
  pairs.forEach(pair => {
    const li = document.createElement("li");
    li.className = "pair";

    let flag1, flag2;
    if (pair.flag1 === "btc") {
      flag1 = `<span style="font-size:18px;">₿</span>`;
    } else {
      flag1 = `<span class="flag fi fi-${pair.flag1}"></span>`;
    }
    if (pair.flag2 === "btc") {
      flag2 = `<span style="font-size:18px;">₿</span>`;
    } else {
      flag2 = `<span class="flag fi fi-${pair.flag2}"></span>`;
    }

    li.innerHTML = `
      ${flag1}
      <span>${pair.code1} → ${pair.code2}</span>
      ${flag2}
      <span class="fire">🔥</span>
    `;
    li.addEventListener("click", () => {
      playClick();
      selectedPairName = `${pair.code1} → ${pair.code2}`;
      showPage("pair");
    });
    pairsList.appendChild(li);
  });

  /* --- Navigation --- */
  const pages = {
    home: document.getElementById("homePage"),
    pair: document.getElementById("pairPage"),
    time: document.getElementById("timePage"),
    signal: document.getElementById("signalPage"),
  };

  function showPage(id) {
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[id].classList.remove("hidden");

    // when showing signal page, if selection exists, start sequence
    if (id === "signal") {
      startSignalSequence();
    }
  }

  document.getElementById("btn1").addEventListener("click", () => { playClick(); showPage("pair"); });
  document.getElementById("btn2").addEventListener("click", () => { playClick(); showPage("pair"); });
  document.getElementById("btn3").addEventListener("click", () => { playClick(); showPage("pair"); });

  document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => { playClick(); showPage("home"); });
  });

  /* --- OTC/STOCK переключатель --- */
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
        selectedPairName = p;
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

  renderPairs("otc"); // стартуем с OTC

  /* --- Выбор времени --- */
  document.querySelectorAll(".time-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      playClick();
      selectedTime = e.currentTarget.textContent;
      showPage("signal");
    });
  });

  /* --- Signal sequence and rendering --- */
  const loaderSteps = Array.from(document.querySelectorAll("#loaderArea .loader-step"));
  const spinner = document.getElementById("spinner");
  const signalResult = document.getElementById("signalResult");
  const signalPair = document.getElementById("signalPair");
  const signalTime = document.getElementById("signalTime");
  const signalAction = document.getElementById("signalAction");
  const signalArrow = document.getElementById("signalArrow");
  const indicatorsList = document.getElementById("indicatorsList");
  const signalDesc = document.getElementById("signalDesc");
  const signalTitle = document.getElementById("signalTitle");
  const loaderArea = document.getElementById("loaderArea");

  const possibleIndicators = [
    "EMA Crossover",
    "MACD Divergence",
    "RSI Oversold",
    "Bollinger Bands Squeeze",
    "Volume Spike",
    "Stochastic Cross",
    "VWAP alignment",
    "Ichimoku Cloud Breakout"
  ];

  const possibleDescriptions = [
    "Краткий анализ: сильный тренд поддерживается объёмом и EMA.",
    "Краткий анализ: цена отскочила от уровня поддержки, индикаторы подтверждают.",
    "Краткий анализ: расхождение MACD указывает на возможный разворот.",
    "Краткий анализ: высокая волатильность и подтверждение RSI.",
    "Краткий анализ: сигнал основан на объёмном импульсе и стоп-расстановке."
  ];

  function pickRandom(list, n = 1) {
    const copy = [...list];
    const res = [];
    for (let i=0; i<n; i++) {
      if (copy.length === 0) break;
      const idx = Math.floor(Math.random() * copy.length);
      res.push(copy.splice(idx,1)[0]);
    }
    return res;
  }

  function resetLoaderUI() {
    loaderSteps.forEach((s, i) => {
      s.classList.remove("active", "done");
      if (i === 0) s.classList.add("active");
    });
    spinner.style.display = "block";
    signalResult.classList.add("hidden");
    signalTitle.textContent = "📡 Waiting for signal...";
  }

  let sequenceAbort = false;
  function startSignalSequence() {
    sequenceAbort = false;
    resetLoaderUI();

    // set pair/time placeholders
    signalPair.textContent = selectedPairName || "—";
    signalTime.textContent = selectedTime || "—";

    // step timings (ms)
    const steps = [
      { step: 1, duration: 1100 },
      { step: 2, duration: 1200 },
      { step: 3, duration: 1000 },
    ];

    let idx = 0;
    function nextStep() {
      if (sequenceAbort) return;
      if (idx > 0) {
        // mark previous as done
        loaderSteps[idx-1].classList.remove("active");
        loaderSteps[idx-1].classList.add("done");
      }
      if (idx >= loaderSteps.length) {
        // finished -> show result
        spinner.style.display = "none";
        showSignalResult();
        return;
      }
      // activate current
      loaderSteps[idx].classList.add("active");
      // schedule next
      const dur = steps[idx] ? steps[idx].duration : 900;
      idx++;
      setTimeout(nextStep, dur);
    }

    // small initial delay for UX
    setTimeout(nextStep, 500);
  }

  function showSignalResult() {
    // random decision BUY/SELL
    const isBuy = Math.random() > 0.5;
    signalAction.textContent = isBuy ? "BUY" : "SELL";
    signalAction.style.color = isBuy ? "#2ebd7e" : "#ff5c6c";
    signalArrow.textContent = isBuy ? "▲" : "▼";
    signalArrow.classList.toggle("up", isBuy);
    signalArrow.classList.toggle("down", !isBuy);

    // populate three indicators
    const indicators = pickRandom(possibleIndicators, 3);
    indicatorsList.innerHTML = "";
    indicators.forEach(ind => {
      const li = document.createElement("li");
      li.textContent = ind;
      indicatorsList.appendChild(li);
    });

    // random description
    const desc = pickRandom(possibleDescriptions, 1)[0];
    signalDesc.textContent = desc;

    signalTitle.textContent = isBuy ? "🚀 Signal generated — BUY" : "🔻 Signal generated — SELL";
    signalResult.classList.remove("hidden");
  }

  // If user navigates away to home, abort any running sequence
  document.getElementById("btn1").addEventListener("click", () => { sequenceAbort = true; });
  document.getElementById("btn2").addEventListener("click", () => { sequenceAbort = true; });
  document.getElementById("btn3").addEventListener("click", () => { sequenceAbort = true; });

});
