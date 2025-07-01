import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsersComp from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';


const Sidebar = () => {
  const [searchOtherUsers, setSearchOtherUsers] = useState()

  const {OtherUsers} = useSelector(store=>store.myUser)

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const logoutHandler = async() => {
    try{
      const response = await axios.get('http://localhost:9000/api/v1/user/logout')
      toast.success(response.data.message)
      navigate('/login')
      dispatch(setAuthUser(null))
    }
    catch(err){
      toast.error(err)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()

    const conversationUser = OtherUsers?.find((user) => user.fullname.toLowerCase().includes(searchOtherUsers.toLowerCase()))

    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]))
    }
    else{
      toast.error("User not found")
    }
  }


  // console.log(otherUser)
  return (
    <div className='border-r border-slate-500 flex flex-col p-4'>
     <form action='' onSubmit={handleSearch} className='flex items-center gap-2'>
     <input
     onChange={(e)=>setSearchOtherUsers(e.target.value)}
     value={searchOtherUsers}
     className='input-bordered input rounded-md bg-white text-black '
     type='text'
     placeholder='Search....'
     />
     <button type='submit' className='btn bg-white text-black hover:bg-slate-100'>
          <BiSearchAlt2 size={24} />
     </button>
     </form>
     <div className='divider px-3'></div>
     <OtherUsersComp />
     <div className='mt-2'>
      <button
      onClick={logoutHandler}
       className='btn btn-sm bg-white text-black hover:bg-slate-100'>Logout</button>
     </div>
    </div>
  )
}

export default Sidebar