import React, { useState } from "react";
import PreWrittenAmount from "./PreWrittenAmount";

export default function AmountSplitter() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [final, setFinal] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState("");

  const removePerson = (ind) => {
    setPeople(people.filter((_, i) => ind !== i));
  };

  const addPerson = () => {
    if (!name) return;
    setPeople([...people, name]);
    setName("");
  };

  const remove = (i) => {
    setFinal(final.filter((_, ind) => ind !== i));
  };

  const handleSaveEdit = (index) => {
    const updatedFinal = [...final];
    updatedFinal[index].name = editedName;
    setFinal(updatedFinal);
    setEditingIndex(null);
  };
  
  const clearAll = () => {
    setFinal([]);
    setPeople([]);
  };

  const split = () => {
    if (!people.length || !amount) return;

    const each = parseFloat(amount / people.length);
    const updatedFinal = [...final];

    people.forEach((name) => {
      const existing = updatedFinal.find((p) => p.name === name);

      if (existing) {
        existing.expenses.push(each);
        existing.total += each;
      } else {
        updatedFinal.push({
          id: Date.now() + Math.random(),
          name,
          expenses: [each],
          total: each,
        });
      }
    });

    setFinal(updatedFinal);
    setAmount("");
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#eaf4f8" }}>
      <div className="p-5 rounded-xl shadow-lg" style={{ backgroundColor: "#ffffff" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "#014b73" }}>Amount Splitter</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 w-full rounded-md focus:outline-none"
            style={{ borderColor: "#d0e3ec", backgroundColor: "#eaf4f8", borderWidth: "1px", borderStyle: "solid" }}
          />
          <button
            onClick={addPerson}
            className="text-white px-4 py-2 rounded-md hover:opacity-90 transition"
            style={{ backgroundColor: "#014b73" }}
          >
            +
          </button>
        </div>

        {people.length === 0 ? (
          <h2 className="py-1 text-sm" style={{ color: "#395b75" }}>Please add names</h2>
        ) : (
          <div className="flex overflow-auto gap-2 flex-wrap">
            {people.map((elem, ind) => (
              <button
                key={ind}
                onClick={() => removePerson(ind)}
                className="text-white text-xs px-3 py-1 rounded-full relative hover:opacity-90 transition"
                style={{ backgroundColor: "#014b73" }}
              >
                {elem}
                <span className="absolute -top-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]" style={{ color: "#032541" }}>
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
            className="p-2 w-30 rounded-md focus:outline-none"
            style={{ borderColor: "#d0e3ec", backgroundColor: "#eaf4f8", borderWidth: "1px", borderStyle: "solid" }}
          />
          <button
            onClick={split}
            className="text-white text-sm px-4 py-2 rounded-md hover:opacity-90 transition"
            style={{ backgroundColor: "#014b73" }}
          >
            Split
          </button>
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-auto shadow-md rounded-lg p-4" style={{ backgroundColor: "#ffffff" }}>
        {final.length == 0 ? <PreWrittenAmount/> : (
          <div>
            {final.map((person, ind) => (
              <div
                key={person.id}
                className="border p-2 rounded-xl shadow mb-1 pl-3 pr-3"
                style={{ backgroundColor: "#ffffff", borderColor: "#d0e3ec" }}
              >
                <div className="">
                  {editingIndex === ind ? (
                    <div className="flex justify-between">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="rounded px-2 py-1 text-sm"
                        style={{ borderColor: "#bde6f9", borderWidth: "1px", borderStyle: "solid" }}
                      />
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => handleSaveEdit(ind)}
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
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="font-semibold text-lg" style={{ color: "#032541" }}>
                        {person.name}
                      </span>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={() => {
                            setEditingIndex(ind);
                            setEditedName(person.name);
                          }}
                          className="text-xs h-[1.8em] w-[1.6em] flex justify-center items-center"
                          style={{ backgroundColor: "#eaf4f8" }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => remove(ind)}
                          className="text-xs h-[1.8em] w-[1.6em] flex justify-center items-center"
                          style={{ backgroundColor: "#eaf4f8" }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  )}
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
            
            <div className="flex justify-between">
              <button className="mt-3 p-0 text-xs" onClick={clearAll} style={{ color: "#ffff" ,backgroundColor: "#014b73"}}>Clear All</button>
              {final.length > 0 && (
                <p className="text-right font-semibold text-xl mt-4" style={{ color: "#032541" }}>
                  Total: ₹{final.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}