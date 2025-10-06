document.addEventListener("DOMContentLoaded", () => {
  Telegram?.WebApp?.ready?.();

  const pages = {
    home: document.getElementById("homePage"),
    pair: document.getElementById("pairPage"),
    time: document.getElementById("timePage"),
    signal: document.getElementById("signalPage")
  };

  let history = ["home"], selectedPair = null, selectedTime = null, timers = [];

  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const show = id => {
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
      show(history.at(-1));
    } else show("home");
  };
  document.querySelectorAll(".back-btn").forEach(b => b.onclick = back);

  const menuGrid = document.getElementById("menuGrid");
  menuGrid.innerHTML = PAIRS_CONFIG.menu
    .map(m => `<div class="menu-card" id="${m.id}"><div class="menu-title">${m.title}</div><div class="menu-sub">${m.sub}</div></div>`)
    .join("");
  PAIRS_CONFIG.menu.forEach(m => document.getElementById(m.id).onclick = () => show("pair"));

  const pairsList = document.getElementById("pairsList");
  pairsList.innerHTML = PAIRS_CONFIG.popularPairs.map(p => `
    <li class="pair">
      ${p.flag1 === "btc" ? "<span class='flag'>₿</span>" : `<span class="flag flag-icon flag-icon-${p.flag1}"></span>`}
      <span>${p.label}</span>
      ${p.flag2 === "btc" ? "<span class='flag'>₿</span>" : `<span class="flag flag-icon flag-icon-${p.flag2}"></span>`}
      <span class="fire">🔥</span>
    </li>`).join("");
  pairsList.querySelectorAll(".pair").forEach((el,i)=>el.onclick=()=>{selectedPair=PAIRS_CONFIG.popularPairs[i].label; show("time")});

  const pairGridEl = document.getElementById("pairGrid");
  const otcBtn = document.getElementById("otcBtn");
  const stockBtn = document.getElementById("stockBtn");

  const renderPairs = mode => {
    const list = mode === "otc" ? PAIRS_CONFIG.otcPairs : PAIRS_CONFIG.stockPairs;
    pairGridEl.innerHTML = list.map(p => `<div class="pair-card">${p.label}</div>`).join("");
    pairGridEl.querySelectorAll(".pair-card").forEach(c => c.onclick = () => {
      selectedPair = c.textContent;
      show("time");
    });
  };
  otcBtn.onclick = () => { otcBtn.classList.add("active"); stockBtn.classList.remove("active"); renderPairs("otc"); };
  stockBtn.onclick = () => { stockBtn.classList.add("active"); otcBtn.classList.remove("active"); renderPairs("stock"); };
  renderPairs("otc");

  const timeGridEl = document.getElementById("timeGrid");
  timeGridEl.innerHTML = PAIRS_CONFIG.times.map(t =>
    `<div class="time-card" data-time="${t.time}">
       <div class="time-top"><span class="time-emoji">${t.emoji}</span>${t.time}</div>
       <div class="time-sub">${t.sub}</div>
     </div>`).join("");
  timeGridEl.querySelectorAll(".time-card").forEach(b => b.onclick = () => { selectedTime = b.dataset.time; show("signal"); });

  const newSignalBtn = document.getElementById("newSignalBtn");
  newSignalBtn.onclick = () => loadSignal();

  const loadSignal = () => {
    clearTimers();
    const loading = document.getElementById("loadingSection");
    const result = document.getElementById("signalResult");
    const text = loading.querySelector(".loading-text");
    loading.classList.remove("hidden"); result.classList.add("hidden");

    PAIRS_CONFIG.loadingSteps.forEach((t,i)=>{
      const timer = setTimeout(()=>{
        text.textContent = t;
        if(i===PAIRS_CONFIG.loadingSteps.length-1){
          timers.push(setTimeout(showSignal,700));
        }
      }, i*1400);
      timers.push(timer);
    });
  };

  const showSignal = () => {
    clearTimers();
    loadingSection.classList.add("hidden");
    signalResult.classList.remove("hidden");

    const pair = selectedPair || PAIRS_CONFIG.popularPairs[Math.floor(Math.random()*PAIRS_CONFIG.popularPairs.length)].label;
    const time = selectedTime || "1m";
    const action = Math.random()>0.5?"BUY":"SELL";
    const arrow = action==="BUY"?"↗":"↘";

    signalPair.textContent = pair;
    signalTime.textContent = time;
    signalArrow.textContent = arrow;
    signalArrow.className = `signal-arrow ${action==="BUY"?"up":"down"}`;
    signalAction.textContent = action;
    signalAction.className = `signal-action ${action==="BUY"?"buy":"sell"}`;

    const indicators = action==="BUY" ? PAIRS_CONFIG.buyIndicators : PAIRS_CONFIG.sellIndicators;
    signalInfo.innerHTML = "<b>Based on indicators:</b><ul>" +
      indicators.sort(()=>0.5-Math.random()).slice(0,3).map(i=>`<li>${i}</li>`).join("") + "</ul>";
  };

  show("home");
});
