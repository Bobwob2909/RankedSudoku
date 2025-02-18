export interface Move {
  row: number;
  col: number;
  prevValue: number;
  newValue: number;
  prevNotes: Set<number>;
  newNotes: Set<number>;
}

export interface Cell {
  row: number;
  col: number;
}

export interface GameState {
  board: number[][];
  notes: Array<Array<Set<number>>>;
  selectedCell: Cell | null;
  isNoteMode: boolean;
  moveHistory: Move[];
}

export interface SudokuAPIResponse {
  newboard: {
    grids: Array<{
      value: number[][];     
      solution: number[][];
      difficulty: string;
    }>;
  };
}