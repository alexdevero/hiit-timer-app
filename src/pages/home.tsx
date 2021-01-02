import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="row justify-content-center text-center">
      <div className="col-md-8">
        <p className="h2 mt-0 mb-2 font-weight-bold">
          <span className="mr-1" aria-label="trophy" role="img">🏆</span>
        </p>

        <h1 className="h4 m-0 font-weight-bold">HIIT It!</h1>

        <p className="mt-3 mb-4">Your minimal HIIT timer app.</p>

        <Link to="/timer">
          <button className="btn btn-primary btn-md">Let's go!</button>
        </Link>
      </div>
    </div>
  )
}
