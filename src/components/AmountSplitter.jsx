import React from "react";
import { useState } from "react";

export default function AmountSplitter() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [final, setFinal] = useState([]);

  const removePerson = (ind) =>{
    setPeople(people.filter((_,i)=>ind!==i))
  }

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
  
    // Convert the object back into an array
    setFinal(Object.values(newFinal));
    console.log(newFinal)
    console.log(Object.values(newFinal))
    setAmount("");
  };
  

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">🤝 Amount Splitter</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full rounded-md"
          />
          <button
            onClick={addPerson}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            +
          </button>
        </div>

        {people.length==0 ? <h2 className="py-1">Plz add names</h2> : (
          <div className="flex overflow-auto gap-1">
            {people.map((elem,ind) => (
              <button onClick={()=>removePerson(ind)} className="bg-gray-400 text-xs text-white relative">
                {elem}
                <span className="absolute -top-1 -right-1 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  ×</span>
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
            className="border p-2 w-30 rounded-md"
          />
          <button onClick={split} className="text-xs text-white">split</button>
        </div>
      </div>

      <div className="bg-white mt-2 flex-1 overflow-auto shadow-md rounded-lg p-4">
  {final.length > 0 && (
    <div className="">
      {final.map((person) => (
        <div
          key={person.id}
          className="border p-3 rounded-lg shadow-sm bg-gray-50 mb-2"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-lg">{person.name}</span>
            <span className="text-green-600 font-bold">
              Total: ₹{person.total.toFixed(2)}
            </span>
          </div>
          <div className="text-sm text-gray-600">
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
