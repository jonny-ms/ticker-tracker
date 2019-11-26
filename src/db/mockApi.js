//Sample response from YahooFinanceApi for auto-complete endpoint with 'alp' as query param
const autoComplete = [
  {
    exch: "NYS",
    exchDisp: "NYSE",
    name: "ALPINE INCOME PROPERTY TRUST, INC.",
    symbol: "PINE",
    type: "S",
    typeDisp: "Equity"
  },
  {
    exch: "NMS",
    exchDisp: "NASDAQ",
    name: "Alphabet Inc.",
    symbol: "GOOG",
    type: "S",
    typeDisp: "Equity"
  },
  {
    exch: "NAS",
    exchDisp: "NASDAQ",
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    type: "S",
    typeDisp: "Equity"
  },
  {
    exch: "PNK",
    exchDisp: "OTC Markets",
    name: "Alpine 4 Technologies Ltd.",
    symbol: "ALPP",
    type: "S",
    typeDisp: "Equity"
  },
  {
    exch: "NMS",
    exchDisp: "NASDAQ",
    name: "Alphatec Holdings, Inc.",
    symbol: "ATEC",
    type: "S",
    typeDisp: "Equity"
  },
  {
    exch: "NMS",
    exchDisp: "NASDAQ",
    name: "Alpha and Omega Semiconductor Limited",
    symbol: "AOSL",
    type: "S",
    typeDisp: "Equity"
  },
  {
    exch: "PCX",
    exchDisp: "NYSEArca",
    name: "ALPS Medical Breakthroughs ETF",
    symbol: "SBIO",
    type: "E",
    typeDisp: "ETF"
  },
  {
    exch: "PNK",
    exchDisp: "OTC Markets",
    name: "Alpha Bank A.E.",
    symbol: "ALBKF",
    type: "S",
    typeDisp: "Equity"
  },
  {
    exch: "PNK",
    exchDisp: "OTC Markets",
    name: "Alpha Bank A.E.",
    symbol: "ALBKY",
    type: "S",
    typeDisp: "Equity"
  },
  {
    exch: "PNK",
    exchDisp: "OTC Markets",
    name: "Alpine Immune Sciences, Inc.",
    symbol: "ALPN",
    type: "S",
    typeDisp: "Equity"
  }
];

exports.autoComplete = autoComplete

//Sample response from WorldTradingApi for Real Time Market Data request with 'GOOG' as query param
const GOOG = {
  '52_week_high': "1335.53",
  '52_week_low': "970.11",
  change_pct: "-0.49",
  close_yesterday: "1301.35",
  currency: "USD",
  day_change: "-6.38",
  day_high: "1308.73",
  day_low: "1293.13",
  eps: "46.60",
  gmt_offset: "-18000",
  last_trade_time: "2019-11-22 15:16:56",
  market_cap: "892708257792",
  name: "Alphabet Inc.",
  pe: "27.79",
  price: "1294.97",
  price_open: "1305.62",
  shares: "343551008",
  stock_exchange_long: "NASDAQ Stock Exchange",
  stock_exchange_short: "NASDAQ",
  symbol: "GOOG",
  timezone: "EST",
  timezone_name: "America/New_York",
  volume: "916409",
  volume_avg: "1243675"
};

exports.quote = GOOG;
