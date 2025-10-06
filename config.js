const PAIRS_CONFIG = {
  menu: [
    { id: "btn1", title: "Currencies", sub: "Forex pairs" },
    { id: "btn2", title: "Stocks", sub: "Company shares" },
    { id: "btn3", title: "Crypto", sub: "Digital assets" },
    { id: "btn4", title: "Pairs", sub: "More options" }
  ],
  popularPairs: [
    { flag1: "us", flag2: "eu", label: "USD/EUR" },
    { flag1: "gb", flag2: "us", label: "GBP/USD" },
    { flag1: "jp", flag2: "us", label: "USD/JPY" },
    { flag1: "ca", flag2: "us", label: "CAD/USD" },
    { flag1: "au", flag2: "us", label: "AUD/USD" },
    { flag1: "btc", flag2: "us", label: "BTC/USD" }
  ],
  otcPairs: Array.from({ length: 12 }, (_, i) => ({ label: `OTC Pair ${i + 1}` })),
  stockPairs: Array.from({ length: 12 }, (_, i) => ({ label: `STOCK Pair ${i + 1}` })),
  times: [
    { time: "5s", emoji: "⚡", sub: "Ultra" },
    { time: "15s", emoji: "🔥", sub: "Fast" },
    { time: "30s", emoji: "🎯", sub: "Stable" },
    { time: "1m", emoji: "⭐", sub: "Beginner" },
    { time: "3m", emoji: "📊", sub: "Analysis" },
    { time: "5m", emoji: "⏳", sub: "Long" }
  ],
  loadingSteps: ["Connecting to TradingView...", "Fetching indicators...", "Analyzing..."],
  buyIndicators: [
    "RSI indicates oversold condition",
    "MACD bullish crossover",
    "Volume increasing on uptrend",
    "Bollinger Bands expanding upwards",
    "Stochastic Oscillator buy signal",
    "Moving Averages golden cross",
    "Breaking resistance level"
  ],
  sellIndicators: [
    "RSI indicates overbought condition",
    "MACD bearish crossover",
    "Volume increasing on downtrend",
    "Bollinger Bands expanding downwards",
    "Stochastic Oscillator sell signal",
    "Moving Averages death cross",
    "Breaking support level"
  ]
};
