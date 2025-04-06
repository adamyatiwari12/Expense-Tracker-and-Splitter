import "./App.css";
import Navbar from "./components/Navbar";
import ExpenseTracker from "./components/ExpenseTracker";
import AmountSplitter from "./components/AmountSplitter";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-100 text-gray-900">
      <Navbar />
      <div className=" flex-1 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-full ">
            <ExpenseTracker />
          </div>
          <div className="w-full md:w-1/2 h-full">
            <AmountSplitter />
          </div>
        </div>
      </div>
    </div>
  );
}
