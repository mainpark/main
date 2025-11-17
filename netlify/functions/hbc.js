export default async (req) => {
  const url = "https://www.lbank.com/v2/kline.do?symbol=hb_usdt&type=day1&size=200";

  try {
    const res = await fetch(url, {
      headers: { "accept": "application/json" }
    });

    const json = await res.json();

    if (!json?.data) {
      return new Response(JSON.stringify({ error: true, message: "NO DATA" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const candles = json.data.map(c => ({
      time: c[0] / 1000,
      open: Number(c[1]),
      high: Number(c[3]),
      low: Number(c[4]),
      close: Number(c[2])
    }));

    return new Response(JSON.stringify({ candles }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: true, message: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};









