const marketData = {
    currencies: {
        otc: Array.from({length: 20}, (_, i) => `OTC Pair ${i+1}`),
        stock: Array.from({length: 20}, (_, i) => `Stock Pair ${i+1}`)
    },
    crypto: {
        otc: Array.from({length: 20}, (_, i) => `Crypto OTC ${i+1}`),
        stock: Array.from({length: 20}, (_, i) => `Crypto Stock ${i+1}`)
    },
    stocks: {
        otc: Array.from({length: 20}, (_, i) => `Stock OTC ${i+1}`),
        stock: Array.from({length: 20}, (_, i) => `Stock Stock ${i+1}`)
    }
};

const icons = ['🇺🇸', '🇪🇺', '🇯🇵', '🇬🇧', '🇦🇺', '🇨🇦', '🇨🇭', '🇳🇿', '₿', 'Ξ'];

const popularPairs = Array.from({length: 5}, () => ({
    name: `Popular Pair ${Math.floor(Math.random() * 100)}`,
    icon: icons[Math.floor(Math.random() * icons.length)]
}));

const marketBtns = document.querySelectorAll('.market-btn');
const modal = document.getElementById('market-modal');
const closeBtn = document.querySelector('.close');
const modalTitle = document.getElementById('modal-title');
const typeBtns = document.querySelectorAll('.type-btn');
const pairList = document.getElementById('pair-list');
const popularBtn = document.querySelector('.popular-btn');
const popularDropdown = document.getElementById('popular-dropdown');

let currentMarket = '';
let currentType = '';

marketBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentMarket = btn.dataset.market;
        modalTitle.textContent = btn.textContent;
        modal.style.display = 'block';
        typeBtns[0].click();
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        typeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.dataset.type;
        renderPairs();
    });
});

function renderPairs() {
    pairList.innerHTML = '';
    const pairs = marketData[currentMarket][currentType];
    pairs.forEach(pair => {
        const item = document.createElement('div');
        item.classList.add('pair-item');
        const icon = document.createElement('span');
        icon.classList.add('pair-icon');
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        const name = document.createElement('span');
        name.classList.add('pair-name');
        name.textContent = pair;
        item.appendChild(icon);
        item.appendChild(name);
        pairList.appendChild(item);
    });
}

popularBtn.addEventListener('click', () => {
    if (popularDropdown.style.display === 'block') {
        popularDropdown.style.display = 'none';
    } else {
        popularDropdown.innerHTML = '';
        popularPairs.forEach(pair => {
            const p = document.createElement('div');
            p.classList.add('popular-pair');
            const icon = document.createElement('span');
            icon.classList.add('pair-icon');
            icon.textContent = pair.icon;
            const name = document.createElement('span');
            name.classList.add('pair-name');
            name.textContent = pair.name;
            const fire = document.createElement('span');
            fire.classList.add('fire-emoji');
            fire.textContent = '🔥';
            p.appendChild(icon);
            p.appendChild(name);
            p.appendChild(fire);
            popularDropdown.appendChild(p);
        });
        popularDropdown.style.display = 'block';
    }
});