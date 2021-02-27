import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const countdownContext = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(countdownContext.minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(countdownContext.seconds).padStart(2, '0').split('')

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { countdownContext.hasFinished ? (
                <button
                    disabled
                    type="button"
                    onClick={countdownContext.resetCountdown}
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        { countdownContext.isActive ? (
                            <button
                                type="button"
                                onClick={countdownContext.resetCountdown}
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            >
                                Abandonar um ciclo
                            </button>
                        ) : (
                                <button
                                    type="button"
                                    onClick={countdownContext.startCountdown}
                                    className={styles.countdownButton}
                                >
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )}
        </div>
    )
}