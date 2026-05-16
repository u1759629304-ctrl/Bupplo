export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type Color = 'w' | 'b';

export interface Piece {
  type: PieceType;
  color: Color;
}

export type Board = (Piece | null)[][];

export const initialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  const setupRow = (row: number, color: Color) => {
    board[row][0] = { type: 'r', color };
    board[row][1] = { type: 'n', color };
    board[row][2] = { type: 'b', color };
    board[row][3] = { type: 'q', color };
    board[row][4] = { type: 'k', color };
    board[row][5] = { type: 'b', color };
    board[row][6] = { type: 'n', color };
    board[row][7] = { type: 'r', color };
  };
  setupRow(0, 'b');
  for (let i = 0; i < 8; i++) board[1][i] = { type: 'p', color: 'b' };
  
  for (let i = 0; i < 8; i++) board[6][i] = { type: 'p', color: 'w' };
  setupRow(7, 'w');
  
  return board;
};

// Simplified move validation
export const isValidMove = (board: Board, from: {r: number, c: number}, to: {r: number, c: number}, turn: Color): boolean => {
  if (from.r === to.r && from.c === to.c) return false;
  const piece = board[from.r][from.c];
  if (!piece || piece.color !== turn) return false;
  
  if (to.r < 0 || to.r > 7 || to.c < 0 || to.c > 7) return false;
  const target = board[to.r][to.c];
  if (target && target.color === piece.color) return false;

  // Pawn
  if (piece.type === 'p') {
    const dir = piece.color === 'w' ? -1 : 1;
    const startRow = piece.color === 'w' ? 6 : 1;
    if (from.c === to.c && to.r === from.r + dir && !target) return true;
    if (from.c === to.c && from.r === startRow && to.r === from.r + 2 * dir && !target && !board[from.r + dir][from.c]) return true;
    if (Math.abs(from.c - to.c) === 1 && to.r === from.r + dir && target && target.color !== piece.color) return true;
    return false;
  }
  
  // Knight
  if (piece.type === 'n') {
    const dr = Math.abs(from.r - to.r);
    const dc = Math.abs(from.c - to.c);
    return (dr === 2 && dc === 1) || (dr === 1 && dc === 2);
  }
  
  // Sliding pieces
  if (piece.type === 'r' || piece.type === 'b' || piece.type === 'q') {
    const dr = to.r - from.r;
    const dc = to.c - from.c;
    if (piece.type === 'r' && dr !== 0 && dc !== 0) return false;
    if (piece.type === 'b' && Math.abs(dr) !== Math.abs(dc)) return false;
    if (piece.type === 'q' && dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return false;
    
    // Check path
    const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
    const stepC = dc === 0 ? 0 : dc / Math.abs(dc);
    let r = from.r + stepR;
    let c = from.c + stepC;
    while(r !== to.r || c !== to.c) {
        if (board[r][c]) return false;
        r += stepR;
        c += stepC;
    }
    return true;
  }

  // King
  if (piece.type === 'k') {
    return Math.abs(from.r - to.r) <= 1 && Math.abs(from.c - to.c) <= 1;
  }

  return false;
};

export const movePiece = (board: Board, from: {r: number, c: number}, to: {r: number, c: number}): Board => {
  const newBoard = board.map(row => [...row]);
  newBoard[to.r][to.c] = newBoard[from.r][from.c];
  newBoard[from.r][from.c] = null;
  return newBoard;
};

export const getAllValidMoves = (board: Board, turn: Color): {from: {r: number, c: number}, to: {r: number, c: number}}[] => {
  const moves: {from: {r: number, c: number}, to: {r: number, c: number}}[] = [];
  for(let r=0; r<8; r++){
    for(let c=0; c<8; c++){
      const piece = board[r][c];
      if(piece && piece.color === turn) {
        for(let tr=0; tr<8; tr++){
          for(let tc=0; tc<8; tc++){
            if(isValidMove(board, {r, c}, {tr, tc}, turn)) {
                moves.push({from: {r, c}, to: {tr, tc}});
            }
          }
        }
      }
    }
  }
  return moves;
};
