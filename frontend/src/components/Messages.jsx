import React from 'react'
import SingleMessage from './SingleMessage'
import useGetMessages from '../hooks/useGetMessages'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'
import { useSelector } from 'react-redux'



const Messages = () => {
  useGetMessages()
  useGetRealTimeMessage()
  const {messages} = useSelector(store=>store.message)

  if(!messages) return;

  return (
    <div className='px-4 flex-1 overflow-auto'>
    {
      messages && messages?.map((message) =>{
        return(
          <SingleMessage key={message._id} message={message} />
        )
      })
    }
    </div>
  )
}

export default Messages