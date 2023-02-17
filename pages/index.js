import Head from 'next/head';
import React, { createContext } from 'react'
import BeerCounter from '../Components/BeerCounter';

function Home() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:image" content="og-image.jpg" />
        <meta property="og:url" content="" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
      </Head>

      <BeerCounter />
    </>
  )
}

export default Home