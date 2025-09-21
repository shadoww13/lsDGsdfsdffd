// script.js
const clickSound = new Audio('click-sound.mp3');
clickSound.onerror = () => console.error("Error loading click-sound.mp3");

const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

const theme = tg.themeParams;
document.documentElement.style.setProperty('--bg-color', theme.bg_color || '#0A0A0C');
document.documentElement.style.setProperty('--text-color', theme.text_color || '#E6E6E6');
document.documentElement.style.setProperty('--primary', theme.button_color || '#007AFF');
document.documentElement.style.setProperty('--secondary', theme.secondary_bg_color || '#1F2227');

const markets = {
    currencies: {
        otc: [
            {name: 'EUR/USD', icon: '🇪🇺'},
            {name: 'USD/JPY', icon: '🇺🇸'},
            {name: 'GBP/USD', icon: '🇬🇧'},
            {name: 'AUD/USD', icon: '🇦🇺'},
            {name: 'USD/CAD', icon: '🇨🇦'},
            {name: 'NZD/USD', icon: '🇳🇿'},
            {name: 'USD/CHF', icon: '🇨🇭'},
            {name: 'EUR/GBP', icon: '🇪🇺'},
            {name: 'EUR/JPY', icon: '🇪🇺'},
            {name: 'GBP/JPY', icon: '🇬🇧'},
            {name: 'AUD/JPY', icon: '🇦🇺'},
            {name: 'CHF/JPY', icon: '🇨🇭'},
            {name: 'EUR/AUD', icon: '🇪🇺'},
            {name: 'EUR/CAD', icon: '🇪🇺'},
            {name: 'GBP/AUD', icon: '🇬🇧'},
            {name: 'GBP/CAD', icon: '🇬🇧'},
            {name: 'AUD/CHF', icon: '🇦🇺'},
            {name: 'NZD/JPY', icon: '🇳🇿'},
            {name: 'NZD/CHF', icon: '🇳🇿'},
            {name: 'XAU/USD', icon: '🏅'}
        ],
        stock: [
            {name: 'EUR/USD', icon: '🇪🇺'},
            {name: 'USD/JPY', icon: '🇺🇸'},
            {name: 'GBP/USD', icon: '🇬🇧'},
            {name: 'AUD/USD', icon: '🇦🇺'},
            {name: 'USD/CAD', icon: '🇨🇦'},
            {name: 'NZD/USD', icon: '🇳🇿'},
            {name: 'USD/CHF', icon: '🇨🇭'},
            {name: 'EUR/GBP', icon: '🇪🇺'},
            {name: 'EUR/JPY', icon: '🇪🇺'},
            {name: 'GBP/JPY', icon: '🇬🇧'},
            {name: 'AUD/JPY', icon: '🇦🇺'},
            {name: 'CHF/JPY', icon: '🇨🇭'},
            {name: 'EUR/AUD', icon: '🇪🇺'},
            {name: 'EUR/CAD', icon: '🇪🇺'},
            {name: 'GBP/AUD', icon: '🇬🇧'},
            {name: 'GBP/CAD', icon: '🇬🇧'},
            {name: 'AUD/CHF', icon: '🇦🇺'},
            {name: 'NZD/JPY', icon: '🇳🇿'},
            {name: 'NZD/CHF', icon: '🇳🇿'},
            {name: 'XAU/USD', icon: '🏅'}
        ]
    },
    crypto: {
        otc: [
            {name: 'BTC/USD', icon: '₿'},
            {name: 'ETH/USD', icon: 'Ξ'},
            {name: 'XRP/USD', icon: '💧'},
            {name: 'LTC/USD', icon: 'Ł'},
            {name: 'BCH/USD', icon: '₿'},
            {name: 'ADA/USD', icon: '₳'},
            {name: 'DOT/USD', icon: '⚫'},
            {name: 'LINK/USD', icon: '🔗'},
            {name: 'BNB/USD', icon: '⛓'},
            {name: 'XLM/USD', icon: '🌟'},
            {name: 'DOGE/USD', icon: '🐶'},
            {name: 'SOL/USD', icon: '☀️'},
            {name: 'MATIC/USD', icon: '🔳'},
            {name: 'AVAX/USD', icon: '🏔'},
            {name: 'SHIB/USD', icon: '🐕'},
            {name: 'TRX/USD', icon: '🔱'},
            {name: 'UNI/USD', icon: '🦄'},
            {name: 'ALGO/USD', icon: '⚙️'},
            {name: 'VET/USD', icon: '🔘'},
            {name: 'ICP/USD', icon: '🌐'}
        ],
        stock: [
            {name: 'BTC/USD', icon: '₿'},
            {name: 'ETH/USD', icon: 'Ξ'},
            {name: 'XRP/USD', icon: '💧'},
            {name: 'LTC/USD', icon: 'Ł'},
            {name: 'BCH/USD', icon: '₿'},
            {name: 'ADA/USD', icon: '₳'},
            {name: 'DOT/USD', icon: '⚫'},
            {name: 'LINK/USD', icon: '🔗'},
            {name: 'BNB/USD', icon: '⛓'},
            {name: 'XLM/USD', icon: '🌟'},
            {name: 'DOGE/USD', icon: '🐶'},
            {name: 'SOL/USD', icon: '☀️'},
            {name: 'MATIC/USD', icon: '🔳'},
            {name: 'AVAX/USD', icon: '🏔'},
            {name: 'SHIB/USD', icon: '🐕'},
            {name: 'TRX/USD', icon: '🔱'},
            {name: 'UNI/USD', icon: '🦄'},
            {name: 'ALGO/USD', icon: '⚙️'},
            {name: 'VET/USD', icon: '🔘'},
            {name: 'ICP/USD', icon: '🌐'}
        ]
    },
    stocks: {
        otc: [
            {name: 'AAPL', icon: ''},
            {name: 'GOOGL', icon: ''},
            {name: 'MSFT', icon: ''},
            {name: 'AMZN', icon: ''},
            {name: 'TSLA', icon: ''},
            {name: 'NVDA', icon: ''},
            {name: 'META', icon: ''},
            {name: 'NFLX', icon: ''},
            {name: 'INTC', icon: ''},
            {name: 'AMD', icon: ''},
            {name: 'JPM', icon: ''},
            {name: 'V', icon: ''},
            {name: 'MA', icon: ''},
            {name: 'DIS', icon: ''},
            {name: 'PYPL', icon: ''},
            {name: 'ADBE', icon: ''},
            {name: 'CRM', icon: ''},
            {name: 'CSCO', icon: ''},
            {name: 'IBM', icon: ''},
            {name: 'ORCL', icon: ''}
        ],
        stock: [
            {name: 'AAPL', icon: ''},
            {name: 'GOOGL', icon: ''},
            {name: 'MSFT', icon: ''},
            {name: 'AMZN', icon: ''},
            {name: 'TSLA', icon: ''},
            {name: 'NVDA', icon: ''},
            {name: 'META', icon: ''},
            {name: 'NFLX', icon: ''},
            {name: 'INTC', icon: ''},
            {name: 'AMD', icon: ''},
            {name: 'JPM', icon: ''},
            {name: 'V', icon: ''},
            {name: 'MA', icon: ''},
            {name: 'DIS', icon: ''},
            {name: 'PYPL', icon: ''},
            {name: 'ADBE', icon: ''},
            {name: 'CRM', icon: ''},
            {name: 'CSCO', icon: ''},
            {name: 'IBM', icon: ''},
            {name: 'ORCL', icon: ''}
        ]
    }
};

