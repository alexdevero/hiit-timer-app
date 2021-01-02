import React, { useContext, useEffect, useState } from 'react'
// import { /* Link, */ useParams } from 'react-router-dom'

import { GlobalState } from './../state/state'

export const Timer = () => {
  const { state } = useContext(GlobalState)

  const timer = 15 //useParams()

  // Main countdown time
  const [seconds, setSeconds] = useState(0)

  // Reps
  const [reps, setReps] = useState(state.reps)
  const [repsDone, setRepsDone] = useState(0)

  // Time types values
  const [timeWarmUp, setTimeWarmUp] = useState(state.timeWarmUp)
  const [timeWork, setTimeWork] = useState(state.timeWork)
  const [timeRest, setTimeRest] = useState(state.timeRest)
  const [timeCoolDown, setTimeCoolDown] = useState(state.timeCoolDown)

  // Time types activity statuses
  const [isWarmUpActive, setIsWarmUpActive] = useState(false)
  const [isWorkActive, setIsWorkActive] = useState(false)
  const [isRestActive, setIsRestActive] = useState(false)
  const [isCoolDownActive, setIsCoolDownActive] = useState(false)

  // Timer activity status
  const [isTimerActive, setIsTimerActive] = useState(false)

  const [workoutStage, setWorkoutStage] = useState('Are you ready?')

  const startCountdown = () => {
    setIsTimerActive(true)

    // Start the workout either by warmup
    if (timeWarmUp > 0) {
      setSeconds(timeWarmUp)
      setIsWarmUpActive(true)
      setWorkoutStage('Warmup')
    } else if (timeWork > 0) {
      // or by first work set
      setRepsDone(repsDone + 1)
      setSeconds(timeWork)
      setIsWorkActive(true)
      setWorkoutStage('Work!')
    }
  }

  useEffect(() => {
    // const seconds = timer % 60 + 60

    setSeconds(timeCoolDown)
  }, [timer])

  useEffect(() => {
    let interval: number | null | undefined = null

    if (isTimerActive) {
      interval = window.setInterval(() => {
        if (seconds > 0 || repsDone < reps) {
          if (seconds > 0) {
            setSeconds(seconds - 1)
          } else {
            if (repsDone < reps) {
              if (isWorkActive) {
                setIsWorkActive(false)
                setIsRestActive(true)
                setSeconds(timeRest)
                setWorkoutStage('Rest!')
              } else {
                // if isRestActive
                setRepsDone(repsDone + 1)
                setSeconds(timeWork)
                setIsWorkActive(true)
                setIsRestActive(false)
                setWorkoutStage('Work!')
              }
            } else {
              clearInterval(interval)
            }
          }
        } else if (isWorkActive) {
          setIsWorkActive(false)
          setIsRestActive(true)
          setSeconds(timeRest)
          setWorkoutStage('Rest!')
        } else {
          if (isCoolDownActive) {
            setWorkoutStage('Finished!')
            clearInterval(interval)
          } else if (timeCoolDown > 0) {
            setSeconds(timeCoolDown)
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
  }, [isTimerActive, seconds]);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <p className="h2 mt-0 mb-2 font-weight-bold">
          <span aria-label="timer clock" role="img">⏲️</span>
        </p>

        <h1 className="h4 mt-0 mb-3 font-weight-bold">Timer</h1>

        <h2 className="h5 mt-0 mb-3 font-weight-bold">{workoutStage}</h2>

        <p>Reps: {repsDone}/{reps}</p>

        <p>time: {seconds}s</p>

        <button
          className="btn btn-primary btn-md"
          onClick={startCountdown}
        >Start counter</button>

        {/* <Link to="/">
          <button className="btn btn-primary btn-md">Back home</button>
        </Link> */}
      </div>
    </div>
  )
}
