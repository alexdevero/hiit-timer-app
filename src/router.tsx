import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home } from './pages/home'
import { Presets } from './pages/presets'
import { Timer } from './pages/timer'
import { Settings } from './pages/settings'

import { Footer } from './components/footer'
import { Header } from './components/header'

import { GlobalStateProvider } from './state/state'

export const Router = () => {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Header />

        <div className="app">
          <div className="container">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/settings" component={Settings} />
              <Route path="/presets" component={Presets} />
              <Route path="/timer" component={Timer} />
            </Switch>
          </div>
        </div>

        <Footer />
      </BrowserRouter>
    </GlobalStateProvider>
  )
}
