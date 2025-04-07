import React, { useState } from "react";

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
    <div className="flex flex-col">
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h2 className="font-bold text-xl mb-4 text-blue-600">Expense Tracker</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Expense Title"
            className="border border-slate-300 bg-slate-100 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            className="border border-slate-300 bg-slate-100 p-2 w-24 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={addExpense}
          >
            +
          </button>
        </div>
      </div>

      <div className="bg-white mt-2 flex-1 shadow-md rounded-lg p-4 overflow-y-auto">
        {expenses.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <h2 className="text-center text-2xl text-slate-500">No Expenses Yet</h2>
          </div>
        ) : (
          <div className="h-full">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-200 text-slate-700 text-left">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((elem, i) => (
                  <tr key={i} className="hover:bg-slate-50 border-b text-left">
                    <td className="px-4 py-2">{i + 1}</td>
                    <td className="px-4 py-2">
                      {editingIndex === i ? (
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
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
                            className="border rounded px-2 py-1 text-sm w-20"
                          />
                        ) : (
                          <span className="text-green-600 font-semibold text-sm">
                            ₹{elem.amount}
                          </span>
                        )}
                        <div className="flex gap-1 ml-2">
                          {editingIndex === i ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(i)}
                                className="text-green-600 text-xs"
                              >
                                ✅
                              </button>
                              <button
                                onClick={() => setEditingIndex(null)}
                                className="text-gray-500 text-xs"
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
                                className="text-blue-500 text-xs"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => removeExpense(i)}
                                className="text-red-500 text-xs"
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
            <button className="text-white mt-3 p-0 text-xs" onClick={clearAll}>Clear All</button>
            <p className="text-right font-semibold text-xl mt-4 text-slate-800">
              Total: ₹{total}
            </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
