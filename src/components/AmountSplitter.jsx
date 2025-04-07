import React, { useState } from "react";

export default function AmountSplitter() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [final, setFinal] = useState([]);

  const removePerson = (ind) => {
    setPeople(people.filter((_, i) => ind !== i));
  };

  const addPerson = () => {
    if (!name) return;
    setPeople([...people, name]);
    setName("");
  };

  const split = () => {
    if (!people.length || !amount) return;

    const each = parseFloat(amount / people.length);
    const newFinal = {};

    people.forEach((name) => {
      if (newFinal[name]) {
        newFinal[name].expenses.push(each);
        newFinal[name].total += each;
      } else {
        newFinal[name] = {
          id: Date.now() + Math.random(),
          name,
          expenses: [each],
          total: each,
        };
      }
    });

    setFinal(Object.values(newFinal));
    setAmount("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-teal-700">Amount Splitter</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-slate-300 bg-slate-100 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={addPerson}
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
          >
            +
          </button>
        </div>

        {people.length === 0 ? (
          <h2 className="py-1 text-sm text-slate-600">Please add names</h2>
        ) : (
          <div className="flex overflow-auto gap-2 flex-wrap">
            {people.map((elem, ind) => (
              <button
                key={ind}
                onClick={() => removePerson(ind)}
                className="bg-teal-300 text-white text-xs px-3 py-1 rounded-full relative hover:bg-teal-400 transition"
              >
                {elem}
                <span className="absolute -top-1 -right-1 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  ×
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-slate-300 bg-slate-100 p-2 w-30 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={split}
            className="bg-teal-500 text-white text-sm px-4 py-2 rounded-md hover:bg-teal-600 transition"
          >
            Split
          </button>
        </div>
      </div>

      <div className="bg-white mt-2 flex-1 overflow-auto shadow-md rounded-lg p-4">
        {final.length > 0 && (
          <div>
            {final.map((person) => (
              <div
                key={person.id}
                className="border p-3 rounded-xl shadow bg-white mb-2"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-lg text-slate-800">{person.name}</span>
                  <span className="text-teal-600 font-bold text-md">
                    Total: ₹{person.total.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  Expenses:{" "}
                  {person.expenses.map((amt, idx) => (
                    <span key={idx} className="mr-1">
                      ₹{amt.toFixed(2)}
                      {idx < person.expenses.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
