import React from "react";

export default function PrewrittenExpense() {
  // Initial prewritten expenses
  const initialExpenses = [
    { date: "01/04/2025", title: "Groceries", amount: "2500" },
    { date: "28/03/2025", title: "Electricity Bill", amount: "1800" },
    { date: "25/03/2025", title: "Internet Bill", amount: "1200" },
    { date: "20/03/2025", title: "Dining Out", amount: "1500" },
    { date: "15/03/2025", title: "Fuel", amount: "2000" }
  ];

  const total = initialExpenses.reduce((acc, item) => acc + Number(item.amount), 0);

  return (
    <div className="flex flex-col w-full h-full" >
      <div className="mt-2 flex-1 shadow-md rounded-lg p-4 overflow-y-auto" style={{ backgroundColor: "#ffffff", opacity: "0.4" }}>
        <div className="h-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left" style={{ backgroundColor: "#eaf4f8", color: "#032541" }}>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {initialExpenses.map((elem, i) => (
                <tr key={i} className="hover:bg-slate-50 border-b text-left" style={{ borderColor: "#d0e3ec", color: "#032541" }}>
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{elem.title}</td>
                  <td className="px-4 py-2">{elem.date}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm" style={{ color: "#014b73" }}>
                        ₹{elem.amount}
                      </span>
                      <div className="flex gap-1 ml-2">
                        <span className="text-xs px-2 py-1 rounded opacity-50" style={{ backgroundColor: "#eaf4f8" }}>
                          ✏️
                        </span>
                        <span className="text-xs px-2 py-1 rounded opacity-50" style={{ backgroundColor: "#eaf4f8" }}>
                          🗑️
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="flex justify-between mt-4">
            <span className="mt-3 px-4 py-2 text-xs rounded text-white opacity-50" style={{ backgroundColor: "#014b73" }}>
              Clear All
            </span>
            <p className="text-right font-semibold text-xl mt-4" style={{ color: "#032541" }}>
              Total: ₹{total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}