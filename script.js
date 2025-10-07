document.addEventListener("DOMContentLoaded", () => {
  const menuGrid = document.getElementById("menuGrid");
  const pairsList = document.getElementById("pairsList");

  menuGrid.innerHTML = PAIRS_CONFIG.menu
    .map(m => `<div class="menu-card">${m.title}</div>`)
    .join("");

  pairsList.innerHTML = PAIRS_CONFIG.popularPairs
    .map(p => `
      <li class="pair">
        <div class="pair-left">
          ${p.flag1==="btc"?"₿":`<span class="flag flag-icon flag-icon-${p.flag1}"></span>`}
          <span class="pair-label">${p.label}</span>
        </div>
        <div class="pair-right">
          ${p.flag2==="btc"?"₿":`<span class="flag flag-icon flag-icon-${p.flag2}"></span>`}
        </div>
      </li>
    `).join("");
});
