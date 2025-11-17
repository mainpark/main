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
