import React from 'react'
import { initState, reducer } from '../state'

export const Context = React.createContext({})

export const MuonProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export const useMuonState = () => {
  return React.useContext(Context)
}
