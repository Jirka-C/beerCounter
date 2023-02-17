import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useGetData from '../Hooks/useGetData';
import Modal from './Modal';
import Pending from './Pending';

function UsersBeers({session}) {
  const {data: users, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/users/${session.id}`);
  const [usersList, setUsersList] = useState([])
  const [beerLoading, setBeerLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  
  const beerIcon = {
    BEER_LARGE: "/beer-large.svg",
    BEER_SMALL: "/beer-small.svg",
    BEER_CAN: "/beer-can.svg",
  }

  useEffect(() => {
    
    if(users?.users.length){
      setUsersList(users.users)
    }
    
  }, [users])

  const getBeerIcons = (beersCount, beerIcon = beerIcon.BEER_LARGE) => {
    
    const beers = []

    for (let index = 1; index <= beersCount; index++) {
      beers.push(<div key={`beer-${index}`} className='userBeers__beer'><img src={beerIcon} alt="beer" /></div>)
      if(index %5 === 0){
        beers.push(<div key={`separator-${index}`} className='userBeers__beer-separator'></div>)
      }
    }

    return beers
  }

  return (
    <>
      <div className='userBeers'>
        <div className='container'>
          {loading ? <Pending /> : usersList.map((user) => 
            <div key={user.id} className='userBeers__row'>
              <div className='userBeers__name'>
                {user.name}
              </div>

              <div className='userBeers__beers'>
                {user.beersLarge ? <div className='userBeers__type'>
                  <div className='userBeers__label'>Velké - {user.beersLarge}</div>
                  {getBeerIcons(user.beersLarge, beerIcon.BEER_LARGE)}
                </div> : null}

                {user.beersSmall ? <div className='userBeers__type'>
                  <div className='userBeers__label'>Malé - {user.beersSmall}</div>
                  {getBeerIcons(user.beersSmall, beerIcon.BEER_SMALL)}
                </div> : null}

                {user.beersCan ? <div className='userBeers__type'>
                  <div className='userBeers__label'>Plech - {user.beersCan}</div>
                  {getBeerIcons(user.beersCan, beerIcon.BEER_CAN)}
                </div> : null}
              </div>

              {session.active ? 
                <div className={`userBeers__counter${beerLoading ? ' userBeers__counter--disable' : ''}`}>
                  <div className='userBeers__button' onClick={() => {setShowModal(true); setSelectedUser(user)}}>
                    <img src="/beer-large.svg" alt='beer' />
                  </div>
                </div> : null}
            </div>
          )}
        </div>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal} selectedUser={selectedUser} session={session} setUsersList={setUsersList} />
    </>
  )
}

export default UsersBeers