document.addEventListener("DOMContentLoaded", () => {
  const menuGrid = document.getElementById("menuGrid");
  const pairsList = document.getElementById("pairsList");

  // динамическая установка высоты для Telegram WebApp
  const setAppHeight = () => {
    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
  };

  setAppHeight();
  window.addEventListener("resize", setAppHeight);
  window.addEventListener("orientationchange", setAppHeight);

  menuGrid.innerHTML = PAIRS_CONFIG.menu
    .map(m => `<div class="menu-card">${m.title}</div>`)
    .join("");

  pairsList.innerHTML = PAIRS_CONFIG.popularPairs
    .map(p => `
      <li class="pair">
        <div class="pair-left">
          ${p.flag1 === "btc" ? "₿" : `<span class="flag flag-icon flag-icon-${p.flag1}"></span>`}
        </div>
        <span class="pair-label">${p.label}</span>
        <div class="pair-right">
          ${p.flag2 === "btc" ? "₿" : `<span class="flag flag-icon flag-icon-${p.flag2}"></span>`}
        </div>
      </li>
    `).join("");
});
