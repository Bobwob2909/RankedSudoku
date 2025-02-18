import React from 'react';

interface GameControlsProps {
  onNewGame: () => void;
  onToggleNotes: () => void;
  onUndo: () => void;
  onReset: () => void;
  isNoteMode: boolean;
  isShiftHeld: boolean;
  canUndo: boolean;
  isLoading?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onNewGame,
  onToggleNotes,
  onUndo,
  onReset,
  isNoteMode,
  isShiftHeld,
  canUndo,
  isLoading = false
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <button 
        onClick={onNewGame}
        disabled={isLoading}
        className="newGameButton"
      >
        {isLoading ? 'Loading...' : 'New Game'}
      </button>
      <div className="flex gap-4">
        <button 
          onClick={onToggleNotes}
          className={(isNoteMode || isShiftHeld) ? 'notesButtonActive' : 'notesButton'}
        >
          Notes {(isNoteMode || isShiftHeld) ? 'On' : 'Off'}
        </button>
        <button 
          onClick={onUndo}
          className="undoButton"
          disabled={!canUndo}
        >
          Undo
        </button>
        <button 
          onClick={onReset}
          className="resetButton"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default GameControls;