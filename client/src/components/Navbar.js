import React from "react";
import { Menu } from "lucide-react";

export default function Navbar({ setIsOpen }) {
  return (
    <div className="bg-gray-800 text-white flex items-center p-4 md:hidden">
      <button onClick={() => setIsOpen(true)}>
        <Menu size={28} />
      </button>
      <h1 className="ml-3 text-xl font-bold">FoodMap</h1>
    </div>
  );
}
