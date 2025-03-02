import React, { useState } from "react";
import axios from "axios";

const DiceGame = () => {
  const [bet, setBet] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState(null);

  const rollDice = async () => {
    if (bet > balance || bet <= 0) {
      alert("Invalid Bet Amount!");
      return;
    }

    try {
      const res = await axios.post("/api/roll-dice", { bet }); // ✅ FIXED API CALL
      setBalance(res.data.newBalance);
      setResult(res.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96 mx-auto mt-10 text-white text-center">
      <h1 className="text-2xl font-bold mb-4">🎲 Provably Fair Dice Game</h1>

      <p className="text-lg mb-4">Balance: 💰 <span className="font-bold">${balance}</span></p>

      <input
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        placeholder="Enter Bet Amount"
        className="w-full p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-green-500 mb-4"
      />

      <button
        onClick={rollDice}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition duration-300"
      >
        Roll Dice 🎲
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-800">
          <p className={`text-xl font-bold ${result.win ? "text-green-400" : "text-red-400"}`}>
            {result.win ? "🎉 You Won!" : "😞 You Lost!"}
          </p>
          <p className="text-lg">🎲 Rolled: {result.roll}</p>
          <p className="text-sm text-gray-400">Nonce: {result.nonce}</p>
          <p className="text-xs text-gray-500 break-all">Hash: {result.hash}</p>
        </div>
      )}
    </div>
  );
};

export default DiceGame;
