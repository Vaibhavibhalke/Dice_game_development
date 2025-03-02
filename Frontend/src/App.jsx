import React from "react";
import axios from "axios";
import DiceGame from "./components/DiceGame";

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <DiceGame />
    </div>
  );
}

export default App;
