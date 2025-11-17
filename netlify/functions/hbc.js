export async function handler() {
  try {
    const url = "https://www.lbank.com/v2/klines.do?symbol=hb_usdt&type=day";

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: true,
        message: error.message,
      }),
    };
  }
}

