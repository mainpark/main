export default async (request, context) => {
  try {
    const url = "https://api.lbkex.com/v2/kline?symbol=hb_usdt&type=day1";
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: true, message: err.message }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
