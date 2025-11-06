import React from "react";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-5 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* 상단 타이틀 + 닫기버튼 */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">🍴 FoodMap</h2>
        <button
          className="md:hidden p-1 hover:bg-gray-800 rounded"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      <nav className="space-y-4">
        <a href="#" className="block hover:text-blue-300">홈</a>
        <a href="#" className="block hover:text-blue-300">지역 검색</a>
        <a href="#" className="block hover:text-blue-300">한식</a>
        <a href="#" className="block hover:text-blue-300">카페</a>
        <a href="#" className="block hover:text-blue-300">일식</a>
        <a href="#" className="block hover:text-blue-300">분식</a>
      </nav>
    </div>
  );
}
