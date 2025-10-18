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
  otcPairs: [
    { label: "OTC Pair 1" }, { label: "OTC Pair 2" }, { label: "OTC Pair 3" }, { label: "OTC Pair 4" },
    { label: "OTC Pair 5" }, { label: "OTC Pair 6" }, { label: "OTC Pair 7" }, { label: "OTC Pair 8" },
    { label: "OTC Pair 9" }, { label: "OTC Pair 10" }, { label: "OTC Pair 11" }, { label: "OTC Pair 12" },
    { label: "OTC Pair 13" }, { label: "OTC Pair 14" }, { label: "OTC Pair 15" }, { label: "OTC Pair 16" },
    { label: "OTC Pair 17" }, { label: "OTC Pair 18" }, { label: "OTC Pair 19" }, { label: "OTC Pair 20" },
    { label: "OTC Pair 21" }, { label: "OTC Pair 22" }, { label: "OTC Pair 23" }, { label: "OTC Pair 24" },
    { label: "OTC Pair 25" }, { label: "OTC Pair 26" }, { label: "OTC Pair 27" }, { label: "OTC Pair 28" },
    { label: "OTC Pair 29" }, { label: "OTC Pair 30" }, { label: "OTC Pair 31" }, { label: "OTC Pair 32" },
    { label: "OTC Pair 33" }, { label: "OTC Pair 34" }, { label: "OTC Pair 35" }, { label: "OTC Pair 36" },
    { label: "OTC Pair 37" }, { label: "OTC Pair 38" }, { label: "OTC Pair 39" }, { label: "OTC Pair 40" }
  ],
  stockPairs: [
    { label: "STOCK Pair 1" }, { label: "STOCK Pair 2" }, { label: "STOCK Pair 3" }, { label: "STOCK Pair 4" },
    { label: "STOCK Pair 5" }, { label: "STOCK Pair 6" }, { label: "STOCK Pair 7" }, { label: "STOCK Pair 8" },
    { label: "STOCK Pair 9" }, { label: "STOCK Pair 10" }, { label: "STOCK Pair 11" }, { label: "STOCK Pair 12" },
    { label: "STOCK Pair 13" }, { label: "STOCK Pair 14" }, { label: "STOCK Pair 15" }, { label: "STOCK Pair 16" },
    { label: "STOCK Pair 17" }, { label: "STOCK Pair 18" }, { label: "STOCK Pair 19" }, { label: "STOCK Pair 20" },
    { label: "STOCK Pair 21" }, { label: "STOCK Pair 22" }, { label: "STOCK Pair 23" }, { label: "STOCK Pair 24" },
    { label: "STOCK Pair 25" }, { label: "STOCK Pair 26" }, { label: "STOCK Pair 27" }, { label: "STOCK Pair 28" },
    { label: "STOCK Pair 29" }, { label: "STOCK Pair 30" }, { label: "STOCK Pair 31" }, { label: "STOCK Pair 32" },
    { label: "STOCK Pair 33" }, { label: "STOCK Pair 34" }, { label: "STOCK Pair 35" }, { label: "STOCK Pair 36" },
    { label: "STOCK Pair 37" }, { label: "STOCK Pair 38" }, { label: "STOCK Pair 39" }, { label: "STOCK Pair 40" }
  ],
  cryptoPairs: [
    { label: "CRYPTO Pair 1" }, { label: "CRYPTO Pair 2" }, { label: "CRYPTO Pair 3" }, { label: "CRYPTO Pair 4" },
    { label: "CRYPTO Pair 5" }, { label: "CRYPTO Pair 6" }, { label: "CRYPTO Pair 7" }, { label: "CRYPTO Pair 8" },
    { label: "CRYPTO Pair 9" }, { label: "CRYPTO Pair 10" }, { label: "CRYPTO Pair 11" }, { label: "CRYPTO Pair 12" },
    { label: "CRYPTO Pair 13" }, { label: "CRYPTO Pair 14" }, { label: "CRYPTO Pair 15" }, { label: "CRYPTO Pair 16" },
    { label: "CRYPTO Pair 17" }, { label: "CRYPTO Pair 18" }, { label: "CRYPTO Pair 19" }, { label: "CRYPTO Pair 20" },
    { label: "CRYPTO Pair 21" }, { label: "CRYPTO Pair 22" }, { label: "CRYPTO Pair 23" }, { label: "CRYPTO Pair 24" },
    { label: "CRYPTO Pair 25" }, { label: "CRYPTO Pair 26" }, { label: "CRYPTO Pair 27" }, { label: "CRYPTO Pair 28" },
    { label: "CRYPTO Pair 29" }, { label: "CRYPTO Pair 30" }, { label: "CRYPTO Pair 31" }, { label: "CRYPTO Pair 32" },
    { label: "CRYPTO Pair 33" }, { label: "CRYPTO Pair 34" }, { label: "CRYPTO Pair 35" }, { label: "CRYPTO Pair 36" },
    { label: "CRYPTO Pair 37" }, { label: "CRYPTO Pair 38" }, { label: "CRYPTO Pair 39" }, { label: "CRYPTO Pair 40" }
  ],
  commoditiesPairs: [
    { label: "COMMODITY Pair 1" }, { label: "COMMODITY Pair 2" }, { label: "COMMODITY Pair 3" }, { label: "COMMODITY Pair 4" },
    { label: "COMMODITY Pair 5" }, { label: "COMMODITY Pair 6" }, { label: "COMMODITY Pair 7" }, { label: "COMMODITY Pair 8" },
    { label: "COMMODITY Pair 9" }, { label: "COMMODITY Pair 10" }, { label: "COMMODITY Pair 11" }, { label: "COMMODITY Pair 12" },
    { label: "COMMODITY Pair 13" }, { label: "COMMODITY Pair 14" }, { label: "COMMODITY Pair 15" }, { label: "COMMODITY Pair 16" },
    { label: "COMMODITY Pair 17" }, { label: "COMMODITY Pair 18" }, { label: "COMMODITY Pair 19" }, { label: "COMMODITY Pair 20" },
    { label: "COMMODITY Pair 21" }, { label: "COMMODITY Pair 22" }, { label: "COMMODITY Pair 23" }, { label: "COMMODITY Pair 24" },
    { label: "COMMODITY Pair 25" }, { label: "COMMODITY Pair 26" }, { label: "COMMODITY Pair 27" }, { label: "COMMODITY Pair 28" },
    { label: "COMMODITY Pair 29" }, { label: "COMMODITY Pair 30" }, { label: "COMMODITY Pair 31" }, { label: "COMMODITY Pair 32" },
    { label: "COMMODITY Pair 33" }, { label: "COMMODITY Pair 34" }, { label: "COMMODITY Pair 35" }, { label: "COMMODITY Pair 36" },
    { label: "COMMODITY Pair 37" }, { label: "COMMODITY Pair 38" }, { label: "COMMODITY Pair 39" }, { label: "COMMODITY Pair 40" }
  ],
  forexPairs: [
    { label: "AUD/CHF" }, { label: "CAD/JPY" }, { label: "EUR/CHF" }, { label: "EUR/GBP" },
    { label: "EUR/JPY" }, { label: "EUR/RUB" }, { label: "EUR/USD" }, { label: "JOD/CNY" },
    { label: "LBP/USD" }, { label: "NGN/USD" }, { label: "NZD/USD" }, { label: "OMR/CNY" },
    { label: "TND/USD" }, { label: "USD/BDT" }, { label: "USD/CHF" }, { label: "USD/DZD" },
    { label: "USD/MXN" }, { label: "USD/PHP" }, { label: "YER/USD" }, { label: "USD/COP" },
    { label: "USD/VND" }, { label: "USD/RUB" }, { label: "CHF/NOK" }, { label: "AUD/CAD" },
    { label: "BHD/CNY" }, { label: "GBP/AUD" }, { label: "USD/ARS" }, { label: "GBP/JPY" },
    { label: "AUD/JPY" }, { label: "USD/MYR" }, { label: "EUR/NZD" }, { label: "ZAR/USD" },
    { label: "USD/CAD" }, { label: "USD/EGP" }, { label: "UAH/USD" }, { label: "CAD/CHF" },
    { label: "CHF/JPY" }, { label: "EUR/TRY" }, { label: "MAD/USD" }, { label: "USD/CNH" }
  ],
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