import React, { useEffect, useState } from 'react';
import './App.css';

const ROWS = 15;
const COLS = 20;
const MAX_DROPS = 2;
const TRAIL_LENGTH = 5;
const COLORS = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A6', '#33FFF2'];

const createInitialGrid = () => {
  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    const row = [];
    for (let j = 0; j < COLS; j++) {
      row.push({ color: 'black', trail: false });
    }
    grid.push(row);
  }
  return grid;
};

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const App = () => {
  const [grid, setGrid] = useState(createInitialGrid);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((oldGrid) => {
        const newGrid = createInitialGrid();

        // Move drops down
        for (let j = 0; j < COLS; j++) {
          for (let i = ROWS - 1; i >= 0; i--) {
            if (oldGrid[i][j].color !== 'black') {
              const nextRow = i + 1;
              if (nextRow < ROWS) {
                newGrid[nextRow][j].color = oldGrid[i][j].color;
                newGrid[nextRow][j].trail = true;
                if (nextRow % Math.floor(ROWS / 3) === 0) {
                  newGrid[nextRow][j].color = getRandomColor();
                }
              }
              if (i < ROWS - TRAIL_LENGTH) {
                newGrid[i][j].color = 'black';
                newGrid[i][j].trail = false;
              } else {
                newGrid[i][j].color = fadeColor(oldGrid[i][j].color, nextRow - i);
                newGrid[i][j].trail = true;
              }
            }
          }
        }

        // Add new drops
        let dropCount = 0;
        while (dropCount < MAX_DROPS) {
          const col = Math.floor(Math.random() * COLS);
          if (newGrid[0][col].color === 'black') {
            newGrid[0][col] = { color: getRandomColor(), trail: false };
            dropCount++;
          }
        }

        return newGrid;
      });
    }, 75);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`cell ${cell.trail ? 'trail' : ''}`}
                style={{ backgroundColor: cell.color }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const fadeColor = (color, distance) => {
  const fadeFactor = 1 - (distance / (TRAIL_LENGTH + 1));
  const rgb = hexToRgb(color);
  const fadedColor = `rgb(${Math.round(rgb.r * fadeFactor)}, ${Math.round(rgb.g * fadeFactor)}, ${Math.round(rgb.b * fadeFactor)})`;
  return fadedColor;
};

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

export default App;
