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
        { flag1: "au", flag2: "ch", label: "AUD/CHF" }, { flag1: "ca", flag2: "jp", label: "CAD/JPY" },
        { flag1: "eu", flag2: "ch", label: "EUR/CHF" }, { flag1: "eu", flag2: "gb", label: "EUR/GBP" },
        { flag1: "eu", flag2: "jp", label: "EUR/JPY" }, { flag1: "eu", flag2: "ru", label: "EUR/RUB" },
        { flag1: "eu", flag2: "us", label: "EUR/USD" }, { flag1: "jo", flag2: "cn", label: "JOD/CNY" },
        { flag1: "lb", flag2: "us", label: "LBP/USD" }, { flag1: "ng", flag2: "us", label: "NGN/USD" },
        { flag1: "nz", flag2: "us", label: "NZD/USD" }, { flag1: "om", flag2: "cn", label: "OMR/CNY" },
        { flag1: "tn", flag2: "us", label: "TND/USD" }, { flag1: "us", flag2: "bd", label: "USD/BDT" },
        { flag1: "us", flag2: "ch", label: "USD/CHF" }, { flag1: "us", flag2: "dz", label: "USD/DZD" },
        { flag1: "us", flag2: "mx", label: "USD/MXN" }, { flag1: "us", flag2: "ph", label: "USD/PHP" },
        { flag1: "ye", flag2: "us", label: "YER/USD" }, { flag1: "us", flag2: "co", label: "USD/COP" }
      ],
      stock: [
        { flag1: "us", flag2: "vn", label: "USD/VND" }, { flag1: "us", flag2: "ru", label: "USD/RUB" },
        { flag1: "ch", flag2: "no", label: "CHF/NOK" }
      ]
    },
    stocks: {
      otc: [
        { flag1: "xx", flag2: "xx", label: "OTC Pair 1" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 2" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 3" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 4" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 5" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 6" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 7" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 8" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 9" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 10" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 11" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 12" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 13" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 14" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 15" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 16" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 17" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 18" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 19" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 20" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 21" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 22" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 23" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 24" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 25" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 26" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 27" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 28" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 29" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 30" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 31" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 32" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 33" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 34" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 35" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 36" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 37" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 38" },
        { flag1: "xx", flag2: "xx", label: "OTC Pair 39" }, { flag1: "xx", flag2: "xx", label: "OTC Pair 40" }
      ],
      stock: [
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 1" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 2" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 3" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 4" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 5" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 6" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 7" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 8" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 9" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 10" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 11" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 12" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 13" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 14" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 15" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 16" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 17" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 18" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 19" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 20" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 21" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 22" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 23" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 24" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 25" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 26" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 27" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 28" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 29" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 30" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 31" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 32" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 33" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 34" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 35" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 36" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 37" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 38" },
        { flag1: "xx", flag2: "xx", label: "STOCK Pair 39" }, { flag1: "xx", flag2: "xx", label: "STOCK Pair 40" }
      ]
    },
    crypto: {
      otc: [
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 1" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 2" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 3" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 4" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 5" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 6" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 7" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 8" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 9" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 10" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 11" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 12" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 13" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 14" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 15" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 16" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 17" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 18" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 19" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 20" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 21" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 22" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 23" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 24" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 25" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 26" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 27" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 28" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 29" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 30" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 31" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 32" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 33" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 34" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 35" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 36" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 37" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 38" },
        { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 39" }, { flag1: "xx", flag2: "xx", label: "CRYPTO Pair 40" }
      ],
      stock: []
    },
    commodities: {
      otc: [],
      stock: [
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 1" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 2" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 3" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 4" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 5" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 6" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 7" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 8" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 9" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 10" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 11" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 12" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 13" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 14" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 15" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 16" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 17" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 18" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 19" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 20" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 21" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 22" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 23" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 24" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 25" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 26" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 27" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 28" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 29" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 30" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 31" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 32" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 33" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 34" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 35" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 36" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 37" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 38" },
        { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 39" }, { flag1: "xx", flag2: "xx", label: "COMMODITY Pair 40" }
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