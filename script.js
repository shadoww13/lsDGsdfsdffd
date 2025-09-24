document.addEventListener("DOMContentLoaded", () => {
  Telegram.WebApp.ready();

  const clickSound = document.getElementById("clickSound");
  function playClick() {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
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
      showPage("pair");
    });
    pairsList.appendChild(li);
  });

  const pages = {
    home: document.getElementById("homePage"),
    pair: document.getElementById("pairPage"),
    time: document.getElementById("timePage"),
    signal: document.getElementById("signalPage"),
  };

  function showPage(id) {
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[id].classList.remove("hidden");
  }

  document.getElementById("btn1").addEventListener("click", () => { playClick(); showPage("pair"); });
  document.getElementById("btn2").addEventListener("click", () => { playClick(); showPage("pair"); });
  document.getElementById("btn3").addEventListener("click", () => { playClick(); showPage("pair"); });

  document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => { playClick(); showPage("home"); });
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

  document.querySelectorAll(".time-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      playClick();
      showPage("signal");
    });
  });
});
