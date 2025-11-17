export default async () => {
  try {
    const url = "https://www.lbank.com/v2/kline.do?symbol=hb_usdt&size=200&step=14400";

    const response = await fetch(url, {
      headers: {
        "accept": "application/json,text/plain,*/*",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36"
      }
    });

    const text = await response.text();

    // HTML 체크
    if (text.startsWith("<")) {
      return new Response(JSON.stringify({
        error: true,
        message: "LBank API returned HTML instead of JSON (blocked)"
      }), { status: 500 });
    }

    const json = JSON.parse(text);

    if (!json || !json.data) {
      return new Response(JSON.stringify({
        error: true,
        message: "No candle data returned"
      }), { status: 500 });
    }

    const candles = json.data.map(c => ({
      time: c[0] / 1000,
      open: parseFloat(c[1]),
      close: parseFloat(c[2]),
      high: parseFloat(c[3]),
      low: parseFloat(c[4])
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






