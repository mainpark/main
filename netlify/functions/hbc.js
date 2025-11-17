export default async () => {
  try {
    // LBank 최신 API (1일봉)
    const url = "https://api.lbkex.com/v3/kline.do?symbol=hb_usdt&size=200&scale=86400";

    const response = await fetch(url, {
      headers: { "accept": "application/json" }
    });

    const json = await response.json();

    if (!json || !json.data) {
      return new Response(JSON.stringify({
        error: true,
        message: "No candle data returned"
      }), { status: 500 });
    }

    const candles = json.data.map(c => ({
      time: c[0] / 1000,       // timestamp
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


