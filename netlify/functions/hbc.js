export default async () => {
  try {
    // LBank Official API (1 Day Candlestick)
    const url = "https://api.lbkex.com/v2/kline.do?symbol=hb_usdt&type=day&size=200";

    const response = await fetch(url, {
      headers: { "accept": "application/json" }
    });

    const json = await response.json();

    // LBank returns: { "result": "true", "data": [...] }
    if (!json || !json.data) {
      return new Response(JSON.stringify({
        error: true,
        message: "No candle data returned"
      }), { status: 500 });
    }

    // Convert to Lightweight-charts format
    const candles = json.data.map(c => ({
      time: c[0] / 1000,
      open: parseFloat(c[1]),
      close: parseFloat(c[2]),
      high: parseFloat(c[3]),
      low: parseFloat(c[4]),
    }));

    return new Response(JSON.stringify(candles), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({
      error: true,
      message: e.message
    }), { status: 500 });
  }
};







