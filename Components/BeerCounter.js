import React, { useEffect, useState } from 'react'
import SessionName from '../Components/SessionName';
import UsersBeers from '../Components/UsersBeers';
import useGetData from '../Hooks/useGetData';
import Pending from './Pending';
import MainMenu from './MainMenu';

function BeerCounter() {
  return (
    <>
      <MainMenu />
      <UsersBeers />
    </>
  )
}

export default BeerCounter