import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

const CompletedChallenges = () => {
  const { challengeCompleted } = useContext(ChallengesContext);

  return (
    <div className={styles.completeChallenges}>
      <span>Desafios Completos</span>
      <span>{challengeCompleted}</span>
    </div>
  );
};

export default CompletedChallenges;
