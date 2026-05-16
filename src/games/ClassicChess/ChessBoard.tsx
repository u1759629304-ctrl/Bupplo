import React from 'react';
import { Board, Piece, Color } from './ChessEngine';
import { motion } from "motion/react";

const pieceMap: Record<string, string> = {
  'pw': '♙', 'nw': '♘', 'bw': '♗', 'rw': '♖', 'qw': '♕', 'kw': '♔',
  'pb': '♟', 'nb': '♞', 'bb': '♝', 'rb': '♜', 'qb': '♛', 'kb': '♚'
};

interface ChessBoardProps {
  board: Board;
  onSquareClick: (r: number, c: number) => void;
  selectedSquare: {r: number, c: number} | null;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ board, onSquareClick, selectedSquare }) => {
  return (
    <div className="grid grid-cols-8 border-4 border-[#333] shadow-2xl rounded-sm overflow-hidden">
      {board.map((row, r) =>
        row.map((piece, c) => {
          const isDark = (r + c) % 2 !== 0;
          const isSelected = selectedSquare?.r === r && selectedSquare?.c === c;
          return (
            <div
              key={`${r}-${c}`}
              onClick={() => onSquareClick(r, c)}
              className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center cursor-pointer relative
                ${isDark ? 'bg-[#3f6345]' : 'bg-[#eeeed2]'}
                ${isSelected ? 'ring-4 ring-yellow-400 ring-inset' : ''}
              `}
            >
              {piece && (
                <motion.div
                  layoutId={`piece-${r}-${c}`}
                  className={`text-3xl md:text-5xl ${piece.color === 'b' ? 'text-black' : 'text-white'} drop-shadow-md`}
                >
                  {pieceMap[piece.type + piece.color]}
                </motion.div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
