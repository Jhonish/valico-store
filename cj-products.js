export default async function handler(req, res) {
  const { sku } = req.query;

  if (!sku) {
    return res.status(400).json({
      error: "Missing SKU"
    });
  }

  try {
    const response = await fetch(
      `https://developers.cjdropshipping.com/api2.0/v1/product/query?variantSku=${encodeURIComponent(sku)}`,
      {
        method: "GET",
        headers: {
          "CJ-Access-Token": process.env.CJ_ACCESS_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("CJ API error:", error);

    return res.status(500).json({
      error: "Failed to contact CJ Dropshipping"
    });
  }
}
