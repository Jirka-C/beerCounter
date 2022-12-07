import React from 'react'
import useGetData from '../Hooks/useGetData';
import Pending from './Pending';

function SessionName() {
  const {data: session, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/session`);

  return (
      <section className='session'>
        {loading ? <Pending /> :
          <h1 className='session__name'>{session?.name} - {session && new Date(session?.date).toLocaleDateString()}</h1>
        }
      </section>
  )
}

export default SessionName