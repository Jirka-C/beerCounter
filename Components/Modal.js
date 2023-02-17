import axios from 'axios';
import React, { useState } from 'react'

function Modal({showModal, setShowModal, selectedUser, session, setUsersList}) {

  const [pending, setPending] = useState(false);

  const beerType = {
    BEER_LARGE: "BEER_LARGE",
    BEER_SMALL: "BEER_SMALL",
    BEER_CAN: "BEER_CAN",
  }

  const saveBeers = (beerType, decrement = false) => {
    if(!selectedUser || pending) return;

    setPending(true)

    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/beers/`,
    JSON.stringify({
      userId: selectedUser.id,
      beerType: beerType,
      decrement: decrement,
      sessionId: session.id
    }))
    .then(response => {
      if(response.data){
        setUsersList(response.data.users)
      }
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      setShowModal(false)
      setPending(false)
    })
  }

  return (
    <div className={`modal${showModal ? ' modal--active' : ''}`}>
      <div className={`modal__inner${pending ? ' modal__inner--pending' : ''}`}>
        <div className='modal__close' onClick={() => setShowModal(false)}>×</div>

        <div className='modal__title'>
          {selectedUser?.name}
        </div>

        <div className='modal__item'>
          <div className='modal__button' onClick={() => saveBeers(beerType.BEER_LARGE)}>
            <img src="/beer-large.svg" alt='beer' /> Velké
          </div>
          <div className='modal__button modal__button--small' onClick={() => saveBeers(beerType.BEER_LARGE, true)}>˗</div>
        </div>

        <div className='modal__item'>
          <div className='modal__button' onClick={() => saveBeers(beerType.BEER_SMALL)}>
            <img src="/beer-small.svg" alt='beer' /> Malé
          </div>
          <div className='modal__button modal__button--small' onClick={() => saveBeers(beerType.BEER_SMALL, true)}>˗</div>
        </div>

        <div className='modal__item'>
          <div className='modal__button' onClick={() => saveBeers(beerType.BEER_CAN)}>
            <img src="/beer-can.svg" alt='beer' /> Plech
          </div>
          <div className='modal__button modal__button--small' onClick={() => saveBeers(beerType.BEER_CAN, true)}>˗</div>
        </div>

      </div>
    </div>
  )
}

export default Modal