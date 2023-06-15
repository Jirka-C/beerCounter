import React, { useContext, useEffect, useState } from 'react'
import Pending from '../Components/Pending';
import useGetData from '../Hooks/useGetData';
import MainMenu from '../Components/MainMenu';
import { SessionContext } from './_app';

function Zebricek() {
  const {data: ranking, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/ranking`);
  const [rankingToShow, setRankingToShow] = useState([])

  useEffect(() => {
    setRankingToShow(ranking)
  }, [ranking])
  

  const filterRanking = (gender) => {
    if(gender){
      const filterRanking = ranking.filter(item => item.gender === gender)
      setRankingToShow(filterRanking)
      return;
    }

    setRankingToShow(ranking)
  }

  const setActive = (e) => {
    document.querySelectorAll('.ranking__filter-item').forEach(item => item.classList.remove('ranking__filter-item--active'))
    e.target.classList.add('ranking__filter-item--active')
  }

  return (
    <>
      <MainMenu isRanking={true} />
      <section className='ranking'>
        <div className='container'>
          <h1 className='ranking__name'>Žebříček legend</h1>

          <div className='ranking__filter'>
            <div className='ranking__filter-box'>
              <div className='ranking__filter-item ranking__filter-item--active' onClick={(e) => {filterRanking(null); setActive(e)}}>Všichni</div>
              <div className='ranking__filter-item' onClick={(e) => {filterRanking('M'); setActive(e)}}>Muži</div>
              <div className='ranking__filter-item' onClick={(e) => {filterRanking('F'); setActive(e)}}>Ženy</div>
            </div>
          </div>

          {!rankingToShow ? <Pending /> :
            <table className='ranking__table'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Jméno</th>
                  <th>Velké</th>
                  <th>Malé</th>
                  <th>Plech</th>
                  <th>Průměr</th>
                  <th>Účast</th>
                </tr>
              </thead>

              <tbody>
                {rankingToShow.map( ({id, name, beersLarge, beersSmall, beersCan, beers_total, userSessions, totalSessions}, index) => 
                  <tr key={id}>
                    <td>{index + 1}</td> 
                    <td>{name}</td> 
                    <td>{beersLarge}</td> 
                    <td>{beersSmall}</td> 
                    <td>{beersCan}</td>
                    <td>{Math.floor(beers_total / userSessions)}</td>
                    <td>{userSessions}/{totalSessions}</td>
                  </tr>
                )}
              </tbody>
            </table>}
        </div>
      </section>
    </>
  )
}

export default Zebricek