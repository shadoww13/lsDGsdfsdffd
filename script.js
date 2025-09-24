document.addEventListener("DOMContentLoaded", () => {
  Telegram.WebApp.ready();

  const clickSound = document.getElementById("clickSound");
  function playClick() {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  }

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
      Telegram.WebApp.alert(`🔥 ${pair.code1}/${pair.code2} clicked`);
    });
    pairsList.appendChild(li);
  });

  /* --- Навигация между страницами --- */
  const pages = {
    home: document.getElementById("homePage"),
    currencies: document.getElementById("currenciesPage"),
    stocks: document.getElementById("stocksPage"),
    crypto: document.getElementById("cryptoPage"),
  };

  function showPage(pageId) {
    Object.values(pages).forEach(p => p.classList.add("hidden"));
    pages[pageId].classList.remove("hidden");
  }

  document.getElementById("btn1").addEventListener("click", () => {
    playClick();
    showPage("currencies");
  });
  document.getElementById("btn2").addEventListener("click", () => {
    playClick();
    showPage("stocks");
  });
  document.getElementById("btn3").addEventListener("click", () => {
    playClick();
    showPage("crypto");
  });

  document.querySelectorAll(".back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      playClick();
      showPage("home");
    });
  });
});
