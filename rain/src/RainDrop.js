import React, { useEffect, useState } from 'react';
import './RainDrop.css';

const RainDrop = ({ startX, color, rows }) => {
  const [position, setPosition] = useState(-10); // Start above the grid

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newPos = prevPosition + 1;
        if (newPos > rows * 20) { // Adjust based on grid and cell size
          return -10; // Restart from above the grid
        }
        return newPos;
      });
    }, Math.random() * 500 + 500); // Randomize falling speed

    return () => clearInterval(interval);
  }, [rows]);

  return (
    <div
      className="raindrop"
      style={{
        backgroundColor: color,
        top: `${position}px`, // Adjust position based on grid and cell size
        left: `${startX * 20}px`, // Adjust based on grid and cell size
      }}
    />
  );
};

export default RainDrop;
