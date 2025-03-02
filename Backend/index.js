import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import crypto from "crypto";

const app = express();
const PORT = 3000; // Backend runs on port 3000, Vite proxy will forward requests

app.use(cors());
app.use(bodyParser.json());

// Initial player balance
let balance = 1000;

// Function to generate a provably fair dice roll
const generateFairRoll = (secret, nonce) => {
  const hash = crypto.createHash("sha256").update(secret + nonce).digest("hex");
  return (parseInt(hash.substring(0, 8), 16) % 6) + 1;
};

// Root route for checking API status
app.get("/", (req, res) => {
  res.send("Provably Fair Dice Game API is running!");
});

// Roll Dice API (adjusted to `/api` path for Vite proxy)
app.post("/api/roll-dice", (req, res) => {
  const { bet } = req.body;

  if (bet > balance || bet <= 0) {
    return res.status(400).json({ error: "Invalid Bet Amount" });
  }

  const nonce = new Date().getTime().toString();
  const roll = generateFairRoll("secret-key", nonce);

  let newBalance = balance - bet;
  if (roll >= 4) {
    newBalance += bet * 2;
  }

  balance = newBalance;

  res.json({
    roll,
    newBalance,
    win: roll >= 4,
    nonce,
    hash: crypto.createHash("sha256").update("secret-key" + nonce).digest("hex"),
  });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
