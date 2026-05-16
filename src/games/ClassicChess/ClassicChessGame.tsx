import { useState, useEffect } from "react";
import { initialBoard, movePiece, isValidMove, Color, Board, getAllValidMoves } from "./ChessEngine";
import { ChessBoard } from "./ChessBoard";
import { RotateCcw } from "lucide-react";
import { motion } from "motion/react";

type Difficulty = 'easy' | 'medium' | 'hard';

export default function ClassicChessGame() {
  const [board, setBoard] = useState<Board>(initialBoard());
  const [turn, setTurn] = useState<Color>('w');
  const [selected, setSelected] = useState<{r: number, c: number} | null>(null);
  const [isBotEnabled, setIsBotEnabled] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');

  const makeMove = (from: {r: number, c: number}, to: {r: number, c: number}) => {
    setBoard(prevBoard => movePiece(prevBoard, from, to));
    setTurn(prevTurn => prevTurn === 'w' ? 'b' : 'w');
  };

  const onSquareClick = (r: number, c: number) => {
    if (isBotEnabled && turn === 'b') return;
    
    if (selected) {
      if (isValidMove(board, selected, {r, c}, turn)) {
        makeMove(selected, {r, c});
        setSelected(null);
      } else {
        setSelected(null);
      }
    } else {
      const piece = board[r][c];
      if (piece && piece.color === turn) {
        setSelected({r, c});
      }
    }
  };

  // Bot logic
  useEffect(() => {
    if (isBotEnabled && turn === 'b') {
      const timer = setTimeout(() => {
        const moves = getAllValidMoves(board, turn);
        
        if (!moves || moves.length === 0) return;

        const pieceValues: Record<string, number> = { 'p': 10, 'n': 30, 'b': 30, 'r': 50, 'q': 90, 'k': 900 };

        let bestMove = moves[0];
        let maxMoveValue = -1;

        moves.forEach(move => {
          // Safe access
          const targetPiece = board && board[move.to.r] ? board[move.to.r][move.to.c] : null;

          let moveValue = 0;
          if (targetPiece && targetPiece.type) {
            moveValue = pieceValues[targetPiece.type] || 0;
          }

          if (moveValue > maxMoveValue) {
            maxMoveValue = moveValue;
            bestMove = move;
          }
        });
        
        makeMove(bestMove.from, bestMove.to);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [turn, isBotEnabled, board]);

  const restartGame = () => {
    setBoard(initialBoard());
    setTurn('w');
    setSelected(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#1a1a1a] min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <h2 className="text-3xl font-display font-bold text-white tracking-tight">Pure Classic Chess</h2>
        
        <div className="bg-white/10 p-4 rounded-lg flex gap-4">
          <button 
            className={`px-4 py-2 rounded text-white ${isBotEnabled ? 'bg-white/20' : 'bg-green-600'}`}
            onClick={() => setIsBotEnabled(false)}
          >
            2 Player
          </button>
          <button 
            className={`px-4 py-2 rounded text-white ${isBotEnabled ? 'bg-green-600' : 'bg-white/20'}`}
            onClick={() => setIsBotEnabled(true)}
          >
            VS Bot
          </button>
        </div>

        {isBotEnabled && (
          <div className="flex gap-2">
            {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
              <button 
                key={d}
                className={`px-3 py-1 rounded text-sm capitalize ${difficulty === d ? 'bg-green-600 text-white' : 'bg-white/10 text-white/70'}`}
                onClick={() => setDifficulty(d)}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        <div className="text-white/80 font-bold border border-white/10 px-4 py-2 rounded-full">
          {turn === 'w' ? "White's Turn" : "Black's Turn"}
        </div>

        <ChessBoard board={board} onSquareClick={onSquareClick} selectedSquare={selected} />

        <button
          onClick={restartGame}
          className="flex items-center gap-2 py-3 px-6 rounded-lg font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <RotateCcw size={18} />
          Restart
        </button>
      </motion.div>
    </div>
  );
}
