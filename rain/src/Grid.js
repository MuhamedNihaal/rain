import React from 'react';
import './Grid.css';
import RainDrop from './RainDrop';

const Grid = ({ rows, cols }) => {
  return (
    <div className="grid">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={colIndex} className="cell">
              <RainDrop
                startX={colIndex}
                color={`hsl(${Math.random() * 360}, 100%, 50%)`}
                rows={rows}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
