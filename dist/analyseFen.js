"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stockfish = require("stockfish.wasm");
function analyseFen(fen, depth) {
    return __awaiter(this, void 0, void 0, function* () {
        const stockfish = yield Stockfish();
        stockfish.postMessage(`position fen ${fen}`);
        stockfish.postMessage(`go depth ${depth}`);
        return new Promise((resolve) => {
            let bestMove, evauluation;
            stockfish.addMessageListener((msg) => {
                var _a, _b;
                if (msg.includes("bestmove")) {
                    console.log(msg);
                    bestMove = (_a = msg.match(/bestmove (.*)/)) === null || _a === void 0 ? void 0 : _a[1].split(" ")[0];
                    stockfish.postMessage("eval");
                }
                if (msg.includes("Final evaluation:")) {
                    evauluation = Number((_b = msg.match(/Final evaluation:\s+(-?\d+(\.\d+)?)/)) === null || _b === void 0 ? void 0 : _b[1]);
                }
                if (bestMove && evauluation) {
                    resolve({ bestMove, evauluation });
                }
            });
        });
    });
}
exports.default = analyseFen;
//# sourceMappingURL=analyseFen.js.map