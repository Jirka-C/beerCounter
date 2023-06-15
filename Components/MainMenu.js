import React, { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../pages/_app';
import Link from 'next/link'
import useGetData from '../Hooks/useGetData';

function MainMenu({isRanking = false}) {

  const sessionContext = useContext(SessionContext)
  const {selectedSession, setSelectedSession} = sessionContext
  const {data: sessions, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/sessions`);
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if(sessions){
      setSelectedSession(sessions.activeSession)
    }
  }, [sessions])

  return (
    <div className='main-menu'>
      <div className={`main-menu__hamburger${isActive ? ' main-menu__hamburger--close' : ''}`} onClick={() => setIsActive(!isActive)}><span></span></div>
      <div className={`main-menu__box${isActive ? ' main-menu__box--active' : ''}`}>
        <div className='main-menu__panel'>
          {!isRanking && <Link href="/zebricek"><div className='main-menu__button'>Žebříček</div></Link>}

          <ul className="main-menu__sessions">
            {sessions && sessions.sessions.map(session => 
              <Link href="/" key={session.id}>
                <li className="main-menu__item"
                    onClick={() => {setSelectedSession(session); setIsActive(false)}}
                >
                    <div className='main-menu__date'>
                      {session.date ? new Date(session.date).toLocaleDateString() : ""}
                    </div>
                    <div className='main-menu__name'>
                      {session.name} 
                    </div>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MainMenu