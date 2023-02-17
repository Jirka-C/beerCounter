import React from 'react'

function SessionName({session}) {
  return (
      <section className='session'>
        <h1 className='session__name'>{session.name} {session.date && `- ${new Date(session.date).toLocaleDateString()}`}</h1>
      </section>
  )
}

export default SessionName