const popularPairs = [
    {name: 'EUR/USD', icon: '🇪🇺', type: 'OTC'},
    {name: 'BTC/USD', icon: '₿', type: 'OTC'},
    {name: 'AAPL', icon: '', type: 'STOCK'},
    {name: 'USD/JPY', icon: '🇺🇸', type: 'STOCK'},
    {name: 'ETH/USD', icon: 'Ξ', type: 'OTC'}
];

const mainPage = document.getElementById('main-page');
const marketPage = document.getElementById('market-page');
const marketButtons = document.querySelectorAll('.market-btn');
const submarketButtons = document.querySelectorAll('.submarket-btn');
const backBtn = document.querySelector('.back-btn');
const popularBtn = document.querySelector('.popular-btn');
const popularDropdown = document.getElementById('popular-dropdown');
const langBtn = document.querySelector('.lang-btn');
const langDropdown = document.querySelector('.lang-dropdown');
const marketTitle = document.getElementById('market-title');
const pairList = document.getElementById('pair-list');

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(err => console.error("Sound playback error:", err));
}

marketButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        playClickSound();
        mainPage.classList.remove('active');
        marketPage.classList.add('active');
        marketTitle.textContent = btn.textContent;
        const market = btn.dataset.market;
        updatePairs(market, 'otc');
        submarketButtons.forEach(b => b.classList.remove('active'));
        submarketButtons[0].classList.add('active');
    });
});

submarketButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        playClickSound();
        submarketButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updatePairs(marketTitle.textContent.toLowerCase(), btn.dataset.sub);
    });
});

backBtn.addEventListener('click', () => {
    playClickSound();
    marketPage.classList.remove('active');
    mainPage.classList.add('active');
});

function updatePairs(market, sub) {
    pairList.innerHTML = '';
    const pairs = markets[market][sub].slice(0, 20);
    pairs.forEach(pair => {
        const item = document.createElement('div');
        item.classList.add('pair-item');
        item.innerHTML = `
            <span class="pair-icon">${pair.icon}</span>
            <span class="pair-name">${pair.name}</span>
            <span class="pair-arrow">➜</span>
            <span class="pair-type">${sub.toUpperCase()}</span>
        `;
        pairList.appendChild(item);
    });
}

popularBtn.addEventListener('click', () => {
    playClickSound();
    if (popularDropdown.classList.contains('show')) {
        popularDropdown.classList.remove('show');
    } else {
        popularDropdown.innerHTML = '';
        popularPairs.forEach(pair => {
            const p = document.createElement('div');
            p.classList.add('popular-pair');
            p.innerHTML = `
                <span class="pair-icon">${pair.icon}</span>
                <span class="pair-name">${pair.name}</span>
                <span class="pair-type">${pair.type}</span>
                <span class="fire-emoji">🔥</span>
            `;
            popularDropdown.appendChild(p);
        });
        popularDropdown.classList.add('show');
    }
});

langBtn.addEventListener('click', () => {
    playClickSound();
    langDropdown.classList.toggle('show');
});