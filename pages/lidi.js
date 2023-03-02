import React, { useEffect, useState } from 'react'
import UserInput from '../Components/UserInput';
import SessionName from '../Components/SessionName';
import useGetData from '../Hooks/useGetData';
import Pending from '../Components/Pending';

function Users() {
  const {data: sessions, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/sessions`);
  const [selectedSession, setSelectedSession] = useState(null)

  useEffect(() => {
    if(sessions){
      setSelectedSession(sessions.activeSession)
    }
  }, [sessions])

  return (
    !selectedSession
    ? <Pending /> :
    <>
      <SessionName session={selectedSession} />
      <UserInput />
    </>
  )
}

export default Users