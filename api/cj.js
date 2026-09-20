export default async function handler(req, res) {
  try {
    const apiKey = process.env.CJ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: "CJ_API_KEY is not configured in Vercel."
      });
    }

    const response = await fetch(
      "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          apiKey: apiKey
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("CJ authentication failed:", data);

      return res.status(502).json({
        success: false,
        error: "CJ authentication failed.",
        cjCode: data.code,
        cjMessage: data.message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully connected to CJ.",
      tokenConfigured: true
    });

  } catch (error) {
    console.error("CJ connection error:", error);

    return res.status(500).json({
      success: false,
      error: "Could not connect to CJ."
    });
  }
}
