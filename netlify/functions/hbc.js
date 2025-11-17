import fetch from "node-fetch";

export const handler = async () => {
  try {
    // LBANK HB/USDT 일봉 데이터
    const url = "https://api.lbkex.com/v2/kline.do?symbol=hb_usdt&size=500&type=day";
    const r = await fetch(url);
    const json = await r.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(json)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: true, message: err.message })
    };
  }
};
