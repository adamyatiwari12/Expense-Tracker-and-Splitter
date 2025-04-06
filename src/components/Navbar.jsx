import React from 'react'

export default function Navbar() {
    return (
      <nav className="bg-green-500 text-white p-4 shadow-md">
          <h1 className="text-lg font-semibold text-center">Expense Tracker & Splitter</h1>
          <button className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 absolute top-5 right-2">
            Dark Mode (Toggle)
          </button>
        
      </nav>
    );
  }
