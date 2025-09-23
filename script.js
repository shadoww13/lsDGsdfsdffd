document.addEventListener('DOMContentLoaded', function () {
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

  function showPage(name) {
    Object.entries(pages).forEach(([k, el]) => {
      if (!el) return;
      el.classList.toggle('hidden', k !== name);
    });
    currentPage = name;
  }

  let currentPage = 'menu';
  let selectedPair = null;
  let selectedTime = null;
  let currentFilter = 'OTC';
  let fromPopular = false;

  function goBack() {
    playClick();
    if (currentPage === 'pairs') showPage('menu');
    else if (currentPage === 'time') {
      if (fromPopular) {
        showPage('menu');
        fromPopular = false;
      } else {
        showPage('pairs');
      }
    }
    else if (currentPage === 'signal') showPage('time');
  }

  ['backBtn2', 'backBtn3', 'backBtn4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', goBack);
  });

  document.querySelectorAll('.main-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      showPage('pairs');
      renderPairs();
    });
  });

  const pairsList = document.getElementById('pairsList');
  const popularPairs = [
    { flag1: '🇺🇸', name1: 'USD', flag2: '🇪🇺', name2: 'EUR' },
    { flag1: '🇯🇵', name1: 'JPY', flag2: '🇺🇸', name2: 'USD' },
    { flag1: '🇺🇸', name1: 'AAPL', flag2: '', name2: '' },
    { flag1: '🇺🇸', name1: 'TSLA', flag2: '', name2: '' },
    { flag1: '🌐', name1: 'BTC', flag2: '🌐', name2: 'USDT' },
    { flag1: '🌐', name1: 'ETH', flag2: '🌐', name2: 'USDT' }
  ];

  function renderPopular() {
    if (!pairsList) return;
    pairsList.innerHTML = '';
    popularPairs.forEach(p => {
      const li = document.createElement('li');
      li.className = 'pair';
      li.dataset.pair = `${p.name1}${p.name2 ? '/' + p.name2 : ''}`;
      li.innerHTML = `
        <span class="flag">${p.flag1}</span>
        <span class="name">${p.name1}</span>
        ${p.name2 ? `<span>→</span><span class="name">${p.name2}</span><span class="flag">${p.flag2}</span>` : ''}
      `;
      pairsList.appendChild(li);
    });
  }

  if (pairsList) {
    pairsList.addEventListener('click', e => {
      const li = e.target.closest('.pair');
      if (!li) return;
      playClick();
      selectedPair = li.dataset.pair;
      fromPopular = true;
      renderTimePage();
      showPage('time');
    });
  }

  const pairsGrid = document.getElementById('pairsGrid');
  const allPairs = Array.from({ length: 24 }, (_, i) => ({
    name: `Pair ${i + 1}`,
    type: i % 2 ? 'STOCK' : 'OTC'
  }));

  function renderPairs() {
    if (!pairsGrid) return;
    pairsGrid.innerHTML = '';
    allPairs.filter(p => p.type === currentFilter).forEach(p => {
      const card = document.createElement('button');
      card.className = 'pair-card';
      card.textContent = p.name;
      card.addEventListener('click', () => {
        playClick();
        selectedPair = p.name;
        fromPopular = false;
        renderTimePage();
        showPage('time');
      });
      pairsGrid.appendChild(card);
    });
  }

  const filterOTC = document.getElementById('filterOTC');
  const filterSTOCK = document.getElementById('filterSTOCK');

  if (filterOTC) filterOTC.addEventListener('click', () => {
    playClick();
    currentFilter = 'OTC';
    filterOTC.classList.add('active');
    filterSTOCK.classList.remove('active');
    renderPairs();
  });

  if (filterSTOCK) filterSTOCK.addEventListener('click', () => {
    playClick();
    currentFilter = 'STOCK';
    filterSTOCK.classList.add('active');
    filterOTC.classList.remove('active');
    renderPairs();
  });

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
        showPage('signal');
      });
      timeGrid.appendChild(b);
    });
  }

  const signalArea = document.getElementById('signalArea');
  function renderSignalPage() {
    if (!signalArea) return;
    signalArea.textContent = `Pair: ${selectedPair || '-'} · Time: ${selectedTime || '-'}`;
  }

  const newSignalBtn = document.getElementById('newSignalBtn');
  if (newSignalBtn) {
    newSignalBtn.addEventListener('click', () => {
      playClick();
      renderSignalPage();
    });
  }

  renderPopular();
  renderPairs();
  showPage('menu');
});
