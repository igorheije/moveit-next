import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextDAta {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}
interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextDAta);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  let countdownTimeout: NodeJS.Timeout;

  const [time, setTime] = useState(0.05 * 60);
  const [hasFinished, setHasFinished] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }
  function resetCountdown() {
    setIsActive(false);
    clearTimeout(countdownTimeout);
    setTime(0.05 * 60);
    setHasFinished(false);
  }
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        seconds,
        minutes,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
