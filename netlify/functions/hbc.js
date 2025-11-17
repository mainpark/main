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
import fetch from "node-fetch";

export const handler = async () => {
  try {
    const url = "https://www.lbank.com/v2/hist?symbol=hb_usdt&type=1day";

    const res = await fetch(url);
    const json = await res.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: true, message: e.message }),
    };
  }
};
