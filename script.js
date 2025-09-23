const clickSound = document.getElementById('clickSound');
function playClick() {
  if (!clickSound) return;
  try { clickSound.currentTime = 0; clickSound.play(); } catch {}
}

const pages = Array.from(document.querySelectorAll('.page'));
const backBtn = document.getElementById('backBtn');
const backBtn2 = document.getElementById('backBtn2');
const backBtn3 = document.getElementById('backBtn3');
const backBtn4 = document.getElementById('backBtn4');
const pageTitle = document.getElementById('pageTitle');

const progress1 = document.getElementById('progress1');
const progress2 = document.getElementById('progress2');
const progress3 = document.getElementById('progress3');

let currentPage = 1;
let selectedCategory = 'fx';
let selectedPair = null;
let selectedTime = null;
let selectPageIndex = 0;
const PAGE_SIZE = 4;

const popularPairs = [
  { name: 'BTC/USDT', type: 'OTC' },
  { name: 'EUR/USD', type: 'OTC' },
  { name: 'AAPL', type: 'OTC' },
  { name: 'TSLA', type: 'OTC' },
  { name: 'ETH/USDT', type: 'OTC' },
  { name: 'USD/JPY', type: 'OTC' }
];

const pairs = Array.from({ length: 12 }, (_, i) => ({ name: `Пара ${i + 1}`, type: 'OTC' }));

function showPage(n) {
  pages.forEach((p, i) => p.classList.toggle('hidden', i !== n - 1));
  [progress1, progress2, progress3].forEach(el => el && el.classList.add('hidden'));
  currentPage = n;
  if (n === 1) {
    // nothing
  } else if (n === 2) {
    if (progress1) {
      progress1.classList.remove('hidden');
      const pagesCount = Math.ceil(pairs.length / PAGE_SIZE) || 1;
      progress1.textContent = `${selectPageIndex + 1}/${pagesCount}`;
    }
  } else if (n === 3) {
    if (progress2) { progress2.classList.remove('hidden'); progress2.textContent = '2/3'; }
  } else if (n === 4) {
    if (progress3) { progress3.classList.remove('hidden'); progress3.textContent = '3/3'; }
  }
}

function goBack() {
  playClick();
  if (currentPage === 2) showPage(1);
  else if (currentPage === 3) showPage(2);
  else if (currentPage === 4) showPage(3);
}
[backBtn, backBtn2, backBtn3, backBtn4].forEach(b => { if (b) b.addEventListener('click', goBack); });

document.querySelectorAll('.main-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    playClick();
    selectedCategory = btn.dataset.category || 'fx';
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
    li.innerHTML = `<div style="display:flex;gap:8px;align-items:center"><div class="name">${p.name}</div><div class="type">${p.type}</div></div>`;
    pairsList.appendChild(li);
  });
}
pairsList.addEventListener('click', e => {
  const li = e.target.closest('.pair');
  if (!li) return;
  playClick();
  selectedPair = { name: li.dataset.pair, type: 'OTC' };
  renderTimePage();
  showPage(3);
});

const pairsGrid = document.getElementById('pairsGrid');
const pagination = document.getElementById('pagination');

function renderSelectPairs() {
  const pagesCount = Math.ceil(pairs.length / PAGE_SIZE) || 1;
  if (selectPageIndex >= pagesCount) selectPageIndex = 0;
  if (pagination) pagination.textContent = `${selectPageIndex + 1}/${pagesCount}`;

  const start = selectPageIndex * PAGE_SIZE;
  const slice = pairs.slice(start, start + PAGE_SIZE);

  pairsGrid.innerHTML = '';
  slice.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pair-card';
    card.dataset.pair = p.name;
    card.innerHTML = `<div class="pair-name">${p.name}</div><div class="pair-type">${p.type}</div>`;
    card.addEventListener('click', () => {
      playClick();
      selectedPair = { name: card.dataset.pair, type: p.type };
      renderTimePage();
      showPage(3);
    });
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
}

if (pagination) {
  pagination.addEventListener('click', (e) => {
    playClick();
    const rect = pagination.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pagesCount = Math.ceil(pairs.length / PAGE_SIZE) || 1;
    if (x < rect.width / 2) selectPageIndex = Math.max(0, selectPageIndex - 1);
    else selectPageIndex = Math.min(pagesCount - 1, selectPageIndex + 1);
    renderSelectPairs();
  });
}

const timeGrid = document.getElementById('timeGrid');
const timeButtons = ['15 sec', '30 sec', '1 min', '2 min', '5 min', '15 min'];
function renderTimePage() {
  if (!timeGrid) return;
  timeGrid.innerHTML = '';
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
  if (!signalArea) return;
  signalArea.textContent = `Pair: ${selectedPair?.name || '-'} · Timeframe: ${selectedTime || '-'}`;
}

renderPopular();
renderSelectPairs();
showPage(1);
