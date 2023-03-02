import React, { useState } from 'react'

function SessionName({selectedSession, sessions, setSelectedSession}) {

  const [sessionListActive, setSessionListActive] = useState(false)

  return (
      <section className='session'>
        <div className='container'>
          <h1 className='session__name' onClick={() => setSessionListActive(!sessionListActive)}>
            {selectedSession.name} {selectedSession.date && `- ${new Date(selectedSession.date).toLocaleDateString()}`}
          </h1>

          <ul className={`session__list${sessionListActive ? ' session__list--active' : ""}`}>
            {sessions.map(session => 
              <li className="session__list-item"
                  key={session.id}
                  onClick={() => {setSelectedSession(session); setSessionListActive(false)}}
              >
                {`${session.name} ${session.date ? "- " + new Date(session.date).toLocaleDateString() : ""}`}
              </li>
            )}
          </ul>
        </div>
      </section>
  )
}

export default SessionName