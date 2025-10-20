const PAIRS_CONFIG = {
  menu: [
    { id: "btn1", title: "Currencies", sub: "Explore major and exotic forex pairs for trading" },
    { id: "btn2", title: "Stocks", sub: "Invest in shares of leading companies" }
  ],
  popularPairs: [
    { flag1: "us", flag2: "eu", label: "USD/EUR" },
    { flag1: "gb", flag2: "us", label: "GBP/USD" },
    { flag1: "jp", flag2: "us", label: "USD/JPY" },
    { flag1: "ca", flag2: "us", label: "CAD/USD" },
    { flag1: "xx", flag2: "xx", label: "Добавить акцию" },
    { flag1: "xx", flag2: "xx", label: "Добавить акцию" }
  ],
  categories: {
    currencies: {
      otc: [
        { flag1: "au", flag2: "ca", label: "AUD/CAD" },
        { flag1: "au", flag2: "us", label: "AUD/USD" },
        { flag1: "eu", flag2: "ch", label: "EUR/CHF" },
        { flag1: "eu", flag2: "nz", label: "EUR/NZD" },
        { flag1: "eu", flag2: "tr", label: "EUR/TRY" },
        { flag1: "eu", flag2: "us", label: "EUR/USD" },
        { flag1: "ng", flag2: "us", label: "NGN/USD" },
        { flag1: "nz", flag2: "us", label: "NZD/USD" },
        { flag1: "us", flag2: "bd", label: "USD/BDT" },
        { flag1: "us", flag2: "ca", label: "USD/CAD" },
        { flag1: "us", flag2: "cl", label: "USD/CLP" },
        { flag1: "us", flag2: "id", label: "USD/IDR" },
        { flag1: "us", flag2: "mx", label: "USD/MXN" },
        { flag1: "ye", flag2: "us", label: "YER/USD" },
        { flag1: "au", flag2: "nz", label: "AUD/NZD" },
        { flag1: "ch", flag2: "no", label: "CHF/NOK" },
        { flag1: "bh", flag2: "cn", label: "BHD/CNY" },
        { flag1: "eu", flag2: "gb", label: "EUR/GBP" },
        { flag1: "us", flag2: "ph", label: "USD/PHP" },
        { flag1: "us", flag2: "sg", label: "USD/SGD" },
        { flag1: "us", flag2: "vn", label: "USD/VND" },
        { flag1: "gb", flag2: "jp", label: "GBP/JPY" },
        { flag1: "gb", flag2: "us", label: "GBP/USD" }
      ]
    },
    stocks: {
      otc: [
        { flag1: "xx", flag2: "xx", label: "Citigroup Inc OTC" },
        { flag1: "xx", flag2: "xx", label: "FedEx OTC" },
        { flag1: "xx", flag2: "xx", label: "Apple OTC" },
        { flag1: "xx", flag2: "xx", label: "ExxonMobil OTC" },
        { flag1: "xx", flag2: "xx", label: "Palantir Technologies OTC" },
        { flag1: "xx", flag2: "xx", label: "VISA OTC" },
        { flag1: "xx", flag2: "xx", label: "Pfizer Inc OTC" },
        { flag1: "xx", flag2: "xx", label: "Amazon OTC" },
        { flag1: "xx", flag2: "xx", label: "Johnson & Johnson OTC" },
        { flag1: "xx", flag2: "xx", label: "Cisco OTC" },
        { flag1: "xx", flag2: "xx", label: "American Express OTC" },
        { flag1: "xx", flag2: "xx", label: "Microsoft OTC" },
        { flag1: "xx", flag2: "xx", label: "Intel OTC" },
        { flag1: "xx", flag2: "xx", label: "GameStop Corp OTC" },
        { flag1: "xx", flag2: "xx", label: "FACEBOOK INC OTC" },
        { flag1: "xx", flag2: "xx", label: "VIX OTC" },
        { flag1: "xx", flag2: "xx", label: "Netflix OTC" },
        { flag1: "xx", flag2: "xx", label: "Tesla OTC" },
        { flag1: "xx", flag2: "xx", label: "Advanced Micro Devices OTC" },
        { flag1: "xx", flag2: "xx", label: "Boeing Company OTC" },
        { flag1: "xx", flag2: "xx", label: "Alibaba OTC" },
        { flag1: "xx", flag2: "xx", label: "Marathon Digital Holdings OTC" },
        { flag1: "xx", flag2: "xx", label: "McDonald's OTC" },
        { flag1: "xx", flag2: "xx", label: "Coinbase Global OTC" }
      ],
      stock: [
        { flag1: "xx", flag2: "xx", label: "Boeing Company" },
        { flag1: "xx", flag2: "xx", label: "FACEBOOK INC" },
        { flag1: "xx", flag2: "xx", label: "McDonald's" },
        { flag1: "xx", flag2: "xx", label: "Microsoft" },
        { flag1: "xx", flag2: "xx", label: "Tesla" },
        { flag1: "xx", flag2: "xx", label: "Alibaba" },
        { flag1: "xx", flag2: "xx", label: "Alibaba Inc" },
        { flag1: "xx", flag2: "xx", label: "Citigroup Inc" },
        { flag1: "xx", flag2: "xx", label: "Netflix" },
        { flag1: "xx", flag2: "xx", label: "ExxonMobil" },
        { flag1: "xx", flag2: "xx", label: "Intel" },
        { flag1: "xx", flag2: "xx", label: "Apple" },
        { flag1: "xx", flag2: "xx", label: "American Express" },
        { flag1: "xx", flag2: "xx", label: "Johnson & Johnson" },
        { flag1: "xx", flag2: "xx", label: "JP Morgan Chase & Co" },
        { flag1: "xx", flag2: "xx", label: "Pfizer Inc" },
        { flag1: "xx", flag2: "xx", label: "Cisco" }
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