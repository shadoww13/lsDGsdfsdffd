// script.js
const clickSound = new Audio('click-sound.mp3');
clickSound.onerror = () => console.error("Error loading click-sound.mp3");

if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    const theme = tg.themeParams;
    document.documentElement.style.setProperty('--bg-color', theme.bg_color || '#0A0A0C');
    document.documentElement.style.setProperty('--text-color', theme.text_color || '#E6E6E6');
    document.documentElement.style.setProperty('--primary', theme.button_color || '#007AFF');
    document.documentElement.style.setProperty('--secondary', theme.secondary_bg_color || '#1F2227');
} else {
    document.documentElement.style.setProperty('--bg-color', '#0A0A0C');
    document.documentElement.style.setProperty('--text-color', '#E6E6E6');
    document.documentElement.style.setProperty('--primary', '#007AFF');
    document.documentElement.style.setProperty('--secondary', '#1F2227');
}

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

const indicatorsList = [
    'RSI', 'MACD', 'Moving Average', 'Bollinger Bands', 'Stochastic',
    'Fibonacci', 'Ichimoku', 'Parabolic SAR', 'ADX', 'CCI'
];

const mainPage = document.getElementById('main-page');
const marketPage = document.getElementById('market-page');
const expirationPage = document.getElementById('expiration-page');
const signalPage = document.getElementById('signal-page');
const marketButtons = document.querySelectorAll('.market-btn');
const submarketButtons = document.querySelectorAll('.submarket-btn');
const backBtn = document.querySelector('.back-btn');
const expBackBtn = document.querySelector('.exp-back-btn');
const signalBackBtn = document.querySelector('.signal-back-btn');
const popularBtn = document.querySelector('.popular-btn');
const popularDropdown = document.getElementById('popular-dropdown');
const langBtn = document.querySelector('.lang-btn');
const langDropdown = document.querySelector('.lang-dropdown');
const marketTitle = document.getElementById('market-title');
const pairList = document.getElementById('pair-list');
const expTitle = document.getElementById('exp-title');
const expList = document.getElementById('exp-list');
const signalTitle = document.getElementById('signal-title');
const signalDirection = document.getElementById('signal-direction');
const signalPair = document.getElementById('signal-pair');
const signalIndicators = document.getElementById('signal-indicators');
const newSignalBtn = document.getElementById('new-signal-btn');
const loading = document.getElementById('loading');
const signalContent = document.querySelector('.signal-content');

let currentMarket = '';
let currentSub = '';
let currentPair = '';

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(err => console.error("Sound playback error:", err));
}

function setActivePage(page) {
    [mainPage, marketPage, expirationPage, signalPage].forEach(p => p.classList.remove('active'));
    page.classList.add('active');
}

marketButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        playClickSound();
        setActivePage(marketPage);
        marketTitle.textContent = btn.textContent;
        currentMarket = btn.dataset.market;
        updatePairs(currentMarket, 'otc');
        submarketButtons.forEach(b => b.classList.remove('active'));
        submarketButtons[0].classList.add('active');
        currentSub = 'otc';
    });
});

submarketButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        playClickSound();
        submarketButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSub = btn.dataset.sub;
        updatePairs(currentMarket, currentSub);
    });
});

backBtn.addEventListener('click', () => {
    playClickSound();
    setActivePage(mainPage);
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
        item.addEventListener('click', () => {
            playClickSound();
            currentPair = pair.name;
            setActivePage(expirationPage);
            expTitle.textContent = `Выберите время экспирации для ${currentPair}`;
        });
        pairList.appendChild(item);
    });
}

const expirations = ['15 sec', '30 sec', '1 min', '3 min', '5 min', '10 min'];

function updateExpirations() {
    expList.innerHTML = '';
    expirations.forEach(exp => {
        const item = document.createElement('div');
        item.classList.add('exp-item');
        item.textContent = exp;
        item.addEventListener('click', () => {
            playClickSound();
            setActivePage(signalPage);
            signalTitle.textContent = `Сигнал для ${currentPair}`;
            startLoading();
        });
        expList.appendChild(item);
    });
}

updateExpirations();

expBackBtn.addEventListener('click', () => {
    playClickSound();
    setActivePage(marketPage);
});

signalBackBtn.addEventListener('click', () => {
    playClickSound();
    setActivePage(expirationPage);
});

newSignalBtn.addEventListener('click', () => {
    playClickSound();
    startLoading();
});

function startLoading() {
    loading.style.display = 'flex';
    signalContent.style.display = 'none';
    const steps = document.querySelectorAll('.loading-step');
    steps.forEach(step => step.classList.remove('completed'));

    setTimeout(() => {
        steps[0].classList.add('completed');
        setTimeout(() => {
            steps[1].classList.add('completed');
            setTimeout(() => {
                steps[2].classList.add('completed');
                setTimeout(() => {
                    loading.style.display = 'none';
                    signalContent.style.display = 'block';
                    generateSignal();
                }, 1000);
            }, 1333);
        }, 1333);
    }, 1333);
}

function generateSignal() {
    const direction = Math.random() > 0.5 ? 'BUY' : 'SELL';
    signalDirection.textContent = direction;
    signalPair.textContent = currentPair;

    const shuffled = indicatorsList.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    signalIndicators.innerHTML = selected.map(ind => `<li>${ind}</li>`).join('');
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