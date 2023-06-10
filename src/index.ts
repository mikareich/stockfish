import express from "express";
import analyseFen from "./analyseFen";
import { Chess } from "chess.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/analysis", async (req, res) => {
  const { fen, depth } = req.query;

  if (!fen) {
    return res.status(400).json({ error: "Missing fen" });
  }

  // check if fen is valid with chess.js api
  try {
    new Chess(fen as string);
  } catch (e) {
    return res.status(400).json({ error: "Invalid fen" });
  }

  const analysis = await analyseFen(fen as string, Number(depth) || 10);

  return res.json({
    fen,
    depth: Number(depth) || 10,
    ...analysis,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
