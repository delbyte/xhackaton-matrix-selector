import { useState, useEffect } from 'react';
import { saveSelectionData, getAttemptsByEmail, clearAllData } from '../utils/storage';

type Stage = 'registration' | 'selection' | 'result';

interface Notification {
  message: string;
  type: 'error' | 'success';
}

export const useMatrixState = () => {
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<Stage>('registration');
  const [attempts, setAttempts] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    clearAllData();
  }, []);

  const handleTeamNameChange = (value: string) => {
    setTeamName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const hasPlayed = getAttemptsByEmail(value) > 0;
    if (hasPlayed) {
      setNotification({
        message: 'This email has already participated in the challenge!',
        type: 'error'
      });
      setEmail('');
    }
  };

  const handleStartSelection = () => {
    if (!teamName || !email) return;
    
    setStage('selection');
    setIsSelecting(true);
    setAttempts(1);
    
    setTimeout(() => {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      
      setSelectedRow(randomRow);
      setSelectedCol(randomCol);
      setIsSelecting(false);
      
      setTimeout(() => {
        setStage('result');
      }, 1500);
    }, 3000);
  };

  const handleTryAgain = () => {
    if (attempts >= 3) {
      setNotification({
        message: 'You have used all your matrix selection attempts!',
        type: 'error'
      });
      return;
    }
    
    setAttempts(prev => prev + 1);
    setStage('selection');
    setIsSelecting(true);
    setSelectedRow(null);
    setSelectedCol(null);
    
    setTimeout(() => {
      const randomRow = Math.floor(Math.random() * 10);
      const randomCol = Math.floor(Math.random() * 10);
      
      setSelectedRow(randomRow);
      setSelectedCol(randomCol);
      setIsSelecting(false);
      
      setTimeout(() => {
        setStage('result');
      }, 1500);
    }, 3000);
  };

  const handleAcceptChallenge = () => {
    if (selectedRow === null || selectedCol === null) return;
    
    saveSelectionData({
      teamName,
      email,
      rowIndex: selectedRow,
      colIndex: selectedCol,
      timestamp: new Date().toISOString()
    });
    
    setNotification({
      message: 'Challenge accepted! Your selection has been saved.',
      type: 'success'
    });
    
    setTeamName('');
    setEmail('');
    setSelectedRow(null);
    setSelectedCol(null);
    setStage('registration');
    setAttempts(0);
  };

  const clearNotification = () => {
    setNotification(null);
  };

  return {
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
  };
};