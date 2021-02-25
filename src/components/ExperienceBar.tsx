import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';
const ExperienceBar = () => {
  const [porcentToNextLevel, setPorcentToNextLevel] = useState(0);

  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext,
  );
  useEffect(() => {
    setPorcentToNextLevel(
      Math.floor(currentExperience * 100) / experienceToNextLevel,
    );
  }, [currentExperience, porcentToNextLevel]);

  return (
    <header className={styles.experienceBar}>
      <span>0xp</span>
      <div>
        <div style={{ width: `${porcentToNextLevel}%` }}></div>
        <span className={styles.currentExperience} style={{ left: '50%' }}>
          {currentExperience}xp
        </span>
      </div>
      <span>{experienceToNextLevel}xp</span>
    </header>
  );
};

export default ExperienceBar;
