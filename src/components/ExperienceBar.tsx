import styles from '../styles/components/ExperienceBar.module.css';
const ExperienceBar = () => {
  return (
    <header className={styles.experienceBar}>
      <span>0xp</span>
      <div>
        <div style={{ width: '50%' }}></div>
        <span className={styles.currentExperience} style={{ left: '50%' }}>
          300xp
        </span>
      </div>
      <span>600xp</span>
    </header>
  );
};

export default ExperienceBar;
