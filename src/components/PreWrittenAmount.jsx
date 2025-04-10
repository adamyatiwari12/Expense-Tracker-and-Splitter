import React from "react";

export default function PreWrittenAmount() {
  const initialSplits = [
    {
      id: 1,
      name: "Rahul",
      expenses: [250.00, 125.00],
      total: 375.00
    },
    {
      id: 2,
      name: "Priya",
      expenses: [250.00, 125.00, 300.00],
      total: 675.00
    },
    {
      id: 3,
      name: "Ajay",
      expenses: [250.00, 125.00],
      total: 375.00
    }
  ];

  const total = initialSplits.reduce((acc, item) => acc + item.total, 0);

  return (
    <div>
      {initialSplits.map((person) => (
        <div
          key={person.id}
          className="border p-2 rounded-xl shadow mb-1 pl-3 pr-3"
          style={{ backgroundColor: "#ffffff", borderColor: "#d0e3ec", opacity: "0.4" }}
        >
          <div className="">
            <div className="flex justify-between">
              <span className="font-semibold text-lg" style={{ color: "#032541" }}>
                {person.name}
              </span>
              <div className="flex gap-1 ml-2">
                <span
                  className="text-sm h-[1.8em] w-[1.8em] flex justify-center items-center opacity-50"
                  style={{ backgroundColor: "#eaf4f8" }}
                >
                  ✏️
                </span>
                <span
                  className="text-sm h-[1.8em] w-[1.8em] flex justify-center items-center opacity-50"
                  style={{ backgroundColor: "#eaf4f8" }}
                >
                  🗑️
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between mb-0">
            <div className="text-xs" style={{ color: "#395b75" }}>
              Expenses:{" "}
              {person.expenses.map((amt, idx) => (
                <span key={idx} className="mr-1">
                  ₹{amt.toFixed(2)}
                  {idx < person.expenses.length - 1 && ","}
                </span>
              ))}
            </div>
            <span className="font-bold text-sm mt-1.5" style={{ color: "#014b73" }}>
              Total: ₹{person.total.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
      
      <div className="flex justify-between opacity-40">
        <span className="mt-3 px-4 py-2 text-xs rounded text-white opacity-50" style={{ backgroundColor: "#014b73" }}>
          Clear All
        </span>
        <p className="text-right font-semibold text-xl mt-4" style={{ color: "#032541" }}>
          Total: ₹{total.toFixed(2)}
        </p>
      </div>
      <div className="flex justify-center items-center h-[10em] opacity-40">
      <p className="text-2xl">Split your own expenses</p>
      </div>
    </div>
  );
}