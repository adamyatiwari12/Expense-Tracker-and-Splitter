import "./App.css";
import Navbar from "./components/Navbar";
import ExpenseTracker from "./components/ExpenseTracker";
import AmountSplitter from "./components/AmountSplitter";

export default function App() {
  return (
    <div className="flex flex-col h-screen w-screen font-sans" >
      <Navbar />
      <div className="h-[90%] p-6" style={{ backgroundColor: "#eaf4f8", color: "#032541" }}>
        <div className="flex w-full h-full flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 h-full">
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