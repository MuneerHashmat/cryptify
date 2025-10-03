/* eslint-env node */
// Vercel serverless function for fetching historical market data
// Endpoint: GET /api/historical-data?id=bitcoin&currency=usd

export default async (req, res) => {
	if (req.method !== "GET") {
		res.setHeader("Allow", "GET");
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	const id = (req.query && req.query.id) || null;
	const currency = (req.query && req.query.currency) || "usd";

	if (!id) return res.status(400).json({ error: "Missing required query param: id" });

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 10000);

	try {
		const url = `https://api.coingecko.com/api/v3/coins/${encodeURIComponent(
			id
		)}/market_chart?vs_currency=${encodeURIComponent(currency)}&days=7&interval=daily`;

		const response = await fetch(url, { signal: controller.signal });
		clearTimeout(timeout);

		if (!response.ok) {
			const text = await response.text();
			return res.status(response.status).json({ error: text || response.statusText });
		}

		const data = await response.json();
		return res.status(200).json(data);
	} catch (error) {
		clearTimeout(timeout);
		if (error.name === "AbortError") {
			return res.status(504).json({ error: "Request timed out" });
		}
		console.error("historical-data error:", error);
		return res.status(500).json({ error: "Error fetching historical data" });
	}
};
