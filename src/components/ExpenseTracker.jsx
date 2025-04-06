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

  const total = expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  return (
    <div className="flex flex-col">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-semibold text-lg mb-4">Expense Tracker 📊</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Expense Title"
            className="border p-2 w-full rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            className="border p-2 w-20 rounded-md"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={addExpense}
          >
            +
          </button>
        </div>
      </div>

      <div className="bg-white mt-2 flex-1 shadow-md rounded-lg p-4 overflow-y-auto">
        {expenses.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <h2 className="text-center text-4xl">No Expenses Yet</h2>
          </div>
        ) : (
          <div className="h-full">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((elem, i) => (
                  <tr key={i} className="hover:bg-gray-50 border-b text-left">
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
                          <span className="text-green-600 font-semibold">
                            ₹{elem.amount}
                          </span>
                        )}
                        <div className="flex gap-1 ml-2">
                          {editingIndex === i ? (
                            <>
                              <button
                                onClick={() => handleSaveEdit(i)}
                                className="text-green-600 text-xs p-0"
                              >
                                ✅
                              </button>
                              <button
                                onClick={() => setEditingIndex(null)}
                                className="text-gray-500 text-xs p-0"
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
                                className="text-blue-500 text-xs p-0"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => removeExpense(i)}
                                className="text-red-500 text-xs p-0"
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

            <p className="text-right font-semibold text-lg mt-4">
              Total: ₹{total}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
