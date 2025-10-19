const PAIRS_CONFIG = {
  menu: [
    { id: "btn1", title: "Currencies", sub: "Forex pairs" },
    { id: "btn2", title: "Stocks", sub: "Company shares" },
    { id: "btn3", title: "Crypto", sub: "Digital assets" },
    { id: "btn4", title: "Commodities", sub: "More options" }
  ],
  popularPairs: [
    { flag1: "us", flag2: "eu", label: "USD/EUR" },
    { flag1: "gb", flag2: "us", label: "GBP/USD" },
    { flag1: "jp", flag2: "us", label: "USD/JPY" },
    { flag1: "ca", flag2: "us", label: "CAD/USD" },
    { flag1: "btc", flag2: "us", label: "BTC/USD" },
    { flag1: "ch", flag2: "us", label: "CHF/USD" }
  ],
  categories: {
    currencies: {
      otc: [
        { flag1: "gb", flag2: "jp", label: "GBP/JPY" },
        { flag1: "au", flag2: "ch", label: "AUD/CHF" },
        { flag1: "au", flag2: "us", label: "AUD/USD" },
        { flag1: "ca", flag2: "ch", label: "CAD/CHF" },
        { flag1: "ca", flag2: "jp", label: "CAD/JPY" },
        { flag1: "ch", flag2: "jp", label: "CHF/JPY" },
        { flag1: "eu", flag2: "ch", label: "EUR/CHF" },
        { flag1: "eu", flag2: "gb", label: "EUR/GBP" },
        { flag1: "eu", flag2: "us", label: "EUR/USD" },
        { flag1: "gb", flag2: "ca", label: "GBP/CAD" },
        { flag1: "gb", flag2: "ch", label: "GBP/CHF" },
        { flag1: "us", flag2: "ca", label: "USD/CAD" },
        { flag1: "us", flag2: "ch", label: "USD/CHF" },
        { flag1: "us", flag2: "jp", label: "USD/JPY" },
        { flag1: "au", flag2: "ca", label: "AUD/CAD" },
        { flag1: "au", flag2: "jp", label: "AUD/JPY" },
        { flag1: "gb", flag2: "us", label: "GBP/USD" },
        { flag1: "eu", flag2: "ca", label: "EUR/CAD" },
        { flag1: "eu", flag2: "au", label: "EUR/AUD" },
        { flag1: "gb", flag2: "au", label: "GBP/AUD" },
        { flag1: "eu", flag2: "jp", label: "EUR/JPY" }
      ],
      stock: [
        { flag1: "gb", flag2: "jp", label: "GBP/JPY" },
        { flag1: "au", flag2: "ch", label: "AUD/CHF" },
        { flag1: "au", flag2: "us", label: "AUD/USD" },
        { flag1: "ca", flag2: "ch", label: "CAD/CHF" },
        { flag1: "ca", flag2: "jp", label: "CAD/JPY" },
        { flag1: "ch", flag2: "jp", label: "CHF/JPY" },
        { flag1: "eu", flag2: "ch", label: "EUR/CHF" },
        { flag1: "eu", flag2: "gb", label: "EUR/GBP" },
        { flag1: "eu", flag2: "us", label: "EUR/USD" },
        { flag1: "gb", flag2: "ca", label: "GBP/CAD" },
        { flag1: "gb", flag2: "ch", label: "GBP/CHF" },
        { flag1: "us", flag2: "ca", label: "USD/CAD" },
        { flag1: "us", flag2: "ch", label: "USD/CHF" },
        { flag1: "us", flag2: "jp", label: "USD/JPY" },
        { flag1: "au", flag2: "ca", label: "AUD/CAD" },
        { flag1: "au", flag2: "jp", label: "AUD/JPY" },
        { flag1: "gb", flag2: "us", label: "GBP/USD" },
        { flag1: "eu", flag2: "ca", label: "EUR/CAD" },
        { flag1: "eu", flag2: "au", label: "EUR/AUD" },
        { flag1: "gb", flag2: "au", label: "GBP/AUD" },
        { flag1: "eu", flag2: "jp", label: "EUR/JPY" }
      ]
    },
    stocks: {
      otc: [
        { flag1: "xx", flag2: "xx", label: "OTC Pair 1" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 2" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 3" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 4" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 5" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 6" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 7" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 8" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 9" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 10" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 11" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 12" }
      ],
      stock: [
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 1" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 2" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 3" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 4" }
      ]
    },
    crypto: {
      otc: [
        { label: "DOGE" },
        { label: "SOL" },
        { label: "TON" },
        { label: "TRX" },
        { label: "LINK" },
        { label: "BTC" },
        { label: "ETH" },
        { label: "AVAX" },
        { label: "BTCETF" },
        { label: "DOT" },
        { label: "MATIC" },
        { label: "BNB" }
      ],
      stock: [
        { label: "LINK" },
        { label: "ETH" },
        { label: "BTC" },
        { label: "DASH" }
      ]
    },
    commodities: {
      otc: [
        { label: "Apple" },
        { label: "American Express" },
        { label: "Amazon" },
        { label: "VISA" },
        { label: "FACEBOOK INC" },
        { label: "Netflix" },
        { label: "Boeing Company" },
        { label: "GameStop" },
        { label: "Intel" },
        { label: "Tesla" },
        { label: "Cisco" }
      ],
      stock: [
        { label: "Netflix" },
        { label: "Tesla" },
        { label: "Microsoft" },
        { label: "Cisco" },
        { label: "Intel" },
        { label: "McDonald's" },
        { label: "Apple" },
        { label: "American Express" },
        { label: "Alibaba" },
        { label: "Boeing Company" }
      ]
    }
  },
  times: [
    { time: "5s", emoji: "⚡", sub: "Ultra" },
    { time: "15s", emoji: "🔥", sub: "Fast" },
    { time: "30s", emoji: "🎯", sub: "Stable" },
    { time: "1m", emoji: "⭐", sub: "Beginner" },
    { time: "3m", emoji: "📊", sub: "Analysis" },
    { time: "5m", emoji: "⏳", sub: "Long" }
  ],
  loadingSteps: ["Connecting to TradingView...", "Fetching indicators...", "Analyzing..."],
  buyIndicators: ["RSI", "MACD", "Volume", "MA Cross", "Bollinger Bands", "Breakout", "Support"],
  sellIndicators: ["RSI", "MACD", "Volume", "MA Cross", "Bollinger Bands", "Resistance", "Breakdown"]
};