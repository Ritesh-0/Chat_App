import React, { useState } from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

const OtherUsers = () => {
  useGetOtherUsers()
  const {OtherUsers} = useSelector(store=>store.myUser)


  if(!OtherUsers) return; // Early return in react
  
  return(
    <div className='overflow-auto flex-1'>
    {
      OtherUsers?.map((user) => {
        return(
      <OtherUser key={user._id} user={user}/>
        )
      })
    }
    </div>
  )
}

export default OtherUsers