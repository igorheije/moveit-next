import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Modal.module.css';

const Modal = () => {
  const { level, setCloseModal } = useContext(ChallengesContext);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={() => setCloseModal(false)}>
          <img src="icons/close.svg" alt="close" />
        </button>
        <div className={styles.modalImage}>
          <img src="icons/levelup.svg" alt="level Up" />
          <span>{level}</span>
        </div>
        <div className={styles.modalParabens}>
          <h1>Parabéns</h1>
          <p>Você alcançou um novo level</p>
        </div>
        <button className={styles.buttonTwitter}>
          Compartilhar <img src="icons/twitter.svg" alt="Twitter" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
