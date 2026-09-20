
export default async function handler(req, res) {
  try {
    const cjApiKey = process.env.CJ_API_KEY;
    const skuWhite = process.env.SKU_WHITE;
    const skuBlack = process.env.SKU_BLACK;

    if (!cjApiKey) {
      return res.status(500).json({
        error: "CJ_API_KEY is not configured in Vercel."
      });
    }

    return res.status(200).json({
      success: true,
      message: "CJ API configuration is working.",
      skus: {
        white: skuWhite ? "configured" : "not configured",
        black: skuBlack ? "configured" : "not configured"
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error."
    });
  }
}
