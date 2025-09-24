document.addEventListener("DOMContentLoaded", () => {
  // Telegram ready if exists
  if (window.Telegram && Telegram.WebApp) {
    try { Telegram.WebApp.ready(); } catch(e){/*ignore*/ }
  }

  const clickSound = document.getElementById("clickSound");
  function playClick() {
    if (!clickSound) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(()=>{});
  }

  // Pages
  const pages = {
    home: document.getElementById("homePage"),
    pair: document.getElementById("pairPage"),
    time: document.getElementById("timePage"),
    signal: document.getElementById("signalPage")
  };

  // Bottom area controls
  const globalBack = document.getElementById("globalBack");
  const newSignalBtn = document.getElementById("newSignalBtn");

  // shared state
  let selectedCategory = "otc";
  let selectedPair = null; // "USD/EUR" etc
  let selectedTime = null; // "30s" etc

  // Popular pairs (home)
  const popularPairs = [
    { flag1: "us", code1: "USD", code2: "EUR", flag2: "eu" },
    { flag1: "gb", code1: "GBP", code2: "USD", flag2: "us" },
    { flag1: "jp", code1: "JPY", code2: "USD", flag2: "us" },
    { flag1: "ch", code1: "CHF", code2: "USD", flag2: "us" },
    { flag1: "ca", code1: "CAD", code2: "USD", flag2: "us" },
    { flag1: "au", code1: "AUD", code2: "USD", flag2: "us" },
    { flag1: "btc", code1: "BTC", code2: "USD", flag2: "us" }
  ];

  // DOM refs
  const pairsList = document.getElementById("pairsList");
  const pairGrid = document.getElementById("pairGrid");
  const otcBtn = document.getElementById("otcBtn");
  const stockBtn = document.getElementById("stockBtn");
  const timeButtonsContainer = document.getElementById("timeButtons");

  const loaderArea = document.getElementById("loaderArea");
  const loaderSteps = Array.from(document.querySelectorAll("#signalPage .loader-step"));
  const spinner = document.getElementById("spinner");
  const signalResult = document.getElementById("signalResult");
  const resultPair = document.getElementById("resultPair");
  const resultTime = document.getElementById("resultTime");
  const actionText = document.getElementById("actionText");
  const arrowEl = document.getElementById("arrow");

  // show/hide pages and adjust bottom bar
  function showPage(id) {
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[id].classList.remove("hidden");

    // Back button: hide on home, show on others
    if (id === "home") {
      globalBack.classList.add("hidden");
    } else {
      globalBack.classList.remove("hidden");
    }

    // New Signal only visible on signal page (but hidden initially)
    if (id === "signal") {
      newSignalBtn.classList.remove("hidden");
    } else {
      newSignalBtn.classList.add("hidden");
    }

    playClick();
  }

  // render popular pairs on home page (with OTC badge for all)
  function renderPopular() {
    pairsList.innerHTML = "";
    popularPairs.forEach(p => {
      const li = document.createElement("li");
      li.className = "pair";

      // flags (BTC special)
      const leftFlag = p.flag1 === "btc" ? `<div style="font-weight:900">₿</div>` : `<span class="flag fi fi-${p.flag1}"></span>`;
      const rightFlag = p.flag2 === "btc" ? `<div style="font-weight:900">₿</div>` : `<span class="flag fi fi-${p.flag2}"></span>`;

      li.innerHTML = `
        ${leftFlag}
        <div class="pair-text"><div class="codes">${p.code1} → ${p.code2}</div></div>
        ${rightFlag}
        <div class="badges">
          <div class="badge-otc">OTC</div>
          <div class="fire">🔥</div>
        </div>
      `;

      // click opens TIME directly with selected pair
      li.addEventListener("click", () => {
        selectedPair = `${p.code1}/${p.code2}`;
        // move to time step
        setProgressState("time");
        showPage("time");
      });

      pairsList.appendChild(li);
    });
  }

  // build pair grid for OTC/Stock (12 placeholders)
  function buildPairsForCategory(cat) {
    return Array.from({length: 12}, (_, i) => `${cat.toUpperCase()} Pair ${i+1}`);
  }

  function renderPairGrid(cat) {
    pairGrid.innerHTML = "";
    const list = buildPairsForCategory(cat);
    list.forEach(item => {
      const node = document.createElement("div");
      node.className = "pair-card";
      node.textContent = item;
      node.addEventListener("click", () => {
        selectedPair = item;
        setProgressState("time");
        showPage("time");
      });
      pairGrid.appendChild(node);
    });
  }

  // OTC / STOCK toggle
  otcBtn.addEventListener("click", () => {
    selectedCategory = "otc";
    otcBtn.classList.add("active");
    stockBtn.classList.remove("active");
    renderPairGrid(selectedCategory);
    playClick();
  });
  stockBtn.addEventListener("click", () => {
    selectedCategory = "stock";
    stockBtn.classList.add("active");
    otcBtn.classList.remove("active");
    renderPairGrid(selectedCategory);
    playClick();
  });

  // main menu buttons -> go to pair page (category default)
  document.getElementById("btn1").addEventListener("click", () => {
    selectedCategory = "otc";
    otcBtn.classList.add("active");
    stockBtn.classList.remove("active");
    renderPairGrid(selectedCategory);
    setProgressState("pair");
    showPage("pair");
  });
  document.getElementById("btn2").addEventListener("click", () => {
    selectedCategory = "stock";
    stockBtn.classList.add("active");
    otcBtn.classList.remove("active");
    renderPairGrid(selectedCategory);
    setProgressState("pair");
    showPage("pair");
  });
  document.getElementById("btn3").addEventListener("click", () => {
    selectedCategory = "otc";
    otcBtn.classList.add("active");
    stockBtn.classList.remove("active");
    renderPairGrid(selectedCategory);
    setProgressState("pair");
    showPage("pair");
  });

  // time buttons (delegation)
  timeButtonsContainer.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".time-btn");
    if (!btn) return;
    selectedTime = btn.dataset.time;
    setProgressState("signal");
    showPage("signal");
    startSignalGeneration();
    playClick();
  });

  // progress visual (update steps on all pages' headers)
  function setProgressState(target) {
    // target: 'pair' | 'time' | 'signal'
    Object.values(pages).forEach(page => {
      const prog = page.querySelector(".progress");
      if (!prog) return;
      const spans = prog.querySelectorAll("span");
      spans.forEach(s => s.classList.remove("active", "done"));
      if (target === "pair") {
        spans[0].classList.add("active");
      } else if (target === "time") {
        spans[0].classList.add("done");
        spans[1].classList.add("active");
      } else if (target === "signal") {
        spans[0].classList.add("done");
        spans[1].classList.add("done");
        spans[2].classList.add("active");
      }
    });
  }

  // SIGNAL generation animation
  function startSignalGeneration() {
    // reset UI
    signalResult.classList.add("hidden");
    loaderArea.classList.remove("hidden");
    loaderSteps.forEach(s => s.classList.remove("active"));
    spinner.style.display = "block";

    if (!selectedPair) selectedPair = "Pair 1";
    if (!selectedTime) selectedTime = "60s";

    const total = 2000 + Math.floor(Math.random() * 1001); // 2000..3000
    const stepTime = Math.floor(total / loaderSteps.length);

    loaderSteps.forEach((step, idx) => {
      setTimeout(() => {
        loaderSteps.forEach(s => s.classList.remove("active"));
        step.classList.add("active");
      }, stepTime * idx);
    });

    setTimeout(() => {
      // finish
      loaderSteps.forEach(s => s.classList.remove("active"));
      spinner.style.display = "none";
      loaderArea.classList.add("hidden");

      // decide buy / sell
      const isBuy = Math.random() > 0.5;
      actionText.textContent = isBuy ? "BUY" : "SELL";
      arrowEl.classList.remove("up", "down");
      if (isBuy) {
        arrowEl.classList.add("up");
        arrowEl.textContent = "▲";
      } else {
        arrowEl.classList.add("down");
        arrowEl.textContent = "▼";
      }

      resultPair.textContent = selectedPair;
      resultTime.textContent = selectedTime;
      signalResult.classList.remove("hidden");
      newSignalBtn.classList.remove("hidden");

      playClick();
    }, total + 80);
  }

  // New Signal button: rerun signal with same pair/time
  newSignalBtn.addEventListener("click", () => {
    playClick();
    // show loader again and hide result
    signalResult.classList.add("hidden");
    loaderArea.classList.remove("hidden");
    spinner.style.display = "block";
    startSignalGeneration();
  });

  // Global back behaviour — always same place
  globalBack.addEventListener("click", () => {
    playClick();
    // If currently on signal -> go to time
    if (!pages.signal.classList.contains("hidden")) {
      setProgressState("time");
      showPage("time");
      return;
    }
    // If on time -> go to pair
    if (!pages.time.classList.contains("hidden")) {
      setProgressState("pair");
      showPage("pair");
      return;
    }
    // If on pair -> go to home
    if (!pages.pair.classList.contains("hidden")) {
      showPage("home");
      setProgressState("pair"); // reset header visuals
      return;
    }
    // if on home -> nothing
    showPage("home");
  });

  // Initial render
  renderPopular();
  // hide newSignal and hide globalBack on home
  newSignalBtn.classList.add("hidden");
  globalBack.classList.add("hidden");
  showPage("home");
});
