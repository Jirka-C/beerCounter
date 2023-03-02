import React, { useEffect, useState } from 'react'
import SessionName from '../Components/SessionName';
import UsersBeers from '../Components/UsersBeers';
import useGetData from '../Hooks/useGetData';
import Pending from './Pending';

function BeerCounter() {
  const {data: sessions, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/sessions`);
  const [selectedSession, setSelectedSession] = useState(null)

  useEffect(() => {
    if(sessions){
      setSelectedSession(sessions.activeSession)
    }
  }, [sessions])
  

  return (
      !selectedSession
      ? <Pending />
      : <>
          <SessionName sessions={sessions.sessions} selectedSession={selectedSession} setSelectedSession={setSelectedSession} />
          <UsersBeers session={selectedSession} />
        </>
  )
}

export default BeerCounter