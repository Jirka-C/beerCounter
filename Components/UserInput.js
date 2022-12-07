import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useGetData from '../Hooks/useGetData';
import Pending from './Pending';

function UserInput() {

  const {data: users, loading, error} = useGetData(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/users`);
  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    
    if(users?.users.length){
      setUsersList(users.users)
    }
    
  }, [users])
  

  const saveUser = (id) => {
    let user = document.getElementById(`user-${id}`).value;
    
    if(!user.length){
      return;
    }

    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/users/${id}`,
      JSON.stringify({user: user})
    )
    .then(response => {
      if(response.data){
        setUsersList(response.data.users)
        document.getElementById(`user-0`).value = ""
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  const deleteUser = (id) => {
    axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/beer/users/${id}`)
    .then(response => {
      if(response.data){
        setUsersList(response.data.users)
      }
    })
    .catch(error => {
      console.log(error)
    })    
  }

  return (
    <div className='userInput'>
      <div className='container'>
        {loading ? <Pending /> : usersList.map(({id, name}) => <div className='userInput__row' key={id}>
          <input id={`user-${id}`} className="userInput--input" type={"text"} defaultValue={name} />
          <button className="userInput--button" onClick={() => saveUser(id)}><img src='icons/save.svg' /></button>
          <button className="userInput--button" onClick={() => deleteUser(id)}><img src='icons/trash.svg' /></button>
        </div>)}
        <div className='userInput__row'>
          <input id="user-0" className="userInput--input" type={"text"} defaultValue={""} />
          <button className="userInput--button" onClick={() => saveUser(0)}><img src='icons/save.svg' /></button>
        </div>
      </div>
    </div>
  )
}

export default UserInput