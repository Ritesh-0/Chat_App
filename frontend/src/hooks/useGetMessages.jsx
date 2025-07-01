import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'
const useGetMessages = () => {
     
const dispatch = useDispatch()
const {selectedUser} = useSelector(store=>store.myUser)

 useEffect(()=>{
     const fetchMessages = async() => {
          try{
               axios.defaults.withCredentials=true;
               const response = await axios.get(`http://localhost:9000/api/v1/message/${selectedUser?._id}`)
               dispatch(setMessages(response.data))
          }
          catch(err){
               console.log(err.message)
          }
     }
     fetchMessages()
 },[selectedUser])
}

export default useGetMessages