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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyseFen_1 = __importDefault(require("./analyseFen"));
const chess_js_1 = require("chess.js");
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/analysis", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fen, depth } = req.query;
    if (!fen) {
        return res.status(400).json({ error: "Missing fen" });
    }
    // check if fen is valid with chess.js api
    try {
        new chess_js_1.Chess(fen);
    }
    catch (e) {
        return res.status(400).json({ error: "Invalid fen" });
    }
    const analysis = yield (0, analyseFen_1.default)(fen, Number(depth) || 10);
    return res.json(Object.assign({ fen, depth: Number(depth) || 10 }, analysis));
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map