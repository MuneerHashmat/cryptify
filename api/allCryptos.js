import { options } from "../config/options.js";

export default async function handler(req, res) {
  
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const currency = (req.query && req.query.currency) || "usd";

  // AbortController for timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${encodeURIComponent(
      currency
    )}`;

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const text = await response.text();
      return res
        .status(response.status)
        .json({ error: text || response.statusText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === "AbortError") {
      return res.status(504).json({ error: "Request timed out" });
    }
    console.error("all-cryptos error:", error);
    return res.status(500).json({ error: "Error fetching crypto data" });
  }
}
