import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// ✅ 맛집 검색 API
app.get("/api/restaurants", async (req, res) => {
  try {
    const query = req.query.query || "맛집";
    const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=10`;

    const response = await fetch(url, {
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
      },
    });

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (jsonErr) {
      console.error("❌ JSON parse error from NAVER:", text);
      res.status(500).json({ error: "NAVER API returned invalid JSON", raw: text });
    }

  } catch (err) {
    console.error("❌ Server internal error:", err);
    res.status(500).json({ error: "Server internal error" });
  }
});

app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"));
