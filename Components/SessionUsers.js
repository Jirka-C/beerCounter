import React from 'react'
import useGetData from '../Hooks/useGetData';

function SessionUsers({session}) {
  const {data: users, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/users/${session.id}`);

  return (
    <div>SessionUsers</div>
  )
}

export default SessionUsers