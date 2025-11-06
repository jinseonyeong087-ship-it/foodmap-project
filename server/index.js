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
    // ✅ display 값을 20으로 확장 (최대 30까지 가능)
    const url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=30&sort=random`;
    console.log("📡 Requesting URL:", url);


    const response = await fetch(url, {
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
      },
    });

    const data = await response.json();

    console.log("🧩 Naver Response:", data.display, data.items.length);

    // link 보정 (상대주소일 경우)
    data.items = data.items.map(item => ({
      ...item,
      link: item.link.startsWith("http")
        ? item.link
        : `https://search.naver.com${item.link}`,
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server internal error" });
  }
});


app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"));
