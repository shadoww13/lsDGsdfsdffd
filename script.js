// script.js
const clickSound = document.getElementById('clickSound');
function playClick() { if (clickSound && clickSound.play) { try { clickSound.currentTime = 0; clickSound.play(); } catch (e) {} } }

const pages = [...document.querySelectorAll('.page')];
const backBtn = document.getElementById('backBtn');
const bottomBar = document.querySelector('.bottom-bar');
const pageTitle = document.getElementById('pageTitle');
const progress = document.getElementById('progress');

let currentPage = 1;
let selectedCategory = 'fx';
let selectedFilter = 'OTC';
let selectedPair = null;
let selectedTime = null;
let selectPageIndex = 0;
const PAGE_SIZE = 4;

const data = {
  fx: ['EUR/USD', 'USD/JPY', 'GBP/USD', 'AUD/USD', 'USD/CAD', 'NZD/USD', 'USD/CHF', 'EUR/GBP'],
  stocks: ['AAPL', 'TSLA', 'MSFT', 'AMZN', 'GOOGL', 'NVDA', 'META', 'NFLX'],
  crypto: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT', 'SOL/USDT', 'XRP/USDT', 'DOGE/USDT', 'LTC/USDT']
};

const popularPool = ['BTC/USDT', 'EUR/USD', 'AAPL', 'TSLA'];

let popularPairs;
if (localStorage.getItem('popularPairs')) {
  popularPairs = JSON.parse(localStorage.getItem('popularPairs')).slice(0, 4);
} else {
  popularPairs = popularPool.map(name => {
    const isOTC = Math.random() < 0.7;
    return { name, type: isOTC ? 'OTC' : 'STOCK' };
  });
  localStorage.setItem('popularPairs', JSON.stringify(popularPairs));
}

function showPage(n) {
  pages.forEach((p, i) => p.classList.toggle('hidden', i !== n - 1));
  currentPage = n;
  if (n === 1) {
    pageTitle.textContent = '';
    progress.classList.add('hidden');
    bottomBar.classList.add('hidden');
  } else if (n === 2) {
    pageTitle.textContent = 'Select Pair';
    progress.classList.remove('hidden');
    progress.textContent = `${selectPageIndex + 1}/${Math.ceil(getCurrentPairs().length / PAGE_SIZE) || 1}`;
    bottomBar.classList.remove('hidden');
  } else if (n === 3) {
    pageTitle.textContent = 'Time';
    progress.classList.remove('hidden');
    progress.textContent = '2/3';
    bottomBar.classList.remove('hidden');
  } else if (n === 4) {
    pageTitle.textContent = 'Signal';
    progress.classList.remove('hidden');
    progress.textContent = '3/3';
    bottomBar.classList.remove('hidden');
  }
}

backBtn.addEventListener('click', () => {
  playClick();
  if (currentPage === 2) { showPage(1); }
  else if (currentPage === 3) { showPage(2); }
  else if (currentPage === 4) { showPage(3); }
  else showPage(1);
});

document.querySelectorAll('.main-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    playClick();
    selectedCategory = btn.dataset.category || 'fx';
    selectedFilter = 'OTC';
    selectPageIndex = 0;
    renderSelectPairs();
    showPage(2);
  });
});

const pairsList = document.getElementById('pairsList');
function renderPopular() {
  pairsList.innerHTML = '';
  popularPairs.forEach(p => {
    const li = document.createElement('li');
    li.className = 'pair';
    li.dataset.pair = p.name;
    li.dataset.type = p.type;
    li.innerHTML = `<div style="display:flex;gap:8px;align-items:center"><div class="name">${p.name}</div><div class="type">${p.type}</div></div><div class="arrow">›</div>`;
    pairsList.appendChild(li);
  });
}
pairsList.addEventListener('click', e => {
  const li = e.target.closest('.pair');
  if (!li) return;
  playClick();
  selectedPair = { name: li.dataset.pair, type: li.dataset.type };
  renderTimePage();
  showPage(3);
});

