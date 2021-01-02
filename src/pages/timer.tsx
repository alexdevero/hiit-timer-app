import React, { useContext, useEffect, useState } from 'react'

import { GlobalState } from './../state/state'

export const Timer = () => {
  const { state } = useContext(GlobalState)

  // Main countdown time
  const [seconds, setSeconds] = useState(0)

  // Reps
  // const [reps, setReps] = useState(state.reps)
  const [repsDone, setRepsDone] = useState(0)

  // Time types activity statuses
  const [isWorkActive, setIsWorkActive] = useState(false)
  const [isCoolDownActive, setIsCoolDownActive] = useState(false)

  // Timer activity status
  const [isTimerActive, setIsTimerActive] = useState(false)

  const [workoutStage, setWorkoutStage] = useState('Are you ready?')

  const startCountdown = () => {
    setIsTimerActive(true)

    // Start the workout either by warmup
    if (state.timeWarmUp > 0) {
      setSeconds(state.timeWarmUp)
      setWorkoutStage('Warmup')
    } else if (state.timeWork > 0) {
      setRepsDone(repsDone + 1)
      setSeconds(state.timeWork)
      setIsWorkActive(true)
      setWorkoutStage('Work!')
    }
  }

  useEffect(() => {
    let interval: number | null | undefined = null

    if (isTimerActive) {
      interval = window.setInterval(() => {
        if (seconds > 0 || repsDone < state.reps) {
          if (seconds > 0) {
            setSeconds(seconds - 1)
          } else {
            if (repsDone < state.reps) {
              if (isWorkActive) {
                setIsWorkActive(false)
                setSeconds(state.timeRest)
                setWorkoutStage('Rest!')
              } else {
                setRepsDone(repsDone + 1)
                setSeconds(state.timeWork)
                setIsWorkActive(true)
                setWorkoutStage('Work!')
              }
            } else {
              clearInterval(interval)
            }
          }
        } else if (isWorkActive) {
          setIsWorkActive(false)
          setSeconds(state.timeRest)
          setWorkoutStage('Rest!')
        } else {
          if (isCoolDownActive) {
            setWorkoutStage('Finished!')
            clearInterval(interval)
          } else if (state.timeCoolDown > 0) {
            setSeconds(state.timeCoolDown)
            setWorkoutStage('Cooldown')
            setIsCoolDownActive(true)
          } else {
            clearInterval(interval)
          }
        }
      }, 1000);
    } else if (!isTimerActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval)
  }, [isTimerActive, seconds])

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <p className="h2 mt-0 mb-2 font-weight-bold">
          <span aria-label="timer clock" role="img">⏲️</span>
        </p>

        <h1 className="h4 mt-0 mb-3 font-weight-bold">Timer</h1>

        <h2 className="h5 mt-0 mb-3 font-weight-bold">{workoutStage}</h2>

        <p>Reps: {repsDone}/{state.reps}</p>

        <p>time: {seconds}s</p>

        <button
          className="btn btn-primary btn-md"
          onClick={startCountdown}
        >Start workout</button>
      </div>
    </div>
  )
}
