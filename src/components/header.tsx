import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalState } from './../state/state'

export const Header = () => {
  const { state, handleStateChange } = useContext(GlobalState)

  return (
    <header>
      <nav className="pt-4 pb-4">
        <div className="container">
          <ul className="d-flex justify-content-between list-unstyled">
            <li>
              <Link to="/" className="text-decoration-none text-body font-weight-bold">
                <span className="mr-1" aria-label="trophy" role="img">🏆</span>
                HIIT It!
              </Link>
            </li>

            <li className="d-flex align-items-center">
              <Link to="/settings" className="header-settings-link">
                <span aria-label="gear" role="img" title="Settings">
                  ⚙️
                  <span className="sr-only">Settings</span>
                </span>
              </Link>

              <button
                className="btn btn-link text-dark header-mode-link ml-2"
                type="button"
                onClick={() => handleStateChange('darkMode', !state.darkMode)}
              >
                {state.darkMode === false ? (
                  <span aria-label="Sun" title="Toggle dark mode" role="img">
                    ☀️
                    <span className="sr-only">Toggle dark mode</span>
                  </span>
                ) : (
                  <span aria-label="Crescent moon" title="Toggle light mode" role="img">
                    🌙
                    <span className="sr-only">Toggle light mode</span>
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
