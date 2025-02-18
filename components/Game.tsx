"use client"

import React, { useEffect, useState } from 'react';
import Board from './Board';
import GameControls from './GameControls';
import { useGameState } from '@/hooks/useGameState';
import { SudokuAPIResponse } from '@/types/game';

const Game: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const gameState = useGameState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    handleNewGame();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        gameState.setIsShiftHeld(isShiftHeld => !isShiftHeld);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // if (e.key === 'Shift') {
      //   gameState.setIsShiftHeld(false);
      // }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleNewGame = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://sudoku-api.vercel.app/api/dosuku');
      const data = await response.json() as SudokuAPIResponse;
      const newGame = data.newboard.grids[0];
      
      // Reset all game state first
      gameState.handleReset();
      
      // Then set the new board and initial numbers
      const initial = new Set<string>();
      newGame.value.forEach((row: number[], i: number) => {
        row.forEach((num: number, j: number) => {
          if (num !== 0) {
            initial.add(`${i},${j}`);
          }
        });
      });
      
      gameState.setInitialNumbers(initial);
      gameState.setBoard(newGame.value);
      
      // Clear any selected cell
      gameState.setSelectedCell(null);
      
    } catch (error) {
      console.error('Failed to fetch new game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <GameControls
        onNewGame={handleNewGame}
        onToggleNotes={() => gameState.setIsNoteMode(!gameState.isNoteMode)}
        onUndo={gameState.handleUndo}
        onReset={gameState.handleReset}
        isNoteMode={gameState.isNoteMode}
        isShiftHeld={gameState.isShiftHeld}
        canUndo={gameState.moveHistory.length > 0}
        isLoading={isLoading}
      />
      <Board
        board={gameState.board}
        notes={gameState.notes}
        initialNumbers={gameState.initialNumbers}
        selectedCell={gameState.selectedCell}
        setSelectedCell={gameState.setSelectedCell}
        onNumberInput={gameState.handleNumberInput}
        onDelete={gameState.handleDelete}
      />
    </div>
  );
};

export default Game;