import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
  const [message,setMessage] = useState("")
  const dispatch = useDispatch()
  const {selectedUser} = useSelector(store=>store.myUser)
  const {messages} = useSelector(store=>store.message)

  const SubmitHandler = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`http://localhost:9000/api/v1/message/send/${selectedUser?._id}`,{message},
        {
          headers:{
            Content_Type:'application/json'
          },
          withCredentials:true
        }
      )
      console.log(response)
      dispatch(setMessages([...messages,response?.data?.newMessage]))
    }
    catch(err){
      console.log(err.message)
    }
    setMessage("")
  }
  return (
    <div>
     <form onSubmit={SubmitHandler} className='px-4 py-3 my-3'>
          <div className='w-full relative'>
               <input
               onChange={(e)=>setMessage(e.target.value)}
               value={message}
               type='text'
               placeholder='Send message'
               className='border text-sm rounded-lg block w-full bg-gray-500 text-white p-3 border-zinc-500'
               />
               <button className='absolute flex inset-y-0 end-0 pr-4 items-center' type='submit'><IoMdSend /></button>
          </div>
     </form>
    </div>
  )
}

export default SendInput