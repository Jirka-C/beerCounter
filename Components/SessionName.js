import Link from 'next/link';
import React, { useState } from 'react'

function SessionName({selectedSession}) {

  return (
      <section className='session'>
        <div className='container'>
          <h1 className='session__name'>
            {selectedSession.name} {selectedSession.date && `- ${new Date(selectedSession.date).toLocaleDateString()}`}
          </h1>
        </div>
      </section>
  )
}

export default SessionName