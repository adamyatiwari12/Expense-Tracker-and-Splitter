import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-[#014b73] text-white px-4 h-[10%] shadow-xl flex items-center justify-center">
      <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center tracking-wide whitespace-nowrap">
        Expense Tracker & Splitter
      </h1>
    </nav>
  );
}