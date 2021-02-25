import { createContext, ReactNode, useState } from 'react';

import challenges from '../../challenges.json';

interface CHallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface CHallengesContextData {
  level: number;
  currentExperience: number;
  activeChallenge: Challenge;
  challengeCompleted: number;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completedChallenge: () => void;
  experienceToNextLevel: number;
  hasFinished: boolean;
  setHasFinished: React.ComponentState;
  setCloseModal: React.ComponentState;
  closeModal: boolean;
}

export const ChallengesContext = createContext({} as CHallengesContextData);

export const ChallengeProvider = ({ children }: CHallengesProviderProps) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [closeModal, setCloseModal] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function startNewChallenge() {
    const challengesIndex = Math.floor(Math.random() * challenges.length);
    setActiveChallenge(challenges[challengesIndex]);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }
  function completedChallenge() {
    if (experienceToNextLevel < currentExperience + activeChallenge.amount) {
      setLevel(level + 1);
      setCloseModal(true);
      setCurrentExperience(
        currentExperience + activeChallenge.amount - experienceToNextLevel,
      );
    } else {
      setCurrentExperience(currentExperience + activeChallenge.amount);
    }
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        setLevel,
        activeChallenge,
        completedChallenge,
        currentExperience,
        setCurrentExperience,
        challengeCompleted,
        experienceToNextLevel,
        setChallengeCompleted,
        startNewChallenge,
        resetChallenge,
        hasFinished,
        setHasFinished,
        closeModal,
        setCloseModal,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};
