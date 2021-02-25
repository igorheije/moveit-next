import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Challenge.module.css';

const Challenge = () => {
  const { activeChallenge, resetChallenge, completedChallenge } = useContext(
    ChallengesContext,
  );

  return (
    <div className={styles.containerChallenge}>
      {activeChallenge ? (
        <div className={styles.upLevelChallengeActive}>
          <header>Ganhe {activeChallenge.amount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challegenFaledButton}
              onClick={resetChallenge}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challegenSuccedeButton}
              onClick={completedChallenge}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.upLevelChallengeNotActive}>
          <h1>Inicie um ciclo para receber desafios</h1>

          <img src="icons/level-up.svg" alt="Level" />
          <span>Avance de level completando os desafios</span>
        </div>
      )}
    </div>
  );
};

export default Challenge;
