import React from 'react';
import { AnimatePresence } from 'framer-motion';
import MatrixSelector from './components/MatrixSelector';
import RegistrationForm from './components/RegistrationForm';
import SelectionResult from './components/SelectionResult';
import ParticleBackground from './components/ParticleBackground';
import Notification from './components/Notification';
import { useMatrixState } from './hooks/useMatrixState';

function App() {
  const {
    teamName,
    email,
    stage,
    attempts,
    selectedRow,
    selectedCol,
    isSelecting,
    notification,
    handleTeamNameChange,
    handleEmailChange,
    handleStartSelection,
    handleTryAgain,
    handleAcceptChallenge,
    clearNotification,
  } = useMatrixState();

  return (
    <div className="min-h-screen bg-black text-white font-['SF Pro Display', 'Inter', sans-serif] flex flex-col overflow-hidden relative">
      <ParticleBackground />
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
      
      <header className="container mx-auto px-4 py-8 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400">
          X Hackathon Matrix
        </h1>
      </header>
      
      <main className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {stage === 'registration' && (
            <RegistrationForm 
              key="registration"
              teamName={teamName}
              email={email}
              onTeamNameChange={handleTeamNameChange}
              onEmailChange={handleEmailChange}
              onSubmit={handleStartSelection}
            />
          )}
          
          {stage === 'selection' && (
            <MatrixSelector
              key="selection" 
              isSelecting={isSelecting}
              selectedRow={selectedRow}
              selectedCol={selectedCol}
            />
          )}
          
          {stage === 'result' && (
            <SelectionResult
              key="result"
              teamName={teamName}
              email={email}
              selectedRow={selectedRow}
              selectedCol={selectedCol}
              attempts={attempts}
              onTryAgain={handleTryAgain}
              onAcceptChallenge={handleAcceptChallenge}
            />
          )}
        </AnimatePresence>
      </main>
      
      <footer className="py-4 mt-auto border-t border-gray-800 text-center text-sm text-gray-400 z-10">
        <div className="container mx-auto px-4">
          <p>&copy; 2025 Hackathon Raptors' X Hackathon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;