import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { matrixData } from '../data/matrixData';

interface MatrixSelectorProps {
  isSelecting: boolean;
  selectedRow: number | null;
  selectedCol: number | null;
}

const MatrixSelector: React.FC<MatrixSelectorProps> = ({ 
  isSelecting, 
  selectedRow, 
  selectedCol 
}) => {
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSelecting || !matrixRef.current) return;
    
    const cells = matrixRef.current.querySelectorAll('.matrix-cell');
    let interval: number;
    
    if (isSelecting) {
      let counter = 0;
      interval = window.setInterval(() => {
        cells.forEach(cell => cell.classList.remove('highlight-cell'));
        
        const randomRowIndex = Math.floor(Math.random() * matrixData.rows.length);
        const randomColIndex = Math.floor(Math.random() * matrixData.columns.length);
        
        const rowCells = matrixRef.current?.querySelectorAll(`.row-${randomRowIndex}`);
        const colCells = matrixRef.current?.querySelectorAll(`.col-${randomColIndex}`);
        
        rowCells?.forEach(cell => cell.classList.add('highlight-cell'));
        colCells?.forEach(cell => cell.classList.add('highlight-cell'));
        
        const intersectionCell = matrixRef.current?.querySelector(`.row-${randomRowIndex}.col-${randomColIndex}`);
        intersectionCell?.classList.add('intersection-highlight');
        
        counter++;
        if (counter > 15) {
          clearInterval(interval);
        }
      }, 150);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isSelecting]);

  return (
    <motion.div 
      className="matrix-container w-full max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-indigo-500/30"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-6 text-center text-blue-300">Technology Matrix</h2>
      
      <div 
        ref={matrixRef} 
        className="grid gap-0.5 text-xs sm:text-sm"
        style={{
          gridTemplateColumns: 'minmax(120px, auto) repeat(10, minmax(70px, 1fr))'
        }}
      >
        <div className="matrix-cell header-cell"></div>
        {matrixData.columns.map((col, colIndex) => (
          <div 
            key={`col-${colIndex}`} 
            className={`matrix-cell header-cell text-center p-2 font-medium
              ${selectedCol === colIndex ? 'selected-col' : ''}`}
          >
            {col}
          </div>
        ))}
        
        {matrixData.rows.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <div 
              className={`matrix-cell header-cell p-2 font-medium
                ${selectedRow === rowIndex ? 'selected-row' : ''}`}
            >
              {row}
            </div>
            
            {matrixData.columns.map((_, colIndex) => (
              <div 
                key={`cell-${rowIndex}-${colIndex}`}
                className={`matrix-cell row-${rowIndex} col-${colIndex} aspect-square bg-gray-800/60 
                  ${selectedRow === rowIndex && selectedCol === colIndex ? 'selected-cell' : ''}
                  ${selectedRow === rowIndex ? 'in-selected-row' : ''}
                  ${selectedCol === colIndex ? 'in-selected-col' : ''}`}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      
      {isSelecting && (
        <div className="text-center mt-8 text-lg text-blue-300 animate-pulse">
          Selecting technology combination...
        </div>
      )}
      
      {selectedRow !== null && selectedCol !== null && !isSelecting && (
        <div className="text-center mt-8">
          <p className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Your challenge:
          </p>
          <p className="text-2xl font-bold text-white">
            {matrixData.rows[selectedRow]} + {matrixData.columns[selectedCol]}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MatrixSelector;