import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import Modal from '../components/Modal';

interface CHallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface CHallengesContextData {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
  experienceToNextLevel: number;
  modalOpen: boolean;
  activeChallenge: Challenge;
  setLevel: React.ComponentState;
  setModalOpen: React.ComponentState;
  setCurrentExperience: React.ComponentState;
  setChallengeCompleted: React.ComponentState;
  levelUp: () => void;
  resetChallenge: () => void;
  startNewChallenge: () => void;
  completedChallenge: () => void;
}

export const ChallengesContext = createContext({} as CHallengesContextData);

export const ChallengeProvider = ({
  children,
  ...rest
}: CHallengesProviderProps) => {
  const [level, setLevel] = useState<number>(rest.level ?? 1);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0,
  );
  const [challengeCompleted, setChallengeCompleted] = useState(
    rest.challengeCompleted ?? 0,
  );

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengeCompleted', String(challengeCompleted));
  }, [level, currentExperience, challengeCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setModalOpen(true);
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

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
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
        modalOpen,
        setModalOpen,
        levelUp,
        setChallengeCompleted,
        setCurrentExperience,
      }}
    >
      {children}
      {modalOpen && <Modal />}
    </ChallengesContext.Provider>
  );
};
