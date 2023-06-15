import React, { createContext, useState } from 'react'
import '../styles/style.scss'

export const SessionContext = createContext();

function BeerCounter({ Component, pageProps }) {
  const [selectedSession, setSelectedSession] = useState(null)

  return (
    <SessionContext.Provider value={{selectedSession: selectedSession, setSelectedSession: setSelectedSession}}>
      <Component {...pageProps} />
    </SessionContext.Provider>
  )
}

export default BeerCounter
