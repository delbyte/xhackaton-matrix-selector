import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Redo } from 'lucide-react';
import { matrixData } from '../data/matrixData';

interface SelectionResultProps {
  teamName: string;
  email: string;
  selectedRow: number | null;
  selectedCol: number | null;
  attempts: number;
  onTryAgain: () => void;
  onAcceptChallenge: () => void;
}

const SelectionResult: React.FC<SelectionResultProps> = ({
  teamName,
  email,
  selectedRow,
  selectedCol,
  attempts,
  onTryAgain,
  onAcceptChallenge
}) => {
  const rowCategory = selectedRow !== null ? matrixData.rows[selectedRow] : '';
  const colCategory = selectedCol !== null ? matrixData.columns[selectedCol] : '';

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-8 border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10" />
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Technology Challenge
          </h2>
          
          <div className="text-center mb-6">
            <p className="text-gray-400 text-sm">Team: {teamName}</p>
            <p className="text-gray-400 text-sm">Attempt: {attempts} of 3</p>
          </div>
          
          <div className="bg-gray-800/60 rounded-lg p-6 mb-6 border border-indigo-500/20">
            <h3 className="text-lg font-medium text-gray-300 mb-3">Your Challenge:</h3>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
              {rowCategory} + {colCategory}
            </p>
          </div>
          
          <div className="space-y-3">
            {attempts < 3 && (
              <button
                onClick={onTryAgain}
                className="w-full py-3 px-4 flex items-center justify-center text-white bg-gray-700 hover:bg-gray-600 rounded-md font-medium transition-all duration-300 group"
              >
                <span>Try Again</span>
                <Redo className="ml-2 w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            )}
            
            <button
              onClick={onAcceptChallenge}
              className="w-full py-3 px-4 flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md font-medium transition-all duration-300 group"
            >
              <span>Accept Challenge</span>
              <Cpu className="ml-2 w-5 h-5 group-hover:animate-pulse" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectionResult;