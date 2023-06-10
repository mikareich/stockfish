const Stockfish = require("stockfish.wasm");

export default async function analyseFen(
  fen: string,
  depth: number
): Promise<{ bestMove: string; evauluation: number }> {
  const stockfish = await Stockfish();

  stockfish.postMessage(`position fen ${fen}`);
  stockfish.postMessage(`go depth ${depth}`);

  return new Promise((resolve) => {
    let bestMove: string, evaluation: number;

    stockfish.addMessageListener((msg: any) => {
      if (msg.includes("bestmove")) {
        console.log(msg);
        bestMove = msg.match(/bestmove (.*)/)?.[1].split(" ")[0];
        stockfish.postMessage("eval");
      }
      if (msg.includes("Final evaluation:")) {
        evaluation = Number(
          msg.match(/Final evaluation:\s+(-?\d+(\.\d+)?)/)?.[1]
        );
      }

      if (bestMove && evaluation) {
        resolve({ bestMove, evaluation });
      }
    });
  });
}
