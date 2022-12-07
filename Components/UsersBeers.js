import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useGetData from '../Hooks/useGetData';
import Pending from './Pending';

function UsersList() {
  const {data: users, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/users`);
  const [usersList, setUsersList] = useState([])
  const [beerLoading, setBeerLoading] = useState(false)

  useEffect(() => {
    
    if(users?.users.length){
      setUsersList(users.users)
    }
    
  }, [users])

  const getBeerIcons = (beersCount) => {
    
    const beers = []

    for (let index = 1; index <= beersCount; index++) {
      beers.push(<div key={`beer-${index}`} className='userBeers__beer'><img src="/beer.png" alt="beer" /></div>)
      if(index %5 === 0){
        beers.push(<div key={`separator-${index}`} className='userBeers__beer-separator'></div>)
      }
    }

    return beers
  }

  const saveBeers = (userId, beerCount) => {

    if(beerLoading) return

    setBeerLoading(true)
    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/beers/`,
      JSON.stringify({
        userId: userId,
        beerCount: beerCount
      }))
    .then(response => {
      if(response.data){
        setUsersList(response.data.users)
        setBeerLoading(false)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className='userBeers'>
      <div className='container'>
        {loading ? <Pending /> : usersList.map((user) => 
          <div key={user.id} className='userBeers__row'>
            <div className='userBeers__name'>
              {user.name}
            </div>

            <div className='userBeers__beers'>
              {getBeerIcons(user.beers)}
            </div>

            <div className={`userBeers__counter${beerLoading ? ' userBeers__counter--disable' : ''}`}>
              <div className='userBeers__button' onClick={() => saveBeers(user.id, user.beers - 1)}>
                &minus;
              </div>
              <div className='userBeers__count'>
                {beerLoading ? <Pending small={true} /> : user.beers}
              </div>
              <div className='userBeers__button' onClick={() => saveBeers(user.id, user.beers + 1)}>
                +
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default UsersList