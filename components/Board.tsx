"use client"

import React, { useEffect } from 'react';
import Cell from './Cell';

interface BoardProps {
  board: number[][];
  notes: Array<Array<Set<number>>>;  // Updated type definition
  initialNumbers: Set<string>;
  selectedCell: { row: number; col: number } | null;
  setSelectedCell: (cell: { row: number; col: number } | null) => void;
  onNumberInput: (num: number, isShiftKey: boolean) => void;
  onDelete: () => void;
}

const Board: React.FC<BoardProps> = ({ 
  board, 
  notes,
  initialNumbers,
  selectedCell, 
  setSelectedCell, 
  onNumberInput,
  onDelete
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;
      
      switch (event.key) {
        case 'ArrowUp':
          if (row > 0) setSelectedCell({ row: row - 1, col });
          break;
        case 'ArrowDown':
          if (row < 8) setSelectedCell({ row: row + 1, col });
          break;
        case 'ArrowLeft':
          if (col > 0) setSelectedCell({ row, col: col - 1 });
          break;
        case 'ArrowRight':
          if (col < 8) setSelectedCell({ row, col: col + 1 });
          break;
        case 'Delete':
        case 'Backspace':
          onDelete();
          break;
        default:
          const num = parseInt(event.key);
          if (num >= 1 && num <= 9) {
            onNumberInput(num, event.shiftKey);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, setSelectedCell, onNumberInput, onDelete]);

  const handleCellClick = (row: number, col: number) => {
    if (selectedCell?.row === row && selectedCell?.col === col) {
      setSelectedCell(null);
    } else {
      setSelectedCell({ row, col });
    }
  };

  const isHighlighted = (rowIndex: number, colIndex: number) => {
    if (!selectedCell) return false;
    const { row, col } = selectedCell;
    
    if (row === rowIndex || col === colIndex) return true;
    
    const squareRow = Math.floor(row / 3);
    const squareCol = Math.floor(col / 3);
    const cellSquareRow = Math.floor(rowIndex / 3);
    const cellSquareCol = Math.floor(colIndex / 3);
    
    return squareRow === cellSquareRow && squareCol === cellSquareCol;
  };

  return (
    <div className="sudoku-grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((value, colIndex) => (
            <Cell
              key={colIndex}
              value={value}
              notes={notes[rowIndex][colIndex]}
              isInitial={initialNumbers.has(`${rowIndex},${colIndex}`)}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
              isHighlighted={isHighlighted(rowIndex, colIndex)}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;