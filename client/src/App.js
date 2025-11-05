import React, { useState } from "react";

function App() {
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔍 검색 실행 함수
  const searchRestaurants = async () => {
    if (!region) {
      setError("⚠️ 지역을 입력하세요 (예: 대구 수성구)");
      return;
    }
    if (!category) {
      setError("⚠️ 음식 종류를 선택하세요");
      return;
    }

    setError(null);
    setLoading(true);
    setRestaurants([]);

    try {
      const query = `${region} ${category} 맛집`;
      const res = await fetch(`/api/restaurants?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      const items = data?.items || [];
      const filtered = items.filter((item) => {
        return (
          item.address?.includes(region) ||
          item.address?.includes(region.split(" ")[1])
        );
      });

      setRestaurants(filtered);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  // 🔘 버튼으로 카테고리 선택
  const handleCategoryClick = (cat) => {
    setCategory(cat);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div className="bg-blue-200 text-center p-5 text-lg font-bold rounded-xl shadow-md mb-6">
        Tailwind 연결 성공 🎉
      </div>

      <h1 className="text-2xl font-bold mb-3">🍴 지역 & 음식종류 기반 맛집 검색</h1>

      {/* 지역 입력 */}
      <input
        type="text"
        placeholder="예: 대구 수성구"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginRight: "10px",
        }}
      />

      {/* 검색 버튼 */}
      <button
        onClick={searchRestaurants}
        style={{
          padding: "10px 20px",
          background: "#2563EB",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        검색
      </button>

      {/* 음식 카테고리 버튼 */}
      <div style={{ marginTop: "15px" }}>
        {["한식", "카페", "일식", "분식"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            style={{
              padding: "10px 15px",
              marginRight: "10px",
              marginTop: "5px",
              borderRadius: "6px",
              border:
                category === cat ? "2px solid #2563EB" : "1px solid #ccc",
              background: category === cat ? "#DBEAFE" : "white",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 로딩 / 오류 메시지 */}
      {loading && <p>🔄 검색 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 검색 결과 리스트 */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {restaurants.map((r, index) => {
          const title = r.title.replace(/<[^>]*>/g, ""); // HTML 제거
          const mapLink = `https://map.naver.com/p/search/${encodeURIComponent(
            title
          )}?c=${Number(r.mapx) / 10000000},${Number(r.mapy) / 10000000},15,0,0,0,dh`;

          return (
            <li
              key={index}
              style={{
                marginBottom: "20px",
                padding: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <b
                dangerouslySetInnerHTML={{ __html: r.title }}
                style={{ fontSize: "18px" }}
              />
              <p style={{ margin: "5px 0" }}>{r.address}</p>
              {r.telephone && <p>☎ {r.telephone}</p>}
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#2563EB",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                📍 네이버 지도 보기
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
