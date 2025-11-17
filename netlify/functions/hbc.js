export default async (req, context) => {
  try {
    const url = "https://api.lbkex.com/v1/market/kline?symbol=hb_usdt&type=1day&size=200";

    const response = await fetch(url);
    const json = await response.json();

    return new Response(JSON.stringify(json), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: true,
      message: err.message
    }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
