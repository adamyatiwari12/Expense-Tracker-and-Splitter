import React, { useState } from "react";
import PrewrittenExpense from "./PrewrittenExpense";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAmount, setEditedAmount] = useState("");

  const addExpense = () => {
    if (!title || !amount) return;
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    setExpenses([...expenses, { date: formattedDate, title, amount }]);
    setTitle("");
    setAmount("");
  };

  const removeExpense = (ind) => {
    setExpenses(expenses.filter((_, index) => index !== ind));
  };

  const handleSaveEdit = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].title = editedTitle;
    updatedExpenses[index].amount = editedAmount;
    setExpenses(updatedExpenses);
    setEditingIndex(null);
  };

  const clearAll = () => {
    setExpenses([])
  }

  const total = expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#eaf4f8" }}>
      <div className="p-5 rounded-xl shadow-lg" style={{ backgroundColor: "#ffffff" }}>
        <h2 className="font-bold text-xl mb-4" style={{ color: "#014b73" }}>Expense Tracker</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Expense Title"
            className="p-2 w-full rounded-md focus:outline-none"
            style={{ borderColor: "#d0e3ec", backgroundColor: "#eaf4f8", borderWidth: "1px", borderStyle: "solid" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            className="p-2 w-24 rounded-md focus:outline-none"
            style={{ borderColor: "#d0e3ec", backgroundColor: "#eaf4f8", borderWidth: "1px", borderStyle: "solid" }}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="text-white px-4 py-2 rounded-md hover:opacity-90 transition"
            style={{ backgroundColor: "#014b73" }}
            onClick={addExpense}
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-2 flex-1 shadow-md rounded-lg p-4 overflow-y-auto" style={{ backgroundColor: "#ffffff" }}>
        {expenses.length === 0 ? (
          <PrewrittenExpense/>
        ) : (
          <div className="h-full">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-sm" style={{ backgroundColor: "#eaf4f8", color: "#032541" }}>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((elem, i) => (
                  <tr key={i} className="hover:bg-slate-50 border-b text-left" style={{ borderColor: "#d0e3ec", color: "#032541" }}>
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2 text-sm">
                      {editingIndex === i ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="rounded px-2 py-1 text-sm"
                          style={{ borderColor: "#bde6f9", borderWidth: "1px", borderStyle: "solid" }}
                        />
                      ) : (
                        elem.title
                      )}
                    </td>
                    <td className="px-4 py-2">{elem.date}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-between">
                        {editingIndex === i ? (
                          <input
                            type="number"
                            value={editedAmount}
                            onChange={(e) => setEditedAmount(e.target.value)}
                            className="rounded px-2 py-1 text-sm w-20"
                            style={{ borderColor: "#bde6f9", borderWidth: "1px", borderStyle: "solid" }}
                          />
                        ) : (
                          <span className="font-semibold text-sm" style={{ color: "#014b73" }}>
                            ₹{elem.amount}
                          </span>
                        )}
                        <div className="flex gap-1 ml-2">
                          {editingIndex === i ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(i)}
                                className="text-xs"
                                style={{ backgroundColor: "#eaf4f8" }}
                              >
                                ✅
                              </button>
                              <button
                                onClick={() => setEditingIndex(null)}
                                className="text-xs"
                                style={{ backgroundColor: "#eaf4f8" }}
                              >
                                ❌
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingIndex(i);
                                  setEditedTitle(elem.title);
                                  setEditedAmount(elem.amount);
                                }}
                                className="text-xs"
                                style={{ backgroundColor: "#eaf4f8" }}
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => removeExpense(i)}
                                className="text-xs"
                                style={{ backgroundColor: "#eaf4f8" }}
                              >
                                🗑️
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="flex justify-between">
              <button className="mt-3 p-0 text-xs" onClick={clearAll} style={{ color: "#ffff", backgroundColor: "#014b73"}}>Clear All</button>
              <p className="text-right font-semibold text-xl mt-4" style={{ color: "#032541" }}>
                Total: ₹{total}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}