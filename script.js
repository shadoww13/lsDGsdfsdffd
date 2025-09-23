const clickSound = document.getElementById('clickSound');
function playClick() {
  if (clickSound) {
    try {
      clickSound.currentTime = 0;
      clickSound.play();
    } catch {}
  }
}

const pages = {
  menu: document.getElementById('page-menu'),
  pairs: document.getElementById('page-pairs'),
  time: document.getElementById('page-time'),
  signal: document.getElementById('page-signal'),
};

// Собираем все step-индикаторы
const stepGroups = [
  [document.getElementById('step1'), document.getElementById('step2'), document.getElementById('step3')],
  [document.getElementById('step1t'), document.getElementById('step2t'), document.getElementById('step3t')],
  [document.getElementById('step1s'), document.getElementById('step2s'), document.getElementById('step3s')],
];

function updateSteps(n) {
  stepGroups.forEach(group => {
    if (!group[0]) return; // меню без индикатора
    group.forEach((el, i) => {
      if (i < n) el.classList.add('active');
      else el.classList.remove('active');
    });
  });
}

function showPage(name) {
  Object.entries(pages).forEach(([k, el]) => {
    el.classList.toggle('hidden', k !== name);
  });
  currentPage = name;

  if (name === 'menu') updateSteps(0);
  if (name === 'pairs') updateSteps(1);
  if (name === 'time') updateSteps(2);
  if (name === 'signal') updateSteps(3);
}

let currentPage = 'menu';
let selectedPair = null;
let selectedTime = null;
let currentFilter = 'OTC';

function goBack() {
  playClick();
  if (currentPage === 'pairs') showPage('menu');
  else if (currentPage === 'time') showPage('pairs');
  else if (currentPage === 'signal') showPage('time');
}

document.getElementById('backBtn2').addEventListener('click', goBack);
document.getElementById('backBtn3').addEventListener('click', goBack);
document.getElementById('backBtn4').addEventListener('click', goBack);

document.querySelectorAll('.main-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    playClick();
    showPage('pairs');
    renderPairs();
  });
});

const pairsList = document.getElementById('pairsList');
const popularPairs = [
  { name: 'BTC/USDT', type: 'OTC' },
  { name: 'EUR/USD', type: 'OTC' },
  { name: 'AAPL', type: 'OTC' },
  { name: 'TSLA', type: 'OTC' },
  { name: 'ETH/USDT', type: 'OTC' },
  { name: 'USD/JPY', type: 'OTC' }
];
function renderPopular() {
  pairsList.innerHTML = '';
  popularPairs.forEach(p => {
    const li = document.createElement('li');
    li.className = 'pair';
    li.dataset.pair = p.name;
    li.innerHTML = `<div class="name">${p.name}</div>`;
    pairsList.appendChild(li);
  });
}
pairsList.addEventListener('click', e => {
  const li = e.target.closest('.pair');
  if (!li) return;
  playClick();
  selectedPair = li.dataset.pair;
  renderTimePage();
  showPage('time');
});

const pairsGrid = document.getElementById('pairsGrid');
const allPairs = Array.from({ length: 12 }, (_, i) => ({ name: `Pair ${i+1}`, type: i % 2 ? 'STOCK' : 'OTC' }));
function renderPairs() {
  pairsGrid.innerHTML = '';
  allPairs.filter(p => p.type === currentFilter).forEach(p => {
    const card = document.createElement('div');
    card.className = 'pair-card';
    card.textContent = p.name;
    card.addEventListener('click', () => {
      playClick();
      selectedPair = p.name;
      renderTimePage();
      showPage('time');
    });
    pairsGrid.appendChild(card);
  });
}
document.getElementById('filterOTC').addEventListener('click', () => {
  playClick();
  currentFilter = 'OTC';
  document.getElementById('filterOTC').classList.add('active');
  document.getElementById('filterSTOCK').classList.remove('active');
  renderPairs();
});
document.getElementById('filterSTOCK').addEventListener('click', () => {
  playClick();
  currentFilter = 'STOCK';
  document.getElementById('filterSTOCK').classList.add('active');
  document.getElementById('filterOTC').classList.remove('active');
  renderPairs();
});

const timeGrid = document.getElementById('timeGrid');
const timeButtons = ['15 sec', '30 sec', '1 min', '2 min', '5 min', '15 min'];
function renderTimePage() {
  timeGrid.innerHTML = '';
  timeButtons.forEach(t => {
    const b = document.createElement('button');
    b.className = 'time-btn';
    b.textContent = t;
    b.addEventListener('click', () => {
      playClick();
      selectedTime = t;
      renderSignalPage();
      showPage('signal');
    });
    timeGrid.appendChild(b);
  });
}

const signalArea = document.getElementById('signalArea');
function renderSignalPage() {
  signalArea.textContent = `Pair: ${selectedPair || '-'} · Time: ${selectedTime || '-'}`;
}

renderPopular();
renderPairs();
showPage('menu');
