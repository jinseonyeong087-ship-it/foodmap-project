import React from "react";

export default function RestaurantCard({ name, address, mapx, mapy }) {
  // 🔹 가게명만 정제 (HTML 태그 제거)
  const cleanName = name.replace(/<[^>]*>?/gm, "");

  // 🔹 네이버 지도에서 '가게명'으로 검색하도록 URL 생성
  const mapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(cleanName)}`;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300">
      <h3
        className="text-lg font-semibold text-gray-800 mb-2"
        dangerouslySetInnerHTML={{ __html: name }}
      />
      <p className="text-gray-500 text-sm mb-3">{address}</p>

      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        📍 네이버 지도 보기
      </a>
    </div>
  );
}
