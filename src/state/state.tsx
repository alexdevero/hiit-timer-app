import React, { createContext, useState } from 'react'

interface GlobalStateUI {
  children: React.ReactNode;
}

export const GlobalState = createContext({
  state: {
    darkMode: false,
    cycles: 1,
    reps: 8,
    timeCoolDown: 60,
    timeRest: 60,
    timeWarmUp: 60,
    timeWork: 60
  },
  handleStateChange: (/* prop: string, value: number | boolean */ payload: {}) => {}
})

export const GlobalStateProvider = (props: GlobalStateUI) => {
  const [state, setState] = useState({
    darkMode: false,
    cycles: 1,
    reps: 8,
    timeCoolDown: 60,
    timeRest: 60,
    timeWarmUp: 60,
    timeWork: 60
  })

  useEffect(() => {
    if (state.darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [state])

  const handleStateChange = (/* prop, value,*/ payload) => {
    // prop, value => payload { foo: bar }
    setState({
      ...state,
      ...payload,
    })

    // switch (prop) {
    //   case 'darkMode':
    //     setState({
    //       ...state,
    //       darkMode: value,
    //     })

    //     document.body.classList.toggle('dark-mode')

    //     break
    //   case 'reps':
    //     setState({
    //       ...state,
    //       reps: value,
    //     })
    //     break
    //   case 'timeRest':
    //     setState({
    //       ...state,
    //       timeRest: value,
    //     })
    //     break
    //   case 'timeWarmUp':
    //     setState({
    //       ...state,
    //       timeWarmUp: value,
    //     })
    //     break
    //   case 'timeWork':
    //     setState({
    //       ...state,
    //       timeWork: value,
    //     })
    //     break
    //   case 'timeCoolDown':
    //     setState({
    //       ...state,
    //       timeCoolDown: value,
    //     })
    //     break
    // }

    // if (prop === 'darkMode') {
    //   setState({
    //     ...state,
    //     darkMode: state.darkMode === 'off' ? 'on' : 'off',
    //   })

    //   document.body.classList.toggle('dark-mode')
    // } else {
    //   setState({
    //     ...state,
    //     temperature: state.temperature === 'Celsius' ? 'Fahrenheit' : 'Celsius'
    //   })
    // }
  }

  return (
    <GlobalState.Provider value={{ state, handleStateChange }}>
      {props.children}
    </GlobalState.Provider>
  )
}
