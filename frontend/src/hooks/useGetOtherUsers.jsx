import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { setOtherUsers } from '../redux/userSlice'

const useGetOtherUsers = () => {
     const dispatch = useDispatch()

useEffect(()=>{
     const fetchOtherUsers = async()=>{
          try{
               axios.defaults.withCredentials=true
               const response = await axios.get('http://localhost:9000/api/v1/user/');
               // console.log(response)
               //store
               dispatch(setOtherUsers(response.data))
          }
          catch(err){
               console.log(err.message,"Coming from")
          }
     }
     fetchOtherUsers()
},[])
}

export default useGetOtherUsers