const filterOTC = document.getElementById('filterOTC');
const filterSTOCK = document.getElementById('filterSTOCK');
const pairsGrid = document.getElementById('pairsGrid');
const pagination = document.getElementById('pagination');

filterOTC.addEventListener('click', () => {
  playClick();
  selectedFilter = 'OTC';
  filterOTC.classList.add('active');
  filterSTOCK.classList.remove('active');
  selectPageIndex = 0;
  renderSelectPairs();
});
filterSTOCK.addEventListener('click', () => {
  playClick();
  selectedFilter = 'STOCK';
  filterSTOCK.classList.add('active');
  filterOTC.classList.remove('active');
  selectPageIndex = 0;
  renderSelectPairs();
});

function getStoredPairs(category) {
  const key = `pairs_${category}`;
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    const raw = data[category] || [];
    const arr = raw.map(name => {
      let type;
      if (category === 'stocks') type = Math.random() < 0.2 ? 'OTC' : 'STOCK';
      else type = Math.random() < 0.8 ? 'OTC' : 'STOCK';
      return { name, type };
    });
    localStorage.setItem(key, JSON.stringify(arr));
    return arr;
  }
}

function getCurrentPairs() {
  const all = getStoredPairs(selectedCategory);
  return all.filter(p => p.type === selectedFilter);
}

function renderSelectPairs() {
  const all = getCurrentPairs();
  const pagesCount = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  if (selectPageIndex >= pagesCount) selectPageIndex = 0;
  pagination.textContent = `${selectPageIndex + 1}/${pagesCount}`;

  const start = selectPageIndex * PAGE_SIZE;
  const slice = all.slice(start, start + PAGE_SIZE);

  pairsGrid.innerHTML = '';
  slice.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pair-card';
    card.dataset.pair = p.name;
    card.dataset.type = p.type;
    card.innerHTML = `<div class="pair-name">${p.name}</div><div class="pair-type">${p.type}</div>`;
    pairsGrid.appendChild(card);
  });

  const blanks = PAGE_SIZE - slice.length;
  for (let i = 0; i < blanks; i++) {
    const blank = document.createElement('div');
    blank.className = 'pair-card';
    blank.style.opacity = '0.04';
    blank.style.pointerEvents = 'none';
    blank.innerHTML = `<div style="height:28px"></div>`;
    pairsGrid.appendChild(blank);
  }

  pairsGrid.querySelectorAll('.pair-card').forEach(card => {
    if (card.dataset.pair) {
      card.addEventListener('click', () => {
        playClick();
        selectedPair = { name: card.dataset.pair, type: card.dataset.type };
        renderTimePage();
        showPage(3);
      });
    }
  });
}

pagination.addEventListener('click', (e) => {
  playClick();
  const rect = pagination.getBoundingClientRect();
  const x = e.clientX - rect.left;
  if (x < rect.width / 2) {
    selectPageIndex = Math.max(0, selectPageIndex - 1);
  } else {
    const all = getCurrentPairs();
    const pagesCount = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
    selectPageIndex = Math.min(pagesCount - 1, selectPageIndex + 1);
  }
  renderSelectPairs();
  showPage(2);
});

const timeTitle = document.getElementById('timeTitle');
const timeGrid = document.getElementById('timeGrid');
const timeButtons = ['15 sec', '30 sec', '1 min', '2 min', '5 min', '15 min'];

function renderTimePage() {
  timeGrid.innerHTML = '';
  timeTitle.textContent = selectedPair ? `${selectedPair.name}` : 'Time';
  timeButtons.forEach(t => {
    const b = document.createElement('button');
    b.className = 'time-btn';
    b.textContent = t;
    b.addEventListener('click', () => {
      playClick();
      selectedTime = t;
      renderSignalPage();
      showPage(4);
    });
    timeGrid.appendChild(b);
  });
}

const signalArea = document.getElementById('signalArea');
function renderSignalPage() {
  signalArea.textContent = `Pair: ${selectedPair ? selectedPair.name : '-'} · Type: ${selectedPair ? selectedPair.type : '-'} · Timeframe: ${selectedTime || '-'}. Signals are currently absent.`;
}

renderPopular();
renderSelectPairs();
showPage(1);