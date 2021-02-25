import { createContext, ReactNode, useEffect, useState } from 'react';

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
  setCloseModal: React.ComponentState;
  setLevel: React.ComponentState;
  setCurrentExperience: React.ComponentState;
  setChallengeCompleted: React.ComponentState;
  closeModal: boolean;
  levelUp: () => void;
}

export const ChallengesContext = createContext({} as CHallengesContextData);

export const ChallengeProvider = ({ children }: CHallengesProviderProps) => {
  const [level, setLevel] = useState<number>(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [closeModal, setCloseModal] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const challengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[challengesIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio ', {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }
  function completedChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (experienceToNextLevel < finalExperience) {
      levelUp();
      setCloseModal(true);
      setCurrentExperience(finalExperience - experienceToNextLevel);
    }

    setCurrentExperience(finalExperience);
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
        challengeCompleted,
        experienceToNextLevel,
        startNewChallenge,
        resetChallenge,
        closeModal,
        setCloseModal,
        levelUp,
        setChallengeCompleted,
        setCurrentExperience,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};
