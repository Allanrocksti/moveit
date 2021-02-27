import Head from 'next/head'

import { CompletedChallenges } from '../components/CompletedChallenges'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { Countdown } from '../components/Countdown'
import { ChallengeBox } from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css'
import { CountdownProvider } from '../contexts/CountdownContext'
import { GetServerSideProps } from 'next'
import { ChallengesProvider } from '../contexts/challengesContext'

interface HomeProps {
  level: number;
  currentExperience: number;
  challengersCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengersCompleted={props.challengersCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div >
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengersCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengersCompleted: Number(challengersCompleted ?? 0)
    }
  }
}
