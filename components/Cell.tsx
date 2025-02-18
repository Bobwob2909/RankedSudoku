import React from 'react';

interface CellProps {
  value: number;
  notes: Set<number>;
  isInitial: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ 
  value, 
  notes,
  isInitial, 
  isSelected, 
  isHighlighted,
  onClick 
}) => {
  return (
    <div 
      className={`sudoku-cell ${isSelected ? 'selected' : ''} ${isHighlighted && !isSelected ? 'highlighted' : ''}`}
      onClick={onClick}
    >
      {value !== 0 ? (
        <span className={isInitial ? 'initial-number' : 'placed-number'}>
          {value}
        </span>
      ) : notes.size > 0 && (
        <div className="notes-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <div key={num} className="note-number">
              {notes.has(num) ? num : ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cell;