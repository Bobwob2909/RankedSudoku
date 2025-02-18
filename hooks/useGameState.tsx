import { useState, useCallback } from 'react';
import { Move } from '@/types/game';

export const useGameState = (initialBoard: number[][]) => {
  const [board, setBoard] = useState<number[][]>(initialBoard);
  const [notes, setNotes] = useState<Array<Array<Set<number>>>>(
    Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => 
        new Set<number>()
      )
    )
  );
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [isShiftHeld, setIsShiftHeld] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [initialNumbers, setInitialNumbers] = useState(() => {
    const initial = new Set<string>();
    initialBoard.forEach((row, i) => {
      row.forEach((num, j) => {
        if (num !== 0) {
          initial.add(`${i},${j}`);
        }
      });
    });
    return initial;
  });

  const handleNumberInput = useCallback((num: number) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    
    if (initialNumbers.has(`${row},${col}`)) return;
  
    const useNoteMode = isNoteMode || isShiftHeld;
    
    if (useNoteMode) {
      const newNotes = new Set(notes[row][col]);
      if (newNotes.has(num)) {
        newNotes.delete(num);
      } else {
        newNotes.add(num);
      }

      const move: Move = {
        row,
        col,
        prevValue: board[row][col],
        newValue: board[row][col],
        prevNotes: new Set(notes[row][col]),
        newNotes: new Set(newNotes)
      };

      const newNotesGrid: Array<Array<Set<number>>> = notes.map((r: Array<Set<number>>, i: number) => 
        i === row ? r.map((cell, j) => 
          j === col ? newNotes : cell
        ) : r
      );

      setNotes(newNotesGrid);
      setMoveHistory([...moveHistory, move]);
    } else {
      const move: Move = {
        row,
        col,
        prevValue: board[row][col],
        newValue: num,
        prevNotes: new Set(notes[row][col]),
        newNotes: new Set()
      };

      const newBoard = board.map((r, i) =>
        i === row ? r.map((cell, j) => 
          j === col ? num : cell
        ) : r
      );

      const newNotesGrid: Array<Array<Set<number>>> = notes.map((r: Array<Set<number>>, i: number) => 
        i === row ? r.map((cell, j) => 
          j === col ? new Set() : cell
        ) : r
      );

      setBoard(newBoard);
      setNotes(newNotesGrid);
      setMoveHistory([...moveHistory, move]);
    }
  }, [selectedCell, initialNumbers, isNoteMode, isShiftHeld, board, notes, moveHistory]);

  const handleUndo = () => {
    if (moveHistory.length === 0) return;
    
    const lastMove = moveHistory[moveHistory.length - 1];
    const newBoard = board.map((r, i) =>
      i === lastMove.row ? r.map((cell, j) => 
        j === lastMove.col ? lastMove.prevValue : cell
      ) : r
    );
    
    const newNotesGrid = notes.map((r, i) =>
      i === lastMove.row ? r.map((cell, j) => 
        j === lastMove.col ? lastMove.prevNotes : cell
      ) : r
    );

    setBoard(newBoard);
    setNotes(newNotesGrid);
    setMoveHistory(moveHistory.slice(0, -1));
  };
  
  const handleReset = useCallback(() => {
    // Create a new board with zeros
    const resetBoard = Array(9).fill(0).map(() => Array(9).fill(0));
    
    // Restore only the initial numbers
    board.forEach((row, i) => {
      row.forEach((num, j) => {
        if (initialNumbers.has(`${i},${j}`)) {
          resetBoard[i][j] = board[i][j];
        }
      });
    });
  
    setBoard(resetBoard);
    setNotes(Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => 
        new Set<number>()
      )
    ));
    setMoveHistory([]);
    setSelectedCell(null);
    setIsNoteMode(false);
    setIsShiftHeld(false);
  }, [board, initialNumbers]);
  
  const handleDelete = useCallback(() => {
      if (!selectedCell) return;
      const { row, col } = selectedCell;
      
      // Don't delete initial numbers
      if (initialNumbers.has(`${row},${col}`)) return;
    
      const move: Move = {
        row,
        col,
        prevValue: board[row][col],
        newValue: 0,
        prevNotes: new Set(notes[row][col]),
        newNotes: new Set()
      };
    
      const newBoard = board.map((r, i) =>
        i === row ? r.map((cell, j) => 
          j === col ? 0 : cell
        ) : r
      );
    
      const newNotesGrid = notes.map((r, i) =>
        i === row ? r.map((cell, j) => 
          j === col ? new Set<number>() : cell
        ) : r
      );
    
      setBoard(newBoard);
      setNotes(newNotesGrid);
      setMoveHistory([...moveHistory, move]);
    }, [selectedCell, initialNumbers, board, notes, moveHistory]);

  return {
    board,
    setBoard,
    notes,
    setNotes,
    isNoteMode,
    setIsNoteMode,
    isShiftHeld,
    setIsShiftHeld,
    selectedCell,
    setSelectedCell,
    moveHistory,
    setMoveHistory,
    initialNumbers,
    setInitialNumbers,
    handleNumberInput,
    handleDelete,
    handleUndo,
    handleReset
  };
};