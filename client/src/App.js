// App.js
import React, { useState } from "react";
import Layout from "./components/Layout";
import RestaurantCard from "./components/RestaurantCard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function App() {
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const searchRestaurants = async () => {
    if (!region || !category) {
      setError("⚠️ 지역과 카테고리를 입력하세요!");
      return;
    }
    setError(null);
    setLoading(true);
    setRestaurants([]);

    try {
      const keywords = ["맛집", "밥집", "식당", "추천", "핫플"];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const query = `${region} ${category} ${randomKeyword}`;

      const res = await fetch(`/api/restaurants?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      const items = data?.items || [];
      const filtered = items.filter(
        (item) =>
          item.address?.includes(region) ||
          item.address?.includes(region.split(" ")[1])
      );

      setRestaurants(filtered);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1">
        <Navbar setIsOpen={setIsOpen} />
        <Layout>
          {/* ✅ 중앙 FoodMap 관련 카드 삭제됨 */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              🍜 지역 & 음식종류 기반 맛집 검색
            </h1>

            <div className="flex flex-wrap gap-3 mb-6">
              <input
                type="text"
                placeholder="예: 대구 수성구"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2"
              >
                <option value="">카테고리 선택</option>
                <option value="한식">한식</option>
                <option value="카페">카페</option>
                <option value="일식">일식</option>
                <option value="중식">중식</option>
              </select>
              <button
                onClick={searchRestaurants}
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
              >
                검색
              </button>
            </div>

            {loading && <p className="text-gray-500">🔄 검색 중...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {restaurants.map((r, index) => (
                <RestaurantCard
                  key={index}
                  name={r.title}
                  address={r.address}
                  mapx={r.mapx}
                  mapy={r.mapy}
                />
              ))}
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
}

export default App;
