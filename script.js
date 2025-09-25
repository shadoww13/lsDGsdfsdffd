document.addEventListener("DOMContentLoaded", () => {
  Telegram.WebApp.ready();

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
    signal: document.getElementById("signalPage"),
  };

  let historyStack = ["home"];

  function showPage(id) {
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[id].classList.remove("hidden");
    historyStack.push(id);
  }

  function goBack() {
    playClick();
    if (historyStack.length > 1) {
      historyStack.pop();
      const prev = historyStack.pop();
      showPage(prev);
    } else {
      showPage("home");
    }
  }

  ["btn1", "btn2", "btn3"].forEach(id => {
    document.getElementById(id).addEventListener("click", () => {
      playClick();
      showPage("pair");
    });
  });

  document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", goBack);
  });

  const newSignalBtn = document.querySelector(".new-signal-btn");
  if (newSignalBtn) {
    newSignalBtn.addEventListener("click", () => {
      playClick();
      showPage("signal");
    });
  }

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

    let flag1 = pair.flag1 === "btc" ? "₿" : `<span class="flag fi fi-${pair.flag1}"></span>`;
    let flag2 = pair.flag2 === "btc" ? "₿" : `<span class="flag fi fi-${pair.flag2}"></span>`;

    li.innerHTML = `
      ${flag1}
      <span>${pair.code1} → ${pair.code2}</span>
      ${flag2}
      <span class="fire">🔥 OTC</span>
    `;
    li.addEventListener("click", () => {
      playClick();
      showPage("time");
    });
    pairsList.appendChild(li);
  });

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
      showPage("signal");
    });
  });
});
