export default async function handler(event, context) {
  try {
    const url = "https://www.lbank.com/v2/ticker/24hr.do?symbol=hb_usdt";

    const response = await fetch(url);
    const data = await response.json();

    // LBank 데이터 구조 변환
    const klineUrl = "https://www.lbank.com/v2/kline.do?symbol=hb_usdt&size=200&type=day";
    const klineRes = await fetch(klineUrl);
    const klineJson = await klineRes.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: klineJson.data })
    };

  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: true, message: e.toString() })
    };
  }
}
