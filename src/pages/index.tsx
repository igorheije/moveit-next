import React, { useContext } from 'react';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import { ChallengesContext } from '../contexts/ChallengesContext';

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import Challenge from '../components/Challenge';
import Modal from '../components/Modal';
import { CountdownProvider } from '../contexts/CountdownContext';

export default function Home() {
  const { closeModal } = useContext(ChallengesContext);

  return (
    <>
      {closeModal && <Modal />}
      <div className={styles.container}>
        <Head>
          <title>Move it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <Challenge />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </>
  );
}
