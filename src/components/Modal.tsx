import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Modal.module.css';

const Modal = () => {
  const { level, setModalOpen } = useContext(ChallengesContext);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <header>{level}</header>
        <button className={styles.close} onClick={() => setModalOpen(false)}>
          <img src="icons/close.svg" alt="close" />
        </button>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>
        <button className={styles.buttonTwitter}>
          Compartilhar <img src="icons/twitter.svg" alt="Twitter" />
        </button>
      </div>
    </div>
  );
};

export default Modal;
