let selectedInstrument = null;
let selectedExpiration = null;
let selectedExpirationText = null;
let clickSound = new Audio('click-sound.mp3');
const marketKeys = ['Currencies 1', 'Currencies 2', 'Currencies 3', 'Cryptocurrencies', 'Stocks'];
let currentMarketIndex = 0;
const markets = {
    'Currencies 1': [
        'EUR/USD', 'AUD/USD', 'USD/CAD', 'NZD/USD', 'EUR/GBP', 'EUR/JPY', 'GBP/JPY'
    ],
    'Currencies 2': [
        'AUD/JPY', 'CHF/JPY', 'EUR/AUD', 'EUR/CAD', 'GBP/AUD', 'GBP/CAD', 'AUD/CHF'
    ],
    'Currencies 3': [
        'NZD/JPY', 'NZD/CHF', 'USD/JPY', 'GBP/JPY', 'USD/CHF', 'XAU/USD'
    ],
    'Cryptocurrencies': [
        'BTC/USD', 'ETH/USD'
    ],
    'Stocks': [
        'AAPL/USD', 'GOOGL/USD', 'MSFT/USD', 'AMZN/USD', 'TSLA/USD', 'NVDA/USD', 'META/USD', 'NFLX/USD', 'INTC/USD', 'AMD/USD'
    ]
};
const indicators = [
    'Moving Average', 'RSI', 'MACD', 'Bollinger Bands', 'Stochastic Oscillator',
    'Fibonacci Retracement', 'Ichimoku Cloud', 'ADX', 'CCI'
];

clickSound.onerror = () => {
    console.error("Error loading 'click-sound.mp3'. Check file path or format.");
};

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(err => console.error("Sound playback error:", err));
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function getCurrentMarket() {
    return marketKeys[currentMarketIndex];
}

function updateInstrumentButtons() {
    const currentMarket = getCurrentMarket();
    const instrumentsList = markets[currentMarket];
    const buttonsContainer = document.getElementById('instrument-buttons');
    buttonsContainer.innerHTML = '';
    const currentInstruments = instrumentsList;

    const fragment = document.createDocumentFragment();
    currentInstruments.forEach(instrument => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.dataset.value = instrument;
        btn.textContent = instrument;
        if (instrument === selectedInstrument) {
            btn.classList.add('selected');
        }
        btn.addEventListener('click', debounce(() => {
            playClickSound();
            document.querySelectorAll('#instrument-buttons .option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedInstrument = btn.dataset.value;
            copyToClipboard(instrument);
        }, 100));
        fragment.appendChild(btn);
    });

    requestAnimationFrame(() => {
        buttonsContainer.appendChild(fragment);
        document.getElementById('pair-label').textContent = `Pair (${currentMarket})`;
        document.getElementById('prev-page').disabled = currentMarketIndex === 0;
        document.getElementById('next-page').disabled = currentMarketIndex === marketKeys.length - 1;
    });
}

document.getElementById('prev-page').addEventListener('click', debounce(() => {
    playClickSound();
    if (currentMarketIndex > 0) {
        currentMarketIndex--;
    }
    updateInstrumentButtons();
}, 100));

document.getElementById('next-page').addEventListener('click', debounce(() => {
    playClickSound();
    if (currentMarketIndex < marketKeys.length - 1) {
        currentMarketIndex++;
    }
    updateInstrumentButtons();
}, 100));

document.querySelectorAll('#expiration-buttons .option-btn').forEach(btn => {
    btn.addEventListener('click', debounce(() => {
        playClickSound();
        document.querySelectorAll('#expiration-buttons .option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedExpiration = btn.dataset.value;
        selectedExpirationText = btn.textContent;
    }, 100));
});

updateInstrumentButtons();

document.getElementById('analyze-btn').addEventListener('click', async () => {
    if (!selectedInstrument || !selectedExpiration) {
        alert('Please select an instrument and expiration time.');
        return;
    }

    const loadingDiv = document.getElementById('loading');
    const loadingText = document.getElementById('loading-text');
    const signalDiv = document.getElementById('signal');
    const button = document.getElementById('analyze-btn');

    playClickSound();
    signalDiv.classList.remove('show');
    signalDiv.innerHTML = ''; // Clear previous signal
    loadingDiv.style.display = 'flex';
    button.disabled = true;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const randomDelay = Math.floor(Math.random() * (9100 - 5000 + 1)) + 5000;

    const stages = [
        'Connecting to TradingView...',
        'Fetching indicator data...',
        'Analyzing...'
    ];

    for (let i = 0; i < stages.length; i++) {
        loadingText.textContent = stages[i];
        await delay(randomDelay / stages.length);
    }

    const direction = Math.random() > 0.5 ? 'Buy' : 'Sell';
    const probability = (Math.random() * (98.6 - 70) + 70).toFixed(1);
    const selectedIndicators = [];
    while (selectedIndicators.length < 3) {
        const randomIndicator = indicators[Math.floor(Math.random() * indicators.length)];
        if (!selectedIndicators.includes(randomIndicator)) {
            selectedIndicators.push(randomIndicator);
        }
    }

    signalDiv.innerHTML = `
        <div class="upper">
            <div class="left">
                <div class="direction">${direction}</div>
                <span class="pair" onclick="copyToClipboard('${selectedInstrument}')">${selectedInstrument}</span>
                <span class="expiration">${selectedExpirationText}</span>
            </div>
            <div class="indicators">
                <span>${selectedIndicators[0]}</span>
                <span>${selectedIndicators[1]}</span>
                <span>${selectedIndicators[2]}</span>
            </div>
        </div>
        <span class="probability">Probability: ${probability}%</span>
    `;
    signalDiv.classList.add('show');
    loadingDiv.style.display = 'none';
    button.disabled = false;
});