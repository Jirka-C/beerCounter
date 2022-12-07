import React from 'react'

function Pending({small = false}) {
  return (
    <div className='pending'>
      <div className={`pending__circle${small ? ' pending__circle--small' : ''}`}></div>
      {!small && <div className='pending__text'>
        Načítam data
      </div>}
    </div>
  )
}

export default Pending